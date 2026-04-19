<template>
  <div class="city-page dongying">

    <!-- 1. 第一屏：Hero 区域（Canvas 动画 + 标题） -->
    <section class="dy-hero">
      <!-- Canvas 背景动画 -->
      <canvas ref="dyCanvas"></canvas>

      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索东营</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区 -->
    <section class="dy-video-section">
      <div class="section-inner">
        <h2 class="section-title">城市映像</h2>
        <div class="video-wrapper">
          <VideoPlayer
            :src="data.videoSrc"
            :auto-play="false"
            @play="onVideoPlay"
            @end="onVideoEnd"
            @error="onVideoError"
          />
        </div>
        <p class="video-desc">黄河入海流，感受生态与工业的交响</p>
      </div>
    </section>

    <!-- 3. 第三屏：景点网格卡片（动态数据渲染） -->
    <section class="dy-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="dy-grid">
        <div class="dy-card" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 第四屏：毛玻璃美食列表（新增，风格统一） -->
    <section class="dy-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="dy-food-list">
        <div class="dy-food-item" v-for="item in data.food" :key="item.name">
          <span class="dy-food-icon">🦀</span>
          <div class="dy-food-info">
            <h4>{{ item.name }}</h4>
            <p>{{ item.reason }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import citiesData from '@/data/citiesData.js'

// 🔑 核心：绑定城市代码，自动读取配置
const CITY_CODE = 'Dongying'
const data = citiesData[CITY_CODE]

// --- Canvas 动画逻辑（100% 保留东营特色） ---
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

// --- 视频逻辑 ---
const onVideoPlay = () => console.log('🎬 东营视频开始播放')
const onVideoEnd = () => console.log('🎬 东营视频播放结束')
const onVideoError = (e) => console.error('❌ 视频错误:', e)
</script>

<style scoped>
/* ========== 东营主题变量（深蓝 + 石油金） ========== */
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

/* ================= 2. 视频独立区域 ================= */
.dy-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
  padding: 80px 20px;
}

.section-inner {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 36px;
  color: var(--primary);
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

.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #000;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
}

:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; display: block; }

.video-desc {
  margin-top: 30px;
  color: #94a3b8;
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 卡片网格区域（保留毛玻璃风格） ================= */
.dy-grid-section {
  padding: 100px 20px;
  background: var(--bg-light);
  text-align: center;
}

.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--accent); }

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
  background: rgba(30, 41, 59, 0.5);
  border-top: 4px solid var(--primary);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  text-align: left;
  color: #e2e8f0;
  min-height: 160px;
}

.dy-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
  border-top-color: var(--accent);
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

/* ================= 4. 毛玻璃美食区域（新增） ================= */
.dy-food-section {
  padding: 100px 20px;
  background: var(--bg-dark);
  text-align: center;
}

.dy-food-list {
  max-width: 1000px;
  margin: 60px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

/* 美食卡片沿用毛玻璃，但用金色顶边框区分 */
.dy-food-item {
  flex: 1 1 300px;
  padding: 24px 20px;
  background: rgba(30, 41, 59, 0.5);
  border-top: 4px solid var(--accent); /* 金色顶边框 */
  border-radius: 12px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-align: left;
  color: #e2e8f0;
  transition: 0.3s;
}

.dy-food-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(180, 83, 9, 0.2);
  background: rgba(45, 55, 72, 0.6);
}

.dy-food-icon {
  font-size: 28px;
  line-height: 1;
  background: rgba(14, 165, 233, 0.1);
  padding: 8px;
  border-radius: 50%;
}

.dy-food-info h4 {
  margin: 0 0 6px;
  color: #fff;
  font-size: 18px;
}

.dy-food-info p {
  margin: 0;
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
}
</style>
