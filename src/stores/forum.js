// src/stores/forum.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPostsApi, createPostApi, fetchCategoriesApi } from '@/mock/forumApi'
import { updatePostApi, deletePostApi } from '@/mock/forumApi'
import { toggleLikePostApi, getLikedPostIds } from '@/mock/forumApi'

export const useForumStore = defineStore('forum', () => {
  // 状态
  const posts = ref([])
  const categories = ref([])
  const currentTab = ref('最新帖子')
  const isLoading = ref(false)
  const isPosting = ref(false)
  const error = ref('')
  const editingPost = ref(null)
  const likedPostIds = ref([])



  // 加载帖子
  async function loadPosts(tab = '最新帖子') {
    isLoading.value = true
    error.value = ''
    try {
      currentTab.value = tab
      posts.value = await fetchPostsApi(tab)
      likedPostIds.value = getLikedPostIds()
    } catch (e) {
      error.value = '加载失败，请重试'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function toggleLike(postId) {
    try {
      const res = await toggleLikePostApi(postId)
      likedPostIds.value = getLikedPostIds()
      const index = posts.value.findIndex(p => p.id === postId)
      if (index !== -1) posts.value[index].likes = res.likes
      return { success: true, liked: res.liked }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  // 加载版块
  async function loadCategories() {
    try {
      categories.value = await fetchCategoriesApi()
    } catch (e) {
      console.error('加载版块失败:', e)
    }
  }

  // 发布新帖
  async function publishPost(postData) {
    isPosting.value = true
    error.value = ''
    try {
      const newPost = await createPostApi(postData)
      // 如果当前 Tab 匹配，实时添加到列表
      if (currentTab.value === '最新帖子' || currentTab.value === '全部') {
        posts.value.unshift(newPost)
      }
      return { success: true, post: newPost }
    } catch (e) {
      error.value = '发帖失败，请重试'
      return { success: false, error: e.message }
    } finally {
      isPosting.value = false
    }
  }

  // 进入版块（模拟跳转）
  function enterCategory(category) {
    console.log('进入版块:', category.title)
    // 实际可路由到 /forum/category/:id
  }

  // 打开帖子详情（模拟）
  function openPost(post) {
    console.log('打开帖子:', post.title)
    // 实际可路由到 /forum/post/:id
    alert(`📄 ${post.title}\n\n${post.content || '（暂无正文内容）'}\n\n👤 ${post.author} • 📍 ${post.city}`)
  }

  // 编辑帖子
  async function editPost(postId, updateData) {
    isPosting.value = true
    error.value = ''
    try {
      const updatedPost = await updatePostApi(postId, updateData)
      const index = posts.value.findIndex(p => p.id === postId)
      if (index !== -1) {
        posts.value[index] = updatedPost
      }
      return { success: true, post: updatedPost }
    } catch (e) {
      error.value = '编辑失败：' + e.message
      return { success: false, error: e.message }
    } finally {
      isPosting.value = false
    }
  }
  // 开始编辑
  function startEdit(post) {
    editingPost.value = { ...post }
  }

  // 取消编辑
  function cancelEdit() {
    editingPost.value = null
  }

  // 删除帖子
  async function removePost(postId) {
    isLoading.value = true
    error.value = ''
    try {
      await deletePostApi(postId)
      posts.value = posts.value.filter(p => p.id !== postId)
      return { success: true }
    } catch (e) {
      error.value = '删除失败：' + e.message
      return { success: false, error: e.message }
    } finally {
      isLoading.value = false
    }
  }


  return {
    posts, categories, currentTab, isLoading, isPosting, error,
    loadPosts, loadCategories, publishPost, enterCategory, openPost,
    editingPost, editPost, removePost, startEdit, cancelEdit
    , likedPostIds, toggleLike
  }
})