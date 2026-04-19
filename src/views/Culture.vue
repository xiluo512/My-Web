<template>
  <div class="culture-page">
    <!-- 自定义鼠标 -->
    <div class="cursor" :class="{ hovered: isHovering }" />

    <!-- 顶部导航 -->
    <header :class="{ scrolled: headerScrolled }">
      <div class="logo">齐鲁神韵</div>
      <nav>
        <ul>
          <li><router-link to="/index" class="hover-target" @mouseenter="handleHover" @mouseleave="handleLeave">首页</router-link></li>

          <li class="destinations-nav">
            <a href="#" class="hover-target" @mouseenter="handleHover" @mouseleave="handleLeave" @click.prevent>好客山东</a>
            <div class="province-cities-dropdown">
              <div class="cities-grid">
                <router-link
                  v-for="city in cities"
                  :key="city.name"
                  :to="city.path"
                  class="city-item hover-target"
                  @mouseenter="handleHover"
                  @mouseleave="handleLeave"
                >
                  {{ city.name }}
                </router-link>
              </div>
            </div>
          </li>

          <li><router-link to="/culture" class="hover-target active" @mouseenter="handleHover" @mouseleave="handleLeave">文化体验</router-link></li>
          <li><router-link to="/food" class="hover-target" @mouseenter="handleHover" @mouseleave="handleLeave">鲁菜美食</router-link></li>
          <li><router-link to="/forum" class="hover-target" @mouseenter="handleHover" @mouseleave="handleLeave">论坛</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="hero" @mouseenter="handleHover" @mouseleave="handleLeave">
        <div class="hero-bg"></div>
        <h1>孔孟之乡<br>礼仪之邦</h1>
        <p>Immersive Shandong Culture</p>
        <div class="scroll-indicator">
          <span>探索文脉</span>
          <div class="line"></div>
        </div>
      </section>

      <!-- 齐鲁文化瑰宝 -->
      <section id="portfolio">
        <h2 class="section-title">齐鲁文化瑰宝</h2>
        <div class="portfolio-grid">
          <div
            class="project-card hover-target"
            v-for="(item, index) in projects"
            :key="item.title"
            :class="{ visible: visibleCards.has(index) }"
            @mouseenter="handleHover"
            @mouseleave="handleLeave"
          >
            <img :src="item.image" :alt="item.title" class="project-img">
            <div class="project-info">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <a href="#" class="btn" @click.prevent="handleProjectAction(item)">{{ item.btn }}</a>
            </div>
          </div>
        </div>
      </section>

      <!-- 沉浸式非遗课堂 -->
      <section id="about" class="about-section">
        <div class="about-image hover-target" @mouseenter="handleHover" @mouseleave="handleLeave">
          <img src="/public/assets/非遗手作.jpg" alt="非遗手作">
        </div>
        <div class="about-text">
          <h2>沉浸式非遗课堂</h2>
          <p>拒绝走马观花，我们为您设计了深度的手作与文化课程，由非遗传承人亲自指导。</p>
          <ul class="feature-list">
            <li v-for="course in courses" :key="course.title">
              <strong>{{ course.title }}：</strong>{{ course.desc }}
            </li>
          </ul>
          <button class="btn-large" @click="handleViewCourses">查看课程表</button>
          <div class="signature">—— 致敬匠心</div>
        </div>
      </section>

      <!-- 守护齐鲁文脉 -->
      <section id="contact" class="contact-section">
        <h2>守护齐鲁文脉</h2>
        <p class="contact-desc">
          齐鲁大地拥有国家级非物质文化遗产上百项。您的每一次体验，都是对传统文化的致敬与传承。
        </p>
        <button class="btn-large hover-target" @click="handleJoinPlan" @mouseenter="handleHover" @mouseleave="handleLeave">
          加入守护者计划
        </button>
        <div class="contact-email-wrapper">
          <a href="mailto:culture@shandong.com" class="contact-email hover-target" @mouseenter="handleHover" @mouseleave="handleLeave">
            culture@shandong.com
          </a>
        </div>
      </section>
    </main>

    <footer>
      <div>© 2025 齐鲁神韵 · 文化体验平台 | 好客山东</div>
      <div>
        <a href="#" class="hover-target instagram" @click.prevent @mouseenter="handleHover" @mouseleave="handleLeave">Instagram</a>
        <a href="#" class="hover-target xiaohongshu" @click.prevent @mouseenter="handleHover" @mouseleave="handleLeave">小红书</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ===== 状态管理 =====
const isHovering = ref(false)
const headerScrolled = ref(false)
const visibleCards = ref(new Set())
const cursorPos = reactive({ x: 0, y: 0 })

// ===== 数据驱动 =====
const cities = ref([
  { name: '济南市', path: '/city/jinan' }, { name: '青岛市', path: '/city/qingdao' },
  { name: '淄博市', path: '/city/zibo' }, { name: '枣庄市', path: '/city/zaozhuang' },
  { name: '东营市', path: '/city/dongying' }, { name: '烟台市', path: '/city/yantai' },
  { name: '潍坊市', path: '/city/weifang' }, { name: '济宁市', path: '/city/jining' },
  { name: '泰安市', path: '/city/taian' }, { name: '威海市', path: '/city/weihai' },
  { name: '日照市', path: '/city/rizhao' }, { name: '临沂市', path: '/city/linyi' },
  { name: '德州市', path: '/city/dezhou' }, { name: '聊城市', path: '/city/liaocheng' },
  { name: '滨州市', path: '/city/binzhou' }, { name: '菏泽市', path: '/city/heze' }
])

const projects = ref([
  { title: '儒家礼乐', desc: '曲阜三孔 · 汉服拜师 · 雅乐体验', btn: '预约体验', image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
  { title: '潍坊风筝', desc: '扎制绘制 · 龙头蜈蚣 · 放飞梦想', btn: '动手制作', image: '/assets/潍坊风筝.jpg' },
  { title: '淄博陶瓷琉璃', desc: '千年瓷都 · 拉坯成型 · 雨点釉', btn: '陶艺体验', image: '/assets/淄博陶瓷琉璃.jpg' },
  { title: '皮影与吕剧', desc: '泰山皮影 · 吕剧唱腔 · 民间娱乐', btn: '观赏演出', image: '/assets/皮影与吕剧.jpg' },
  { title: '泉水茶道', desc: '趵突泉水 · 平阴玫瑰 · 大明湖畔', btn: '品茶静心', image: '/assets/泉水茶道.jpg' },
  { title: '齐鲁文物', desc: '大汶口遗址 · 古籍图书 · 好汉文化', btn: '观古思今', image: '/assets/山东文物.jpg' }
])

const courses = ref([
  { title: '杨家埠木版年画', desc: '在潍坊古老村落，亲手拓印色彩年画。' },
  { title: '孔子六艺体验', desc: '礼、乐、射、御、书、数，做一日古代士人。' },
  { title: '博山内画壶', desc: '方寸之间绘乾坤，体验鼻烟壶内壁作画。' },
  { title: '东昌府葫芦雕刻', desc: '烙画针刻，制作独一无二艺术品。' },
  { title: '胶东剪纸', desc: '一把剪刀一张纸，剪出渔家生活百态。' }
])

// ===== 交互逻辑 =====
const handleHover = () => { isHovering.value = true }
const handleLeave = () => { isHovering.value = false }

const handleProjectAction = (item) => {
  console.log('项目操作:', item.title)
  // router.push(`/culture/project/${item.title}`)
}

const handleViewCourses = () => {
  console.log('查看课程表')
  // router.push('/culture/courses')
}

const handleJoinPlan = () => {
  console.log('加入守护者计划')
  // router.push('/culture/guardian')
}

// ===== 自定义鼠标跟随 =====
const onMouseMove = (e) => {
  cursorPos.x = e.clientX
  cursorPos.y = e.clientY
  const cursor = document.querySelector('.cursor')
  if (cursor) {
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`
  }
}

// ===== 滚动动画 (Intersection Observer) =====
let observer = null
const initObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(document.querySelectorAll('.project-card')).indexOf(entry.target)
        if (index >= 0) visibleCards.value.add(index)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.project-card').forEach(card => observer.observe(card))
}

// ===== 平滑滚动 =====
const handleSmoothScroll = (e, href) => {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) {
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
  }
}

// ===== Header 滚动效果 =====
const handleHeaderScroll = () => {
  headerScrolled.value = window.scrollY > 50
}

// ===== 移动端悬停优化 =====
const isTouchDevice = ref(false)
const applyMobileOptimization = () => {
  const mediaQuery = window.matchMedia('(hover: none)')
  isTouchDevice.value = mediaQuery.matches

  if (isTouchDevice.value) {
    document.querySelectorAll('.project-info').forEach(info => {
      info.style.transform = 'translateY(0)'
      info.style.background = 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
    })
  }
}

// ===== 生命周期 =====
onMounted(() => {
  // 鼠标跟随
  document.addEventListener('mousemove', onMouseMove)

  // 滚动动画
  initObserver()

  // Header 滚动
  window.addEventListener('scroll', handleHeaderScroll)
  handleHeaderScroll()

  // 移动端优化
  applyMobileOptimization()
  window.matchMedia('(hover: hover)').addEventListener('change', applyMobileOptimization)

  // 平滑滚动绑定（委托给 document）
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => handleSmoothScroll(e, anchor.getAttribute('href')))
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('scroll', handleHeaderScroll)
  if (observer) observer.disconnect()
  window.matchMedia('(hover: hover)').removeEventListener('change', applyMobileOptimization)
})
</script>

<style scoped>
/* ===== 设计系统变量 ===== */
:root {
  --bg-color: #eae2e2c6;
  --text-main: #1a1a1a;
  --text-light: #3cd689;
  --accent: #9ba399;
  --accent-gold: #d4af37;
  --font-heading: 'Cormorant Garamond', 'Noto Serif SC', serif;
  --font-body: 'Montserrat', 'Noto Serif SC', sans-serif;
  --transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

.culture-page {
  background-color: var(--bg-color);
  color: var(--text-main);
  font-family: var(--font-body);
  overflow-x: hidden;
  line-height: 1.6;
  min-height: 100vh;
}

/* ===== 自定义鼠标 ===== */
.cursor {
  position: fixed;
  top: 0; left: 0;
  width: 36px; height: 36px;
  border: 2px solid rgba(212, 175, 55, 0.9);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s;
  mix-blend-mode: normal;
  background-color: rgba(26, 42, 215, 0.15);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
  backdrop-filter: blur(2px);
}

.cursor.hovered {
  width: 60px; height: 60px;
  background-color: rgba(212, 175, 55, 0.25);
  border-color: #d4af37;
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
  backdrop-filter: blur(4px);
}

/* ===== 导航栏 ===== */
header {
  position: fixed; top: 0; width: 100%;
  padding: 40px 60px;
  display: flex; justify-content: space-between; align-items: center;
  z-index: 100;
  mix-blend-mode: difference;
  color: #fff;
  transition: padding 0.3s, background-color 0.3s, mix-blend-mode 0.3s;
}

header.scrolled {
  background-color: rgba(255,255,255,0.95);
  mix-blend-mode: normal;
  color: #1a1a1a;
  padding: 20px 60px;
}

header.scrolled .logo,
header.scrolled nav a { color: #1a1a1a; }

.logo {
  font-family: var(--font-heading);
  font-size: 24px; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
}

nav ul { display: flex; list-style: none; gap: 40px; }
nav a {
  text-decoration: none; color: #fff;
  font-size: 14px; letter-spacing: 1px;
  text-transform: uppercase; position: relative;
}
nav a::after {
  content: ''; position: absolute; bottom: -5px; left: 0;
  width: 0; height: 1px; background-color: #fff;
  transition: width 0.3s ease;
}
nav a:hover::after { width: 100%; }

/* 下拉菜单 */
.destinations-nav { position: relative; }
.province-cities-dropdown {
  display: none; position: absolute; top: 100%; left: 50%;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.98);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border-radius: 12px; padding: 24px; width: 620px;
  margin-top: 20px; z-index: 1001;
  backdrop-filter: blur(8px);
}
.destinations-nav:hover .province-cities-dropdown { display: block; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }

.cities-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.city-item {
  display: block; padding: 8px 6px; text-align: center;
  background: #f4f4f4; border-radius: 6px;
  font-size: 13px; color: #1a1a1a; text-transform: none;
  transition: 0.2s; text-decoration: none;
}
.city-item:hover { background: var(--accent-gold); color: #fff; }

/* ===== Hero Section ===== */
.hero {
  height: 100vh; display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  position: relative; overflow: hidden;
}
.hero-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url("../assets/culture.jpg");
  background-size: cover; background-position: center;
  filter: grayscale(100%) brightness(0.7);
  z-index: -1; transform: scale(1.1);
  transition: transform 10s ease;
}
.hero:hover .hero-bg { transform: scale(1); }
.hero h1 {
  font-family: var(--font-heading); font-size: 7vw; font-weight: 300;
  color: #fff; text-align: center; line-height: 1.1;
  opacity: 0; transform: translateY(30px);
  animation: fadeInUp 1s ease forwards 0.5s;
}
.hero p {
  font-size: 1.2rem; color: rgba(255,255,255,0.9);
  margin-top: 20px; letter-spacing: 4px; text-transform: uppercase;
  opacity: 0; transform: translateY(30px);
  animation: fadeInUp 1s ease forwards 0.8s;
}
.scroll-indicator {
  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
  color: #fff; font-size: 12px; letter-spacing: 2px;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  opacity: 0; animation: fadeIn 1s ease forwards 1.5s;
}
.line {
  width: 1px; height: 60px; background-color: #fff;
  transform-origin: top; animation: expandLine 2s infinite;
}

/* ===== 通用区块 ===== */
section { padding: 120px 60px; }
.section-title {
  font-family: var(--font-heading); font-size: 3.8rem;
  margin-bottom: 60px; font-weight: 300; color: var(--text-main);
  text-align: center;
}
.section-title::after {
  content: ''; display: block; width: 60px; height: 2px;
  background: var(--accent-gold); margin: 20px auto 0;
}

/* ===== Portfolio 网格 ===== */
.portfolio-grid {
  display: grid; grid-template-columns: repeat(12, 1fr); gap: 30px;
}
.project-card {
  position: relative; overflow: hidden; margin-bottom: 60px;
  opacity: 0; transform: translateY(50px);
  transition: var(--transition);
}
.project-card.visible { opacity: 1; transform: translateY(0); }

.project-card:nth-child(1) { grid-column: 1 / 8; height: 550px; }
.project-card:nth-child(2) { grid-column: 8 / 13; height: 420px; margin-top: 120px; }
.project-card:nth-child(3) { grid-column: 2 / 6; height: 480px; }
.project-card:nth-child(4) { grid-column: 6 / 12; height: 600px; margin-top: -80px; }
.project-card:nth-child(5) { grid-column: 1 / 7; height: 500px; }
.project-card:nth-child(6) { grid-column: 7 / 13; height: 500px; margin-top: 60px; }

.project-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.8s ease;
}
.project-card:hover .project-img { transform: scale(1.05); }

.project-info {
  position: absolute; bottom: 0; left: 0; width: 100%;
  padding: 40px; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: #fff; transform: translateY(100%);
  transition: transform 0.5s ease;
}
.project-card:hover .project-info { transform: translateY(0); }

.project-info h3 {
  font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 8px;
}
.project-info p { font-size: 0.9rem; opacity: 0.9; }
.project-info .btn {
  margin-top: 15px; background: transparent; border: 1px solid #fff;
  color: #fff; padding: 8px 20px; border-radius: 30px;
  display: inline-block; font-size: 12px; text-transform: uppercase;
  transition: 0.3s; text-decoration: none;
}
.project-info .btn:hover { background: #fff; color: #000; }

/* ===== About / 非遗课堂 ===== */
.about-section {
  display: flex; align-items: center; gap: 80px;
  background-color: #f4f4f4;
}
.about-image { flex: 1; height: 650px; overflow: hidden; border-radius: 4px; }
.about-image img { width: 100%; height: 100%; object-fit: cover; }
.about-text { flex: 1; }
.about-text h2 {
  font-family: var(--font-heading); font-size: 3.5rem;
  margin-bottom: 30px; font-weight: 400; color: var(--accent-gold);
}
.about-text p { font-size: 1.1rem; color: var(--text-light); margin-bottom: 20px; }

.feature-list { margin: 25px 0; list-style: none; }
.feature-list li {
  margin-bottom: 16px; padding-left: 30px; position: relative; color: #444;
}
.feature-list li::before {
  content: '✦'; color: var(--accent-gold); position: absolute; left: 0;
  font-size: 20px; top: -2px;
}

.signature {
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: 2rem; margin-top: 30px; color: var(--accent);
}

/* ===== Contact / 守护文脉 ===== */
.contact-section {
  text-align: center; padding: 140px 20px; background: #fff;
}
.contact-section h2 {
  font-family: var(--font-heading); font-size: 4.5rem;
  margin-bottom: 30px; font-weight: 300;
}
.contact-desc {
  margin-bottom: 30px; color: #666; max-width: 600px; margin-left: auto; margin-right: auto;
}
.contact-email-wrapper { margin-top: 50px; }
.contact-email {
  font-size: 1.5rem; color: var(--text-main); text-decoration: none;
  border-bottom: 1px solid var(--text-main); padding-bottom: 5px;
}
.contact-email:hover { color: var(--accent); border-color: var(--accent); }

.btn-large {
  padding: 14px 40px; background: var(--accent-gold); color: #1a1a1a;
  border-radius: 40px; font-weight: 500; display: inline-block;
  margin-top: 30px; border: none; transition: 0.3s; text-transform: uppercase;
  letter-spacing: 1px; cursor: pointer; font-family: inherit;
}
.btn-large:hover { background: #b49450; transform: scale(1.05); }

/* ===== Footer ===== */
footer {
  padding: 40px 60px; display: flex; justify-content: space-between;
  border-top: 1px solid #eee; font-size: 0.8rem; color: var(--text-light);
}
footer a { color: inherit; text-decoration: none; margin-left: 20px; }
footer .instagram { color: #cd371c; }
footer .xiaohongshu { color: #e90808; }

/* ===== 动画 ===== */
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { to { opacity: 1; } }
@keyframes expandLine {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  header { padding: 20px; }
  nav ul { display: none; }
  .hero h1 { font-size: 12vw; }
  section { padding: 60px 20px; }
  .portfolio-grid { display: block; }
  .project-card { width: 100%; height: 380px; margin-bottom: 30px; margin-top: 0 !important; }
  .about-section { flex-direction: column; }
  .about-image { width: 100%; height: 350px; }
  .contact-section h2 { font-size: 2.5rem; }
  footer { flex-direction: column; gap: 10px; text-align: center; }
  .cursor { display: none; } /* 移动端隐藏自定义鼠标 */
}
</style>