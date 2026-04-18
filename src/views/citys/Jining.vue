<template>
  <div class="city-page jining">

    <!-- 1. 第一屏：Hero 区域（运河水波背景 + 标题） -->
    <section class="jn-hero">
      <h1 class="hero-title">济宁</h1>
      <p class="hero-sub">运河之都 · 礼乐之乡</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索运河文化</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区（济南布局 + 济宁运河风格） -->
    <section class="jn-video-section">
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
        <p class="video-desc">千年运河穿城过，孔孟礼乐润万家</p>
      </div>
    </section>

    <!-- 3. 第三屏：时间轴景点卡片（100% 保留济宁特色） -->
    <section class="jn-col-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="jn-col">
        <div class="jn-step"><h3>📜 太白楼</h3><p>李白赋诗运河畔，酒香墨韵两相宜</p></div>
        <div class="jn-step"><h3>🌊 南旺分水枢纽</h3><p>古代水利运河心，巧夺天工智慧传</p></div>
        <div class="jn-step"><h3>⛰️ 水泊梁山</h3><p>替天行道忠义堂，好汉传奇荡气回肠</p></div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

// --- 视频逻辑 ---
const cityCode = 'jining'
// 先用在线测试视频，本地视频准备好后改成 `/video/${cityCode}.mp4`

 const videoSrc = `/video/${cityCode}.mp4`

const onVideoPlay = () => {
  console.log('🎬 济宁视频开始播放')
}

const onVideoEnd = () => {
  console.log('🎬 济宁视频播放结束')
}

const onVideoError = (e) => {
  console.error('❌ 视频错误:', e)
}
</script>

<style scoped>
/* ========== 济宁主题变量（运河金 + 深蓝色系） ========== */
.jining {
  --primary: #d97706;      /* 运河金/琥珀色 */
  --accent: #1e3a8a;       /* 运河深蓝 */
  --gold: #fef08a;         /* 浅金文字 */
  --bg-light: #dde0e9af;   /* 浅灰蓝背景 */
  --text-light: #fefce8;
  --text-dark: #1e293b;

  background: var(--bg-light);
  color: var(--text-dark);
  font-family: "STKaiti", "KaiTi", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ================= 1. Hero 首屏区域（保留运河水波动画） ================= */
.jn-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* 济宁特有：条纹 + 水波渐变 */
  background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 14px, rgba(217,119,6,0.08) 14px, rgba(217,119,6,0.08) 15px),
    radial-gradient(circle at 50% 100%, rgba(30,58,138,0.3) 0%, transparent 50%);
}

/* 运河水波动画层 */
.jn-hero::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 40%;
  bottom: 0;
  left: 0;
  background: repeating-radial-gradient(circle at 50% 100%, transparent 0px, transparent 8px, rgba(217,119,6,0.04) 8px, rgba(217,119,6,0.04) 9px);
  filter: blur(1px);
  animation: jn-water 8s infinite alternate;
  z-index: 1;
}

@keyframes jn-water {
  0% { transform: translateX(0); }
  100% { transform: translateX(20px); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--gold);  /* ✅ 浅金标题 */
  z-index: 2;
  letter-spacing: 0.25em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
  margin-bottom: 16px;
}

.hero-sub {
  color: #fde047;  /* ✅ 亮黄副标题 */
  z-index: 2;
  margin-top: 8px;
  font-size: 20px;
  letter-spacing: 0.4em;
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

/* ================= 2. 视频独立区域（济南布局 + 济宁风格） ================= */
.jn-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);  /* ✅ 保持济宁浅灰蓝背景 */
  padding: 80px 20px;
}

.section-inner {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 36px;
  color: var(--accent);  /* ✅ 深蓝标题 */
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
  background: var(--primary);  /* ✅ 金色下划线 */
  margin: 15px auto 0;
}

/* 视频容器 - 济南同款尺寸，济宁同款配色 */
.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #fff;        /* ✅ 白色背景衬托视频 */
  border: 3px solid var(--primary);  /* ✅ 金色边框，运河特色 */
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(217,119,6,0.2);  /* ✅ 金色阴影 */
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
  color: #64748b;  /* ✅ 深灰文字，适配浅色背景 */
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 时间轴卡片区域（100% 保留济宁特色） ================= */
.jn-col-section {
  padding: 100px 20px;
  background: #fff;  /* ✅ 白色背景，突出时间轴 */
  text-align: center;
}

.dark-title {
  color: var(--text-dark);
}

.dark-title::after {
  background: var(--primary);  /* ✅ 金色下划线 */
}

/* 时间轴容器 - 保留左侧竖线 + 圆点设计 */
.jn-col {
  max-width: 600px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-left: 3px solid var(--primary);  /* ✅ 金色竖线 */
  padding-left: 40px;  /* ✅ 增加间距容纳圆点 */
}

/* 时间轴卡片 - 100% 保留原有造型 */
.jn-step {
  padding: 24px 20px;
  background: rgba(30,58,138,0.15);  /* ✅ 半透明深蓝 */
  border-radius: 0 12px 12px 0;  /* ✅ 右侧圆角 */
  position: relative;
  transition: all 0.3s ease;
  text-align: left;
  color: var(--text-dark);
}

/* 时间轴圆点标记 */
.jn-step::before {
  content: "";
  position: absolute;
  left: -48px;  /* ✅ 调整位置对齐竖线 */
  top: 28px;
  width: 16px;
  height: 16px;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--primary);  /* ✅ 发光效果 */
  transition: all 0.3s;
}

.jn-step:hover {
  background: rgba(241,243,248,0.95);
  transform: translateX(8px);  /* ✅ 悬停右移效果 */
  box-shadow: 0 8px 20px rgba(217,119,6,0.15);
}

.jn-step:hover::before {
  transform: scale(1.2);  /* ✅ 圆点放大 */
  box-shadow: 0 0 20px var(--primary);
}

.jn-step h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--accent);
  font-weight: 600;
}

.jn-step p {
  color: #64748b;
  line-height: 1.8;
  font-size: 15px;
}
</style>