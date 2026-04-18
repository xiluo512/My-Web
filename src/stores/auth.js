import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi } from '@/mock/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const isLoading = ref(false)
  const error = ref('')

  const isLoggedIn = computed(() => !!user.value)

  async function login(username, password) {
    isLoading.value = true
    error.value = ''
    try {
      const res = await loginApi(username, password)
      user.value = res.user
      localStorage.setItem('user', JSON.stringify(res.user))
      localStorage.setItem('token', res.token)
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
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return { user, isLoggedIn, isLoading, error, login, logout }
})