<template>
  <div class="city-page taian">
    <!-- 1. Hero 区域 -->
    <section class="ta-hero">
      <div class="ta-mtn"></div>
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>
      <div class="scroll-hint">↓ 登高望远</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="ta-video-section">
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
    <section class="ta-steps-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="ta-steps">
        <div class="ta-step" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 美食区块 -->
    <section class="ta-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="ta-food-list">
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

const CITY_CODE = 'Taian'
const data = citiesData[CITY_CODE]

const onVideoPlay = () => {
  console.log(`🎬 ${data.name}视频开始播放`)
}

const onVideoEnd = () => {
  console.log(`🎬 ${data.name}视频播放结束`)
}
</script>

<style scoped>
/* ========== 泰安原有样式保留 ========== */
.taian {
  --primary: #b45309;
  --bg-dark: #1c1917;
  --text-light: #e7e5e4;
  background: var(--bg-dark);
  color: var(--text-light);
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.ta-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 30%, #292524, #1c1917);
  position: relative;
  overflow: hidden;
}

.ta-mtn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(to top, #44403c, transparent);
  clip-path: polygon(0% 100%, 30% 40%, 60% 70%, 100% 30%);
  opacity: 0.3;
  z-index: 1;
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--primary);
  letter-spacing: 0.3em;
  z-index: 2;
  margin-bottom: 16px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.hero-sub {
  color: #d6d3d1;
  font-size: 20px;
  letter-spacing: 0.4em;
  z-index: 2;
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
.ta-video-section {
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
  border: 2px solid var(--primary);
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
.ta-steps-section {
  padding: 100px 20px;
  background: #292524;
  text-align: center;
}

.dark-title {
  color: var(--text-light);
}

.dark-title::after {
  background: var(--primary);
}

.ta-steps {
  max-width: 800px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.ta-step {
  padding: 28px;
  border-left: 3px solid #d6d3d1;
  background: #1c1917;
  border-radius: 0 12px 12px 0;
  position: relative;
  text-align: left;
  transition: 0.3s;
}

.ta-step::before {
  content: "";
  position: absolute;
  left: -10px;
  top: 28px;
  width: 14px;
  height: 14px;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary);
}

.ta-step:hover {
  transform: translateX(10px);
  border-left-color: var(--primary);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.ta-step h3 {
  font-size: 20px;
  color: var(--primary);
  margin-bottom: 8px;
}

.ta-step p {
  color: #a8a29e;
  line-height: 1.6;
}

/* 美食区块 */
.ta-food-section {
  padding: 80px 20px;
  background: var(--bg-dark);
  text-align: center;
}

.ta-food-list {
  max-width: 900px;
  margin: 50px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.food-item {
  flex: 1 1 300px;
  background: rgba(180,83,9,0.1);
  border: 1px solid rgba(180,83,9,0.3);
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
  box-shadow: 0 5px 15px rgba(180,83,9,0.2);
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
  color: #a8a29e;
  font-size: 14px;
  line-height: 1.6;
}
</style>