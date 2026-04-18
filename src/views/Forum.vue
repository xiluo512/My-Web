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
          <li v-for="tab in tabs" :key="tab">
            <a
              :key="tab"
              href="#"
              :class="{ active: forumStore.currentTab === tab }"
              @click.prevent="switchTab(tab)"
            >
              {{ tab }}
            </a>
          </li>
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
        <div class="category-card" v-for="cat in forumStore.categories" :key="cat.id">
          <h3>{{ cat.icon }} {{ cat.title }}</h3>
          <p>{{ cat.desc }}</p>
          <a href="#" class="btn-enter" @click.prevent="forumStore.enterCategory(cat)">进入版块</a>
        </div>
      </div>

      <!-- 最新帖子 -->
      <h2 class="section-title">最新热议</h2>

      <!-- 加载状态 -->
      <div v-if="forumStore.isLoading" class="loading-state">
        <span class="loader"></span> 加载中...
      </div>

      <!-- 帖子列表 -->
      <div v-else-if="forumStore.posts.length" class="latest-posts">
        <div class="post-item" v-for="post in forumStore.posts" :key="post.id">
          <div class="post-info">
            <div class="post-title" @click="forumStore.openPost(post)">{{ post.title }}</div>
            <div class="post-meta">
              <span class="tag">{{ post.city }}</span>
              <span>作者：{{ post.author }} • {{ post.time }}</span>
            </div>
          </div>
          <div class="post-stats">
            回复：<span class="stat-num">{{ post.replies }}</span> • 查看：<span class="stat-num">{{ post.views }}</span>
          </div>
          <!-- 操作按钮（仅作者可见） -->
          <div v-if="isPostOwner(post)" class="post-actions">
            <button class="btn-edit" @click="handleEditPost(post)">✏️ 编辑</button>
            <button class="btn-delete" @click="handleDeletePost(post)">🗑️ 删除</button>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <p>😕 暂无帖子，快来发第一条吧！</p>
      </div>

      <!-- 发帖按钮 -->
      <button class="create-post-btn" @click="openCreateModal">✍️ 发布新帖子</button>
    </div>

    <!-- 发帖模态框 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-box">
            <div class="modal-header">
              <h3>发布新帖</h3>
              <button class="modal-close" @click="closeModal">×</button>
            </div>

            <form @submit.prevent="submitPost" class="post-form">
              <div class="form-group">
                <label>标题 <span class="required">*</span></label>
                <input
                  v-model="newPost.title"
                  type="text"
                  placeholder="请输入帖子标题（2-50字）"
                  :disabled="forumStore.isPosting"
                  required
                  maxlength="50"
                >
                <span class="hint">{{ newPost.title.length }}/50</span>
              </div>

              <div class="form-group">
                <label>关联城市</label>
                <select v-model="newPost.city" :disabled="forumStore.isPosting">
                  <option value="">请选择城市（可选）</option>
                  <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>版块分类</label>
                <select v-model="newPost.tab" :disabled="forumStore.isPosting">
                  <option value="最新帖子">最新帖子</option>
                  <option value="精华攻略">精华攻略</option>
                  <option value="结伴同游">结伴同游</option>
                </select>
              </div>

              <div class="form-group">
                <label>正文内容</label>
                <textarea
                  v-model="newPost.content"
                  placeholder="分享你的旅行故事、攻略或疑问..."
                  :disabled="forumStore.isPosting"
                  rows="6"
                  maxlength="2000"
                ></textarea>
                <span class="hint">{{ newPost.content.length }}/2000</span>
              </div>

              <!-- 错误提示 -->
              <p v-if="forumStore.error" class="form-error">{{ forumStore.error }}</p>

              <div class="form-actions">
                <button type="button" class="btn-cancel" @click="closeModal" :disabled="forumStore.isPosting">
                  取消
                </button>
                <button type="submit" class="btn-submit" :disabled="!canSubmit || forumStore.isPosting">
                  {{ forumStore.isPosting ? '发布中...' : '发布帖子' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- 页脚 -->
    <footer>
      <p>© 2023 齐鲁神韵旅游平台 | 好客山东，欢迎您</p>
    </footer>
        <!-- 编辑帖子模态框 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="showEditModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-box">
            <div class="modal-header">
              <h3>编辑帖子</h3>
              <button class="modal-close" @click="closeModal">×</button>
            </div>

            <form @submit.prevent="submitEdit" class="post-form">
              <div class="form-group">
                <label>标题 <span class="required">*</span></label>
                <input
                  v-model="editForm.title"
                  type="text"
                  placeholder="请输入帖子标题（2-50字）"
                  required
                  maxlength="50"
                >
                <span class="hint">{{ editForm.title.length }}/50</span>
              </div>

              <div class="form-group">
                <label>关联城市</label>
                <select v-model="editForm.city">
                  <option value="">请选择城市（可选）</option>
                  <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>正文内容</label>
                <textarea
                  v-model="editForm.content"
                  placeholder="分享你的旅行故事、攻略或疑问..."
                  rows="6"
                  maxlength="2000"
                ></textarea>
                <span class="hint">{{ editForm.content.length }}/2000</span>
              </div>

              <p v-if="forumStore.error" class="form-error">{{ forumStore.error }}</p>

              <div class="form-actions">
                <button type="button" class="btn-cancel" @click="closeModal" :disabled="isSubmitting">
                  取消
                </button>
                <button type="submit" class="btn-submit" :disabled="!canEditSubmit || isSubmitting">
                  {{ isSubmitting ? '保存中...' : '保存修改' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </Teleport>
    <!-- Toast 提示 -->
    <transition name="toast-fade">
      <div v-if="showToast" class="toast-notification">
        <span class="toast-icon">✅</span>
        <span class="toast-message">{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useForumStore } from '@/stores/forum'

const forumStore = useForumStore()
const showModal = ref(false)
const showEditModal = ref(false) // 编辑模态框开关
//编辑表单数据
const editForm = ref({
  id: null,
  title: '',
  city: '',
  content: ''
})

const isSubmitting = ref(false) // 本地防抖状态

const tabs = ['最新帖子', '精华攻略', '结伴同游']

// ✅ 确保解构了需要的函数
const { startEdit, cancelEdit } = forumStore
// Toast 状态
const showToast = ref(false)
const toastMessage = ref('')

// 显示 Toast 的辅助函数
const showNotification = (message, duration = 2500) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, duration)
}

// 城市列表
const cities = [
  '济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊',
  '济宁', '泰安', '威海', '日照', '临沂', '德州', '聊城', '滨州', '菏泽'
]

// 表单数据
const newPost = ref({
  title: '',
  city: '',
  tab: '最新帖子',
  content: ''
})

// 表单验证
const canSubmit = computed(() => {
  return newPost.value.title.trim().length >= 2 &&
         newPost.value.title.trim().length <= 50 &&
         newPost.value.content.trim().length >= 5
})

// 切换 Tab
const switchTab = (tab) => {
  forumStore.loadPosts(tab)
}

// 打开模态框（静默获取登录态，不弹窗打断）
const openCreateModal = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{"username":"旅行者"}')
  console.log('当前发帖人:', user.username)

  // 重置表单
  newPost.value = { title: '', city: '', tab: '最新帖子', content: '' }
  showModal.value = true
}

// 关闭模态框
const closeModal = () => {
  showModal.value = false
  showEditModal.value = false
  forumStore.error = ''
  isSubmitting.value = false
   // 可选：重置表单
  editForm.value = { id: null, title: '', city: '', content: '' }
  newPost.value = { title: '', city: '', tab: '最新帖子', content: '' }
}
//编辑表单凭证
const canEditSubmit = computed(() => {
  return editForm.value.title.trim().length >= 2 &&
         editForm.value.title.trim().length <= 50
})
// 提交新帖子
const submitPost = async () => {
  if (!canSubmit.value || isSubmitting.value) return

  isSubmitting.value = true
  forumStore.error = ''

  try {
    const result = await forumStore.publishPost({
      title: newPost.value.title.trim(),
      city: newPost.value.city,
      tab: newPost.value.tab,
      content: newPost.value.content.trim()
    })

    if (result.success) {
      // 使用 Toast 替代 alert
      showNotification('发布成功！已同步到最新热议')
      closeModal()
    } else {
      forumStore.error = result.error || '发布失败，请重试'
    }
  } catch (err) {
    forumStore.error = '网络异常，请稍后重试'
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}
//提交编辑的帖子
const submitEdit = async () => {
  if (!canEditSubmit.value) return

  isSubmitting.value = true
  try {
    const result = await forumStore.editPost(editForm.value.id, {
      title: editForm.value.title.trim(),
      city: editForm.value.city,
      content: editForm.value.content.trim()
    })

    if (result.success) {
      alert('✅ 修改成功！')
      closeModal()
    } else {
      alert('修改失败：' + result.error)
    }
  } catch (err) {
    console.error(err)
    alert('系统错误')
  } finally {
    isSubmitting.value = false
  }
}
// 获取当前登录用户
const currentUser = ref(JSON.parse(localStorage.getItem('user') || '{"username":"旅行者"}'))
// 判断是否是帖子作者
const isPostOwner = (post) => {
  return post.author === currentUser.value.username
}
// 编辑帖子
const handleEditPost = (post) => {
  console.log('🔴 点击了编辑按钮，接收到的数据:', post);

  // 1. 先不管权限，强制赋值看看能不能弹出来
  editForm.value = {
    id: post.id,
    title: post.title,
    city: post.city || '',
    content: post.content || ''
  };

  // 2. 强制打开模态框
  showEditModal.value = true;

  console.log('🟢 showEditModal 现在的值是:', showEditModal.value);
}

// 删除帖子
  const handleDeletePost = async (post) => {
  console.log('🔴 删除按钮被点击！', post)

  if (!isPostOwner(post)) {
    alert('⚠️ 只能删除自己的帖子')
    return
  }

  if (confirm(`确定要删除帖子"${post.title}"吗？\n\n此操作不可恢复！`)) {
    try {
      // ✅ 调用 Store 里定义好的 removePost 方法
      const res = await forumStore.removePost(post.id)
      if (res.success) {
        alert('✅ 帖子已删除')
      } else {
        alert('删除失败：' + res.error)
      }
    } catch (err) {
      console.error('删除异常:', err)
    }
  }
}
// 初始化
onMounted(() => {
  forumStore.loadPosts()
  forumStore.loadCategories()
})
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
nav ul li { position: relative; }
nav ul li a { font-size: 16px; font-weight: 500; color: #ccc; padding: 10px 0; display: block; }
nav ul li a:hover, nav ul li a.active { color: #d4af37; }

/* Tab 导航激活态 */
nav ul li a.active {
  background: rgba(212, 175, 55, 0.2);
  color: #d4af37;
  font-weight: 600;
  border-radius: 4px;
}

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

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 40px;
  color: #aaa;
}
.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(212, 175, 55, 0.3);
  border-top-color: #d4af37;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
  vertical-align: middle;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #888;
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  margin: 20px 0;
}

/* 模态框遮罩 */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-box {
  background: #2c0e0e;
  border: 1px solid #581c1c;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #3d1414;
}
.modal-header h3 {
  color: #d4af37;
  font-size: 18px;
  font-weight: 600;
}
.modal-close {
  background: none;
  border: none;
  color: #888;
  font-size: 24px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
}
.modal-close:hover { color: #fff; }

/* 表单样式 */
.post-form { padding: 24px; }
.form-group { margin-bottom: 20px; }
.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 500;
}
.form-group .required { color: #e74c3c; }

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid #3d1414;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #d4af37;
  background: rgba(255, 255, 255, 0.12);
}
.form-group textarea { resize: vertical; min-height: 120px; }

.form-group .hint {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #888;
  text-align: right;
}

.form-error {
  color: #e74c3c;
  font-size: 13px;
  margin: 8px 0 16px;
  padding: 8px 12px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 6px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #3d1414;
}

.btn-cancel, .btn-submit {
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}
.btn-cancel {
  background: rgba(255, 255, 255, 0.1);
  color: #ccc;
}
.btn-cancel:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}
.btn-submit {
  background: linear-gradient(to right, #d4af37, #b59020);
  color: #2c0e0e;
}
.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}
.btn-cancel:disabled, .btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 模态框动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

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
@media (max-width: 600px) {
  .modal-box { max-height: 100vh; border-radius: 12px 12px 0 0; }
  .form-actions { flex-direction: column-reverse; }
  .btn-cancel, .btn-submit { width: 100%; }
}
/* Toast 提示样式 */
.toast-notification {
  position: fixed;
  top: 80px;
  right: 30px;
  background: linear-gradient(135deg, #2c0e0e 0%, #3d1414 100%);
  border: 2px solid #d4af37;
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.3);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 3000;
  min-width: 280px;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.toast-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.toast-message {
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

/* Toast 动画 */
.toast-fade-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-fade-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .toast-notification {
    top: auto;
    bottom: 30px;
    right: 20px;
    left: 20px;
    min-width: auto;
    max-width: none;
  }
}
/* 帖子操作按钮 */
.post-actions {
  display: flex;
  gap: 8px;
  margin-left: 15px;
}

.btn-edit,
.btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
}

.btn-edit {
  background: rgba(52, 152, 219, 0.2);
  color: #3498db;
  border: 1px solid #3498db;
}

.btn-edit:hover {
  background: #3498db;
  color: #fff;
}

.btn-delete {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.btn-delete:hover {
  background: #e74c3c;
  color: #fff;
}

/* 响应式 */
@media (max-width: 768px) {
  .post-actions {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>