<template>
  <div class="city-page heze">

    <!-- 1. 第一屏：Hero 区域（牡丹主题背景 + 标题） -->
    <section class="hz-hero">
      <h1 class="hero-title">菏泽</h1>
      <p class="hero-sub">中国牡丹之都 · 戏曲之乡</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索牡丹之都</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区（济南布局 + 菏泽粉色风格） -->
    <section class="hz-video-section">
      <div class="section-inner">
        <h2 class="section-title">城市映像</h2>
        <div class="video-wrapper">
          <VideoPlayer
            :src="videoSrc"
            :auto-play="false"
            @play="onVideoPlay"
            @end="onVideoEnd"
            @error="onVideoError"
          />
        </div>
        <p class="video-desc">牡丹花开动京城，戏曲传唱韵悠长</p>
      </div>
    </section>

    <!-- 3. 第三屏：花瓣形状景点卡片（保留菏泽特色） -->
    <section class="hz-bloom-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="hz-bloom">
        <div class="hz-petal"><h3>🌺 曹州牡丹园</h3><p>世界最大牡丹园，千品万色竞芳菲</p></div>
        <div class="hz-petal"><h3>🥋 水浒好汉城</h3><p>郓城古建武市井，忠义豪情荡心胸</p></div>
        <div class="hz-petal"><h3>🎭 山东梆子戏台</h3><p>高亢悲壮活态传，非遗戏曲韵悠长</p></div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

// --- 视频逻辑 ---
const cityCode = 'heze'
// 先用在线测试视频，本地视频准备好后改成 `/video/${cityCode}.mp4`
 const videoSrc = `/video/${cityCode}.mp4`

const onVideoPlay = () => {
  console.log('🎬 菏泽视频开始播放')
}

const onVideoEnd = () => {
  console.log('🎬 菏泽视频播放结束')
}

const onVideoError = (e) => {
  console.error('❌ 视频错误:', e)
}
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
  color: var(--accent);  /* ✅ 牡丹粉标题 */
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 16px rgba(157,23,77,0.6);
  margin-bottom: 16px;
}

.hero-sub {
  color: var(--gold);  /* ✅ 金色副标题 */
  z-index: 2;
  margin-top: 8px;
  font-size: 20px;
  letter-spacing: 0.4em;
}

/* 滚动提示动画 */
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

/* ================= 2. 视频独立区域（济南布局 + 菏泽风格） ================= */
.hz-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);  /* ✅ 保持菏泽浅粉背景 */
  padding: 80px 20px;
}

.section-inner {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 36px;
  color: var(--primary);  /* ✅ 牡丹红标题 */
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

/* 视频容器 - 济南同款尺寸，菏泽同款粉色系 */
.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #fff;        /* ✅ 白色背景衬托视频 */
  border: 3px solid var(--accent);  /* ✅ 粉色边框，牡丹特色 */
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(157,23,77,0.2);  /* ✅ 粉色阴影 */
  overflow: hidden;
  position: relative;
}

/* 穿透样式：让 VideoPlayer 组件填满容器 */
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
  display: block;
}

.video-desc {
  margin-top: 30px;
  color: #6b7280;  /* ✅ 深灰色文字，适配浅色背景 */
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 花瓣卡片区域（100% 保留菏泽特色） ================= */
.hz-bloom-section {
  padding: 100px 20px;
  background: #fff;  /* ✅ 白色背景，突出花瓣卡片 */
  text-align: center;
}

.dark-title {
  color: var(--text-dark);
}

.dark-title::after {
  background: var(--gold);  /* ✅ 金色下划线，菏泽特色 */
}

/* 花瓣容器 - 保持垂直排列 */
.hz-bloom {
  max-width: 800px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  gap: 24px;  /* ✅ 增加间距 */
  align-items: center;
}

/* 花瓣卡片 - 100% 保留原有造型 */
.hz-petal {
  width: 90%;
  max-width: 600px;
  padding: 32px 24px;
  background: rgba(157,23,77,0.08);  /* ✅ 半透明牡丹红 */
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;  /* ✅ 花瓣形状 */
  border: 2px solid rgba(190,24,93,0.3);
  text-align: center;
  transition: all 0.4s ease;
  backdrop-filter: blur(4px);
  color: var(--text-dark);
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
</style>