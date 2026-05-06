<template>
  <div class="register-page">
    <CyberLandscape />

    <div class="register-container">
      <h2 class="register-title">创建账号</h2>
      <p class="register-subtitle">注册后即可开启齐鲁之旅</p>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="input-group">
          <label>用户名</label>
          <input
            v-model.trim="registerForm.username"
            type="text"
            placeholder="请输入用户名"
            required
          >
        </div>

        <div class="input-group">
          <label>邮箱</label>
          <input
            v-model.trim="registerForm.email"
            type="email"
            placeholder="请输入邮箱"
            required
          >
        </div>

        <div class="input-group">
          <label>密码</label>
          <input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码（至少6位）"
            required
            minlength="6"
          >
        </div>

        <div class="input-group">
          <label>确认密码</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            required
            minlength="6"
          >
        </div>

        <p v-if="message" class="message" :class="{ error: isError }">{{ message }}</p>

        <button type="submit" class="register-btn" :disabled="isLoading">
          {{ isLoading ? '注册中...' : '注 册' }}
        </button>
      </form>

      <div class="register-links">
        <span>已有账号？</span>
        <router-link to="/">去登录</router-link>
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
const isError = ref(false)
const message = ref('')
const confirmPassword = ref('')

const registerForm = ref({
  username: '',
  email: '',
  password: ''
})

const handleRegister = async () => {
  message.value = ''
  isError.value = false

  if (registerForm.value.password !== confirmPassword.value) {
    isError.value = true
    message.value = '两次输入的密码不一致'
    return
  }

  isLoading.value = true
  const success = await authStore.register(registerForm.value)
  isLoading.value = false

  if (success) {
    message.value = '注册成功，正在跳转登录页...'
    registerForm.value = { username: '', email: '', password: '' }
    confirmPassword.value = ''
    setTimeout(() => {
      router.push('/')
    }, 900)
  } else {
    isError.value = true
    message.value = authStore.error || '注册失败，请稍后重试'
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.register-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 440px;
  padding: 40px;
  border-radius: 24px;
  background: rgba(10, 20, 30, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  color: white;
}

.register-title {
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 3px;
  font-size: 28px;
  background: linear-gradient(to right, #00ffff, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.register-subtitle {
  color: #a0aab5;
  margin-bottom: 28px;
  text-align: center;
  font-size: 14px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  color: #d0d8e0;
}

.input-group input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  outline: none;
}

.input-group input:focus {
  border-color: #00ffff;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.2);
}

.message {
  margin: 8px 0 12px;
  font-size: 13px;
  color: #67f0a7;
}

.message.error {
  color: #ff9a9a;
}

.register-btn {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #00ffff, #0088aa);
  color: #002030;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-links {
  margin-top: 18px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.register-links a {
  color: #7fe9ff;
}
</style>
