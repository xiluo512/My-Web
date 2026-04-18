<template>
  <div class="city-page linyi">

    <!-- 1. Hero 区域 -->
    <section class="ly-hero">
      <h1 class="hero-title">临沂</h1>
      <p class="hero-sub">沂蒙精神 · 书圣故里</p>
      <div class="scroll-hint">↓ 探索沂蒙</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="ly-video-section">
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
        <p class="video-desc">红色基因传承，商贸物流之都</p>
      </div>
    </section>

    <!-- 3. 景点卡片 -->
    <section class="ly-abs-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="ly-abs">
        <div class="ly-card"><h3>🖋️ 王羲之故居</h3><p>洗砚池畔墨香传，书法圣地寻魏晋风骨</p></div>
        <div class="ly-card"><h3>🎖️ 沂蒙革命馆</h3><p>红嫂精神党群碑，热血铸就的英雄史诗</p></div>
        <div class="ly-card"><h3>⛰️ 蒙山旅游区</h3><p>天然氧吧峡谷深，岱宗之亚云海奇观</p></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'


 const videoSrc = `/video/linyi.mp4`

const onVideoPlay = () => console.log('🎬 临沂视频播放')
const onVideoEnd = () => console.log('🎬 临沂视频结束')
</script>

<style scoped>
.linyi {
  --primary: #B22222; /* 革命红 */
  --bg-dark: #1a0f0a;
  --text-light: #fefce8;

  background: #a06148db;
  color: var(--text-light);
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Hero 保持毛公山剪影 */
.ly-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(180deg, rgba(26,15,10,0.9) 0%, rgba(26,15,10,0.6) 100%);
}
.ly-hero::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(135deg, #1a0f0a 0%, #1a0f0a 40%, transparent 40%),
    linear-gradient(145deg, #1a0f0a 0%, #1a0f0a 50%, transparent 50%),
    linear-gradient(125deg, #1a0f0a 0%, #1a0f0a 35%, transparent 35%);
  clip-path: polygon(0% 100%, 10% 40%, 25% 80%, 40% 30%, 55% 70%, 70% 20%, 85% 60%, 100% 10%);
  filter: blur(1px);
  opacity: 0.4;
  animation: ly-mtn 15s infinite alternate;
  z-index: 1;
}
@keyframes ly-mtn {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: #fecaca;
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
  margin-bottom: 16px;
}
.hero-sub {
  color: #fde68a;
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
.ly-video-section {
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
  border: 2px solid #555;
  border-radius: 4px;
  overflow: hidden;
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: #94a3b8; font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.ly-abs-section { padding: 100px 20px; background: rgba(26,15,10,0.8); text-align: center; }
.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--primary); }

.ly-abs {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.ly-card {
  padding: 24px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(153,27,27,0.3);
  backdrop-filter: blur(4px);
  transition: 0.3s;
  text-align: left;
}
.ly-card:hover {
  background: rgba(255,255,255,0.06);
  transform: translateY(-4px);
  border-color: var(--primary);
}
.ly-card h3 { font-size: 20px; color: #fde68a; margin-bottom: 10px; }
.ly-card p { color: #cbd5e1; line-height: 1.6; }
</style>