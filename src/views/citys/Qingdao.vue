<template>
  <!-- 修复了 class 写法，加入 :class 动态绑定 -->
  <div class="city-page qingdao" :class="data.code">

    <!-- 1. Hero 区域 (深色背景 + 海浪) -->
    <section class="qd-hero">
      <!-- 补上了你 CSS 里写的海浪 div -->
      <div class="qd-wave"></div>
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>
      <div class="scroll-hint">↓ 探索{{ data.name.replace('帆船之都·','') }}</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="qd-video-section">
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
        <p class="video-desc">红瓦绿树，碧海蓝天，啤酒飘香</p>
      </div>
    </section>

    <!-- 3. 景点卡片 (改为 v-for 循环) -->
    <section class="qd-masonry-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="qd-masonry">
        <!-- 遍历 data.spots -->
        <div class="qd-item" v-for="spot in data.spots" :key="spot.name">
          <div class="qd-overlay">
            <h4>{{ spot.icon }} {{ spot.name }}</h4>
            <p>{{ spot.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 美食列表 (新增，适配青岛的暗黑风格) -->
    <section class="qd-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="qd-food-list">
        <div class="qd-food-item" v-for="item in data.food" :key="item.name">
          <span class="qd-food-icon">🍺</span>
          <div class="qd-food-info">
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

// 🔑 核心：定义城市代码
const CITY_CODE = 'Qingdao'
const data = citiesData[CITY_CODE]

const onVideoPlay = () => console.log('🎬 青岛视频播放')
const onVideoEnd = () => console.log('🎬 青岛视频结束')
</script>

<style scoped>
/* ================= 全局变量 ================= */
.qingdao {
  --primary: #f59e0b; /* 青岛金/橙色 */
  --bg-dark: #0f172a;
  --bg-card: #1e293b;
  --text-light: #f8fafc;
  --text-gray: #94a3b8;

  background: var(--bg-dark);
  color: var(--text-light);
  min-height: 100vh;
  overflow-x: hidden;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif; /* 青岛用更现代的字体 */
}

/* ================= 1. Hero 区域 ================= */
.qd-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0c4a6e, #0f172a);
  position: relative;
  overflow: hidden;
}

/* 海浪动画 - 补上了你代码里缺的 */
.qd-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,30 Q300,60 600,30 T1200,30 V60 H0 Z' fill='%230f172a'/%3E%3C/svg%3E") repeat-x;
  background-size: 1200px 60px;
  animation: qd-w 5s linear infinite;
  z-index: 1;
}
@keyframes qd-w {
  to { background-position: -1200px 0; }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--primary);
  letter-spacing: 0.15em;
  z-index: 2;
  margin-bottom: 16px;
  text-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
}
.hero-sub {
  color: var(--text-gray);
  font-size: 20px;
  letter-spacing: 0.4em;
  z-index: 2;
}
.scroll-hint {
  position: absolute;
  bottom: 80px; /* 调高一点避开海浪 */
  color: var(--primary);
  opacity: 0.8;
  animation: bounce 2s infinite;
  z-index: 2;
  font-size: 14px;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
}

/* ================= 2. 视频区域 ================= */
.qd-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-dark);
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
  content: ''; display: block; width: 60px; height: 3px; background: var(--primary); margin: 15px auto 0;
}

.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #000;
  border: 2px solid var(--primary);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: var(--text-gray); font-size: 16px; letter-spacing: 0.1em; }

/* ================= 3. 景点区域 ================= */
.qd-masonry-section { padding: 100px 20px; background: var(--bg-card); text-align: center; }
.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--primary); }

.qd-masonry {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.qd-item {
  height: 220px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #334155, #475569); /* 景点卡片背景渐变 */
  transition: 0.3s;
  border: 1px solid #475569;
  cursor: pointer;
}
.qd-item:hover { transform: translateY(-5px); border-color: var(--primary); box-shadow: 0 10px 30px rgba(245, 158, 11, 0.15); }

.qd-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15,23,42,0.95), transparent);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 24px;
}
.qd-overlay h4 { color: var(--primary); margin-bottom: 8px; font-size: 18px; }
.qd-overlay p { color: #cbd5e1; font-size: 14px; line-height: 1.6; }

/* ================= 4. 美食区域 (新增) ================= */
.qd-food-section {
  padding: 100px 20px;
  background: var(--bg-dark);
  text-align: center;
}
.qd-food-list {
  max-width: 1000px;
  margin: 60px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.qd-food-item {
  flex: 1 1 300px;
  background: var(--bg-card);
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: left;
  transition: 0.3s;
}
.qd-food-item:hover {
  border-color: var(--primary);
  transform: translateY(-3px);
}
.qd-food-icon {
  font-size: 24px;
  background: rgba(245, 158, 11, 0.1);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.qd-food-info h4 { margin: 0 0 6px; color: var(--text-light); font-size: 17px; }
.qd-food-info p { margin: 0; color: var(--text-gray); font-size: 14px; line-height: 1.5; }
</style>
