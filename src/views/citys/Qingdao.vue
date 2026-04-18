<template>
  <div class="city-page qingdao">
    <div class="qd-hero">
      <div class="qd-wave"></div>
      <h1>青岛</h1>
      <p class="sub">红瓦绿树·碧海蓝天·欧韵今风</p>
    </div>
    <section class="qd-masonry">
      <div class="qd-item"><div class="qd-overlay"><h4>🏘️ 八大关</h4><p>万国建筑博览，四季花树掩映街区</p></div></div>
      <div class="qd-item"><div class="qd-overlay"><h4>🌉 栈桥回澜</h4><p>百年长虹远引，鸥鸟伴潮音</p></div></div>
      <div class="qd-item"><div class="qd-overlay"><h4>🍺 啤酒博物馆</h4><p>百年酵母麦香，原浆泡沫的工业浪漫</p></div></div>
    </section>
  </div>
</template>

<style scoped>
.qingdao {
  --primary: #f59e0b;
  background: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
}
.qingdao .qd-hero {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0c4a6e, #0f172a);
  position: relative;
  overflow: hidden;
}
.qingdao .qd-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,30 Q300,60 600,30 T1200,30 V60 H0 Z' fill='%230f172a'/%3E%3C/svg%3E") repeat-x;
  background-size: 1200px 60px;
  animation: qd-w 5s linear infinite;
}
@keyframes qd-w {
  to { background-position: -1200px 0; }
}
.qingdao .qd-hero h1 {
  font-size: clamp(38px, 7vw, 68px);
  color: var(--primary);
  letter-spacing: 0.15em;
  z-index: 2;
}
.qingdao .sub {
  color: #94a3b8;
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
}
.qingdao .qd-masonry {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.qingdao .qd-item {
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #1e293b, #334155);
  transition: 0.3s;
}
.qingdao .qd-item:hover { transform: scale(1.02); }
.qingdao .qd-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15,23,42,0.85), transparent);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 16px;
}
.qingdao .qd-overlay h4 { color: var(--primary); margin-bottom: 4px; }
</style>
