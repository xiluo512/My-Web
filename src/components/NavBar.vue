<template>
  <header class="navbar">
    <div class="logo">
      <router-link to="/">齐鲁神韵 <span>SHANDONG TOURISM</span></router-link>
    </div>
    <nav>
      <router-link to="/index">首页</router-link>

      <div class="dropdown">
        <span>好客山东 ▾</span>
        <div class="dropdown-content">
          <router-link v-for="city in cities" :key="city.name" :to="city.path">
            {{ city.name }}
          </router-link>
        </div>
      </div>

      <router-link to="/culture">文化体验</router-link>
      <router-link to="/food">鲁菜美食</router-link>
      <router-link to="/route">AI 行程</router-link>
      <router-link to="/forum">旅行论坛</router-link>
      <router-link to="/" class="btn-login">登录</router-link>
    </nav>
  </header>
</template>

<script setup>
const cities = [
  { name: '济南市', path: '/jinan' },
  { name: '青岛市', path: '/qingdao' },
  { name: '淄博市', path: '/zibo' },
  { name: '枣庄市', path: '/zaozhuang' },
  { name: '东营市', path: '/dongying' },
  { name: '烟台市', path: '/yantai' },
  { name: '潍坊市', path: '/weifang' },
  { name: '济宁市', path: '/jining' },
  { name: '泰安市', path: '/taian' },
  { name: '威海市', path: '/weihai' },
  { name: '日照市', path: '/rizhao' },
  { name: '临沂市', path: '/linyi' },
  { name: '德州市', path: '/dezhou' },
  { name: '聊城市', path: '/liaocheng' },
  { name: '滨州市', path: '/binzhou' },
  { name: '菏泽市', path: '/heze' }
]
</script>

<style scoped>
/* 原导航 CSS 请粘贴至此，注意使用 scoped 隔离 */
.navbar { display: flex; justify-content: space-between; padding: 1rem 2rem; align-items: center; }
.dropdown { position: relative; cursor: pointer; }
.dropdown-content { display: none; position: absolute; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.dropdown:hover .dropdown-content { display: block; }
.dropdown-content a { display: block; padding: 0.5rem 1rem; text-decoration: none; color: #333; }
.btn-login { padding: 0.5rem 1rem; background: #e67e22; color: #fff; border-radius: 4px; text-decoration: none; }
</style>