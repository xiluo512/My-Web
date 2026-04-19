<template>
  <div class="city-page rizhao">
    <!-- 1. Hero 区域 -->
    <section class="rz-hero">
      <OceanParticles color="#ffd700" :density="150" :speed="2" />
      <!-- Canvas 光线动画 -->
      <canvas ref="rzCanvas" class="rz-canvas"></canvas>

      <!-- 动态标题 -->
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>

      <div class="scroll-hint">↓ 探索{{ data.name.replace('日照','') }}</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="rz-video-section">
      <div class="section-inner">
        <h2 class="section-title">城市映像</h2>
        <div class="video-wrapper">
          <VideoPlayer
            :src="data.videoSrc"
            :auto-play="false"
            @play="onVideoPlay"
            @end="onVideoEnd"
          />
        </div>
        <p class="video-desc">{{ data.videoDesc }}</p>
      </div>
    </section>

    <!-- 3. 景点卡片 -->
    <section class="rz-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="rz-grid">
        <div class="rz-card" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 美食区块 -->
    <section class="rz-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="rz-food-list">
        <div class="food-item" v-for="item in data.food" :key="item.name">
          <span class="food-icon">🍜</span>
          <div class="food-info">
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
import OceanParticles from '@/components/OceanParticles.vue'
const CITY_CODE = 'Rizhao'
const data = citiesData[CITY_CODE]

const rzCanvas = ref(null)
let anim = null
let handleResize = null

const initCanvas = () => {
  const canvas = rzCanvas.value
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

  const rays = Array.from({ length: 12 }, (_, i) => ({
    a: i * (Math.PI * 2 / 12),
    l: Math.random() * 200 + 100
  }))

  const draw = () => {
    if (!canvas.isConnected) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'rgba(253,224,71,0.15)'  // 降低透明度
    ctx.lineWidth = 1.5
    rays.forEach(ray => {
      ray.a += 0.002
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.lineTo(
        canvas.width / 2 + Math.cos(ray.a) * ray.l,
        canvas.height / 2 + Math.sin(ray.a) * ray.l
      )
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

const onVideoPlay = () => {
  console.log(`🎬 ${data.name}视频开始播放`)
}

const onVideoEnd = () => {
  console.log(`🎬 ${data.name}视频播放结束`)
}
</script>

<style scoped>
/* ========== 日照样式（修复版） ========== */
.rizhao {
  --primary: #fde047; /* 日照黄 */
  --bg-dark: #0a0f0a;
  --text-light: #e2e8f0;

  background: #fafdfadf;
  color: #1a2010;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Hero 区域 - 修复层级问题 */
.rz-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0f0a 0%, #1a2010 50%, #0f140f 100%),
    radial-gradient(circle at 50% 20%, rgba(253,224,71,0.08) 0%, transparent 50%);
  position: relative;
  overflow: hidden;
}

/* Canvas 光线动画 - 修复 z-index */
.rz-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;  /* 降低透明度，避免遮挡文字 */
  z-index: 1;    /* 确保在文字下层 */
  pointer-events: none;  /* 不阻挡点击 */
}

/* 标题 - 提高 z-index 和对比度 */
.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: #fde047;  /* 明亮的黄色 */
  z-index: 2;      /* 确保在最上层 */
  letter-spacing: 0.15em;
  text-shadow: 0 4px 20px rgba(253,224,71,0.4),  /* 增强阴影 */
               0 0 40px rgba(253,224,71,0.2);
  margin-bottom: 16px;
  font-weight: 700;
  position: relative;
}

/* 副标题 */
.hero-sub {
  color: #cbd5e1;
  font-size: 20px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 8px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

/* 滚动提示 */
.scroll-hint {
  position: absolute;
  bottom: 40px;
  color: var(--primary);
  opacity: 0.8;
  animation: bounce 2s infinite;
  z-index: 2;
  font-size: 14px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
}

/* 视频区域 */
.rz-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #161b16;
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
  display: inline-block;
  position: relative;
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
  border: 2px solid var(--primary);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(253,224,71,0.1);
}

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
}

.video-desc {
  margin-top: 30px;
  color: #94a3b8;
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* 景点区域 */
.rz-grid-section {
  padding: 100px 20px;
  background: #0a0f0a;
  text-align: center;
}

.dark-title {
  color: var(--primary);
}

.dark-title::after {
  background: var(--primary);
}

.rz-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.rz-card {
  background: #161b16;
  border-top: 4px solid var(--primary);
  padding: 28px;
  border-radius: 16px;
  transition: 0.3s;
  text-align: left;
  color: var(--text-light);
}

.rz-card:hover {
  box-shadow: 0 12px 24px rgba(253,224,71,0.15);
  transform: translateY(-4px);
}

.rz-card h3 {
  font-size: 20px;
  color: var(--primary);
  margin-bottom: 10px;
}

.rz-card p {
  color: #cbd5e1;
  line-height: 1.6;
}

/* 美食区块 */
.rz-food-section {
  padding: 80px 20px;
  background: var(--bg-dark);
  text-align: center;
}

.rz-food-list {
  max-width: 900px;
  margin: 50px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.food-item {
  flex: 1 1 300px;
  background: rgba(253,224,71,0.1);
  border: 1px solid rgba(253,224,71,0.3);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
  transition: 0.3s;
}

.food-item:hover {
  border-color: var(--primary);
  box-shadow: 0 5px 15px rgba(253,224,71,0.2);
}

.food-icon {
  font-size: 28px;
  line-height: 1;
}

.food-info h4 {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 18px;
}

.food-info p {
  margin: 0;
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
}
</style>