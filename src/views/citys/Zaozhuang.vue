<template>
  <div class="city-page zaozhuang">
    <div class="zz-hero">
      <h1>枣庄</h1>
      <p class="sub">运河古城·榴花似火</p>
      <div class="zz-scroll">
        <div class="zz-item"><h4>🛶 台儿庄</h4><p>桨声灯影活水乡</p></div>
        <div class="zz-item"><h4>🌺 冠世榴园</h4><p>五月红霞照青山</p></div>
        <div class="zz-item"><h4>🎬 铁道影视城</h4><p>芦苇烽火刻铁轨</p></div>
      </div>
    </div>
    <section class="zz-line"></section>
  </div>
</template>

<style scoped>
.zaozhuang {
  background: #0f1a15;
  color: #e2e8f0;
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
}
.zaozhuang .zz-hero {
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: radial-gradient(ellipse at 50% 100%, rgba(85,107,47,0.25) 0%, transparent 60%),
    repeating-linear-gradient(90deg, rgba(47,79,79,0.15) 0px, rgba(47,79,79,0.15) 1px, transparent 1px, transparent 18px),
    linear-gradient(180deg, #0f1a15, #1a2a20);
}
.zaozhuang .zz-hero::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(90deg, #556b2f, #dc143c, #556b2f);
  filter: blur(2px);
  opacity: 0.6;
}
.zaozhuang .zz-hero h1 {
  font-size: clamp(40px, 7vw, 76px);
  letter-spacing: 0.15em;
}
.zaozhuang .sub {
  color: #94a3b8;
  margin: 8px 0 32px;
  letter-spacing: 0.5em;
}
.zaozhuang .zz-scroll {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 20px 0;
  scroll-snap-type: x mandatory;
  width: 90%;
  max-width: 1000px;
  scrollbar-width: none;
}
.zaozhuang .zz-scroll::-webkit-scrollbar {
  display: none;
}
.zaozhuang .zz-item {
  min-width: 260px;
  padding: 28px;
  background: rgba(47,79,79,0.4);
  border: 1px solid #556b2f;
  border-radius: 4px;
  scroll-snap-align: center;
  transition: 0.3s;
  position: relative;
  overflow: hidden;
}
.zaozhuang .zz-item::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #dc143c;
}
.zaozhuang .zz-item:hover {
  background: rgba(47,79,79,0.6);
  transform: scale(1.03);
}
.zaozhuang .zz-line {
  height: 40px;
  background: repeating-linear-gradient(90deg, #1e293b 0px, #1e293b 2px, transparent 2px, transparent 12px);
  opacity: 0.3;
}
</style>
