import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const isLoading = ref(false)
  const error = ref('')

  const isLoggedIn = computed(() => !!user.value)

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

  async function login(username, password) {
    isLoading.value = true
    error.value = ''
    try {
      const response = await fetch(`${apiBase}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || '登录失败')
      }
      user.value = { username: data.user.username, email: data.user.email }
      localStorage.setItem('isLogged', 'true')
      localStorage.setItem('username', data.user.username)
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(form) {
    isLoading.value = true
    error.value = ''
    try {
      const response = await fetch(`${apiBase}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || '注册失败')
      }
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('isLogged')
    localStorage.removeItem('username')
    localStorage.removeItem('user')
  }

  return { user, isLoggedIn, isLoading, error, login, register, logout }
})