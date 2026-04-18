<template>
  <div class="city-page yantai">
    <div class="yt-hero">
      <div class="yt-orb"></div>
      <h1>烟台</h1>
      <p class="sub">仙境海岸·百年酒香</p>
    </div>
    <section class="yt-masonry">
      <div class="yt-card"><h3>🍷 张裕地下酒窖</h3><p>百年橡木桶恒温，解百纳东方风味</p></div>
      <div class="yt-card"><h3>🏔️ 蓬莱阁云海</h3><p>八仙过海传说地，海市蜃楼奇观</p></div>
      <div class="yt-card"><h3>🏝️ 养马岛环岛</h3><p>北方小马尔代夫，浅滩清澈见底</p></div>
    </section>
  </div>
</template>

<style scoped>
.yantai {
  background: #dfe8e8;
  color: #f1f5f9;
  font-family: Georgia, serif;
  min-height: 100vh;
}
.yantai .yt-hero {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 20% 30%, #3a2a5a 0%, #1a1a3a 40%, #0f0f1a 80%),
    linear-gradient(to top, rgba(106,90,205,0.08), transparent);
  position: relative;
}
.yantai .yt-orb {
  width: 180px;
  height: 180px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 8px 32px rgba(106,90,205,0.3);
  animation: yt-float 4s ease-in-out infinite;
}
@keyframes yt-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
.yantai .yt-hero h1 {
  font-size: clamp(40px, 7vw, 72px);
  color: #e0e7ff;
  z-index: 2;
  letter-spacing: 0.12em;
}
.yantai .sub {
  color: #cbd5e1;
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
}
.yantai .yt-masonry {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.yantai .yt-card {
  background: rgba(67,82,192,0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
  transform: perspective(800px) rotateX(2deg);
  transition: 0.4s;
  padding: 28px;
  border-radius: 16px;
}
.yantai .yt-card:hover {
  transform: perspective(800px) rotateX(0) scale(1.02);
  box-shadow: 0 20px 40px rgba(106,90,205,0.25);
}
</style>
