<template>
  <div class="city-page binzhou">

    <!-- 1. 第一屏：Hero 区域（移动网格背景 + 标题） -->
    <section class="bz-hero">
      <div class="bz-grid-bg"></div>
      <h1 class="hero-title">滨州</h1>
      <p class="hero-sub">孙子故里 · 渤海明珠</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索兵圣故里</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区（济南布局 + 滨州军事风） -->
    <section class="bz-video-section">
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
        <p class="video-desc">兵学智慧传千古，渤海之滨展新颜</p>
      </div>
    </section>

    <!-- 3. 第三屏：切角军事风卡片（100% 保留滨州特色） -->
    <section class="bz-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="bz-grid">
        <div class="bz-card"><h3>⚔️ 孙子兵法城</h3><p>汉代风格建筑群，沉浸式兵学体验</p></div>
        <div class="bz-card"><h3>🏰 魏氏庄园</h3><p>清代军事防御民居，北方罕见古堡</p></div>
        <div class="bz-card"><h3>🎡 渤海之眼摩天轮</h3><p>无轴式巨型景观，夜游地标光影</p></div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

// --- 视频逻辑 ---
const cityCode = 'binzhou'
// 先用在线测试视频，本地视频准备好后改成 `/video/${cityCode}.mp4`

 const videoSrc = `/video/${cityCode}.mp4`  // ← 本地视频用这行

const onVideoPlay = () => {
  console.log('🎬 滨州视频开始播放')
}

const onVideoEnd = () => {
  console.log('🎬 滨州视频播放结束')
}

const onVideoError = (e) => {
  console.error('❌ 视频错误:', e)
}
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

/* ================= 1. Hero 首屏区域（保留移动网格动画） ================= */
.bz-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* 滨州特有：浅色底 + 网格线 */
  background: #e0e7ff;
  background-image: radial-gradient(circle at 50% 50%, rgba(178,34,34,0.08) 0%, transparent 70%),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 100% 100%, 40px 40px, 40px 40px;
}

/* 移动网格层 */
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
  color: var(--primary);  /* ✅ 军事红标题 */
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 2px 10px rgba(178,34,34,0.2);
  margin-bottom: 16px;
}

.hero-sub {
  color: #64748b;  /* ✅ 深灰副标题 */
  font-size: 20px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
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

/* ================= 2. 视频独立区域（济南布局 + 滨州风格） ================= */
.bz-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;  /* ✅ 白色背景，突出视频 */
  padding: 80px 20px;
}

.section-inner {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 36px;
  color: var(--primary);  /* ✅ 红色标题 */
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

/* 视频容器 - 济南同款尺寸，滨州同款硬朗风 */
.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #000;        /* ✅ 纯黑背景 */
  border: 2px solid var(--primary);  /* ✅ 红色边框，军事感 */
  border-radius: 8px;      /* ✅ 小圆角 */
  box-shadow: 0 20px 60px rgba(178,34,34,0.2);
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
  color: #64748b;  /* ✅ 深灰文字，适配白色背景 */
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 切角军事风卡片区域（100% 保留滨州特色） ================= */
.bz-grid-section {
  padding: 100px 20px;
  background: var(--bg-light);  /* ✅ 棕黄背景，延续主题 */
  text-align: center;
}

.dark-title {
  color: var(--text-light);
}

.dark-title::after {
  background: var(--primary);  /* ✅ 红色下划线 */
}

/* 网格容器 - 保留原有布局 */
.bz-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;  /* ✅ 稍微增加间距 */
}

/* 军事风卡片 - 100% 保留原有造型（切角设计） */
.bz-card {
  background: var(--accent);  /* ✅ 军绿背景 */
  border: 2px solid var(--text-light);  /* ✅ 浅色边框 */
  border-radius: 8px;
  /* ✅ 核心特色：右下角切角 */
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
  padding: 28px 24px;
  transition: all 0.3s ease;
  text-align: left;
  color: var(--text-light);
}

.bz-card:hover {
  border-color: var(--primary);  /* ✅ 悬停变红框 */
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(178,34,34,0.3);
}

.bz-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--gold);  /* ✅ 浅色标题 */
  font-weight: 600;
}

.bz-card p {
  color: #cbd5e1;
  line-height: 1.8;
  font-size: 15px;
}
</style>