<template>
  <div class="city-page jining">
    <div class="jn-hero">
      <h1>济宁</h1>
      <p class="sub">运河之都·礼乐之乡</p>
    </div>
    <section class="jn-col">
      <div class="jn-step"><h3>📜 太白楼</h3><p>李白赋诗运河畔</p></div>
      <div class="jn-step"><h3>🌊 南旺分水枢纽</h3><p>古代水利运河心</p></div>
      <div class="jn-step"><h3>⛰️ 水泊梁山</h3><p>替天行道忠义堂</p></div>
    </section>
  </div>
</template>

<style scoped>
.jining {
  background: #dde0e9af;
  color: #fefce8;
  font-family: "STKaiti", "KaiTi", serif;
  min-height: 100vh;
}
.jining .jn-hero {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: repeating-linear-gradient(0deg, transparent 0px, transparent 14px, rgba(217,119,6,0.08) 14px, rgba(217,119,6,0.08) 15px),
    radial-gradient(circle at 50% 100%, rgba(30,58,138,0.3) 0%, transparent 50%);
}
.jining .jn-hero::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 40%;
  bottom: 0;
  left: 0;
  background: repeating-radial-gradient(circle at 50% 100%, transparent 0px, transparent 8px, rgba(217,119,6,0.04) 8px, rgba(217,119,6,0.04) 9px);
  filter: blur(1px);
  animation: jn-water 8s infinite alternate;
}
@keyframes jn-water {
  0% { transform: translateX(0); }
  100% { transform: translateX(20px); }
}
.jining .jn-hero h1 {
  font-size: clamp(44px, 8vw, 80px);
  color: #fef08a;
  z-index: 2;
  letter-spacing: 0.25em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
.jining .sub {
  color: #fde047;
  z-index: 2;
  margin-top: 8px;
}
.jining .jn-col {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-left: 2px solid #d97706;
  padding-left: 32px;
}
.jining .jn-step {
  padding: 20px;
  background: rgba(30,58,138,0.15);
  border-radius: 0 12px 12px 0;
  position: relative;
  transition: 0.3s;
}
.jining .jn-step::before {
  content: "";
  position: absolute;
  left: -41px;
  top: 20px;
  width: 14px;
  height: 14px;
  background: #d97706;
  border-radius: 50%;
  box-shadow: 0 0 8px #d97706;
}
.jining .jn-step:hover {
  background: rgba(241,243,248,0.9);
  transform: translateX(6px);
}
</style>
