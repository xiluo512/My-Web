<template>
  <div class="city-page dezhou">

    <!-- 1. 第一屏：Hero 区域（旋转光晕背景 + 标题） -->
    <section class="dz-hero">
      <h1 class="hero-title">德州</h1>
      <p class="hero-sub">九达天衢 · 太阳之城</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索太阳城</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区（济南布局 + 德州工业风） -->
    <section class="dz-video-section">
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
        <p class="video-desc">低碳科技引领未来，扒鸡香飘百年街巷</p>
      </div>
    </section>

    <!-- 3. 第三屏：工业风网格卡片（100% 保留德州特色） -->
    <section class="dz-grid-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="dz-grid">
        <div class="dz-card"><h3>☀️ 中国太阳谷</h3><p>微排大厦低碳试，绿色能源新标杆</p></div>
        <div class="dz-card"><h3>🍗 德州扒鸡老街</h3><p>五香脱骨百年艺，味蕾上的非遗传承</p></div>
        <div class="dz-card"><h3>📜 董子文化街</h3><p>汉代大儒正统传，儒家文化润人心</p></div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

// --- 视频逻辑 ---
const cityCode = 'dezhou'
// 先用在线测试视频，本地视频准备好后改成 `/video/${cityCode}.mp4`

 const videoSrc = `/video/${cityCode}.mp4`  // ← 本地视频用这行

const onVideoPlay = () => {
  console.log('🎬 德州视频开始播放')
}

const onVideoEnd = () => {
  console.log('🎬 德州视频播放结束')
}

const onVideoError = (e) => {
  console.error('❌ 视频错误:', e)
}
</script>

<style scoped>
/* ========== 德州主题变量（深绿 + 工业橙） ========== */
.dezhou {
  --primary: #ea580c;      /* 工业橙/太阳红 */
  --accent: #16a34a;       /* 生态绿 */
  --gold: #fbbf24;         /* 太阳金 */
  --bg-dark: #177452;      /* 深绿背景 */
  --card-bg: #18181b;      /* 深灰卡片 */
  --text-light: #f8fafc;

  background: var(--bg-dark);
  color: var(--text-light);
  font-family: "KaiTi", serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ================= 1. Hero 首屏区域（保留旋转光晕动画） ================= */
.dz-hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* 德州特有：锥形渐变 + 条纹背景 */
  background-image: conic-gradient(from 0deg at 50% 50%, #0f1218 0deg, rgba(234,88,12,0.15) 45deg, #0f1218 90deg, rgba(234,88,12,0.1) 135deg, #0f1218 180deg, rgba(234,88,12,0.15) 225deg, #0f1218 270deg, rgba(234,88,12,0.1) 315deg, #0f1218 360deg),
    repeating-linear-gradient(90deg, transparent 0px, transparent 32px, rgba(22,163,74,0.06) 32px, rgba(22,163,74,0.06) 33px);
}

/* 旋转光晕层 */
.dz-hero::before {
  content: "";
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: radial-gradient(circle, rgba(234,88,12,0.4) 0%, transparent 70%);
  animation: dz-spin 12s linear infinite;
  opacity: 0.5;
  z-index: 1;
}

/* 扫描光线层 */
.dz-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%);
  animation: dz-sweep 6s infinite;
  z-index: 1;
}

@keyframes dz-spin {
  to { transform: rotate(360deg); }
}

@keyframes dz-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  color: var(--gold);  /* ✅ 太阳金标题 */
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 4px 16px rgba(234,88,12,0.4);
  margin-bottom: 16px;
}

.hero-sub {
  color: #94a3b8;  /* ✅ 浅灰副标题 */
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

/* ================= 2. 视频独立区域（济南布局 + 德州风格） ================= */
.dz-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #86efac;  /* ✅ 深色背景，呼应 Hero 底部 */
  padding: 80px 20px;
}

.section-inner {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 36px;
  color: var(--gold);  /* ✅ 金色标题 */
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
  background: var(--primary);  /* ✅ 橙色下划线 */
  margin: 15px auto 0;
}

/* 视频容器 - 济南同款尺寸，德州同款深色 */
.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #000;        /* ✅ 纯黑背景 */
  border: 2px solid #333;  /* ✅ 深灰边框，工业感 */
  border-radius: 4px;      /* ✅ 小圆角，更硬朗 */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
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
  color: #94a3b8;  /* ✅ 浅灰文字，适配深色背景 */
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 工业风网格卡片区域（100% 保留德州特色） ================= */
.dz-grid-section {
  padding: 100px 20px;
  background: var(--bg-dark);  /* ✅ 深绿背景，延续主题 */
  text-align: center;
}

.dark-title {
  color: var(--text-light);
}

.dark-title::after {
  background: var(--primary);  /* ✅ 橙色下划线 */
}

/* 网格容器 - 保留原有布局 */
.dz-grid {
  max-width: 950px;
  margin: 60px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;  /* ✅ 稍微增加间距 */
}

/* 工业风卡片 - 100% 保留原有造型 */
.dz-card {
  padding: 24px 20px;
  background: var(--card-bg);
  border: 2px solid #333;
  position: relative;
  transition: all 0.3s ease;
  text-align: left;
  color: var(--text-light);
  overflow: hidden;  /* ✅ 防止切角溢出 */
}

/* 右上角橙色切角装饰 */
.dz-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 24px solid var(--primary);  /* ✅ 橙色切角 */
  border-left: 24px solid transparent;
}

.dz-card:hover {
  border-color: var(--primary);
  box-shadow: 0 0 20px rgba(234,88,12,0.4);  /* ✅ 橙色发光 */
  transform: translateY(-4px);
}

.dz-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--gold);
  font-weight: 600;
}

.dz-card p {
  color: #94a3b8;
  line-height: 1.8;
  font-size: 15px;
}

/* 移动端适配 */
@media (max-width: 700px) {
  .dz-grid {
    grid-template-columns: 1fr;
  }
}
</style>