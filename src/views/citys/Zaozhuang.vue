<template>
  <div class="city-page zaozhuang">
    <!-- 1. Hero 区域 -->
    <section class="zz-hero">
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>
      <div class="scroll-hint">↓ 探索古城</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="zz-video-section">
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
    <section class="zz-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="zz-grid">
        <div class="zz-item" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 美食区块 -->
    <section class="zz-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="zz-food-list">
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

const CITY_CODE = 'Zaozhuang'
const data = citiesData[CITY_CODE]

const onVideoPlay = () => console.log(`🎬 ${data.name}视频播放`)
const onVideoEnd = () => console.log(`🎬 ${data.name}视频结束`)
</script>

<style scoped>
.zaozhuang {
  --primary: #556b2f;
  --accent: #dc143c;
  --bg-dark: #0f1a15;
  --text-light: #e2e8f0;

  background: var(--bg-dark);
  color: var(--text-light);
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.zz-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: radial-gradient(ellipse at 50% 100%, rgba(85,107,47,0.25) 0%, transparent 60%),
    repeating-linear-gradient(90deg, rgba(47,79,79,0.15) 0px, rgba(47,79,79,0.15) 1px, transparent 1px, transparent 18px),
    linear-gradient(180deg, #0f1a15, #1a2a20);
  overflow: hidden;
}
.zz-hero::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(90deg, var(--primary), var(--accent), var(--primary));
  filter: blur(2px);
  opacity: 0.6;
  z-index: 1;
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--text-light);
  z-index: 2;
  letter-spacing: 0.15em;
  margin-bottom: 16px;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.hero-sub {
  color: #94a3b8;
  margin: 8px 0 32px;
  letter-spacing: 0.5em;
  z-index: 2;
  font-size: 20px;
}
.scroll-hint {
  position: absolute;
  bottom: 40px;
  color: var(--accent);
  opacity: 0.8;
  animation: bounce 2s infinite;
  z-index: 2;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
}

/* 视频区域 */
.zz-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a2a20;
  padding: 80px 20px;
}
.section-inner { max-width: 1000px; width: 100%; text-align: center; }
.section-title {
  font-size: 36px;
  color: var(--primary);
  margin-bottom: 40px;
  letter-spacing: 0.2em;
  display: inline-block;
  position: relative;
}
.section-title::after {
  content: ''; display: block; width: 60px; height: 3px; background: var(--accent); margin: 15px auto 0;
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
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: #94a3b8; font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.zz-grid-section { padding: 100px 20px; background: var(--bg-dark); text-align: center; }
.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--accent); }

.zz-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.zz-item {
  padding: 28px;
  background: rgba(47,79,79,0.4);
  border: 1px solid var(--primary);
  border-radius: 4px;
  transition: 0.3s;
  position: relative;
  overflow: hidden;
  text-align: left;
}
.zz-item::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent);
}
.zz-item:hover {
  background: rgba(47,79,79,0.6);
  transform: scale(1.03);
  box-shadow: 0 12px 24px rgba(220, 20, 60, 0.2);
}
.zz-item h3 { font-size: 20px; color: var(--text-light); margin-bottom: 10px; }
.zz-item p { color: #cbd5e1; line-height: 1.6; }

/* 美食区块 */
.zz-food-section { padding: 80px 20px; background: var(--bg-dark); text-align: center; }
.zz-food-list { max-width: 900px; margin: 50px auto 0; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }

.food-item {
  flex: 1 1 300px;
  background: rgba(85,107,47,0.2);
  border: 1px solid var(--primary);
  border-radius: 4px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
  transition: 0.3s;
  position: relative;
  overflow: hidden;
}

.food-item::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent);
}

.food-item:hover { background: rgba(47,79,79,0.6); transform: scale(1.03); box-shadow: 0 12px 24px rgba(220, 20, 60, 0.2); }
.food-icon { font-size: 28px; line-height: 1; }
.food-info h4 { margin: 0 0 8px; color: var(--text-light); font-size: 18px; }
.food-info p { margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.6; }
</style>