<template>
  <div class="login-page">
    <div class="login-container">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">用户名</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            placeholder="请输入用户名"
            required
            autocomplete="username"
          >
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="请输入密码"
            required
            autocomplete="current-password"
          >
        </div>
        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? '登录中...' : '登 录' }}
        </button>
      </form>
      <div class="links">
        <a href="#" @click.prevent="alert('跳转至忘记密码页')">忘记密码?</a>
        <router-link to="/register">注册账号</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const isLoading = ref(false)
const form = ref({ username: '', password: '' })

/*const handleLogin = async () => {
  if (!form.value.username || !form.value.password) return

  isLoading.value = true
  try {
    // ✅ TODO: 替换为实际后端 API 请求
    // const res = await api.login(form.value)
    // localStorage.setItem('token', res.data.token)
    // localStorage.setItem('isLogged', 'true')

    console.log('登录请求数据:', form.value)

    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    alert('登录成功！(模拟演示)')
    localStorage.setItem('isLogged', 'true')
    router.push('/index')
  } catch (error) {
    alert('账号或密码错误，请重试')
    console.error('登录失败:', error)
  } finally {
    isLoading.value = false
  }
}*/
const handleLogin = async () => {
  const success = await auth.login(form.value.username, form.value.password)
  if (success) {
    router.push('/index')
  }
}
</script>

<style scoped>
/* ========== 基础重置 ========== */
* { box-sizing: border-box; margin: 0; padding: 0; }

.login-page {
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-image: url('https://images.unsplash.com/photo-1515694346067-2d7868b63676?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* 登录容器 - 核心玻璃效果 */
.login-container {
  width: 100%;
  max-width: 380px;
  padding: 40px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(236, 231, 231, 0.35);
  color: white;
  text-align: center;
}

.login-container h2 {
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* 输入框组 */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
}

.input-group input::placeholder { color: rgba(255, 255, 255, 0.7); }

.input-group input:focus {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

/* 登录按钮 */
.login-btn {
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
  font-family: inherit;
}

.login-btn:hover:not(:disabled) {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 底部链接 */
.links {
  margin-top: 20px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}

.links a, .links :deep(a) {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s;
}

.links a:hover, .links :deep(a):hover {
  color: #ffffff;
  text-shadow: 0 0 5px rgba(255,255,255,0.5);
}

/* 响应式 */
@media (max-width: 480px) {
  .login-container { padding: 30px 20px; }
  .links { flex-direction: column; gap: 10px; align-items: center; }
}
</style>