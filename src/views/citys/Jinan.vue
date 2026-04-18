<template>
  <div class="city-page jinan">

    <!-- 1. 第一屏：Hero 区域（标题 + 波纹） -->
    <section class="jn-hero">
      <div class="jn-ripple"></div>
      <h1 class="hero-title">泉城济南</h1>
      <p class="hero-sub">四面荷花三面柳 · 一城山色半城湖</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索泉城</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区 -->
    <section class="jn-video-section">
      <div class="section-inner">
        <h2 class="section-title">城市映像</h2>
        <div class="video-wrapper">
          <VideoPlayer
            :src="videoSrc"
            :auto-play="false"
            @play="onVideoPlay"
            @end="onVideoEnd"
          />
        </div>
        <p class="video-desc">通过镜头，感受泉城的灵动与厚重</p>
      </div>
    </section>

    <!-- 3. 第三屏：景点网格卡片 -->
    <section class="jn-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="jn-grid">
        <div class="jn-card"><h3>💧 趵突泉</h3><p>三窟并发腾空，声若隐雷震历下</p></div>
        <div class="jn-card"><h3>🌊 大明湖</h3><p>历下秋风泛舟，超然楼夜揽星河</p></div>
        <div class="jn-card"><h3>🛶 曲水亭街</h3><p>家家泉水垂杨，青石巷藏老城烟火</p></div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const cityCode = 'jinan'
// 使用在线测试视频，或者改成你的本地路径 /video/jinan.mp4
const videoSrc = '/video/jinan.mp4'

const onVideoPlay = () => {
  console.log('🎬 济南视频开始播放')
}

const onVideoEnd = () => {
  console.log('🎬 济南视频播放结束')
}
</script>

<style scoped>
/* 基础变量 */
.jinan {
  --primary: #2563eb;
  --bg-light: #f0f7f4;
  --text-dark: #2c3e50;
  background: #fff;
  color: var(--text-dark);
  font-family: "KaiTi", serif;
  min-height: 100vh;
  overflow-x: hidden; /* 防止横向滚动 */
}

/* ================= 1. Hero 首屏区域 ================= */
.jn-hero {
  height: 100vh; /* 占满一屏 */
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

/* 波纹动画定位 */
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

/* 滚动提示 */
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
  min-height: 80vh; /* 至少占满一屏 */
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
  height: 450px;  /* 固定高度，保持比例 */
  margin: 30px auto;
  background: #fff; /* 白色背景 */
  border-radius: 16px; /* 圆角 */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15); /* 阴影 */
  overflow: hidden; /* 隐藏溢出 */
  position: relative;
}
/* 穿透样式：让组件填满容器 */
:deep(.video-player) {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
}

:deep(.video-container) {
  width: 100% !important;
  height: 100% !important;
  border-radius: 0 !important; /* 继承父级的圆角 */
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
</style>