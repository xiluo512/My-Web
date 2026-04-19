<template>
  <div class="layout">
    <!-- 左侧聊天区 -->
    <div class="chat-panel">
      <div class="messages" ref="msgBox">
        <div v-for="(msg, idx) in chatHistory" :key="idx" :class="['msg', msg.role]">
          {{ msg.content }}
        </div>
        <div v-if="isStreaming && !error" class="msg assistant typing">
          {{ rawText }} <span class="cursor">|</span>
        </div>
        <div v-if="error" class="error-msg">⚠️ {{ error }}</div>
      </div>
      <div class="input-area">
        <input v-model="input" @keyup.enter="handleSend" placeholder="描述路线：起点、终点、偏好..." :disabled="isStreaming" />
        <button @click="handleSend" :disabled="isStreaming || !input.trim()">发送</button>
      </div>
    </div>

    <!-- 右侧地图区 -->
    <div class="map-container" id="map"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { useChatStore } from '@/stores/chat'
import { useQwenStream } from '@/composables/useQwenStream'

// 1. 状态与 Hooks
const chatStore = useChatStore()
const { rawText, isStreaming, error, parsedRoute, send } = useQwenStream()

const input = ref('')
const chatHistory = ref([]) // 仅用于 UI 显示的过滤后列表

// 2. 地图初始化
let map = null
let polyline = null
let markers = []

onMounted(async () => {
  // ✅ 1. 安全配置
  window._AMapSecurityConfig = {
    securityJsCode: '\tbed352b2945874299612a0993901b377'  // ← 替换为真实值
  }

  try {
    // ✅ 2. 加载地图（Key 加引号）
    const AMap = await AMapLoader.load({
      key: 'a3b52b1c223ab8708ce8a4a7dc207c85',
      version: '2.0',
      plugins: ['AMap.Polyline', 'AMap.Marker', 'AMap.InfoWindow']
    })

    // ✅ 3. 初始化地图（山东中心）
    map = new AMap.Map('map', {
      zoom: 7,
      center: [117.02, 36.66],
      mapStyle: 'amap://styles/light'
    })

    console.log('✅ 地图初始化成功')
  } catch (err) {
    console.error('❌ 地图加载失败:', err)
    error.value = '地图加载失败，请检查 Key 和网络'
  }
})

// 3. 监听解析结果 -> 自动画线
watch(parsedRoute, (route) => {
  if (!map || !route?.segments) return

  // 清理旧图层
  if (polyline) map.remove(polyline)
  markers.forEach(m => map.remove(m))
  markers = []

  const path = []
  route.segments.forEach(seg => {
    if (!seg.from_coord || !seg.to_coord) return
    path.push(new AMap.LngLat(...seg.from_coord))
    path.push(new AMap.LngLat(...seg.to_coord))

    // 终点打点
    const marker = new AMap.Marker({
      position: seg.to_coord,
      map,
      label: { content: seg.to, offset: [0, 10] }
    })
    markers.push(marker)
  })

  // 画线
  polyline = new AMap.Polyline({
    path,
    strokeColor: '#1677ff',
    strokeWeight: 6,
    isOutline: true,
    outlineColor: 'white',
    map
  })
  map.setFitView([polyline, ...markers])
})

// 4. 发送消息逻辑
async function handleSend() {
  if (!input.value.trim() || isStreaming.value) return
  const text = input.value
  input.value = ''

  // 更新 Store
  chatStore.addUserMessage(text)

  // 准备 UI 数据 (过滤掉 system prompt)
  updateChatHistory()

  // 发送请求
  await send(chatStore.messages)

  if (!error.value) {
    chatStore.addAssistantMessage(rawText.value)
    updateChatHistory()
  }
}

function updateChatHistory() {
  chatHistory.value = chatStore.messages.filter(m => m.role !== 'system')
}
</script>

<style scoped>
.layout { display: flex; height: 100vh; }
.chat-panel { width: 350px; display: flex; flex-direction: column; border-right: 1px solid #eee; background: #fff; }
.messages { flex: 1; overflow-y: auto; padding: 16px; }
.msg { padding: 10px 14px; margin: 8px 0; border-radius: 8px; font-size: 14px; line-height: 1.5; }
.msg.user { background: #e6f4ff; align-self: flex-end; text-align: right; margin-left: 20%; }
.msg.assistant { background: #f5f5f5; margin-right: 20%; white-space: pre-wrap; }
.input-area { padding: 12px; border-top: 1px solid #eee; display: flex; gap: 8px; }
input { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; outline: none; }
button { padding: 8px 16px; background: #1677ff; color: white; border: none; border-radius: 4px; cursor: pointer; }
button:disabled { background: #ccc; cursor: not-allowed; }
.map-container { flex: 1; }
.cursor { animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0; } }
.error-msg { color: red; margin: 10px; }
</style>
