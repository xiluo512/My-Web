<template>
  <div class="city-page jining" :class="data.code">

    <!-- 1. 第一屏：Hero 区域（运河水波背景 + 标题） -->
    <section class="jn-hero">
      <h1 class="hero-title">{{ data.name }}</h1>
      <p class="hero-sub">{{ data.slogan }}</p>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">↓ 探索运河文化</div>
    </section>

    <!-- 2. 第二屏：视频独立展示区 -->
    <section class="jn-video-section">
      <div class="section-inner">
        <h2 class="section-title">城市映像</h2>
        <div class="video-wrapper">
          <VideoPlayer
            :src="data.videoSrc"
            :auto-play="false"
            @play="onVideoPlay"
            @end="onVideoEnd"
            @error="onVideoError"
          />
        </div>
        <p class="video-desc">千年运河穿城过，孔孟礼乐润万家</p>
      </div>
    </section>

    <!-- 3. 第三屏：时间轴景点卡片（动态数据渲染） -->
    <section class="jn-col-section">
      <h2 class="section-title dark-title">必游胜地</h2>
      <div class="jn-col">
        <!-- 遍历景点数据，生成时间轴 -->
        <div class="jn-step" v-for="spot in data.spots" :key="spot.name">
          <h3>{{ spot.icon }} {{ spot.name }}</h3>
          <p>{{ spot.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 4. 第四屏：国风美食列表（新增，风格统一） -->
    <section class="jn-food-section">
      <h2 class="section-title dark-title">地道风味</h2>
      <div class="jn-food-list">
        <div class="jn-food-item" v-for="item in data.food" :key="item.name">
          <span class="jn-food-icon">🥘</span>
          <div class="jn-food-info">
            <h4>{{ item.name }}</h4>
            <p>{{ item.reason }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue'
import citiesData from '@/data/citiesData.js'

// 🔑 核心：绑定城市代码，自动读取配置
const CITY_CODE = 'Jining'
const data = citiesData[CITY_CODE]

// --- 视频逻辑 ---
const onVideoPlay = () => console.log(`🎬 ${data.name}视频开始播放`)
const onVideoEnd = () => console.log(`🎬 ${data.name}视频播放结束`)
const onVideoError = (e) => console.error('❌ 视频错误:', e)
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
  color: var(--gold);
  z-index: 2;
  letter-spacing: 0.25em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
  margin-bottom: 16px;
}

.hero-sub {
  color: #fde047;
  z-index: 2;
  margin-top: 8px;
  font-size: 20px;
  letter-spacing: 0.4em;
}

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

/* ================= 2. 视频独立区域 ================= */
.jn-video-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);
  padding: 80px 20px;
}

.section-inner {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 36px;
  color: var(--accent);
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

.video-wrapper {
  width: 90%;
  max-width: 720px;
  height: 450px;
  margin: 30px auto;
  background: #fff;
  border: 3px solid var(--primary);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(217,119,6,0.2);
  overflow: hidden;
  position: relative;
}

:deep(.video-player) { width: 100% !important; height: 100% !important; margin: 0 !important; }
:deep(.video-container) { width: 100% !important; height: 100% !important; border-radius: 0 !important; background: #000 !important; }
:deep(.video-container video) { width: 100%; height: 100%; object-fit: cover; display: block; }

.video-desc {
  margin-top: 30px;
  color: #64748b;
  font-size: 16px;
  letter-spacing: 0.1em;
}

/* ================= 3. 时间轴卡片区域（保留造型） ================= */
.jn-col-section {
  padding: 100px 20px;
  background: #fff;
  text-align: center;
}

.dark-title { color: var(--text-dark); }
.dark-title::after { background: var(--primary); }

/* 时间轴容器 */
.jn-col {
  max-width: 600px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-left: 3px solid var(--primary);
  padding-left: 40px;
}

/* 时间轴卡片 */
.jn-step {
  padding: 24px 20px;
  background: rgba(30,58,138,0.15);
  border-radius: 0 12px 12px 0;
  position: relative;
  transition: all 0.3s ease;
  text-align: left;
  color: var(--text-dark);
  min-height: 100px;
}

/* 时间轴圆点标记 */
.jn-step::before {
  content: "";
  position: absolute;
  left: -48px;
  top: 28px;
  width: 16px;
  height: 16px;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--primary);
  transition: all 0.3s;
}

.jn-step:hover {
  background: rgba(241,243,248,0.95);
  transform: translateX(8px);
  box-shadow: 0 8px 20px rgba(217,119,6,0.15);
}

.jn-step:hover::before {
  transform: scale(1.2);
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

/* ================= 4. 国风美食区域（新增） ================= */
.jn-food-section {
  padding: 100px 20px;
  background: var(--bg-light);
  text-align: center;
}

.jn-food-list {
  max-width: 1000px;
  margin: 60px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

/* 美食卡片采用半透明深蓝，与景点卡片呼应 */
.jn-food-item {
  flex: 1 1 300px;
  padding: 24px 20px;
  background: rgba(30,58,138,0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  transition: 0.3s;
}

.jn-food-item:hover {
  background: rgba(30,58,138,0.25);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(217,119,6,0.1);
}

.jn-food-icon {
  font-size: 28px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(254, 240, 138, 0.3); /* 浅金背景点缀 */
  border-radius: 50%;
  flex-shrink: 0;
}

.jn-food-info h4 {
  margin: 0 0 6px;
  color: var(--accent);
  font-size: 18px;
}

.jn-food-info p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}
</style>
