<template>
  <div class="layout">
    <div class="chat-panel">
      <h3>AI 行程助手</h3>
      <p class="desc">填写关键条件，生成结构化山东旅行计划</p>

      <form class="planner-form" @submit.prevent="handleGenerate">
        <label>
          出发地
          <input v-model.trim="form.departure" placeholder="例如：济南" required />
        </label>
        <label>
          天数
          <input v-model.number="form.days" type="number" min="1" max="15" required />
        </label>
        <label>
          预算（元）
          <input v-model.number="form.budget" type="number" min="0" required />
        </label>
        <label>
          旅行风格
          <select v-model="form.travelStyle">
            <option>休闲</option>
            <option>深度</option>
            <option>亲子</option>
            <option>美食优先</option>
          </select>
        </label>
        <label>
          偏好（逗号分隔）
          <input v-model.trim="interestsText" placeholder="例如：美食,古城,自然风光" />
        </label>
        <label>
          备注
          <textarea v-model.trim="form.notes" rows="2" placeholder="例如：不想太赶，尽量地铁可达" />
        </label>

        <button type="submit" :disabled="isLoading">{{ isLoading ? '生成中...' : '生成行程' }}</button>
      </form>

      <div v-if="error" class="error-msg">⚠️ {{ error }}</div>

      <div v-if="plan" class="result">
        <h4>{{ plan.summary }}</h4>
        <p class="budget">{{ plan.budget_estimate }}</p>
        <button class="save-btn" @click="savePlan" :disabled="isSaving">
          {{ isSaving ? '保存中...' : '保存到个人中心' }}
        </button>
        <div class="day-list">
          <div class="day-card" v-for="day in plan.days" :key="day.day">
            <div class="day-title">Day {{ day.day }} - {{ day.title }}</div>
            <div class="line">路线：{{ day.route.join(' → ') }}</div>
            <div class="line">美食：{{ day.food.join('、') }}</div>
            <div class="line note">提示：{{ day.notes }}</div>
          </div>
        </div>
        <ul class="tips">
          <li v-for="(tip, idx) in plan.tips" :key="idx">{{ tip }}</li>
        </ul>
      </div>
    </div>

    <div class="map-container" id="map"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
const isLoading = ref(false)
const error = ref('')
const plan = ref(null)
const isSaving = ref(false)
const interestsText = ref('')
const form = ref({
  departure: '',
  days: 3,
  budget: 2000,
  travelStyle: '休闲',
  notes: ''
})

let map = null
let polyline = null
let markers = []
let AMapRef = null
let geocoder = null

const cityCoordMap = {
  济南: [117.1201, 36.6512],
  青岛: [120.3826, 36.0671],
  淄博: [118.055, 36.8131],
  枣庄: [117.323, 34.8107],
  东营: [118.6751, 37.4348],
  烟台: [121.4479, 37.4638],
  潍坊: [119.1618, 36.7068],
  济宁: [116.5872, 35.4154],
  泰安: [117.0876, 36.2003],
  威海: [122.1205, 37.5131],
  日照: [119.527, 35.4164],
  临沂: [118.3564, 35.1047],
  德州: [116.3593, 37.4365],
  聊城: [115.9855, 36.4558],
  滨州: [117.9707, 37.3835],
  菏泽: [115.4697, 35.2465]
}

onMounted(async () => {
  window._AMapSecurityConfig = {
    securityJsCode: '\tbed352b2945874299612a0993901b377'
  }

  try {
    AMapRef = await AMapLoader.load({
      key: 'a3b52b1c223ab8708ce8a4a7dc207c85',
      version: '2.0',
      plugins: ['AMap.Polyline', 'AMap.Marker', 'AMap.Geocoder']
    })
    map = new AMapRef.Map('map', {
      zoom: 7,
      center: [117.02, 36.66],
      mapStyle: 'amap://styles/light'
    })
    geocoder = new AMapRef.Geocoder({ city: '山东' })
  } catch (err) {
    error.value = '地图加载失败，请检查 Key 和网络'
  }
})

const geocodePoint = (name) => new Promise((resolve) => {
  if (!geocoder || !name) return resolve(null)
  geocoder.getLocation(name, (status, result) => {
    if (status === 'complete' && result.geocodes?.length) {
      const loc = result.geocodes[0].location
      resolve([loc.lng, loc.lat])
    } else {
      resolve(null)
    }
  })
})

watch(plan, async (newPlan) => {
  if (!map || !newPlan?.days || !AMapRef) return

  if (polyline) map.remove(polyline)
  markers.forEach(m => map.remove(m))
  markers = []

  const path = []
  for (const day of newPlan.days) {
    for (const pointName of day.route || []) {
      let point = cityCoordMap[pointName]
      if (!point) point = await geocodePoint(`山东${pointName}`)
      if (!point) continue
      path.push(new AMapRef.LngLat(point[0], point[1]))
      const marker = new AMapRef.Marker({
        position: point,
        map,
        label: { content: pointName, offset: [0, 10] }
      })
      markers.push(marker)
    }
  }

  if (path.length >= 2) {
    polyline = new AMapRef.Polyline({
      path,
      strokeColor: '#1677ff',
      strokeWeight: 5,
      isOutline: true,
      outlineColor: '#ffffff',
      map
    })
    map.setFitView([polyline, ...markers])
  }
})

async function handleGenerate() {
  if (isLoading.value) return
  isLoading.value = true
  error.value = ''

  try {
    const response = await fetch(`${apiBase}/api/trip/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        departure: form.value.departure,
        days: form.value.days,
        budget: form.value.budget,
        interests: interestsText.value
          .split(',')
          .map(item => item.trim())
          .filter(Boolean),
        travel_style: form.value.travelStyle,
        notes: form.value.notes
      })
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.detail || '生成失败，请稍后重试')
    }
    plan.value = data.plan
  } catch (err) {
    error.value = err.message || '生成失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

async function savePlan() {
  const username = localStorage.getItem('username')
  if (!username) {
    error.value = '请先登录后再保存行程'
    return
  }
  if (!plan.value) return

  isSaving.value = true
  try {
    const response = await fetch(`${apiBase}/api/trip/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        title: `${form.value.departure}${form.value.days}天行程`,
        plan: plan.value
      })
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.detail || '保存失败')
    }
    alert('已保存到个人中心')
  } catch (err) {
    error.value = err.message || '保存失败，请稍后重试'
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.layout { display: flex; height: 100vh; }
.chat-panel { width: 420px; overflow-y: auto; border-right: 1px solid #eee; background: #fff; padding: 16px; }
.desc { margin: 0 0 12px; color: #666; font-size: 13px; }
.planner-form { display: grid; gap: 10px; }
label { font-size: 13px; color: #444; display: grid; gap: 6px; }
input, select, textarea { width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 6px; outline: none; font-size: 14px; }
button { padding: 10px; background: #1677ff; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
button:disabled { background: #a0c4ff; cursor: not-allowed; }
.error-msg { margin-top: 12px; color: #d9363e; }
.result { margin-top: 16px; }
.budget { color: #555; font-size: 13px; margin: 6px 0 10px; }
.save-btn { width: 100%; margin-bottom: 10px; background: #36a269; }
.day-list { display: grid; gap: 10px; }
.day-card { border: 1px solid #e9e9e9; border-radius: 8px; padding: 10px; background: #fafafa; }
.day-title { font-weight: 700; margin-bottom: 6px; }
.line { font-size: 13px; color: #444; margin: 4px 0; }
.line.note { color: #555; }
.tips { margin: 10px 0 0; padding-left: 16px; color: #444; font-size: 13px; }
.map-container { flex: 1; min-width: 0; }
</style>
