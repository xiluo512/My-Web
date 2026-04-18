<template>
  <div class="city-page zibo">

    <!-- 1. 第一屏：Hero 区域（旋转窑炉 + 标题） -->
    <section class="zb-hero">
      <div class="zb-kiln"></div>
      <h1 class="hero-title">淄博</h1>
      <p class="hero-sub">齐风韶韵 · 窑火人间</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索瓷都</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区（济南布局 + 淄博暖火风） -->
    <section class="zb-video-section">
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
        <p class="video-desc">千年窑火不熄，人间烟火长明</p>
      </div>
    </section>

    <!-- 3. 第三屏：景点网格卡片（100% 保留淄博特色） -->
    <section class="zb-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="zb-grid">
        <div class="zb-card"><h3>📖 海岱楼钟书阁</h3><p>琉璃穹顶映书香，东方美学新地标，最美书店打卡地</p></div>
        <div class="zb-card"><h3>🏮 周村古商城</h3><p>活态商业博物馆，大染坊青石回响，天下第一村传奇</p></div>
        <div class="zb-card"><h3>🍢 八大局市井</h3><p>小饼烤炉加蘸料，炭火升腾人情味，网红烟火气聚集地</p></div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

// --- 视频逻辑 ---
const cityCode = 'zibo'
// 先用在线测试视频，本地视频准备好后改成 `/video/${cityCode}.mp4`
const videoSrc = `/video/${cityCode}.mp4`  // ← 本地视频用这行

const onVideoPlay = () => {
  console.log('🎬 淄博视频开始播放')
}

const onVideoEnd = () => {
  console.log('🎬 淄博视频播放结束')
}

const onVideoError = (e) => {
  console.error('❌ 视频错误:', e)
}
</script>

<style scoped>
/* ========== 淄博主题变量（窑火红 + 琉璃金 + 羊皮纸色） ========== */
.zibo {
  --primary: #B22222;      /* 窑火红 */
  --accent: #FFD700;       /* 琉璃金 */
  --bg-warm: #1a0f0f;      /* 暖深褐背景 */
  --text-light: #f5e6d3;   /* 羊皮纸色 */
  --text-muted: #d4b896;

  background: var(--bg-warm);
  color: var(--text-light);
  font-family: "KaiTi", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ================= 1. Hero 首屏区域（保留窑炉旋转动画） ================= */
.zb-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: radial-gradient(ellipse at 50% 70%, #4a2015 0%, #1a0f0f 60%),
    repeating-linear-gradient(45deg, rgba(255,200,150,0.03) 0px, transparent 1px, transparent 8px);
  overflow: hidden;
}

/* 旋转窑炉动画 */
.zb-kiln {
  width: 140px;
  height: 140px;
  border: 3px solid #5a2a2a;
  border-radius: 50%;
  animation: zb-spin 8s linear infinite;
  box-shadow: 0 0 40px rgba(180,80,30,0.4);
  margin-bottom: 20px;
  z-index: 1;
  position: relative;
}
.zb-kiln::before {
  content: "";
  position: absolute;
  inset: 10px;
  border: 2px dashed #8a4a3a;
  border-radius: 50%;
  animation: zb-spin 5s linear infinite reverse;
}

@keyframes zb-spin {
  to { transform: rotate(360deg); }
}

.hero-title {
  font-size: clamp(40px, 7vw, 72px);
  color: var(--accent);
  letter-spacing: 0.2em;
  z-index: 2;
  margin-bottom: 8px;
  text-shadow: 0 4px 16px rgba(0,0,0,0.5);
}

.hero-sub {
  color: var(--text-light);
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 8px;
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

/* ================= 2. 视频独立区域（济南布局 + 淄博风格） ================= */
.zb-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2c1810;  /* ✅ 暖深褐背景，呼应窑火 */
  padding: 80px 20px;
}

.section-inner {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 36px;
  color: var(--accent);  /* ✅ 琉璃金标题 */
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
  background: var(--primary);  /* ✅ 窑火红下划线 */
  margin: 15px auto 0;
}

/* 视频容器 - 济南同款尺寸，淄博同款暖色边框 */
.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #000;
  border: 2px solid var(--primary);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(178, 34, 34, 0.3);
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
  color: var(--text-muted);
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 景点网格区域（100% 保留淄博特色） ================= */
.zb-grid-section {
  padding: 100px 20px;
  background: var(--bg-warm);
  text-align: center;
}

.dark-title {
  color: var(--text-light);
}

.dark-title::after {
  background: var(--accent);  /* ✅ 金色下划线 */
}

.zb-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* 淄博特色卡片：毛玻璃 + 悬停微旋转 */
.zb-card {
  background: rgba(60,30,20,0.7);
  border: 1px solid rgba(180,80,30,0.3);
  backdrop-filter: blur(8px);
  padding: 28px;
  border-radius: 16px;
  transition: all 0.3s ease;
  text-align: left;
  color: var(--text-light);
}

.zb-card:hover {
  transform: translateY(-6px) rotate(-1deg);  /* ✅ 保留原有的微旋转悬停效果 */
  box-shadow: 0 16px 32px rgba(180,80,30,0.3);
  border-color: var(--accent);
}

.zb-card h3 {
  font-size: 20px;
  color: var(--accent);
  margin-bottom: 10px;
}

.zb-card p {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 15px;
}
</style>