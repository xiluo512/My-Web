<template>
  <main class="main-container">
    <!-- 轮播滑块 -->
    <ul class="slider" ref="sliderRef">
      <li
        v-for="(item, index) in cities"
        :key="item.name"
        class="item"
        :class="{ active: activeIndex === index }"
        :style="{ backgroundImage: `url(${item.bgImage})` }"
        @click="isLoggedIn && goToSlide(index)"
      >
        <div class="content">
          <h2 class="title">{{ item.slogan }}</h2>
          <p class="description">{{ item.poem }}</p>
          <button class="btn-read" @click.stop="handleReadMore(item.link)">Read More</button>
        </div>
      </li>
    </ul>

    <!-- 导航箭头 -->
    <div class="arrows">
      <button @click="prevSlide" :disabled="!isLoggedIn || isAnimating">↑</button>
      <button @click="nextSlide" :disabled="!isLoggedIn || isAnimating">↓</button>
    </div>

    <!-- 缩略图指示器 -->
    <div class="thumbnails">
      <div
        v-for="(item, index) in cities"
        :key="item.name"
        class="thumb"
        :class="{ active: activeIndex === index }"
        :style="{ backgroundImage: `url(${item.bgImage})` }"
        @click="isLoggedIn && goToSlide(index)"
      />
    </div>

    <!-- 登录模态框 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="!isLoggedIn" class="modal" @click.self="closeModal">
          <div class="modal-content">
            <h2>登录系统</h2>
            <form @submit.prevent="handleLogin">
              <div class="input-group-modal">
                <label for="username">用户名</label>
                <input
                  v-model="loginForm.username"
                  type="text"
                  id="username"
                  placeholder="请输入用户名"
                  required
                >
              </div>
              <div class="input-group-modal">
                <label for="password">密码</label>
                <input
                  v-model="loginForm.password"
                  type="password"
                  id="password"
                  placeholder="请输入密码"
                  required
                >
              </div>
              <button type="submit" class="login-btn-modal">登 录</button>
            </form>
          </div>
        </div>
      </transition>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import dezhouImg from '@/assets/dezhou.jpg'
import binzouImg from '@/assets/binzou.jpg'
import dongyingImg from '@/assets/dongying.jpg'
import hezeImg from '@/assets/heze.jpg'
import jinanImg from '@/assets/jinan.jpg'
import jiningImg from '@/assets/jining.jpg'
import liaochengImg from '@/assets/liaocheng.jpg'
import linyiImg from '@/assets/linyi.jpg'
import qingdaoImg from '@/assets/qingdao.jpg'
import rizhaoImg from '@/assets/rizhao.jpg'
import taianImg from '@/assets/taian.jpg'
import weifangImg from '@/assets/weifang.jpg'
import weihaiImg from '@/assets/weihai.jpg'
import yantaiImg from '@/assets/yantai.jpg'
import zaozhuangImg from '@/assets/zaozhuang.jpg'
import ziboImg from '@/assets/zibo.jpg'

const router = useRouter()
const sliderRef = ref(null)

const cities = ref([
  { name: 'dezhou', slogan: '"上善如水 大德之州"', poem: '近郭人烟集  遥天月上初', bgImage: dezhouImg, link: '/index' },
  { name: 'binzou', slogan: '"孙子故里 生态滨州"', poem: '平地楚然出一峰  登临若立碧芙蓉', bgImage: binzouImg, link: '/index' },
  { name: 'dongying', slogan: '"黄河入海 壮观东营"', poem: '黄河之水天上来  奔流到海不复回', bgImage: dongyingImg, link: '/index' },
  { name: 'heze', slogan: '"牡丹之都 好汉之乡"', poem: '唯有牡丹真国色  花开时节动京城', bgImage: hezeImg, link: '/index' },
  { name: 'jinan', slogan: '"泉城济南 泉甲天下"', poem: '荷叶荷花何处好？ 大明湖上新秋', bgImage: jinanImg ,link: '/index' },
  { name: 'jining', slogan: '"孔孟之乡 运河之都"', poem: '孔门泰山下  不见登封时', bgImage: jiningImg, link: '/index' },
  { name: 'liaocheng', slogan: '"江北水城 东方古郡"', poem: '危楼千尺瞰沧溟  泰岱东来作翠屏', bgImage: liaochengImg, link: '/index' },
  { name: 'linyi', slogan: '"倾情沂蒙 红色临沂"', poem: '兰陵美酒郁金香  玉碗盛来琥珀光', bgImage: linyiImg, link: '/index' },
  { name: 'qingdao', slogan: '"活力之都 时尚青岛"', poem: '我昔东海上  崂山餐紫霞', bgImage: qingdaoImg, link: '/index' },
  { name: 'rizhao', slogan: '"阳光海岸 活力日照"', poem: '白云照春海  青山横曙天', bgImage: rizhaoImg, link: '/index' },
  { name: 'taian', slogan: '"中华泰山 天下泰安"', poem: '五岳独尊泰山巅  一览众山小如烟', bgImage: taianImg, link: '/index' },
  { name: 'weifang', slogan: '"风筝之都 世界鸢都"', poem: '纸鸢高飞九万里  云端翱翔任自由', bgImage: weifangImg, link: '/index' },
  { name: 'weihai', slogan: '"精致城市 幸福威海"', poem: '瑶岛晴开云母幄  霞天淡染笔公头', bgImage: weihaiImg, link: '/index' },
  { name: 'yantai', slogan: '"仙境海岸 鲜美烟台"', poem: '问蓬莱何处  风月依然  万里江清', bgImage: yantaiImg, link: '/index' },
  { name: 'zaozhuang', slogan: '"运河明珠 匠心枣庄"', poem: '曾问湘水有君山  今见君山齐鲁间', bgImage: zaozhuangImg, link: '/index' },
  { name: 'zibo', slogan: '"泱泱齐风 陶韵淄博"', poem: '击鼓吹竽七百年  临博城阙尚依然', bgImage: ziboImg, link: '/index' },
])

const activeIndex = ref(0)
const isAnimating = ref(false)
const isLoggedIn = ref(localStorage.getItem('isLogged') === 'true')
const loginForm = ref({ username: '', password: '' })

const updateSlider = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  setTimeout(() => { isAnimating.value = false }, 600)
}

const goToSlide = (index) => {
  if (!isLoggedIn.value || isAnimating.value || index === activeIndex.value) return
  activeIndex.value = index
  updateSlider()
}

const nextSlide = () => {
  if (!isLoggedIn.value || isAnimating.value) return
  activeIndex.value = (activeIndex.value + 1) % cities.value.length
  updateSlider()
}

const prevSlide = () => {
  if (!isLoggedIn.value || isAnimating.value) return
  activeIndex.value = (activeIndex.value - 1 + cities.value.length) % cities.value.length
  updateSlider()
}

const handleLogin = () => {
  const { username, password } = loginForm.value
  if (username.trim() && password.trim()) {
    isLoggedIn.value = true
    localStorage.setItem('isLogged', 'true')
  } else {
    alert('请输入用户名和密码')
  }
}

const closeModal = () => {
  if (isLoggedIn.value) { /* 可添加额外逻辑 */ }
}

const handleReadMore = (url) => {
  if (url) router.push(url)
}

const handleKeydown = (e) => {
  if (!isLoggedIn.value) return
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') nextSlide()
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  updateSlider()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #0b0f19;
  font-family: 'Segoe UI', system-ui, sans-serif; }
.slider {
  position: relative;
  width: 100%;
  height: 100%;
  list-style: none;
}
.item {
  position: absolute;
  width: 220px;
  height: 320px;
  top: 50%;
  right: 100px;
  transform: translateY(-50%);
  border-radius: 24px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  opacity: 0.5;
  filter: blur(2px) grayscale(30%);
}
.item.active {
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  transform: none;
  opacity: 1;
  box-shadow: none;
  border-radius: 0;
  cursor: default;
  filter: none;
  z-index: 10;
}
.content {
  position: absolute;
  top: 50%; left: 8%;
  transform: translateY(-50%);
  width: 450px;
  color: #fff;
  text-shadow: 0 2px 15px rgba(0,0,0,0.85);
  opacity: 0;
  transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
  transform: translateY(-40%);
  pointer-events: none;
}
.item.active .content {
  opacity: 1;
  transform: translateY(-50%);
  pointer-events: auto;
}
.title {
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: 1px;
  line-height: 1.1;
}
.description {
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 28px;
  opacity: 0.92;
  max-width: 90%;
}
.btn-read {
  padding: 12px 32px;
  background: transparent;
  border: 2px solid rgba(255,255,255,0.8);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}
.btn-read:hover {
  background: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255,255,255,0.2);
}
.arrows {
  position: absolute;
  left: 35px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 20;
}
.arrows button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: grid;
  place-items: center;
}
.arrows button:hover:not(:disabled) {
  background: rgba(255,255,255,0.3);
  transform: scale(1.1);
}
.arrows button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
.thumbnails {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 5;
}
.thumb {
  width: 60px;
  height: 80px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}
.thumb:hover {
  opacity: 0.8;
  transform: scale(1.05);
}
.thumb.active {
  opacity: 1;
  border-color: #fff;
  box-shadow: 0 0 15px rgba(255,255,255,0.4);
}
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  position: relative;
  width: 380px;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(79, 74, 74, 0.448);
  box-shadow: 0 8px 32px 0 rgba(247, 246, 246, 0.633);
  color: white; text-align: center;
  background: rgba(95, 93, 93, 0.573);
  backdrop-filter: blur(15px);
}
.modal-content h2 {
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.input-group-modal {
  margin-bottom: 20px;
  text-align: left;
}
.input-group-modal label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
.input-group-modal input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}
.input-group-modal input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.input-group-modal input:focus {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}
.login-btn-modal {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.login-btn-modal:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
}
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
@media (max-width: 768px) {
  .item { width: 140px;
    height: 200px; right: 20px;
  }
  .content {
    width: 85%;
    left: 5%;
  }
  .title {
    font-size: 2rem;
  }
  .thumbnails {
    display: none;
  }
}
</style>