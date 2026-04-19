<template>
  <div class="city-page linyi">
    <!-- 1. Hero 区域 -->
    <section class="ly-hero">
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>
      <div class="scroll-hint">↓ 探索沂蒙</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="ly-video-section">
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
    <section class="ly-abs-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="ly-abs">
        <div class="ly-card" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 美食区块 -->
    <section class="ly-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="ly-food-list">
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

const CITY_CODE = 'Linyi'
const data = citiesData[CITY_CODE]

const onVideoPlay = () => {
  console.log(`🎬 ${data.name}视频开始播放`)
}

const onVideoEnd = () => {
  console.log(`🎬 ${data.name}视频播放结束`)
}
</script>

<style scoped>
/* ========== 临沂原有样式保留 ========== */
.linyi {
  --primary: #B22222;
  --bg-dark: #1a0f0a;
  --text-light: #fefce8;
  background: #a06148db;
  color: var(--text-light);
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.ly-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(180deg, rgba(26,15,10,0.9) 0%, rgba(26,15,10,0.6) 100%);
}

.ly-hero::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(135deg, #1a0f0a 0%, #1a0f0a 40%, transparent 40%),
    linear-gradient(145deg, #1a0f0a 0%, #1a0f0a 50%, transparent 50%),
    linear-gradient(125deg, #1a0f0a 0%, #1a0f0a 35%, transparent 35%);
  clip-path: polygon(0% 100%, 10% 40%, 25% 80%, 40% 30%, 55% 70%, 70% 20%, 85% 60%, 100% 10%);
  filter: blur(1px);
  opacity: 0.4;
  animation: ly-mtn 15s infinite alternate;
  z-index: 1;
}

@keyframes ly-mtn {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: #fecaca;
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
  margin-bottom: 16px;
}

.hero-sub {
  color: #fde68a;
  z-index: 2;
  font-size: 20px;
  letter-spacing: 0.4em;
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  color: var(--primary);
  opacity: 0.8;
  animation: bounce 2s infinite;
  z-index: 2;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
}

/* 视频区域 */
.ly-video-section {
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
  border: 2px solid #555;
  border-radius: 4px;
  overflow: hidden;
}

:deep(.video-player) {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
}

:deep(.video-container) {
  width: 100% !important;
  height: 100% !important;
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
.ly-abs-section {
  padding: 100px 20px;
  background: rgba(26,15,10,0.8);
  text-align: center;
}

.dark-title {
  color: var(--text-light);
}

.dark-title::after {
  background: var(--primary);
}

.ly-abs {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.ly-card {
  padding: 24px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(153,27,27,0.3);
  backdrop-filter: blur(4px);
  transition: 0.3s;
  text-align: left;
}

.ly-card:hover {
  background: rgba(255,255,255,0.06);
  transform: translateY(-4px);
  border-color: var(--primary);
}

.ly-card h3 {
  font-size: 20px;
  color: #fde68a;
  margin-bottom: 10px;
}

.ly-card p {
  color: #cbd5e1;
  line-height: 1.6;
}

/* 美食区块 */
.ly-food-section {
  padding: 80px 20px;
  background: var(--bg-dark);
  text-align: center;
}

.ly-food-list {
  max-width: 900px;
  margin: 50px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.food-item {
  flex: 1 1 300px;
  background: rgba(178,34,34,0.1);
  border: 1px solid rgba(178,34,34,0.3);
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
  box-shadow: 0 5px 15px rgba(178,34,34,0.2);
}

.food-icon {
  font-size: 28px;
  line-height: 1;
}

.food-info h4 {
  margin: 0 0 8px;
  color: #fde68a;
  font-size: 18px;
}

.food-info p {
  margin: 0;
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
}
</style>