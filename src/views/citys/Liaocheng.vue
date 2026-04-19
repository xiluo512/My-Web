<template>
  <div class="city-page liaocheng">
    <!-- 1. 第一屏：Hero 区域 -->
    <section class="lc-hero">
      <div class="lc-water"></div>
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>
      <div class="scroll-hint">↓ 探索{{ data.name.replace('江北','') }}</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区 -->
    <section class="lc-video-section">
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
        <p class="video-desc">通过镜头，感受{{ data.name }}的水韵与古韵</p>
      </div>
    </section>

    <!-- 3. 第三屏：景点网格卡片 -->
    <section class="lc-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="lc-grid">
        <div class="lc-card" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 美食区块 -->
    <section class="lc-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="lc-food-list">
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

const CITY_CODE = 'Liaocheng'
const data = citiesData[CITY_CODE]

const onVideoPlay = () => {
  console.log(`🎬 ${data.name}视频开始播放`)
}

const onVideoEnd = () => {
  console.log(`🎬 ${data.name}视频播放结束`)
}
</script>

<style scoped>
/* ========== 聊城原有样式保留 ========== */
.liaocheng {
  --primary: #0e7490;
  --bg-dark: #0e1a2e;
  --text-light: #e2e8f0;
  background: var(--bg-dark);
  color: var(--text-light);
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.lc-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(ellipse at 50% 80%, rgba(14,116,144,0.25) 0%, transparent 60%),
    linear-gradient(180deg, #0e1a2e 0%, #162a40 100%);
}

.lc-water {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: repeating-linear-gradient(0deg, transparent 0px, transparent 6px, rgba(14,116,144,0.06) 6px, rgba(14,116,144,0.06) 7px);
  animation: lc-ripple 6s infinite alternate;
  z-index: 1;
}

@keyframes lc-ripple {
  0% { transform: translateX(0) scaleY(1); }
  100% { transform: translateX(10px) scaleY(1.02); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: #67e8f9;
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 16px rgba(14,116,144,0.5);
  margin-bottom: 16px;
}

.hero-sub {
  color: #a5f3fc;
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
.lc-video-section {
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
  color: #67e8f9;
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
  background: #0e7490;
  margin: 15px auto 0;
}

.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #000;
  border: 2px solid #0e7490;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(14,116,144,0.3);
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
.lc-grid-section {
  padding: 100px 20px;
  background: #162a40;
  text-align: center;
}

.dark-title {
  color: #67e8f9;
}

.dark-title::after {
  background: #0e7490;
}

.lc-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.lc-card {
  padding: 28px;
  background: rgba(14,116,144,0.08);
  border: 1px solid rgba(14,116,144,0.25);
  border-radius: 16px;
  backdrop-filter: blur(6px);
  transition: 0.3s;
  text-align: left;
}

.lc-card:hover {
  background: rgba(14,116,144,0.15);
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(14,116,144,0.2);
  border-color: #67e8f9;
}

.lc-card h3 {
  font-size: 20px;
  color: #67e8f9;
  margin-bottom: 10px;
}

.lc-card p {
  color: #cbd5e1;
  line-height: 1.6;
}

/* 美食区块 */
.lc-food-section {
  padding: 80px 20px;
  background: var(--bg-dark);
  text-align: center;
}

.lc-food-list {
  max-width: 900px;
  margin: 50px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.food-item {
  flex: 1 1 300px;
  background: rgba(14,116,144,0.1);
  border: 1px solid rgba(14,116,144,0.3);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
  transition: 0.3s;
}

.food-item:hover {
  border-color: #67e8f9;
  box-shadow: 0 5px 15px rgba(14,116,144,0.2);
}

.food-icon {
  font-size: 28px;
  line-height: 1;
}

.food-info h4 {
  margin: 0 0 8px;
  color: #67e8f9;
  font-size: 18px;
}

.food-info p {
  margin: 0;
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
}
</style>