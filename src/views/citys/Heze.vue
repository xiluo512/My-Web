<template>
  <div class="city-page heze">
    <div class="hz-hero">
      <h1>菏泽</h1>
      <p class="sub">中国牡丹之都·戏曲之乡</p>
    </div>
    <section class="hz-bloom">
      <div class="hz-petal"><h3>🌺 曹州牡丹园</h3><p>世界最大色千品</p></div>
      <div class="hz-petal"><h3>🥋 水浒好汉城</h3><p>郓城古建武市井</p></div>
      <div class="hz-petal"><h3>🎭 山东梆子戏台</h3><p>高亢悲壮活态传</p></div>
    </section>
  </div>
</template>

<style scoped>
.heze {
  background: #e7e0e6;
  color: #ca3030;
  font-family: "KaiTi", serif;
  min-height: 100vh;
}
.heze .hz-hero {
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(180deg, rgba(26,10,20,0) 0%, rgba(26,10,20,0.8) 100%),
    radial-gradient(circle at 30% 40%, rgba(157,23,77,0.3) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(245,158,11,0.2) 0%, transparent 45%);
}
.heze .hz-hero::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(157,23,77,0.1) 0%, rgba(157,23,77,0.05) 25%, transparent 50%, rgba(157,23,77,0.05) 75%, rgba(157,23,77,0.1) 100%);
  animation: hz-curtain 10s infinite alternate;
}
.heze .hz-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(157,23,77,0.08) 40%, transparent 60%);
  animation: hz-bloom 8s infinite ease-in-out;
}
@keyframes hz-curtain {
  0% { transform: scaleX(1) skewX(0); }
  100% { transform: scaleX(1.02) skewX(1deg); }
}
@keyframes hz-bloom {
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 0.7; transform: scale(1.05); }
}
.heze .hz-hero h1 {
  font-size: clamp(44px, 8vw, 80px);
  color: #f9a8d4;
  z-index: 2;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 16px rgba(157,23,77,0.6);
}
.heze .sub {
  color: #fde68a;
  z-index: 2;
  margin-top: 8px;
}
.heze .hz-bloom {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
.heze .hz-petal {
  width: 80%;
  padding: 24px;
  background: rgba(157,23,77,0.08);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  border: 1px solid rgba(190,24,93,0.3);
  text-align: center;
  transition: 0.4s;
  backdrop-filter: blur(4px);
}
.heze .hz-petal:hover {
  background: rgba(157,23,77,0.15);
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(157,23,77,0.3);
}
</style>
