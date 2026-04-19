<template>
  <div class="city-page heze" :class="data.code">

    <!-- 1. 第一屏：Hero 区域（牡丹主题背景 + 标题） -->
    <section class="hz-hero">
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索牡丹之都</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区 -->
    <section class="hz-video-section">
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
        <p class="video-desc">牡丹花开动京城，戏曲传唱韵悠长</p>
      </div>
    </section>

    <!-- 3. 第三屏：花瓣形状景点卡片（动态数据渲染） -->
    <section class="hz-bloom-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="hz-bloom">
        <!-- 遍历景点数据，每个都是花瓣形状 -->
        <div class="hz-petal" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 第四屏：国潮风美食列表（新增，风格统一） -->
    <section class="hz-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="hz-food-list">
        <div class="hz-food-item" v-for="item in data.food" :key="item.name">
          <span class="hz-food-icon"></span>
          <div class="hz-food-info">
            <h4>{{ item.name }}</h4>
            <p>{{ item.reason }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue'
import citiesData from '@/data/citiesData.js'

// 🔑 核心：绑定城市代码，自动读取配置
const CITY_CODE = 'Heze'
const data = citiesData[CITY_CODE]

// --- 视频逻辑 ---
const onVideoPlay = () => console.log(`🎬 ${data.name}视频开始播放`)
const onVideoEnd = () => console.log(`🎬 ${data.name}视频播放结束`)
const onVideoError = (e) => console.error('❌ 视频错误:', e)
</script>

<style scoped>
/* ========== 菏泽主题变量（牡丹红 + 粉色系） ========== */
.heze {
  --primary: #ca3030;      /* 牡丹红 */
  --accent: #f9a8d4;       /* 牡丹粉 */
  --gold: #fde68a;         /* 金色点缀 */
  --bg-light: #e7e0e6;     /* 浅粉灰背景 */
  --bg-dark: rgba(26,10,20,0.9);
  --text-dark: #1a0a14;
  --text-light: #fff;

  background: var(--bg-light);
  color: var(--text-dark);
  font-family: "KaiTi", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ================= 1. Hero 首屏区域（保留牡丹动画） ================= */
.hz-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* 菏泽特有渐变：深红 + 牡丹粉 */
  background-image: linear-gradient(180deg, rgba(26,10,20,0) 0%, rgba(26,10,20,0.8) 100%),
    radial-gradient(circle at 30% 40%, rgba(157,23,77,0.3) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(245,158,11,0.2) 0%, transparent 45%);
}

/* 牡丹绽放动画层 */
.hz-hero::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(157,23,77,0.1) 0%, rgba(157,23,77,0.05) 25%, transparent 50%, rgba(157,23,77,0.05) 75%, rgba(157,23,77,0.1) 100%);
  animation: hz-curtain 10s infinite alternate;
  z-index: 1;
}

.hz-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(157,23,77,0.08) 40%, transparent 60%);
  animation: hz-bloom 8s infinite ease-in-out;
  z-index: 1;
}

@keyframes hz-curtain {
  0% { transform: scaleX(1) skewX(0); }
  100% { transform: scaleX(1.02) skewX(1deg); }
}

@keyframes hz-bloom {
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--accent);
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 16px rgba(157,23,77,0.6);
  margin-bottom: 16px;
}

.hero-sub {
  color: var(--gold);
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
.hz-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);
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
  background: #fff;
  border: 3px solid var(--accent);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(157,23,77,0.2);
  overflow: hidden;
  position: relative;
}

:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; display: block; }

.video-desc {
  margin-top: 30px;
  color: #6b7280;
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 花瓣卡片区域（保留造型） ================= */
.hz-bloom-section {
  padding: 100px 20px;
  background: #fff;
  text-align: center;
}

.dark-title { color: var(--text-dark); }
.dark-title::after { background: var(--gold); }

/* 花瓣容器 */
.hz-bloom {
  max-width: 800px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

/* 花瓣卡片 - 核心特色 */
.hz-petal {
  width: 90%;
  max-width: 600px;
  padding: 32px 24px;
  background: rgba(157,23,77,0.08);
  /* 核心：花瓣圆角 */
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  border: 2px solid rgba(190,24,93,0.3);
  text-align: center;
  transition: all 0.4s ease;
  backdrop-filter: blur(4px);
  color: var(--text-dark);
  min-height: 140px;
}

.hz-petal:hover {
  background: rgba(157,23,77,0.15);
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(157,23,77,0.3);
  border-color: var(--primary);
}

.hz-petal h3 {
  font-size: 22px;
  margin-bottom: 12px;
  color: var(--primary);
}

.hz-petal p {
  color: #6b7280;
  line-height: 1.8;
  font-size: 16px;
}

/* ================= 4. 国潮风美食区域（新增） ================= */
.hz-food-section {
  padding: 100px 20px;
  background: #fff5f8; /* 极淡的粉色背景 */
  text-align: center;
}

.hz-food-list {
  max-width: 1000px;
  margin: 60px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

/* 美食卡片采用柔和圆角，配合粉色边框 */
.hz-food-item {
  flex: 1 1 300px;
  padding: 24px 20px;
  background: #fff;
  border: 2px solid rgba(157,23,77,0.2);
  border-radius: 20px; /* 柔和圆角 */
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  transition: 0.3s;
}

.hz-food-item:hover {
  border-color: var(--primary);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(157,23,77,0.15);
}

.hz-food-icon {
  font-size: 28px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(253, 230, 138, 0.3); /* 金色背景点缀 */
  border-radius: 50%;
  flex-shrink: 0;
}

.hz-food-info h4 {
  margin: 0 0 6px;
  color: var(--primary);
  font-size: 18px;
}

.hz-food-info p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}
</style>
