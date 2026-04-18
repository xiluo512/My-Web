<template>
  <div class="city-page weihai">
    <div class="wh-hero">
      <div class="wh-light"></div>
      <h1>威海</h1>
      <p class="sub">宜居海岸·甲午风云</p>
    </div>
    <section class="wh-grid">
      <div class="wh-card"><h3>⚓ 刘公岛</h3><p>甲午战争博物院，海岛生态与历史交融</p></div>
      <div class="wh-card"><h3>🌅 成山头</h3><p>中国海岸最东端，日出第一缕光</p></div>
      <div class="wh-card"><h3>🏖️ 国际海水浴场</h3><p>细沙碧浪绵长，夏日冲浪胜地</p></div>
    </section>
  </div>
</template>

<style scoped>
.weihai {
  background: #48a4b0;
  color: #f8fafc;
  min-height: 100vh;
}
.weihai .wh-hero {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to top, #0a192f 0%, #112240 40%, #0f172a 100%),
    radial-gradient(circle at 90% 10%, rgba(0,206,209,0.08) 0%, transparent 40%);
  position: relative;
  overflow: hidden;
}
.weihai .wh-light {
  width: 40px;
  height: 120px;
  background: conic-gradient(from 0deg, #f8f9fa, #94a3b8);
  border-radius: 4px 4px 0 0;
  position: relative;
}
.weihai .wh-light::after {
  content: "";
  position: absolute;
  top: -30px;
  left: -10px;
  width: 60px;
  height: 40px;
  background: radial-gradient(circle, #fbbf24, transparent);
  border-radius: 50%;
  animation: wh-pulse 2s infinite;
}
@keyframes wh-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}
.weihai .wh-hero h1 {
  font-size: clamp(40px, 7vw, 72px);
  color: #f8fafc;
  z-index: 2;
  letter-spacing: 0.1em;
}
.weihai .sub {
  color: #94a3b8;
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
}
.weihai .wh-grid {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.weihai .wh-card {
  background: #1e293b;
  border-radius: 20px;
  padding: 28px;
  backdrop-filter: blur(8px);
  transition: 0.3s;
}
.weihai .wh-card:hover {
  transform: translateY(-5px);
}
</style>
