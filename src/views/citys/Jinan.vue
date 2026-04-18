<template>
  <div class="city-page jinan">
    <div class="jn-hero">
      <div class="jn-ripple"></div>
      <h1>泉城济南</h1>
      <p class="sub">四面荷花三面柳·一城山色半城湖</p>
    </div>
    <section class="jn-grid">
      <div class="jn-card"><h3>💧 趵突泉</h3><p>三窟并发腾空，声若隐雷震历下</p></div>
      <div class="jn-card"><h3>🌊 大明湖</h3><p>历下秋风泛舟，超然楼夜揽星河</p></div>
      <div class="jn-card"><h3>🛶 曲水亭街</h3><p>家家泉水垂杨，青石巷藏老城烟火</p></div>
    </section>
  </div>
</template>

<style scoped>
.jinan {
  --primary: #2563eb;
  background: #f0f7f4;
  color: #2c3e50;
  font-family: "KaiTi", serif;
  min-height: 100vh;
}
.jinan .jn-hero {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #e0f2fe, #f8fafc);
  position: relative;
  overflow: hidden;
}
.jinan .jn-ripple {
  width: 200px;
  height: 200px;
  border: 2px solid rgba(37, 99, 235, 0.3);
  border-radius: 50%;
  animation: jn-r 3s infinite linear;
  position: absolute;
}
.jinan .jn-ripple::before {
  content: "";
  position: absolute;
  inset: -30px;
  border: 1px dashed rgba(37, 99, 235, 0.2);
  border-radius: 50%;
  animation: jn-r 4s infinite linear reverse;
}
@keyframes jn-r {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}
.jinan .jn-hero h1 {
  font-size: clamp(40px, 7vw, 72px);
  color: var(--primary);
  letter-spacing: 0.25em;
  z-index: 2;
}
.jinan .sub {
  color: #64748b;
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
}
.jinan .jn-grid {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.jinan .jn-card {
  background: #fff;
  border-left: 4px solid var(--primary);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  transition: 0.3s;
}
.jinan .jn-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(37,99,235,0.15);
}
</style>
