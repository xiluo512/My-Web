<template>
  <div class="food-page">
    <!-- 顶部导航栏 -->
    <header class="main-header">
      <div class="logo">
        <h1>齐鲁神韵</h1>
        <span>SHANDONG CUISINE</span>
      </div>
      <nav>
        <ul>
          <li><router-link to="/index">首页</router-link></li>

          <li class="destinations-nav">
            <a href="#categories" @click.prevent="scrollToCategories">好客山东 ▾</a>
            <div class="province-cities-dropdown">
              <div class="cities-grid">
                <router-link
                  v-for="city in cities"
                  :key="city.name"
                  :to="city.path"
                  class="city-link"
                >
                  {{ city.name }}
                </router-link>
              </div>
            </div>
          </li>

          <li><router-link to="/culture">文化体验</router-link></li>
          <li><router-link to="/food" class="active">地域美食</router-link></li>
          <li><a href="#planning" @click.prevent="scrollToPlanning">路线规划</a></li>
          <li><router-link to="/forum">旅行论坛</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h2>食在山东，味动人心</h2>
        <p>探寻鲁菜源头，品味山海盛宴，感受孔府宴的礼仪之邦</p>
        <a href="#categories" class="btn" @click.prevent="scrollToCategories">开启寻味之旅</a>
      </div>
    </section>

    <!-- 美食分类 -->
    <section id="categories" class="container section-pad">
      <h2 class="section-title">齐鲁风味分类</h2>
      <div class="grid-container">
        <div class="card" v-for="cat in categories" :key="cat.title">
          <div class="card-img" :style="{ backgroundImage: `url(${cat.image})` }"></div>
          <div class="card-info">
            <h3>{{ cat.title }}</h3>
            <p>{{ cat.desc }}</p>
            <button class="btn" @click="handleAction(cat.action)">{{ cat.btn }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 一城一味 -->
    <section class="culture-section">
      <div class="flex-row">
        <div class="image-block">
          <img
            src="https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="山东美食拼盘"
            @error="$event.target.src='@/assets/food-placeholder.jpg'"
          >
        </div>
        <div class="text-block">
          <h2 class="section-title text-left gold-text">一城一味·地道推荐</h2>
          <p>从泰山脚下到黄海之滨，每一座城市都有属于自己的味觉记忆。</p>
          <ul class="feature-list">
            <li v-for="city in cityFlavors" :key="city.name">
              <strong>{{ city.name }}：</strong> {{ city.dishes }}
            </li>
          </ul>
          <button class="btn" @click="handleAction('food-map')">查看美食地图</button>
        </div>
      </div>
    </section>

    <!-- 沉浸式体验 -->
    <section class="container section-pad">
      <h2 class="section-title">沉浸式美食体验</h2>
      <div class="grid-container">
        <div class="card" v-for="exp in experiences" :key="exp.title">
          <div class="card-img" :style="{ backgroundImage: `url(${exp.image})` }"></div>
          <div class="card-info">
            <h3>{{ exp.title }}</h3>
            <p>{{ exp.desc }}</p>
            <button class="btn" @click="handleAction(exp.action)">{{ exp.btn }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer>
      <p>© 2023 齐鲁神韵旅游平台 | 好客山东，欢迎您</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 城市列表（用于导航下拉）
const cities = ref([
  { name: '济南市', path: '/jinan' }, { name: '青岛市', path: '/qingdao' },
  { name: '淄博市', path: '/zibo' }, { name: '枣庄市', path: '/zaozhuang' },
  { name: '东营市', path: '/dongying' }, { name: '烟台市', path: '/yantai' },
  { name: '潍坊市', path: '/weifang' }, { name: '济宁市', path: '/jining' },
  { name: '泰安市', path: '/taian' }, { name: '威海市', path: '/weihai' },
  { name: '日照市', path: '/rizhao' }, { name: '临沂市', path: '/linyi' },
  { name: '德州市', path: '/dezhou' }, { name: '聊城市', path: '/liaocheng' },
  { name: '滨州市', path: '/binzhou' }, { name: '菏泽市', path: '/heze' }
])

// 风味分类数据
const categories = ref([
  { title: '经典鲁菜', desc: '中国八大菜系之首。品尝九转大肠、糖醋鲤鱼，感受咸鲜纯正、火候精湛的北方官菜魅力。', btn: '查看名店', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'famous-shops' },
  { title: '胶东海鲜', desc: '源自青岛、烟台、威海。葱烧海参、油爆双脆、清蒸加吉鱼，原汁原味，鲜嫩爽口。', btn: '尝鲜海味', image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'seafood' },
  { title: '地道小吃', desc: '济南把子肉、潍坊肉火烧、临沂糁汤。穿梭于市井巷弄，寻找最抚凡人心的烟火气。', btn: '探索小巷', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'street-food' },
  { title: '孔府家宴', desc: '衍圣公府待客之礼。诗礼银杏、一品豆腐，食不厌精，脍不厌细，品味儒家饮食文化。', btn: '预约雅座', image: 'https://images.unsplash.com/photo-1549488347-1941d440b543?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'confucius-banquet' },
  { title: '面食王国', desc: '山东是面食大省。胶东大饽饽、高桩馒头、手擀面，麦香浓郁，造型精美，寓意吉祥。', btn: '了解面食', image: 'https://images.unsplash.com/photo-1626804475297-411dbe66f81f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'noodles' },
  { title: '美酒佳酿', desc: '青岛啤酒、烟台葡萄酒、景芝白酒。举杯邀明月，感受微醺中的齐鲁豪情。', btn: '品酒地图', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'wine-map' }
])

// 城市特色数据
const cityFlavors = ref([
  { name: '济南', dishes: '糖醋鲤鱼、奶汤蒲菜、油旋。泉水滋养出的灵动美味，清香淡雅。' },
  { name: '青岛', dishes: '辣炒蛤蜊、鲅鱼水饺、原浆啤酒。海风拂面，大口吃海鲜喝啤酒的豪爽。' },
  { name: '淄博', dishes: '博山豆腐箱、周村烧饼、淄博烧烤。鲁中腹地的醇厚与热闹的人间烟火。' },
  { name: '潍坊', dishes: '朝天锅、和乐面、芥末鸡。独具特色的民俗饮食，口感丰富独特。' },
  { name: '临沂', dishes: '炒鸡、糁(sá)汤、煎饼。沂蒙山区的质朴与热烈，香辣过瘾。' },
  { name: '济宁', dishes: '甏(bèng)肉干饭、孔府糕点。运河文化与儒家文化的味蕾交融。' }
])

// 体验活动数据
const experiences = ref([
  { title: '鲁菜大师课', desc: '跟随非遗传承人学习“爆、炒、烧、炸”技法，亲手制作一道正宗九转大肠。', btn: '报名课程', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'cooking-class' },
  { title: '赶海拾贝与集市', desc: '清晨随渔民出海捕捞新鲜海货，或在早市挑选最新鲜的蔬果，体验食材源头。', btn: '预订行程', image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'sea-market' },
  { title: '青岛啤酒节狂欢', desc: '八月相约金沙滩，参与全球最大的啤酒盛会，举杯同庆，感受激情夏日。', btn: '查看活动', image: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'beer-festival' },
  { title: '孔府宴礼仪体验', desc: '身着汉服，学习古代进食礼仪，品尝“食不厌精”的孔府家常菜，修身养性。', btn: '获取食谱', image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', action: 'etiquette' }
])

// 平滑滚动
const scrollToCategories = () => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
const scrollToPlanning = () => document.getElementById('planning')?.scrollIntoView({ behavior: 'smooth' })

// 按钮交互占位
const handleAction = (action) => {
  console.log(`触发操作: ${action}`)
  // 实际开发中可替换为 router.push(`/food/${action}`) 或打开模态框
  alert(`即将跳转至：${action}`)
}
</script>

<style scoped>
/* ========== 基础重置 ========== */
* { margin: 0; padding: 0; box-sizing: border-box; }

.food-page {
  font-family: 'Noto Serif SC', serif;
  background-color: #f9f9f9;
  color: #333;
  line-height: 1.6;
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
  display: none;
  position: absolute;
  top: 100%; left: 50%; transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 20px;
  width: 600px;
  margin-top: 15px;
  z-index: 1001;
}
.destinations-nav:hover .province-cities-dropdown { display: block; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }

.cities-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.city-link { display: block; padding: 8px 5px; text-align: center; background: #f8f9fa; border-radius: 4px; font-size: 14px; color: #333; }
.city-link:hover { background: #d4af37; color: #fff; }

/* ========== Hero Section ========== */
.hero {
  height: 60vh;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  margin-top: 80px;
}
.hero-content h2 { font-size: 48px; margin-bottom: 20px; text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
.hero-content p { font-size: 18px; margin-bottom: 30px; opacity: 0.9; }

.btn {
  padding: 12px 30px;
  background: #d4af37;
  color: #fff;
  border-radius: 30px;
  font-weight: bold;
  display: inline-block;
  transition: 0.3s;
  border: none;
  cursor: pointer;
  font-family: inherit;
}
.btn:hover { background: #b59020; transform: scale(1.05); }

/* ========== 通用容器 ========== */
.container { max-width: 1200px; margin: 0 auto; }
.section-pad { padding: 80px 20px; }

.section-title { text-align: center; font-size: 32px; margin-bottom: 40px; color: #2c3e50; position: relative; }
.section-title::after { content: ''; display: block; width: 60px; height: 3px; background: #d4af37; margin: 15px auto 0; }

.text-left { text-align: left; }
.text-left::after { margin: 15px 0 0; }
.gold-text { color: #d4af37; }

/* 卡片网格 */
.grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.05); transition: 0.3s; }
.card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
.card-img { height: 220px; background-size: cover; background-position: center; }
.card-info { padding: 25px; }
.card-info h3 { margin-bottom: 10px; color: #2c3e50; font-size: 20px; }
.card-info p { font-size: 14px; color: #666; line-height: 1.8; margin-bottom: 15px; }

/* ========== 图文混排 Section ========== */
.culture-section { background-color: #fff; padding: 80px 0; margin-top: 60px; }
.flex-row { display: flex; align-items: center; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.text-block { flex: 1; }
.image-block { flex: 1; }
.image-block img { width: 100%; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); }

.feature-list { margin: 25px 0; }
.feature-list li { margin-bottom: 15px; padding-left: 25px; position: relative; color: #555; }
.feature-list li::before { content: '✦'; color: #d4af37; position: absolute; left: 0; font-size: 18px; top: -2px; }

/* ========== Footer ========== */
footer { background: #2c3e50; color: #ecf0f1; text-align: center; padding: 40px; margin-top: 60px; }
footer p { opacity: 0.7; font-size: 14px; }

/* ========== 响应式适配 ========== */
@media (max-width: 768px) {
  .flex-row { flex-direction: column; }
  .hero-content h2 { font-size: 32px; }
  .main-header { padding: 0 20px; }
  nav ul { display: none; }
  .province-cities-dropdown { width: 90vw; left: 5%; transform: none; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
}
</style>