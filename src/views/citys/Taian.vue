<template>
  <div class="city-page taian">
    <div class="ta-hero">
      <div class="ta-mtn"></div>
      <h1>岱宗儒风</h1>
      <p class="sub">登泰山而小天下·游三孔而知礼乐</p>
    </div>
    <section class="ta-steps">
      <div class="ta-step"><h3>🌄 泰山日出</h3><p>五岳独尊十八盘，云海玉盘迎旭光</p></div>
      <div class="ta-step"><h3>📜 曲阜三孔</h3><p>古柏森森碑碣立，杏坛弦歌传礼乐</p></div>
      <div class="ta-step"><h3>🏛️ 尼山圣境</h3><p>金声玉振演哲思，古典重生当代场</p></div>
    </section>
  </div>
</template>

<style scoped>
.taian {
  background: #1c1917;
  color: #e7e5e4;
  font-family: "Noto Serif SC", serif;
  min-height: 100vh;
}
.taian .ta-hero {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 30%, #292524, #1c1917);
  position: relative;
}
.taian .ta-mtn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(to top, #44403c, transparent);
  clip-path: polygon(0% 100%, 30% 40%, 60% 70%, 100% 30%);
  opacity: 0.3;
}
.taian .ta-hero h1 {
  font-size: clamp(42px, 8vw, 78px);
  color: #b45309;
  letter-spacing: 0.3em;
  z-index: 2;
}
.taian .sub {
  color: #d6d3d1;
  font-size: 18px;
  letter-spacing: 0.4em;
  z-index: 2;
  margin-top: 10px;
}
.taian .ta-steps {
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.taian .ta-step {
  padding: 24px;
  border-left: 3px solid #d6d3d1;
  background: #292524;
  border-radius: 0 12px 12px 0;
  position: relative;
}
.taian .ta-step::before {
  content: "";
  position: absolute;
  left: -8px;
  top: 24px;
  width: 12px;
  height: 12px;
  background: #b45309;
  border-radius: 50%;
}
</style>
