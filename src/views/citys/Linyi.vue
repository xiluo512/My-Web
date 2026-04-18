<template>
  <div class="city-page linyi">
    <div class="ly-hero">
      <h1>临沂</h1>
      <p class="sub">沂蒙精神·书圣故里</p>
    </div>
    <section class="ly-abs">
      <div class="ly-card" style="grid-area:1/1/2/2"><h3>🖋️ 王羲之故居</h3><p>洗砚池畔墨香传</p></div>
      <div class="ly-card" style="grid-area:2/2/3/3"><h3>🎖️ 沂蒙革命馆</h3><p>红嫂精神党群碑</p></div>
      <div class="ly-card" style="grid-area:1/3/2/4"><h3>⛰️ 蒙山旅游区</h3><p>天然氧吧峡谷深</p></div>
    </section>
  </div>
</template>

<style scoped>
.linyi {
  background: #a06148db;
  color: #fefce8;
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
}
.linyi .ly-hero {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(180deg, rgba(26,15,10,0.9) 0%, rgba(26,15,10,0.6) 100%);
}
.linyi .ly-hero::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(135deg, #1a0f0a 0%, #1a0f0a 40%, transparent 40%),
    linear-gradient(145deg, #1a0f0a 0%, #1a0f0a 50%, transparent 50%),
    linear-gradient(125deg, #1a0f0a 0%, #1a0f0a 35%, transparent 35%);
  clip-path: polygon(0% 100%, 10% 40%, 25% 80%, 40% 30%, 55% 70%, 70% 20%, 85% 60%, 100% 10%);
  filter: blur(1px);
  opacity: 0.4;
  animation: ly-mtn 15s infinite alternate;
}
@keyframes ly-mtn {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}
.linyi .ly-hero h1 {
  font-size: clamp(44px, 8vw, 80px);
  color: #fecaca;
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.linyi .sub {
  color: #fde68a;
  z-index: 2;
  margin-top: 8px;
}
.linyi .ly-abs {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.linyi .ly-card {
  padding: 24px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(153,27,27,0.3);
  backdrop-filter: blur(4px);
  transition: 0.3s;
}
.linyi .ly-card:hover {
  background: rgba(255,255,255,0.06);
  transform: translateY(-4px);
}
</style>
