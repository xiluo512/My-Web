<template>
  <div class="city-page dongying">

    <!-- 1. 第一屏：Hero 区域（Canvas 动画 + 标题） -->
    <section class="dy-hero">
      <!-- Canvas 背景动画 -->
      <canvas ref="dyCanvas"></canvas>

      <h1 class="hero-title">东营</h1>
      <p class="hero-sub">黄河入海 · 湿地之肺</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索东营</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区（济南同款布局 + 东营深色风格） -->
    <section class="dy-video-section">
      <div class="section-inner">
        <h2 class="section-title">城市映像</h2>
        <div class="video-wrapper">
          <VideoPlayer
            :src="videoSrc"
            :auto-play="false"
            @play="onVideoPlay"
            @end="onVideoEnd"
            @error="onVideoError"
          />
        </div>
        <p class="video-desc">黄河入海流，感受生态与工业的交响</p>
      </div>
    </section>

    <!-- 3. 第三屏：景点网格卡片 -->
    <section class="dy-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="dy-grid">
        <div class="dy-card"><h3>🌊 黄河口生态区</h3><p>黄蓝交汇最年轻的土地，红地毯湿地。</p></div>
        <div class="dy-card"><h3>🦢 东方白鹳故乡</h3><p>候鸟驿站生机盎然，万鸟翔集。</p></div>
        <div class="dy-card"><h3>🛢️ 胜利油田展馆</h3><p>荒原油城崛起史，石油文化的摇篮。</p></div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

// --- Canvas 动画逻辑（保留东营特色） ---
const dyCanvas = ref(null)
let anim = null
let handleResize = null

const initCanvas = () => {
  const canvas = dyCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  const resize = () => {
    const p = canvas.parentElement
    if (p) {
      canvas.width = p.offsetWidth
      canvas.height = p.offsetHeight
    }
  }
  handleResize = resize
  resize()

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    v: Math.random() * 1.2 + 0.3
  }))

  const draw = () => {
    if (!canvas.isConnected) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'
    ctx.lineWidth = 1
    particles.forEach(p => {
      p.x += p.v
      p.y += Math.sin(p.x * 0.015) * 0.6
      if (p.x > canvas.width) p.x = 0
      ctx.beginPath()
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
      ctx.stroke()
    })
    anim = requestAnimationFrame(draw)
  }
  draw()
}

onMounted(() => {
  initCanvas()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (anim) cancelAnimationFrame(anim)
  if (handleResize) window.removeEventListener('resize', handleResize)
})

// --- 视频逻辑（济南同款结构） ---
const cityCode = 'dongying'
// 先用在线测试视频，本地视频准备好后改成 `/video/${cityCode}.mp4`

 const videoSrc = `/video/${cityCode}.mp4`  // ← 本地视频用这行

const onVideoPlay = () => {
  console.log('🎬 东营视频开始播放')
}

const onVideoEnd = () => {
  console.log('🎬 东营视频播放结束')
}

const onVideoError = (e) => {
  console.error('❌ 视频错误:', e)
}
</script>

<style scoped>
/* ========== 东营主题变量（保持原有风格） ========== */
.dongying {
  --primary: #0ea5e9;    /* 东营蓝 */
  --accent: #b45309;     /* 石油金/橙 */
  --bg-dark: #0b1120;    /* 深色背景 */
  --bg-light: #111827;   /* 稍亮深色 */
  --text-light: #f8fafc;

  background: var(--bg-dark);
  color: var(--text-light);
  font-family: "KaiTi", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ================= 1. Hero 首屏区域（保留 Canvas 动画） ================= */
.dy-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* 东营特有渐变：深蓝 + 石油金 */
  background-image: linear-gradient(105deg, #0c1929 0%, #1a3040 38%, #b45309 38.5%, #8a3a0a 100%),
    radial-gradient(circle at 40% 45%, rgba(30,64,175,0.3) 0%, transparent 50%),
    radial-gradient(circle at 60% 55%, rgba(245,158,11,0.25) 0%, transparent 45%);
}

/* Canvas 粒子动画层 */
.dy-hero canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
  opacity: 0.6;
  z-index: 1;
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  margin-bottom: 16px;
  color: #fff;
}

.hero-sub {
  color: #cbd5e1;
  z-index: 2;
  margin-top: 8px;
  font-size: 20px;
  letter-spacing: 0.4em;
}

/* 滚动提示动画 */
.scroll-hint {
  position: absolute;
  bottom: 40px;
  color: var(--primary);
  opacity: 0.8;
  animation: bounce 2s infinite;
  font-size: 14px;
  z-index: 2;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
}

@keyframes jn-r {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
}

/* ================= 2. 视频独立区域（济南布局 + 东营风格） ================= */
.dy-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);  /* ✅ 保持东营深色背景 */
  padding: 80px 20px;
}

.section-inner {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 36px;
  color: var(--primary);  /* ✅ 东营蓝标题 */
  margin-bottom: 40px;
  letter-spacing: 0.2em;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--primary);
  margin: 15px auto 0;
}

/* 视频容器 - 济南同款尺寸，东营同款深色 */
.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #000;        /* ✅ 视频区域纯黑背景 */
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
}

/* 穿透样式：让 VideoPlayer 组件填满容器 */
:deep(.video-player) {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
}

:deep(.video-container) {
  width: 100% !important;
  height: 100% !important;
  border-radius: 0 !important;
  background: #000 !important;
}

:deep(.video-container video) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-desc {
  margin-top: 30px;
  color: #94a3b8;  /* ✅ 浅灰色文字，适配深色背景 */
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 卡片网格区域（保持东营毛玻璃风格） ================= */
.dy-grid-section {
  padding: 100px 20px;
  background: var(--bg-light);
  text-align: center;
}

.dark-title {
  color: var(--text-light);
}

.dark-title::after {
  background: var(--accent);  /* ✅ 金色下划线，东营特色 */
}

.dy-grid {
  max-width: 1100px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

/* 东营特色卡片：毛玻璃 + 蓝色顶边框 */
.dy-card {
  padding: 40px 30px;
  background: rgba(30, 41, 59, 0.5);  /* ✅ 半透明深蓝 */
  border-top: 4px solid var(--primary);
  border-radius: 12px;
  backdrop-filter: blur(10px);         /* ✅ 毛玻璃效果 */
  transition: all 0.4s ease;
  text-align: left;
  color: #e2e8f0;
}

.dy-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
  border-top-color: var(--accent);  /* ✅ 悬停变石油金 */
}

.dy-card h3 {
  font-size: 22px;
  margin-bottom: 12px;
  color: #fff;
}

.dy-card p {
  color: #94a3b8;
  line-height: 1.8;
  font-size: 16px;
}
</style>