<template>
  <div class="city-page binzhou">
    <div class="bz-hero">
      <div class="bz-grid-bg"></div>
      <h1>滨州</h1>
      <p class="sub">孙子故里·渤海明珠</p>
    </div>
    <section class="bz-grid">
      <div class="bz-card"><h3>⚔️ 孙子兵法城</h3><p>汉代风格建筑群，沉浸式兵学体验</p></div>
      <div class="bz-card"><h3>🏰 魏氏庄园</h3><p>清代军事防御民居，北方罕见古堡</p></div>
      <div class="bz-card"><h3>🎡 渤海之眼摩天轮</h3><p>无轴式巨型景观，夜游地标光影</p></div>
    </section>
  </div>
</template>

<style scoped>
.binzhou {
  background: #b45309;
  color: #dfe8e8;
  min-height: 100vh;
}
.binzhou .bz-hero {
  height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e0e7ff;
  background-image: radial-gradient(circle at 50% 50%, rgba(178,34,34,0.08) 0%, transparent 70%),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 100% 100%, 40px 40px, 40px 40px;
  position: relative;
  overflow: hidden;
}
.binzhou .bz-grid-bg {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(178,34,34,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(178,34,34,0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: bz-move 10s linear infinite;
}
@keyframes bz-move {
  to { background-position: 40px 40px; }
}
.binzhou .bz-hero h1 {
  font-size: clamp(40px, 7vw, 72px);
  color: #fecaca;
  z-index: 2;
  letter-spacing: 0.1em;
}
.binzhou .sub {
  color: #94a3b8;
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
}
.binzhou .bz-grid {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.binzhou .bz-card {
  background: #142a14;
  border: 2px solid #dfe8e8;
  border-radius: 8px;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
  padding: 24px;
  transition: 0.3s;
}
.binzhou .bz-card:hover {
  border-color: #B22222;
  transform: translateY(-4px);
}
</style>
