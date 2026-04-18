<template>
  <div class="city-page liaocheng">
    <div class="lc-hero">
      <div class="lc-water"></div>
      <h1>聊城</h1>
      <p class="sub">江北水城·运河古都</p>
    </div>
    <section class="lc-grid">
      <div class="lc-card"><h3>🏯 光岳楼</h3><p>明代楼阁冠天下，四百年巍然不动</p></div>
      <div class="lc-card"><h3>🛶 东昌湖</h3><p>江北最大城内湖，环湖碧波映古城</p></div>
      <div class="lc-card"><h3>🎭 山陕会馆</h3><p>运河商贸繁华地，砖雕石刻叹精工</p></div>
    </section>
  </div>
</template>

<style scoped>
.liaocheng {
  background: #0e1a2e;
  color: #e2e8f0;
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
}
.liaocheng .lc-hero {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(ellipse at 50% 80%, rgba(14,116,144,0.25) 0%, transparent 60%),
    linear-gradient(180deg, #0e1a2e 0%, #162a40 100%);
}
.liaocheng .lc-water {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 6px,
    rgba(14,116,144,0.06) 6px,
    rgba(14,116,144,0.06) 7px
  );
  animation: lc-ripple 6s infinite alternate;
}
@keyframes lc-ripple {
  0% { transform: translateX(0) scaleY(1); }
  100% { transform: translateX(10px) scaleY(1.02); }
}
.liaocheng .lc-hero h1 {
  font-size: clamp(44px, 8vw, 80px);
  color: #67e8f9;
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 16px rgba(14,116,144,0.5);
}
.liaocheng .sub {
  color: #a5f3fc;
  z-index: 2;
  margin-top: 8px;
  letter-spacing: 0.4em;
}
.liaocheng .lc-grid {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.liaocheng .lc-card {
  padding: 28px;
  background: rgba(14,116,144,0.08);
  border: 1px solid rgba(14,116,144,0.25);
  border-radius: 16px;
  backdrop-filter: blur(6px);
  transition: 0.3s;
}
.liaocheng .lc-card:hover {
  background: rgba(14,116,144,0.15);
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(14,116,144,0.2);
}
</style>
