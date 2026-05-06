<template>
  <div class="login-page">
    <!-- 1. 引入千里江山 3D 粒子背景 -->
    <CyberLandscape />

    <!-- 2. 登录容器 -->
    <div class="login-container">
      <h2 class="login-title">齐鲁神韵</h2>
      <p class="login-subtitle">登录以开启千里江山之旅</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label>用户名</label>
          <input
            v-model="loginForm.username"
            type="text"
            placeholder="请输入用户名"
            required
          >
        </div>

        <div class="input-group">
          <label>密码</label>
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            required
          >
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? '验证中...' : '登 录' }}
        </button>
      </form>

      <div class="login-links">
        <a href="#">忘记密码?</a>
        <span>|</span>
        <router-link to="/register">注册账号</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CyberLandscape from '@/components/CyberLandscape.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const loginForm = ref({ username: '', password: '' })

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) return

  isLoading.value = true
  const success = await authStore.login(loginForm.value.username, loginForm.value.password)
  isLoading.value = false

  if (success) {
    alert('登录成功！')
    router.push('/index')
  } else {
    alert(authStore.error || '账号或密码错误，请重试')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 登录容器 - 核心玻璃效果 */
.login-container {
  position: relative;
  z-index: 10; /* 确保在 Canvas 之上 */
  width: 100%;
  max-width: 400px;
  padding: 45px 40px;
  border-radius: 24px;

  /* 玻璃拟态：深色半透明背景 + 模糊 */
  background: rgba(10, 20, 30, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);

  color: white;
  text-align: center;
}

.login-title {
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 4px;
  font-size: 28px;
  /* 渐变文字 */
  background: linear-gradient(to right, #00ffff, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-subtitle {
  color: #a0aab5;
  margin-bottom: 35px;
  font-size: 14px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #d0d8e0;
}

.input-group input {
  width: 100%;
  padding: 14px 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}

.input-group input::placeholder { color: rgba(255, 255, 255, 0.3); }

.input-group input:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: #00ffff; /* 聚焦时变青色 */
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
}

.login-btn {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  border: none;
  border-radius: 12px;

  /* 按钮渐变 */
  background: linear-gradient(135deg, #00ffff, #0088aa);
  color: #002030;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 255, 255, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-links {
  margin-top: 25px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.login-links a {
  color: #a0aab5;
  text-decoration: none;
  transition: color 0.3s;
}

.login-links a:hover {
  color: #00ffff;
}
</style>