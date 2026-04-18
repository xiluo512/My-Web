<template>
  <div class="city-page rizhao">

    <!-- 1. Hero 区域 -->
    <section class="rz-hero">
      <h1 class="hero-title">日照</h1>
      <p class="hero-sub">阳光海岸 · 绿茶故乡</p>
      <div class="scroll-hint">↓ 探索日出</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="rz-video-section">
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
        <p class="video-desc">日出初光先照，茶香海韵情长</p>
      </div>
    </section>

    <!-- 3. 景点卡片 -->
    <section class="rz-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="rz-grid">
        <div class="rz-card"><h3>⛵ 万平口风景区</h3><p>日照城市客厅，沙细水清婚庆地标</p></div>
        <div class="rz-card"><h3>🍵 浮来山古银杏</h3><p>天下银杏第一树，四千年古木参天</p></div>
        <div class="rz-card"><h3>🌊 世帆赛基地</h3><p>乘风破浪启航，水上运动之都</p></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'


const videoSrc = `/video/rizhao.mp4`

const onVideoPlay = () => console.log('🎬 日照视频播放')
const onVideoEnd = () => console.log('🎬 日照视频结束')
</script>

<style scoped>
.rizhao {
  --primary: #fde047; /* 日照黄 */
  --bg-dark: #0a0f0a;
  --text-light: #e2e8f0;

  background: #fafdfadf;
  color: #1a2010;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Hero 保持射线动画 */
.rz-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0f0a 0%, #1a2010 50%, #0f140f 100%),
    radial-gradient(circle at 50% 20%, rgba(253,224,71,0.08) 0%, transparent 50%);
  position: relative;
  overflow: hidden;
}
.rz-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 1;
}
.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--primary);
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 4px 16px rgba(253,224,71,0.3);
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
.rz-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #161b16;
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(253,224,71,0.1);
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: #94a3b8; font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.rz-grid-section { padding: 100px 20px; background: #0a0f0a; text-align: center; }
.dark-title { color: var(--primary); }
.dark-title::after { background: var(--primary); }

.rz-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.rz-card {
  background: #161b16;
  border-top: 4px solid var(--primary);
  padding: 28px;
  border-radius: 16px;
  transition: 0.3s;
  text-align: left;
  color: var(--text-light);
}
.rz-card:hover {
  box-shadow: 0 12px 24px rgba(253,224,71,0.15);
  transform: translateY(-4px);
}
.rz-card h3 { font-size: 20px; color: var(--primary); margin-bottom: 10px; }
.rz-card p { color: #cbd5e1; line-height: 1.6; }
</style>