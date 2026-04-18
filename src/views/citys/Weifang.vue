<template>
  <div class="city-page weifang">

    <!-- 1. Hero 区域 -->
    <section class="wf-hero">
      <h1 class="hero-title">潍坊</h1>
      <p class="hero-sub">鸢都春早 · 匠心之城</p>
      <div class="scroll-hint">↓ 探索鸢都</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="wf-video-section">
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
        <p class="video-desc">扎糊绘放上青天，匠心独运传千年</p>
      </div>
    </section>

    <!-- 3. 景点卡片 -->
    <section class="wf-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="wf-grid">
        <div class="wf-card"><h3>🪁 风筝博物馆</h3><p>世界风筝都，扎糊绘放技艺精，万鸢齐飞上青天</p></div>
        <div class="wf-card"><h3>🖼️ 杨家埠年画</h3><p>木版年画之乡，色彩艳丽造型夸张，民间艺术瑰宝</p></div>
        <div class="wf-card"><h3>🍅 寿光农博园</h3><p>蔬菜之乡科技展，无土栽培新视野，绿色农业标杆</p></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

 const videoSrc = `/video/weifang.mp4`

const onVideoPlay = () => console.log('🎬 潍坊视频播放')
const onVideoEnd = () => console.log('🎬 潍坊视频结束')
</script>

<style scoped>
.weifang {
  --primary: #22c55e; /* 潍坊绿 */
  --bg-dark: #0a140a;
  --text-light: #e2e8f0;

  background: var(--bg-dark);
  color: var(--text-light);
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Hero 保持菱形网格 */
.wf-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(45deg, transparent 49.5%, rgba(34,197,94,0.15) 49.5%, rgba(34,197,94,0.15) 50.5%, transparent 50.5%),
    linear-gradient(-45deg, transparent 49.5%, rgba(234,88,12,0.1) 49.5%, rgba(234,88,12,0.1) 50.5%, transparent 50.5%),
    conic-gradient(from 180deg at 70% 30%, #0a140a, #142a14, #0a140a);
}
.wf-hero::before {
  content: "";
  position: absolute;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  background: radial-gradient(circle at 20% 30%, rgba(234,88,12,0.2) 0%, transparent 30%),
    radial-gradient(circle at 80% 70%, rgba(56,189,248,0.15) 0%, transparent 35%);
  filter: blur(12px);
  animation: wf-wind 6s infinite alternate;
  z-index: 1;
}
@keyframes wf-wind {
  0% { transform: translate(-5%, 3%) scale(1); }
  100% { transform: translate(5%, -3%) scale(1.05); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--primary);
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
  margin-bottom: 16px;
}
.hero-sub {
  color: #86efac;
  z-index: 2;
  font-size: 20px;
  letter-spacing: 0.4em;
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
.wf-video-section {
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
  border: 2px dashed var(--primary); /* 虚线边框呼应风筝线 */
  border-radius: 4px;
  overflow: hidden;
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: #94a3b8; font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.wf-grid-section { padding: 100px 20px; background: #142a14; text-align: center; }
.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--primary); }

.wf-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.wf-card {
  padding: 28px;
  background: #162016;
  border: 2px dashed var(--primary);
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 85%); /* 切角造型 */
  transition: 0.3s;
  text-align: left;
  position: relative;
}
.wf-card:hover {
  transform: translateY(-6px) rotate(1deg);
  background: #1c2b1c;
  box-shadow: 0 12px 24px rgba(34,197,94,0.2);
}
.wf-card h3 { font-size: 20px; color: var(--primary); margin-bottom: 10px; }
.wf-card p { color: #cbd5e1; line-height: 1.6; }
</style>