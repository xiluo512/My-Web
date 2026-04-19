<template>
  <div class="city-page yantai">
    <!-- 1. Hero 区域 -->
    <section class="yt-hero">
      <OceanParticles color="#add8e6" :density="80" :speed="1" />
      <div class="yt-orb"></div>
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>
      <div class="scroll-hint">↓ 探索仙境</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="yt-video-section">
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
    <section class="yt-masonry-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="yt-masonry">
        <div class="yt-card" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 美食区块 -->
    <section class="yt-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="yt-food-list">
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
import OceanParticles from '@/components/OceanParticles.vue'
const CITY_CODE = 'Yantai'
const data = citiesData[CITY_CODE]

const onVideoPlay = () => console.log(`🎬 ${data.name}视频播放`)
const onVideoEnd = () => console.log(`🎬 ${data.name}视频结束`)
</script>

<style scoped>
.yantai {
  --primary: #6a5acd;
  --bg-dark: #1a1a3a;
  --text-light: #f1f5f9;

  background: #dfe8e8;
  color: var(--text-light);
  font-family: Georgia, serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.yt-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 20% 30%, #3a2a5a 0%, #1a1a3a 40%, #0f0f1a 80%),
    linear-gradient(to top, rgba(106,90,205,0.08), transparent);
  position: relative;
  overflow: hidden;
}
.yt-orb {
  width: 180px;
  height: 180px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 8px 32px rgba(106,90,205,0.3);
  animation: yt-float 4s ease-in-out infinite;
  margin-bottom: 30px;
  z-index: 2;
}
@keyframes yt-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: #e0e7ff;
  z-index: 2;
  letter-spacing: 0.12em;
  margin-bottom: 16px;
}
.hero-sub {
  color: #cbd5e1;
  font-size: 20px;
  letter-spacing: 0.4em;
  z-index: 2;
}
.scroll-hint {
  position: absolute;
  bottom: 40px;
  color: #a5b4fc;
  opacity: 0.8;
  animation: bounce 2s infinite;
  z-index: 2;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
}

/* 视频区域 */
.yt-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a3a;
  padding: 80px 20px;
}
.section-inner { max-width: 1000px; width: 100%; text-align: center; }
.section-title {
  font-size: 36px;
  color: #a5b4fc;
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
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(106,90,205,0.3);
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: #94a3b8; font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.yt-masonry-section { padding: 100px 20px; background: #252545; text-align: center; }
.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--primary); }

.yt-masonry {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.yt-card {
  padding: 28px;
  background: rgba(67,82,192,0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  transform: perspective(800px) rotateX(2deg);
  transition: 0.4s;
  text-align: left;
}
.yt-card:hover {
  transform: perspective(800px) rotateX(0) scale(1.03);
  box-shadow: 0 20px 40px rgba(106,90,205,0.25);
  background: rgba(67,82,192,0.85);
}
.yt-card h3 { font-size: 20px; color: #e0e7ff; margin-bottom: 10px; }
.yt-card p { color: #cbd5e1; line-height: 1.6; }

/* 美食区块 */
.yt-food-section { padding: 80px 20px; background: #252545; text-align: center; }
.yt-food-list { max-width: 900px; margin: 50px auto 0; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }

.food-item {
  flex: 1 1 300px;
  background: rgba(67,82,192,0.3);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  text-align: left;
  transition: 0.3s;
}

.food-item:hover { background: rgba(67,82,192,0.5); border-color: var(--primary); box-shadow: 0 5px 15px rgba(106,90,205,0.3); }
.food-icon { font-size: 28px; line-height: 1; }
.food-info h4 { margin: 0 0 8px; color: #e0e7ff; font-size: 18px; }
.food-info p { margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.6; }
</style>