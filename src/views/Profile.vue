<template>
  <div class="profile-page">
    <div class="profile-shell">
      <aside class="sidebar">
        <h2>个人中心</h2>
        <p>管理行程与社区内容</p>
        <div class="user-chip">
          <div class="avatar">{{ (profile.username || '游').slice(0, 1) }}</div>
          <div>
            <strong>{{ profile.username || '未登录用户' }}</strong>
            <p>{{ profile.email || '暂无邮箱' }}</p>
          </div>
        </div>
        <div class="actions">
          <router-link to="/index" class="btn ghost">返回首页</router-link>
          <button class="btn danger" @click="logout">退出登录</button>
        </div>
      </aside>

      <main class="content">
        <section class="card">
          <h3>我的行程</h3>
          <p v-if="tripPlansLoading" class="hint">正在加载行程...</p>
          <p v-else-if="tripPlans.length === 0" class="hint">暂无已保存行程</p>
          <div v-else class="list">
            <div class="item" v-for="trip in tripPlans" :key="trip.id">
              <div class="item-title">{{ trip.title }}</div>
              <div class="item-sub">{{ trip.plan.summary || '暂无摘要' }}</div>
              <div class="item-meta">创建时间：{{ trip.created_at }}</div>
            </div>
          </div>
        </section>

        <section class="card">
          <h3>我发布的帖子</h3>
          <p v-if="myPosts.length === 0" class="hint">还没有发布帖子</p>
          <div v-else class="list">
            <div class="item" v-for="post in myPosts" :key="post.id">
              <div class="item-title">{{ post.title }}</div>
              <div class="item-sub">{{ post.content || '（暂无正文）' }}</div>
              <div class="item-meta">{{ post.city || '未关联城市' }} · 点赞 {{ post.likes || 0 }}</div>
            </div>
          </div>
        </section>

        <section class="card">
          <h3>我点赞的帖子</h3>
          <p v-if="likedPosts.length === 0" class="hint">还没有点赞帖子</p>
          <div v-else class="list">
            <div class="item" v-for="post in likedPosts" :key="post.id">
              <div class="item-title">{{ post.title }}</div>
              <div class="item-sub">作者：{{ post.author }} · {{ post.city || '未关联城市' }}</div>
              <div class="item-meta">当前点赞 {{ post.likes || 0 }}</div>
            </div>
          </div>
        </section>

        <p v-if="error" class="status error">{{ error }}</p>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const error = ref('')
const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
const profile = ref({
  username: localStorage.getItem('username') || '',
  email: ''
})
const tripPlansLoading = ref(false)
const tripPlans = ref([])
const posts = ref([])
const likedPostIds = ref([])

const loadProfile = async () => {
  const username = localStorage.getItem('username')
  if (!username) {
    error.value = '未检测到登录用户'
    return
  }

  try {
    const response = await fetch(`${apiBase}/api/user/${encodeURIComponent(username)}`)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.detail || '获取用户信息失败')
    }
    profile.value = data.user
  } catch (e) {
    error.value = e.message || '获取用户信息失败'
  }
}

const loadTripPlans = async () => {
  const username = localStorage.getItem('username')
  if (!username) return

  tripPlansLoading.value = true
  try {
    const response = await fetch(`${apiBase}/api/trip/list/${encodeURIComponent(username)}`)
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.detail || '获取行程失败')
    }
    tripPlans.value = data.plans || []
  } catch (e) {
    error.value = e.message || '获取行程失败'
  } finally {
    tripPlansLoading.value = false
  }
}

const loadForumData = () => {
  const allPosts = JSON.parse(localStorage.getItem('shandong_forum_posts') || '[]')
  posts.value = allPosts
  const username = localStorage.getItem('username') || ''
  likedPostIds.value = JSON.parse(localStorage.getItem(`shandong_forum_likes_${username}`) || '[]')
}

const myPosts = computed(() => {
  const username = profile.value.username
  return posts.value.filter(post => post.author === username)
})

const likedPosts = computed(() => {
  return posts.value.filter(post => likedPostIds.value.includes(post.id))
})

const logout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(async () => {
  await loadProfile()
  await loadTripPlans()
  loadForumData()
})
</script>

<style scoped>
.profile-page { min-height: 100vh; background: linear-gradient(120deg, #08121f, #13253a); padding: 24px; }
.profile-shell { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 280px 1fr; gap: 20px; }
.sidebar { background: rgba(18, 33, 52, 0.9); border: 1px solid #27415f; border-radius: 16px; padding: 20px; color: #e5f1ff; }
.sidebar h2 { margin: 0 0 6px; }
.sidebar p { margin: 0 0 16px; color: #9fb4cc; font-size: 13px; }
.user-chip { display: flex; gap: 12px; align-items: center; background: #1a324d; border-radius: 12px; padding: 12px; margin-bottom: 16px; }
.avatar { width: 44px; height: 44px; border-radius: 50%; background: #3fa9f5; display: grid; place-items: center; font-weight: bold; }
.content { display: grid; gap: 16px; }
.card { background: rgba(255, 255, 255, 0.96); border-radius: 16px; padding: 18px; }
.card h3 { margin: 0 0 10px; }
.list { display: grid; gap: 10px; }
.item { border: 1px solid #e7eef7; border-radius: 10px; padding: 10px 12px; background: #fbfdff; }
.item-title { font-weight: 700; color: #1d3552; }
.item-sub { font-size: 13px; color: #3d5875; margin-top: 4px; }
.item-meta { font-size: 12px; color: #7b8fa5; margin-top: 4px; }
.hint { color: #6e8092; font-size: 13px; }
.status { color: #d7e7f7; margin-top: 10px; }
.status.error { color: #ff9f9f; }
.actions { display: flex; gap: 10px; }
.btn { border: none; border-radius: 10px; padding: 10px 14px; cursor: pointer; text-decoration: none; text-align: center; }
.btn.ghost { background: #2b435f; color: #fff; }
.btn.danger { background: #d9534f; color: #fff; }

@media (max-width: 900px) {
  .profile-shell { grid-template-columns: 1fr; }
}
</style>
