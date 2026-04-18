<template>
  <div class="city-page weifang">
    <div class="wf-hero">
      <h1>潍坊</h1>
      <p class="sub">鸢都春早·匠心之城</p>
    </div>
    <section class="wf-grid">
      <div class="wf-card"><h3>🪁 风筝博物馆</h3><p>扎糊绘放上青天</p></div>
      <div class="wf-card"><h3>🖼️ 杨家埠年画</h3><p>木版丹青色彩书</p></div>
      <div class="wf-card"><h3>🍅 寿光农博园</h3><p>无土栽培科技标</p></div>
    </section>
  </div>
</template>

<style scoped>
.weifang {
  background: #0a140a;
  color: #e2e8f0;
  min-height: 100vh;
}
.weifang .wf-hero {
  height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(45deg, transparent 49.5%, rgba(34,197,94,0.15) 49.5%, rgba(34,197,94,0.15) 50.5%, transparent 50.5%),
    linear-gradient(-45deg, transparent 49.5%, rgba(234,88,12,0.1) 49.5%, rgba(234,88,12,0.1) 50.5%, transparent 50.5%),
    conic-gradient(from 180deg at 70% 30%, #0a140a, #142a14, #0a140a);
}
.weifang .wf-hero::before {
  content: "";
  position: absolute;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  background: radial-gradient(circle at 20% 30%, rgba(234,88,12,0.2) 0%, transparent 30%),
    radial-gradient(circle at 80% 70%, rgba(56,189,248,0.15) 0%, transparent 35%);
  filter: blur(12px);
  animation: wf-wind 6s infinite alternate;
}
@keyframes wf-wind {
  0% { transform: translate(-5%, 3%) scale(1); }
  100% { transform: translate(5%, -3%) scale(1.05); }
}
.weifang .wf-hero h1 {
  font-size: clamp(38px, 7vw, 68px);
  color: #4ade80;
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.weifang .sub {
  color: #86efac;
  z-index: 2;
  margin-top: 8px;
}
.weifang .wf-grid {
  max-width: 950px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
.weifang .wf-card {
  padding: 24px;
  background: #162016;
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 85%);
  border: 2px dashed #22c55e;
  transition: 0.3s;
  position: relative;
}
.weifang .wf-card:hover {
  transform: translateY(-4px) rotate(2deg);
  background: #1c2b1c;
}
</style>
