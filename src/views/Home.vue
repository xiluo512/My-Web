<template>
  <section class="hero">
    <h1>好客山东，礼仪之邦</h1>
    <p>一山一水一圣人，一曲黄河入海流</p>
    <router-link to="/food" class="btn-primary">开启齐鲁之旅</router-link>
  </section>

  <section class="destinations">
    <h2>齐鲁必游胜地</h2>
    <div class="card-grid">
      <div class="card" v-for="spot in spots" :key="spot.title">
        <h3>{{ spot.title }}</h3>
        <p>{{ spot.desc }}</p>
      </div>
    </div>
  </section>

  <section class="culture-preview">
    <h2>齐鲁非遗文化</h2>
    <ul>
      <li v-for="item in cultureList" :key="item">{{ item }}</li>
    </ul>
    <router-link to="/culture">探索更多文化</router-link>
  </section>

  <section class="routes">
    <h2>精选游玩路线</h2>
    <router-link to="/planning" class="btn-outline">定制我的行程</router-link>
  </section>
</template>

<script setup>
const spots = [
  { title: '泰安 · 泰山', desc: '五岳独尊，天下第一山。看旭日东升，观云海玉盘...' },
  { title: '济宁 · 曲阜三孔', desc: '孔庙、孔府、孔林。走进儒家文化的发源地...' },
  { title: '济南 · 趵突泉', desc: '天下第一泉，四面荷花三面柳...' },
  { title: '烟台 · 蓬莱阁', desc: '人间仙境，八仙过海...' }
]

const cultureList = [
  '潍坊风筝：世界风筝之都...',
  '淄博陶瓷琉璃：千年瓷都...',
  '山东皮影戏：光影之间的传奇...',
  '杨家埠木版年画：色彩鲜艳，构图饱满...'
]
</script>

<style scoped>
/* 原首页 CSS 请粘贴至此 */
.hero { text-align: center; padding: 4rem 1rem; background: linear-gradient(135deg, #f5f7fa, #c3cfe2); }
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; padding: 2rem; }
.btn-primary, .btn-outline { display: inline-block; margin-top: 1rem; padding: 0.8rem 1.5rem; border-radius: 4px; text-decoration: none; }
.btn-primary { background: #e67e22; color: #fff; }
.btn-outline { border: 2px solid #e67e22; color: #e67e22; }
</style>