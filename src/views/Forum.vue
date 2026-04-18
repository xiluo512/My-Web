<template>
  <div class="forum-page">
    <!-- 顶部导航 -->
    <header class="main-header-nav">
      <div class="logo">
        <h1>齐鲁神韵</h1>
        <span>SHANDONG FORUM</span>
      </div>
      <nav>
        <ul>
          <li><router-link to="/index">返回首页</router-link></li>
          <li><a href="#" class="active" @click.prevent>最新帖子</a></li>
          <li><a href="#" @click.prevent>精华攻略</a></li>
          <li><a href="#" @click.prevent>结伴同游</a></li>
        </ul>
      </nav>
    </header>

    <div class="forum-container">
      <!-- 论坛简介 -->
      <div class="forum-intro">
        <h2>好客山东 · 旅友交流社区</h2>
        <p>分享您的齐鲁旅行见闻，寻找泰山夜爬队友，交流海鲜避坑指南</p>
      </div>

      <!-- 热门版块 -->
      <h2 class="section-title">热门版块</h2>
      <div class="forum-categories">
        <div class="category-card" v-for="cat in categories" :key="cat.title">
          <h3>{{ cat.icon }} {{ cat.title }}</h3>
          <p>{{ cat.desc }}</p>
          <a href="#" class="btn-enter" @click.prevent="enterCategory(cat)">进入版块</a>
        </div>
      </div>

      <!-- 最新帖子 -->
      <h2 class="section-title">最新热议</h2>
      <div class="latest-posts">
        <div class="post-item" v-for="post in posts" :key="post.id">
          <div class="post-info">
            <div class="post-title" @click="openPost(post)">{{ post.title }}</div>
            <div class="post-meta">
              <span class="tag">{{ post.city }}</span>
              <span>作者：{{ post.author }} • {{ post.time }}</span>
            </div>
          </div>
          <div class="post-stats">
            回复：<span class="stat-num">{{ post.replies }}</span> • 查看：<span class="stat-num">{{ post.views }}</span>
          </div>
        </div>
      </div>

      <button class="create-post-btn" @click="handleCreatePost">✍️ 发布新帖子</button>
    </div>

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

// 版块数据（后续可对接 API）
const categories = ref([
  { title: '山水游记', icon: '🏔️', desc: '分享泰山日出、趵突泉赏水、沂蒙山风光等国内省内旅行经历。' },
  { title: '美食探店', icon: '🍺', desc: '淄博烧烤怎么吃？青岛啤酒哪家鲜？济南把子肉推荐地。' },
  { title: '摄影大片', icon: '📸', desc: '展示威海火炬八街、烟台雪景、日照帆船等精彩瞬间。' },
  { title: '结伴同游', icon: '🤝', desc: '寻找曲阜研学伙伴、胶东海岸线自驾车友、登山互助小组。' }
])

// 帖子列表数据
const posts = ref([
  { id: 1, title: '【游记】凌晨三点夜爬泰山，终于看到了云海玉盘！附保暖攻略', city: '泰安', author: '登高望远', time: '2小时前', replies: 128, views: '2.5k' },
  { id: 2, title: '【求助】五一去青岛，想住离海边近又安静的地方，求推荐！', city: '青岛', author: '听海风', time: '4小时前', replies: 45, views: '890' },
  { id: 3, title: '【分享】淄博烧烤三件套实测，小饼卷葱太香了！（附排队技巧）', city: '淄博', author: '撸串达人', time: '昨天', replies: 312, views: '5.1k' },
  { id: 4, title: '【讨论】曲阜三孔景区请导游有必要吗？怕被坑求指点', city: '济宁', author: '国学爱好者', time: '昨天', replies: 67, views: '1.2k' },
  { id: 5, title: '【摄影】威海的冬天简直是童话世界，雪后的布鲁威斯号太绝了', city: '威海', author: '光影猎人', time: '2天前', replies: 89, views: '3.4k' }
])

// 交互逻辑
const enterCategory = (cat) => {
  console.log('进入版块:', cat.title)
  // router.push(`/forum/category/${cat.title}`)
}

const openPost = (post) => {
  console.log('打开帖子:', post.title)
  // router.push(`/forum/post/${post.id}`)
}

const handleCreatePost = () => {
  console.log('发布新帖子')
  // router.push('/forum/create')
}
</script>

<style scoped>
/* ========== 基础重置 ========== */
* { margin: 0; padding: 0; box-sizing: border-box; }

.forum-page {
  font-family: 'Noto Serif SC', serif;
  background-color: #1a0505;
  color: #e0e0e0;
  line-height: 1.6;
  min-height: 100vh;
}

a { text-decoration: none; color: inherit; transition: 0.3s; }
ul { list-style: none; }

/* ========== 顶部导航栏 ========== */
.main-header-nav {
  background-color: rgba(44, 14, 14, 0.95);
  border-bottom: 2px solid #d4af37;
  padding: 0 50px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo h1 { font-size: 24px; color: #fff; letter-spacing: 2px; font-weight: 700; }
.logo span { font-size: 10px; color: #d4af37; letter-spacing: 1px; display: block; }

nav ul { display: flex; gap: 30px; }
nav ul li a { font-size: 16px; font-weight: 500; color: #ccc; }
nav ul li a:hover, nav ul li a.active { color: #d4af37; }

/* ========== 论坛容器 ========== */
.forum-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.forum-intro {
  text-align: center;
  margin-bottom: 50px;
  padding: 40px;
  background: linear-gradient(135deg, #3d1414 0%, #2c0e0e 100%);
  border: 1px solid #581c1c;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.forum-intro h2 { color: #d4af37; font-size: 32px; margin-bottom: 15px; }

.section-title {
  text-align: center;
  font-size: 28px;
  color: #fff;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}
.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #d4af37;
  margin: 10px auto 0;
}

/* 版块卡片 */
.forum-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.category-card {
  background-color: #2c0e0e;
  border: 1px solid #581c1c;
  border-radius: 8px;
  padding: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 4px; height: 100%;
  background: #d4af37;
  opacity: 0.5;
  transition: 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  border-color: #d4af37;
  background-color: #3d1414;
}
.category-card:hover::before { opacity: 1; }

.category-card h3 { color: #d4af37; margin-bottom: 10px; font-size: 20px; }
.category-card p { color: #aaa; font-size: 14px; margin-bottom: 20px; line-height: 1.6; }

.btn-enter {
  display: inline-block;
  padding: 8px 20px;
  border: 1px solid #d4af37;
  color: #d4af37;
  border-radius: 20px;
  font-size: 14px;
}
.btn-enter:hover { background: #d4af37; color: #2c0e0e; }

/* 最新帖子列表 */
.latest-posts { margin-top: 40px; }

.post-item {
  background-color: #250b0b;
  border-bottom: 1px solid #3d1414;
  padding: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s;
  border-left: 3px solid transparent;
}

.post-item:first-child { border-top-left-radius: 8px; border-top-right-radius: 8px; }
.post-item:last-child { border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-bottom: none; }

.post-item:hover { background-color: #301010; border-left-color: #d4af37; }

.post-info { flex: 1; }

.post-title { color: #e0e0e0; font-size: 18px; margin-bottom: 8px; font-weight: 600; cursor: pointer; }
.post-title:hover { color: #d4af37; }

.post-meta { color: #888; font-size: 13px; }
.post-meta span { margin-right: 15px; }
.tag { background: #581c1c; color: #ffccbc; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-right: 10px; }

.post-stats { text-align: right; color: #888; font-size: 13px; min-width: 120px; }
.stat-num { color: #d4af37; font-weight: bold; margin: 0 3px; }

.create-post-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 40px auto;
  padding: 15px;
  background: linear-gradient(to right, #d4af37, #b59020);
  color: #2c0e0e;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
  transition: transform 0.3s;
  border: none;
  cursor: pointer;
  font-family: inherit;
}
.create-post-btn:hover { transform: scale(1.05); box-shadow: 0 8px 20px rgba(212, 175, 55, 0.5); }

/* 页脚 */
footer { background: #150303; color: #666; text-align: center; padding: 40px; margin-top: 60px; border-top: 1px solid #333; }

/* 响应式 */
@media (max-width: 768px) {
  .post-item { flex-direction: column; align-items: flex-start; }
  .post-stats { margin-top: 10px; text-align: left; }
  .main-header-nav { padding: 0 20px; }
  nav ul { display: none; }
  .forum-intro { padding: 25px; }
  .forum-intro h2 { font-size: 24px; }
}
</style>