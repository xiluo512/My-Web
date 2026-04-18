<template>
  <div class="city-page qingdao">

    <!-- 1. Hero 区域 -->
    <section class="qd-hero">
      <h1 class="hero-title">青岛</h1>
      <p class="hero-sub">红瓦绿树 · 碧海蓝天 · 欧韵今风</p>
      <div class="scroll-hint">↓ 探索琴岛</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="qd-video-section">
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
        <p class="video-desc">红瓦绿树，碧海蓝天，啤酒飘香</p>
      </div>
    </section>

    <!-- 3. 景点卡片 -->
    <section class="qd-masonry-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="qd-masonry">
        <div class="qd-item">
          <div class="qd-overlay"><h4>🏘️ 八大关</h4><p>万国建筑博览，四季花树掩映街区</p></div>
        </div>
        <div class="qd-item">
          <div class="qd-overlay"><h4>🌉 栈桥回澜</h4><p>百年长虹远引，鸥鸟伴潮音</p></div>
        </div>
        <div class="qd-item">
          <div class="qd-overlay"><h4>🍺 啤酒博物馆</h4><p>百年酵母麦香，原浆泡沫的工业浪漫</p></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const videoSrc = `/video/qingdao.mp4`

const onVideoPlay = () => console.log('🎬 青岛视频播放')
const onVideoEnd = () => console.log('🎬 青岛视频结束')
</script>

<style scoped>
.qingdao {
  --primary: #f59e0b; /* 青岛金/橙色 */
  --bg-dark: #0f172a;
  --text-light: #f8fafc;

  background: var(--bg-dark);
  color: var(--text-light);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Hero 保持海浪 */
.qd-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0c4a6e, #0f172a);
  position: relative;
  overflow: hidden;
}
.qd-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,30 Q300,60 600,30 T1200,30 V60 H0 Z' fill='%230f172a'/%3E%3C/svg%3E") repeat-x;
  background-size: 1200px 60px;
  animation: qd-w 5s linear infinite;
  z-index: 1;
}
@keyframes qd-w {
  to { background-position: -1200px 0; }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--primary);
  letter-spacing: 0.15em;
  z-index: 2;
  margin-bottom: 16px;
  text-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
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
.qd-video-section {
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
  border: 2px solid var(--primary);
  border-radius: 8px;
  overflow: hidden;
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: #94a3b8; font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.qd-masonry-section { padding: 100px 20px; background: #1e293b; text-align: center; }
.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--primary); }

.qd-masonry {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.qd-item {
  height: 220px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #1e293b, #334155);
  transition: 0.3s;
  border: 1px solid #334155;
}
.qd-item:hover { transform: scale(1.02); border-color: var(--primary); }
.qd-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15,23,42,0.9), transparent);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 20px;
}
.qd-overlay h4 { color: var(--primary); margin-bottom: 4px; font-size: 18px; }
.qd-overlay p { color: #cbd5e1; font-size: 14px; }
</style>