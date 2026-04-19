<template>
  <!-- 注意：这里用 :class="data.code" 动态绑定样式类 -->
  <div class="city-page" :class="data.code">

    <!-- 1. 第一屏：Hero 区域 -->
    <section class="jn-hero">
      <div class="jn-ripple"></div>
      <!-- 动态标题 -->
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>

      <div class="scroll-hint">↓ 探索{{ data.name.replace('泉城','').replace('魅力','') }}</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区 -->
    <section class="jn-video-section">
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
        <p class="video-desc">通过镜头，感受{{ data.name }}的灵动与厚重</p>
      </div>
    </section>

    <!-- 3. 第三屏：景点网格卡片 (动态循环) -->
    <section class="jn-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="jn-grid">
        <!-- 这里用 v-for 循环读取 data.spots -->
        <div class="jn-card" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 美食区块 (动态循环) -->
    <section class="jn-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="jn-food-list">
        <!-- 这里用 v-for 循环读取 data.food -->
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
// 🔑 核心：引入刚才创建的数据文件
import citiesData from '@/data/citiesData.js'

// 🔑 核心：定义 CITY_CODE，其他城市组件只需改这一行
const CITY_CODE = 'Jinan'

// 🔑 核心：把数据赋值给 data 变量，这样模板里才能用 data.food
const data = citiesData[CITY_CODE]

const onVideoPlay = () => {
  console.log(`🎬 ${data.name}视频开始播放`)
}

const onVideoEnd = () => {
  console.log(` ${data.name}视频播放结束`)
}
</script>

<style scoped>
/* 基础变量 - 使用动态颜色 */
.city-page {
  --primary: #2563eb;
  --bg-light: #f0f7f4;
  --text-dark: #2c3e50;
  background: #fff;
  color: var(--text-dark);
  font-family: "KaiTi", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* 如果要在不同城市用不同颜色，可以在 JS 里动态修改 --primary */
/* 这里暂时保持济南的蓝色，或者你可以在 script 里用 style 绑定 */

/* ================= 1. Hero 首屏区域 ================= */
.jn-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%);
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--primary);
  letter-spacing: 0.3em;
  z-index: 2;
  margin-bottom: 16px;
  text-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

.hero-sub {
  color: #64748b;
  font-size: 20px;
  letter-spacing: 0.5em;
  z-index: 2;
  font-weight: 400;
}

.jn-ripple {
  width: 300px;
  height: 300px;
  border: 2px solid rgba(37, 99, 235, 0.2);
  border-radius: 50%;
  animation: jn-r 4s infinite linear;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.jn-ripple::before {
  content: "";
  position: absolute;
  inset: -40px;
  border: 1px dashed rgba(37, 99, 235, 0.15);
  border-radius: 50%;
  animation: jn-r 5s infinite linear reverse;
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  color: var(--primary);
  opacity: 0.7;
  animation: bounce 2s infinite;
  font-size: 14px;
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

/* ================= 2. 视频独立区域 ================= */
.jn-video-section {
  background: #f0f7f4;
  padding: 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
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
}

.video-desc {
  margin-top: 30px;
  color: #8899a6;
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 卡片网格区域 ================= */
.jn-grid-section {
  padding: 100px 20px;
  background: var(--bg-light);
  text-align: center;
}

.dark-title {
  color: var(--text-dark);
}
.dark-title::after {
  background: var(--text-dark);
}

.jn-grid {
  max-width: 1100px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.jn-card {
  background: #fff;
  border-left: 5px solid var(--primary);
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.4s ease;
  text-align: left;
}

.jn-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(37,99,235,0.15);
}

.jn-card h3 {
  font-size: 22px;
  margin-bottom: 12px;
  color: var(--text-dark);
}

.jn-card p {
  color: #667;
  line-height: 1.8;
  font-size: 16px;
}

/* ================= 4. 美食区块样式 ================= */
.jn-food-section {
  padding: 80px 20px;
  background: #fff;
  text-align: center;
}

.jn-food-list {
  max-width: 900px;
  margin: 50px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.food-item {
  flex: 1 1 300px;
  background: #fdfdfd;
  border: 1px solid #eee;
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
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.food-icon {
  font-size: 28px;
  line-height: 1;
}

.food-info h4 {
  margin: 0 0 8px;
  color: var(--text-dark);
  font-size: 18px;
}

.food-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}
</style>
