<template>
  <div class="city-page taian">

    <!-- 1. Hero 区域 -->
    <section class="ta-hero">
      <h1 class="hero-title">泰安</h1>
      <p class="hero-sub">登泰山而小天下 · 游三孔而知礼乐</p>
      <div class="scroll-hint">↓ 登高望远</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="ta-video-section">
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
        <p class="video-desc">五岳独尊，国泰民安</p>
      </div>
    </section>

    <!-- 3. 景点卡片 -->
    <section class="ta-steps-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="ta-steps">
        <div class="ta-step"><h3>🌄 泰山日出</h3><p>五岳独尊十八盘，云海玉盘迎旭光，一览众山小</p></div>
        <div class="ta-step"><h3>📜 曲阜三孔</h3><p>古柏森森碑碣立，杏坛弦歌传礼乐，儒家文化圣地</p></div>
        <div class="ta-step"><h3>🏛️ 尼山圣境</h3><p>金声玉振演哲思，古典重生当代场，大学堂里读论语</p></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const videoSrc = `/video/taian.mp4`

const onVideoPlay = () => console.log('🎬 泰安视频播放')
const onVideoEnd = () => console.log('🎬 泰安视频结束')
</script>

<style scoped>
.taian {
  --primary: #b45309; /* 泰岳金/赭石色 */
  --bg-dark: #1c1917;
  --text-light: #e7e5e4;

  background: var(--bg-dark);
  color: var(--text-light);
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Hero 保持泰山轮廓 */
.ta-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 30%, #292524, #1c1917);
  position: relative;
  overflow: hidden;
}
.ta-mtn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(to top, #44403c, transparent);
  clip-path: polygon(0% 100%, 30% 40%, 60% 70%, 100% 30%);
  opacity: 0.3;
  z-index: 1;
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--primary);
  letter-spacing: 0.3em;
  z-index: 2;
  margin-bottom: 16px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
.hero-sub {
  color: #d6d3d1;
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
.ta-video-section {
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
  border-radius: 4px;
  overflow: hidden;
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: #94a3b8; font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.ta-steps-section { padding: 100px 20px; background: #292524; text-align: center; }
.dark-title { color: var(--text-light); }
.dark-title::after { background: var(--primary); }

.ta-steps {
  max-width: 800px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.ta-step {
  padding: 28px;
  border-left: 3px solid #d6d3d1;
  background: #1c1917;
  border-radius: 0 12px 12px 0;
  position: relative;
  text-align: left;
  transition: 0.3s;
}
.ta-step::before {
  content: "";
  position: absolute;
  left: -10px;
  top: 28px;
  width: 14px;
  height: 14px;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary);
}
.ta-step:hover {
  transform: translateX(10px);
  border-left-color: var(--primary);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}
.ta-step h3 { font-size: 20px; color: var(--primary); margin-bottom: 8px; }
.ta-step p { color: #a8a29e; line-height: 1.6; }
</style>