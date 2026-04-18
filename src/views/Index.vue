<template>
  <div class="index-page">
    <!-- 顶部导航栏 -->
    <header class="main-header">
      <div class="logo">
        <h1>齐鲁神韵</h1>
        <span>SHANDONG TOURISM</span>
      </div>
      <nav>
        <ul>
          <li><a href="#" class="active" @click.prevent>首页</a></li>

          <!-- 目的地下拉菜单 -->
          <li class="destinations-nav" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
            <a href="#destinations" @click.prevent>好客山东 ▾</a>
            <transition name="fade-slide">
              <div v-show="showDropdown" class="province-cities-dropdown">
                <div class="cities-grid">
                  <router-link
                    v-for="city in cities"
                    :key="city.name"
                    :to="city.path"
                    class="city-link"
                    @click="showDropdown = false"
                  >
                    {{ city.name }}
                  </router-link>
                </div>
              </div>

            </transition>
          </li>

          <li><router-link to="/culture">文化体验</router-link></li>
          <li><router-link to="/food">鲁菜美食</router-link></li>
          <li><a href="#planning" @click.prevent="scrollToPlanning">路线规划</a></li>
          <li><router-link to="/forum">旅行论坛</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h2>好客山东，礼仪之邦</h2>
        <p>一山一水一圣人，一曲黄河入海流</p>
        <a href="#destinations" class="btn" @click.prevent="scrollToDestinations">开启齐鲁之旅</a>
      </div>
    </section>

    <!-- 热门目的地 -->
    <section id="destinations" class="container">
      <h2 class="section-title">齐鲁必游胜地</h2>
      <div class="grid-container">
        <div
          class="card"
          v-for="spot in spots"
          :key="spot.title"
          @click="handleCardClick(spot)"
        >
          <div class="card-img" :style="{ backgroundImage: `url(${spot.image})` }"></div>
          <div class="card-info">
            <h3>{{ spot.title }}</h3>
            <p>{{ spot.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 文化介绍 -->
    <section id="culture" class="culture-section">
      <div class="flex-row">
        <div class="text-block">
          <h2 class="section-title left-align">齐鲁非遗文化</h2>
          <p>齐鲁大地历史悠久，文化底蕴深厚。从精美的手工艺到古老的戏曲，每一项非遗都是历史的活化石。</p>
          <ul class="feature-list">
            <li v-for="item in cultureItems" :key="item.title">
              <strong>{{ item.title }}：</strong> {{ item.desc }}
            </li>
          </ul>
          <router-link to="/culture" class="btn-outline">探索更多文化</router-link>
        </div>
        <div class="image-block">
          <img src="@/assets/culture.jpg" alt="山东非遗文化" @error="handleImageError">
        </div>
      </div>
    </section>

    <!-- 地域美食 -->
    <section id="food" class="container">
      <h2 class="section-title">舌尖上的山东</h2>
      <div class="grid-container">
        <div
          class="card"
          v-for="dish in dishes"
          :key="dish.title"
          @click="handleCardClick(dish)"
        >
          <div class="card-img" :style="{ backgroundImage: `url(${dish.image})` }"></div>
          <div class="card-info">
            <h3>{{ dish.title }}</h3>
            <p>{{ dish.desc }}</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-40">
        <router-link to="/food" class="btn">寻味齐鲁</router-link>
      </div>
    </section>

    <!-- 路线规划 -->
    <section id="planning" class="culture-section" ref="planningRef">
      <div class="flex-row">
        <div class="image-block">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="山东旅游地图" @error="handleImageError">
        </div>
        <div class="text-block">
          <h2 class="section-title left-align">精选游玩路线</h2>
          <p>无论是寻根问祖、登山祈福，还是海滨度假，山东都能满足您对旅行的所有想象。</p>
          <ul class="feature-list">
            <li v-for="route in routes" :key="route.title">
              <strong>{{ route.title }}：</strong> {{ route.desc }}
            </li>
          </ul>
          <a href="#" class="btn-outline" @click.prevent="handleCustomRoute">定制我的行程</a>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer>
      <p>© 2023 齐鲁神韵旅游平台 | 好客山东欢迎您</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showDropdown = ref(false)
const planningRef = ref(null)

// 城市列表数据（用于下拉菜单）
const cities = ref([
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
])

// 热门景点数据
const spots = ref([
  {
    title: '泰安 · 泰山',
    desc: '五岳独尊，天下第一山。看旭日东升，观云海玉盘，感受帝王封禅的庄严与雄伟。',
    image: '@/assets/taishan.jpg',
    path: '/spot/taishan'
  },
  {
    title: '济宁 · 曲阜三孔',
    desc: '孔庙、孔府、孔林。走进儒家文化的发源地，追寻至圣先师孔子的足迹。',
    image: '@/assets/sankong.jpg',
    path: '/spot/sankong'
  },
  {
    title: '济南 · 趵突泉',
    desc: '天下第一泉，四面荷花三面柳。在泉水叮咚中，体验老济南的悠闲与惬意。',
    image: '@/assets/baotuquan.jpg',
    path: '/spot/baotuquan'
  },
  {
    title: '烟台 · 蓬莱阁',
    desc: '人间仙境，八仙过海。探寻海市蜃楼的奥秘，眺望黄渤海分界线的奇观。',
    image: '@/assets/penglai.jpg',
    path: '/spot/penglai'
  }
])

// 非遗文化数据
const cultureItems = ref([
  { title: '潍坊风筝', desc: '世界风筝之都，扎制技艺精湛，放飞理想与希望。' },
  { title: '淄博陶瓷琉璃', desc: '千年瓷都，雨点釉与鸡油黄，展现泥土与火的艺术。' },
  { title: '山东皮影戏', desc: '光影之间的传奇，唱腔淳朴流畅，造型古朴典雅。' },
  { title: '杨家埠木版年画', desc: '色彩鲜艳，构图饱满，寄托着人们对美好生活的向往。' }
])

// 美食数据
const dishes = ref([
  {
    title: '济南 · 九转大肠',
    desc: '鲁菜经典，酸、甜、香、辣、咸五味俱全。色泽红润，质地软嫩，回味无穷。',
    image: '@/assets/jiuzhuanchang.jpg'
  },
  {
    title: '青岛啤酒',
    desc: '喝袋装啤酒，吃辣炒蛤蜊。感受海滨城市的豪爽与清凉，夏日夜晚的绝配。',
    image: '@/assets/qingdao-beer.jpg'
  },
  {
    title: '临沂/泰安 · 煎饼卷大葱',
    desc: '山东人的硬核早餐。五谷杂粮制成的煎饼，配上章丘大葱和甜面酱，越嚼越香。',
    image: '@/assets/jianbing.jpg'
  },
  {
    title: '胶东 · 鲅鱼水饺',
    desc: '个大馅足，鲜嫩多汁。选用新鲜鲅鱼肉，去刺搅打上劲，一口咬下满嘴鲜香。',
    image: '@/assets/bayujiaozi.jpg'
  }
])

// 游玩路线数据
const routes = ref([
  {
    title: '一山一水一圣人线',
    desc: '济南(趵突泉) → 泰安(泰山) → 曲阜(三孔)。经典中的经典，领略山东文化精髓。'
  },
  {
    title: '黄金海岸度假线',
    desc: '青岛(栈桥/八大关) → 威海(刘公岛) → 烟台(蓬莱)。吹海风、吃海鲜、住海景房。'
  },
  {
    title: '齐国故都探秘线',
    desc: '淄博(齐国故城博物馆) → 青州(古城) → 潍坊(风筝博物馆)。探寻春秋战国历史。'
  },
  {
    title: '黄河入海生态线',
    desc: '东营(黄河口湿地) → 滨州(孙子兵法城)。看黄蓝交汇，观候鸟迁徙。'
  }
])

// 事件处理
const handleCardClick = (item) => {
  if (item.path) {
    router.push(item.path)
  }
}

const scrollToDestinations = () => {
  document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToPlanning = () => {
  document.getElementById('planning')?.scrollIntoView({ behavior: 'smooth' })
}

const handleCustomRoute = () => {
  // 实际项目中可跳转到路线规划页面或打开模态框
  alert('即将跳转到路线规划页面')
  // router.push('/planning')
}

const handleImageError = (e) => {
  // 图片加载失败时的降级处理
  e.target.src = '@/assets/placeholder.jpg'
}
</script>

<style scoped>
/* ========== 基础重置 ========== */
* { margin: 0; padding: 0; box-sizing: border-box; }

.index-page {
  font-family: 'Noto Serif SC', serif;
  background-color: #f9f9f9;
  color: #333;
  scroll-behavior: smooth;
}

a { text-decoration: none; color: inherit; transition: 0.3s; }
ul { list-style: none; }

/* ========== 顶部导航栏 ========== */
.main-header {
  background-color: rgba(44, 62, 80, 0.95);
  backdrop-filter: blur(10px);
  color: #fff;
  padding: 0 50px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.logo h1 { font-size: 24px; letter-spacing: 2px; font-weight: 700; }
.logo span { font-size: 10px; letter-spacing: 1px; opacity: 0.7; display: block; }

nav ul { display: flex; gap: 30px; }
nav ul li { position: relative; }
nav ul li a { font-size: 16px; font-weight: 500; padding: 10px 0; display: block; }
nav ul li a:hover, nav ul li a.active { color: #d4af37; }

/* 下拉菜单 */
.province-cities-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 20px;
  width: 600px;
  margin-top: 15px;
  z-index: 1001;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.city-link {
  display: block;
  padding: 8px 5px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  border: 1px solid transparent;
}

.city-link:hover {
  background-color: #d4af37;
  color: #fff;
  transform: translateY(-2px);
}

/* 下拉动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

/* ========== Hero Section ========== */
.hero {
  height: 80vh;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  margin-top: 0;
}

.hero-content h2 {
  font-size: 56px;
  margin-bottom: 20px;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.hero-content p {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.btn {
  padding: 15px 40px;
  background: #d4af37;
  color: #fff;
  border-radius: 50px;
  font-weight: bold;
  display: inline-block;
  transition: 0.3s;
}

.btn:hover {
  background: #b59020;
  transform: scale(1.05);
}

/* ========== 通用容器 ========== */
.container {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
  color: #2c3e50;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #d4af37;
  margin: 15px auto 0;
  border-radius: 2px;
}

.section-title.left-align {
  text-align: left;
}
.section-title.left-align::after {
  margin: 15px 0 0;
}

/* 卡片网格 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}

.card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  transition: 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.card-img {
  height: 220px;
  background-size: cover;
  background-position: center;
  transition: 0.5s;
}

.card:hover .card-img {
  transform: scale(1.1);
}

.card-info {
  padding: 25px;
  position: relative;
  background: #fff;
  z-index: 1;
}

.card-info h3 {
  margin-bottom: 10px;
  color: #2c3e50;
  font-size: 20px;
}

.card-info p {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

/* ========== 图文混排 section ========== */
.culture-section {
  background-color: #fff;
  padding: 80px 0;
}

.flex-row {
  display: flex;
  align-items: center;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-block { flex: 1; }
.image-block { flex: 1; position: relative; }
.image-block img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.feature-list { margin: 25px 0; }
.feature-list li {
  margin-bottom: 15px;
  padding-left: 25px;
  position: relative;
  color: #555;
  line-height: 1.6;
}

.feature-list li::before {
  content: '✦';
  color: #d4af37;
  position: absolute;
  left: 0;
  font-size: 18px;
  top: -2px;
}

.btn-outline {
  padding: 12px 30px;
  border: 2px solid #d4af37;
  color: #d4af37;
  border-radius: 50px;
  display: inline-block;
  font-weight: 600;
  margin-top: 10px;
}

.btn-outline:hover {
  background: #d4af37;
  color: #fff;
}

/* ========== Footer ========== */
footer {
  background: #2c3e50;
  color: #ecf0f1;
  text-align: center;
  padding: 40px;
  margin-top: 0;
}

footer p {
  opacity: 0.7;
  font-size: 14px;
}

/* 工具类 */
.text-center { text-align: center; }
.mt-40 { margin-top: 40px; }

/* ========== 响应式适配 ========== */
@media (max-width: 768px) {
  .flex-row { flex-direction: column; }
  .hero-content h2 { font-size: 36px; }
  .main-header { padding: 0 20px; }
  nav ul { display: none; } /* 移动端暂隐菜单，实际项目可添加汉堡菜单 */
  .province-cities-dropdown { width: 90vw; }
  .cities-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>