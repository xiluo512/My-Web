<template>
  <div class="city-page liaocheng">

    <!-- 1. Hero 区域 -->
    <section class="lc-hero">
      <h1 class="hero-title">聊城</h1>
      <p class="hero-sub">江北水城 · 运河古都</p>
      <div class="scroll-hint">↓ 探索水城</div>
    </section>

    <!-- 2. 视频区域 -->
    <section class="lc-video-section">
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
        <p class="video-desc">水韵聊城，城在水中，水在城中</p>
      </div>
    </section>

    <!-- 3. 景点卡片 -->
    <section class="lc-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="lc-grid">
        <div class="lc-card"><h3>🏯 光岳楼</h3><p>明代楼阁冠天下，四百年巍然不动，鲁西第一楼</p></div>
        <div class="lc-card"><h3>🛶 东昌湖</h3><p>江北最大城内湖，环湖碧波映古城，宋韵明清风</p></div>
        <div class="lc-card"><h3>🎭 山陕会馆</h3><p>运河商贸繁华地，砖雕石刻叹精工，见证漕运辉煌</p></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'


 const videoSrc = `/video/liaocheng.mp4`

const onVideoPlay = () => console.log('🎬 聊城视频播放')
const onVideoEnd = () => console.log('🎬 聊城视频结束')
</script>

<style scoped>
.liaocheng {
  --primary: #0e7490; /* 水城蓝 */
  --bg-dark: #0e1a2e;
  --text-light: #e2e8f0;

  background: var(--bg-dark);
  color: var(--text-light);
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Hero 保持水波纹 */
.lc-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(ellipse at 50% 80%, rgba(14,116,144,0.25) 0%, transparent 60%),
    linear-gradient(180deg, #0e1a2e 0%, #162a40 100%);
}
.lc-water {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: repeating-linear-gradient(0deg, transparent 0px, transparent 6px, rgba(14,116,144,0.06) 6px, rgba(14,116,144,0.06) 7px);
  animation: lc-ripple 6s infinite alternate;
  z-index: 1;
}
@keyframes lc-ripple {
  0% { transform: translateX(0) scaleY(1); }
  100% { transform: translateX(10px) scaleY(1.02); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: #67e8f9;
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 16px rgba(14,116,144,0.5);
  margin-bottom: 16px;
}
.hero-sub {
  color: #a5f3fc;
  z-index: 2;
  font-size: 20px;
  letter-spacing: 0.4em;
}
.scroll-hint {
  position: absolute;
  bottom: 40px;
  color: #0e7490;
  opacity: 0.8;
  animation: bounce 2s infinite;
  z-index: 2;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
}

/* 视频区域 */
.lc-video-section {
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
  color: #67e8f9;
  margin-bottom: 40px;
  letter-spacing: 0.2em;
  display: inline-block;
  position: relative;
}
.section-title::after {
  content: ''; display: block; width: 60px; height: 3px; background: #0e7490; margin: 15px auto 0;
}

.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #000;
  border: 2px solid #0e7490;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(14,116,144,0.3);
}
:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; }

.video-desc { margin-top: 30px; color: #94a3b8; font-size: 16px; letter-spacing: 0.1em; }

/* 景点区域 */
.lc-grid-section { padding: 100px 20px; background: #162a40; text-align: center; }
.dark-title { color: #67e8f9; }
.dark-title::after { background: #0e7490; }

.lc-grid {
  max-width: 1000px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.lc-card {
  padding: 28px;
  background: rgba(14,116,144,0.08);
  border: 1px solid rgba(14,116,144,0.25);
  border-radius: 16px;
  backdrop-filter: blur(6px);
  transition: 0.3s;
  text-align: left;
}
.lc-card:hover {
  background: rgba(14,116,144,0.15);
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(14,116,144,0.2);
  border-color: #67e8f9;
}
.lc-card h3 { font-size: 20px; color: #67e8f9; margin-bottom: 10px; }
.lc-card p { color: #cbd5e1; line-height: 1.6; }
</style>