<template>
  <div class="city-page dezhou">
    <div class="dz-hero">
      <h1>德州</h1>
      <p class="sub">九达天衢·太阳之城</p>
    </div>
    <section class="dz-grid">
      <div class="dz-card"><h3>☀️ 中国太阳谷</h3><p>微排大厦低碳试</p></div>
      <div class="dz-card"><h3>🍗 德州扒鸡老街</h3><p>五香脱骨百年艺</p></div>
      <div class="dz-card"><h3>📜 董子文化街</h3><p>汉代大儒正统传</p></div>
    </section>
  </div>
</template>

<style scoped>
.dezhou {
  background: #177452;
  color: #f8fafc;
  min-height: 100vh;
}
.dezhou .dz-hero {
  height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: conic-gradient(from 0deg at 50% 50%, #0f1218 0deg, rgba(234,88,12,0.15) 45deg, #0f1218 90deg, rgba(234,88,12,0.1) 135deg, #0f1218 180deg, rgba(234,88,12,0.15) 225deg, #0f1218 270deg, rgba(234,88,12,0.1) 315deg, #0f1218 360deg),
    repeating-linear-gradient(90deg, transparent 0px, transparent 32px, rgba(22,163,74,0.06) 32px, rgba(22,163,74,0.06) 33px);
}
.dezhou .dz-hero::before {
  content: "";
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: radial-gradient(circle, rgba(234,88,12,0.4) 0%, transparent 70%);
  animation: dz-spin 12s linear infinite;
  opacity: 0.5;
}
.dezhou .dz-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%);
  animation: dz-sweep 6s infinite;
}
@keyframes dz-spin {
  to { transform: rotate(360deg); }
}
@keyframes dz-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.dezhou .dz-hero h1 {
  font-size: clamp(40px, 7vw, 72px);
  color: #fbbf24;
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 4px 16px rgba(234,88,12,0.4);
}
.dezhou .sub {
  color: #94a3b8;
  z-index: 2;
  margin-top: 8px;
  font-size: 18px;
  letter-spacing: 0.4em;
}
.dezhou .dz-grid {
  max-width: 950px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.dezhou .dz-card {
  padding: 20px;
  background: #18181b;
  border: 2px solid #333;
  position: relative;
  transition: 0.3s;
}
.dezhou .dz-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 20px solid #c2410c;
  border-left: 20px solid transparent;
}
.dezhou .dz-card:hover {
  border-color: #ea580c;
  box-shadow: 0 0 16px rgba(234,88,12,0.4);
  transform: translateY(-2px);
}

@media (max-width: 700px) {
  .dezhou .dz-grid {
    grid-template-columns: 1fr;
  }
}
</style>
