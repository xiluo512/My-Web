<template>
  <div class="city-page zibo">
    <!-- 1. Hero 区域 -->
    <section class="zb-hero">
      <div class="zb-kiln"></div>
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>
      <div class="scroll-hint">↓ 探索瓷都</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="zb-video-section">
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
    <section class="zb-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="zb-grid">
        <div class="zb-card" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 美食区块 -->
    <section class="zb-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="zb-food-list">
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
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import citiesData from '@/data/citiesData.js'

const CITY_CODE = 'Zibo'
const data = citiesData[CITY_CODE]

const onVideoPlay = () => {
  console.log(`🎬 ${data.name}视频开始播放`)
}

const onVideoEnd = () => {
  console.log(`🎬 ${data.name}视频播放结束`)
}
</script>

<style scoped>
.zibo {
  --primary: #B22222;
  --accent: #FFD700;
  --bg-warm: #1a0f0f;
  --text-light: #f5e6d3;
  --text-muted: #d4b896;

  background: var(--bg-warm);
  color: var(--text-light);
  font-family: "KaiTi", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.zb-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: radial-gradient(ellipse at 50% 70%, #4a2015 0%, #1a0f0f 60%),
    repeating-linear-gradient(45deg, rgba(255,200,150,0.03) 0px, transparent 1px, transparent 8px);
  overflow: hidden;
}

.zb-kiln {
  width: 140px;
  height: 140px;
  border: 3px solid #5a2a2a;
  border-radius: 50%;
  animation: zb-spin 8s linear infinite;
  box-shadow: 0 0 40px rgba(180,80,30,0.4);
  margin-bottom: 20px;
  z-index: 1;
  position: relative;
}
.zb-kiln::before {
  content: "";
  position: absolute;
  inset: 10px;
  border: 2px dashed #8a4a3a;
  border-radius: 50%;
  animation: zb-spin 5s linear infinite reverse;
}

@keyframes zb-spin {
  to { transform: rotate(360deg); }
}

.hero-title {
  font-size: clamp(40px, 7vw, 72px);
  color: var(--accent);
  letter-spacing: 0.2em;
  z-index: 2;
  margin-bottom: 8px;
  text-shadow: 0 4px 16px rgba(0,0,0,0.5);
}

.hero-sub {
  color: var(--text-light);
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 8px;
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

/* 视频区域 */
.zb-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2c1810;
  padding: 80px 20px;
}
.section-inner { max-width: 1000px; width: 100%; text-align: center; }
.section-title {
  font-size: 36px;
  color: var(--accent);
  margin-bottom: 40px;
  letter-spacing: 0.2em;
  display: inline-block;
  position: relative;
}
.section-title::after {
  content: ''; display: block; width: 60px; height: 3px; background: var(--primary); margin: 15px auto 0;
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
  box-shadow: 0 0 30px rgba(178, 34, 34, 0.3);
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: var(--text-muted); font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.zb-grid-section { padding: 100px 20px; background: var(--bg-warm); text-align: center; }
.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--accent); }

.zb-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.zb-card {
  background: rgba(60,30,20,0.7);
  border: 1px solid rgba(180,80,30,0.3);
  backdrop-filter: blur(8px);
  padding: 28px;
  border-radius: 16px;
  transition: all 0.3s ease;
  text-align: left;
  color: var(--text-light);
}
.zb-card:hover {
  transform: translateY(-6px) rotate(-1deg);
  box-shadow: 0 16px 32px rgba(180,80,30,0.3);
  border-color: var(--accent);
}
.zb-card h3 { font-size: 20px; color: var(--accent); margin-bottom: 10px; }
.zb-card p { color: var(--text-muted); line-height: 1.6; font-size: 15px; }

/* 美食区块 */
.zb-food-section { padding: 80px 20px; background: var(--bg-warm); text-align: center; }
.zb-food-list { max-width: 900px; margin: 50px auto 0; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }

.food-item {
  flex: 1 1 300px;
  background: rgba(60,30,20,0.7);
  border: 1px solid rgba(180,80,30,0.3);
  backdrop-filter: blur(8px);
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
  transition: 0.3s;
  border-radius: 16px;
}

.food-item:hover {
  transform: rotate(-1deg);
  box-shadow: 0 16px 32px rgba(180,80,30,0.3);
  border-color: var(--accent);
}
.food-icon { font-size: 28px; line-height: 1; }
.food-info h4 { margin: 0 0 8px; color: var(--accent); font-size: 18px; }
.food-info p { margin: 0; color: var(--text-muted); font-size: 14px; line-height: 1.6; }
</style>