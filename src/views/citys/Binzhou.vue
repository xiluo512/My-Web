<template>
  <div class="city-page binzhou">

    <!-- 1. 第一屏：Hero 区域（移动网格背景 + 标题） -->
    <section class="bz-hero">
      <div class="bz-grid-bg"></div>
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索兵圣故里</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区 -->
    <section class="bz-video-section">
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
        <p class="video-desc">兵学智慧传千古，渤海之滨展新颜</p>
      </div>
    </section>

    <!-- 3. 第三屏：切角军事风卡片（动态数据渲染） -->
    <section class="bz-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="bz-grid">
        <div class="bz-card" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 第四屏：军事风美食列表（新增，风格统一） -->
    <section class="bz-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="bz-food-list">
        <div class="bz-food-item" v-for="item in data.food" :key="item.name">
          <span class="bz-food-icon">🥘</span>
          <div class="bz-food-info">
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
const CITY_CODE = 'Binzhou'
const data = citiesData[CITY_CODE]

const onVideoPlay = () => console.log('🎬 滨州视频开始播放')
const onVideoEnd = () => console.log('🎬 滨州视频播放结束')
const onVideoError = (e) => console.error('❌ 视频错误:', e)
</script>

<style scoped>
/* ========== 滨州主题变量（军事红 + 深绿） ========== */
.binzhou {
  --primary: #B22222;      /* 军事红/火焰红 */
  --accent: #142a14;       /* 军绿/深绿 */
  --gold: #fecaca;         /* 浅粉/米色文字 */
  --bg-light: #b45309;     /* 棕黄背景 */
  --text-light: #dfe8e8;

  background: var(--bg-light);
  color: var(--text-light);
  font-family: "KaiTi", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ================= 1. Hero 首屏区域 ================= */
.bz-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #e0e7ff;
  background-image: radial-gradient(circle at 50% 50%, rgba(178,34,34,0.08) 0%, transparent 70%),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 100% 100%, 40px 40px, 40px 40px;
}

.bz-grid-bg {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(178,34,34,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(178,34,34,0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: bz-move 10s linear infinite;
  z-index: 1;
}

@keyframes bz-move {
  to { background-position: 40px 40px; }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--primary);
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 2px 10px rgba(178,34,34,0.2);
  margin-bottom: 16px;
}

.hero-sub {
  color: #64748b;
  font-size: 20px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
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
.bz-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
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
  background: #000;
  border: 2px solid var(--primary);
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(178,34,34,0.2);
  overflow: hidden;
  position: relative;
}

:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; display: block; }

.video-desc {
  margin-top: 30px;
  color: #64748b;
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 切角军事风卡片区域 ================= */
.bz-grid-section {
  padding: 100px 20px;
  background: var(--bg-light);
  text-align: center;
}

.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--primary); }

.bz-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.bz-card {
  background: var(--accent);
  border: 2px solid var(--text-light);
  border-radius: 8px;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
  padding: 28px 24px;
  transition: all 0.3s ease;
  text-align: left;
  color: var(--text-light);
  min-height: 160px; /* 防止内容少时高度塌陷 */
}

.bz-card:hover {
  border-color: var(--primary);
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(178,34,34,0.3);
}

.bz-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--gold);
  font-weight: 600;
}

.bz-card p {
  color: #cbd5e1;
  line-height: 1.8;
  font-size: 15px;
}

/* ================= 4. 军事风美食区域（新增） ================= */
.bz-food-section {
  padding: 100px 20px;
  background: var(--accent);
  text-align: center;
}

.bz-food-list {
  max-width: 1000px;
  margin: 60px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.bz-food-item {
  flex: 1 1 300px;
  background: #0f1f0f;
  border: 2px solid var(--text-light);
  border-radius: 8px;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  transition: 0.3s;
}

.bz-food-item:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(178,34,34,0.25);
}

.bz-food-icon {
  font-size: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(178,34,34,0.15);
  border-radius: 50%;
  flex-shrink: 0;
}

.bz-food-info h4 {
  margin: 0 0 6px;
  color: var(--gold);
  font-size: 17px;
}

.bz-food-info p {
  margin: 0;
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
}
</style>
