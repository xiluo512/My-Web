<template>
  <div class="city-page weihai">

    <!-- 1. Hero 区域 -->
    <section class="wh-hero">
      <h1 class="hero-title">威海</h1>
      <p class="hero-sub">宜居海岸 · 甲午风云</p>
      <div class="scroll-hint">↓ 探索威海</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="wh-video-section">
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
        <p class="video-desc">走遍四海，还是威海</p>
      </div>
    </section>

    <!-- 3. 景点卡片 -->
    <section class="wh-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="wh-grid">
        <div class="wh-card"><h3>⚓ 刘公岛</h3><p>甲午战争博物院，海岛生态与历史交融，爱国主义教育基</p></div>
        <div class="wh-card"><h3>🌅 成山头</h3><p>中国海岸最东端，日出第一缕光，天尽头见证奇迹</p></div>
        <div class="wh-card"><h3>🏖️ 国际海水浴场</h3><p>细沙碧浪绵长，夏日冲浪胜地，最美海岸线之一</p></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const videoSrc = `/video/weihai.mp4`

const onVideoPlay = () => console.log('🎬 威海视频播放')
const onVideoEnd = () => console.log('🎬 威海视频结束')
</script>

<style scoped>
.weihai {
  --primary: #48a4b0; /* 威海蓝 */
  --accent: #fbbf24;  /* 灯塔黄 */
  --bg-dark: #0a192f;
  --text-light: #f8fafc;

  background: var(--bg-dark);
  color: var(--text-light);
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Hero 保持灯塔 */
.wh-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to top, #0a192f 0%, #112240 40%, #0f172a 100%),
    radial-gradient(circle at 90% 10%, rgba(0,206,209,0.08) 0%, transparent 40%);
  position: relative;
  overflow: hidden;
}
.wh-light {
  width: 40px;
  height: 120px;
  background: conic-gradient(from 0deg, #f8f9fa, #94a3b8);
  border-radius: 4px 4px 0 0;
  position: relative;
  margin-bottom: 20px;
  z-index: 2;
}
.wh-light::after {
  content: "";
  position: absolute;
  top: -30px;
  left: -10px;
  width: 60px;
  height: 40px;
  background: radial-gradient(circle, var(--accent), transparent);
  border-radius: 50%;
  animation: wh-pulse 2s infinite;
}
@keyframes wh-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--text-light);
  z-index: 2;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}
.hero-sub {
  color: #94a3b8;
  font-size: 20px;
  letter-spacing: 0.4em;
  z-index: 2;
}
.scroll-hint {
  position: absolute;
  bottom: 40px;
  color: var(--primary);
  opacity: 0.8;
  animation: bounce 2s infinite;
  z-index: 2;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
}

/* 视频区域 */
.wh-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #112240;
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
  border-radius: 20px;
  overflow: hidden;
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: #94a3b8; font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.wh-grid-section { padding: 100px 20px; background: var(--bg-dark); text-align: center; }
.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--primary); }

.wh-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.wh-card {
  padding: 28px;
  background: #1e293b;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  transition: 0.3s;
  text-align: left;
  border: 1px solid #334155;
}
.wh-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(72, 164, 176, 0.2);
  border-color: var(--primary);
}
.wh-card h3 { font-size: 20px; color: var(--primary); margin-bottom: 10px; }
.wh-card p { color: #cbd5e1; line-height: 1.6; }
</style>