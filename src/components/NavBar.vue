<template>
  <header class="navbar">
    <div class="logo">
      <router-link to="/">齐鲁神韵 <span>SHANDONG TOURISM</span></router-link>
    </div>
    <nav>
      <router-link to="/">首页</router-link>

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
      <router-link to="/planning">路线规划</router-link>
      <router-link to="/forum">旅行论坛</router-link>
      <router-link to="/login" class="btn-login">登录</router-link>
    </nav>
  </header>
</template>

<script setup>
const cities = [
  { name: '济南市', path: '/city/jinan' },
  { name: '青岛市', path: '/city/qingdao' },
  { name: '淄博市', path: '/city/zibo' },
  // 其他城市可按需补充...
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