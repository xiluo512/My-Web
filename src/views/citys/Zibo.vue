<template>
  <div class="city-page zibo">
    <div class="zb-hero">
      <div class="zb-kiln"></div>
      <h1>淄博</h1>
      <p class="sub">齐风韶韵·窑火人间</p>
    </div>
    <section class="zb-grid">
      <div class="zb-card"><h3>📖 海岱楼钟书阁</h3><p>琉璃穹顶映书香，东方美学新地标</p></div>
      <div class="zb-card"><h3>🏮 周村古商城</h3><p>活态商业博物馆，大染坊青石回响</p></div>
      <div class="zb-card"><h3>🍢 八大局市井</h3><p>小饼烤炉加蘸料，炭火升腾人情味</p></div>
    </section>
  </div>
</template>

<style scoped>
.zibo {
  --primary: #B22222;
  background: #aaa04c;
  color: #f5e6d3;
  font-family: "KaiTi", serif;
  min-height: 100vh;
}
.zibo .zb-hero {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: radial-gradient(ellipse at 50% 70%, #4a2015 0%, #1a0f0f 60%),
    repeating-linear-gradient(45deg, rgba(255,200,150,0.03) 0px, transparent 1px, transparent 8px);
  overflow: hidden;
}
.zibo .zb-kiln {
  width: 140px;
  height: 140px;
  border: 3px solid #5a2a2a;
  border-radius: 50%;
  animation: zb-spin 8s linear infinite;
  box-shadow: 0 0 40px rgba(180,80,30,0.4);
}
.zibo .zb-kiln::before {
  content: "";
  position: absolute;
  inset: 10px;
  border: 2px dashed #8a4a3a;
  border-radius: 50%;
  animation: zb-spin 5s linear infinite reverse;
}
@keyframes zb-spin {
  to { transform: rotate(360deg); }
}
.zibo .zb-hero h1 {
  font-size: clamp(40px, 7vw, 72px);
  color: #FFD700;
  letter-spacing: 0.2em;
  z-index: 2;
}
.zibo .sub {
  color: #f5e6d3;
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
}
.zibo .zb-grid {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.zibo .zb-card {
  background: rgba(60,30,20,0.7);
  border: 1px solid rgba(180,80,30,0.3);
  backdrop-filter: blur(8px);
  padding: 28px;
  border-radius: 16px;
  transition: 0.3s;
}
.zibo .zb-card:hover {
  transform: translateY(-6px) rotate(-1deg);
  box-shadow: 0 16px 32px rgba(180,80,30,0.3);
}
</style>
