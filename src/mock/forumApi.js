// src/mock/forumApi.js
import { INIT_POSTS } from './data'

// 模拟网络延迟
const delay = (ms) => new Promise(res => setTimeout(res, ms))

// 获取本地存储的数据
const getStoredPosts = () => {
  const stored = localStorage.getItem('shandong_forum_posts')
  return stored ? JSON.parse(stored) : INIT_POSTS
}

// 保存数据到本地存储
const savePosts = (posts) => {
  localStorage.setItem('shandong_forum_posts', JSON.stringify(posts))
}

// 1. 获取帖子列表
export const fetchPostsApi = async (tab = '最新帖子') => {
  await delay(500)
  const posts = getStoredPosts()

  if (tab === '全部') return [...posts]
  return posts.filter(p => p.tab === tab)
}

// 2. 发布新帖子
export const createPostApi = async (postData) => {
  await delay(600)

  const currentUser = JSON.parse(localStorage.getItem('user') || '{"username":"旅行者"}')

  const newPost = {
    id: Date.now(),
    title: postData.title,
    content: postData.content,
    city: postData.city,
    author: currentUser.username,
    time: '刚刚',
    replies: 0,
    views: '0',
    tab: postData.tab || '最新帖子'
  }

  const posts = getStoredPosts()
  posts.unshift(newPost)
  savePosts(posts)

  return newPost
}

// 3. 获取版块列表
export const fetchCategoriesApi = async () => {
  await delay(300)
  return [
    { id: 1, title: '山水游记', icon: '🏔️', desc: '分享泰山日出、趵突泉赏水等旅行经历。' },
    { id: 2, title: '美食探店', icon: '🍺', desc: '淄博烧烤、青岛啤酒、济南把子肉。' },
    { id: 3, title: '摄影大片', icon: '📸', desc: '展示威海、烟台等地的精彩瞬间。' },
    { id: 4, title: '结伴同游', icon: '🤝', desc: '寻找曲阜研学伙伴、自驾车友。' }
  ]
}

// 4. ✅ 编辑帖子（新增！）
export const updatePostApi = async (postId, updateData) => {
  await delay(500)

  const posts = getStoredPosts()
  const index = posts.findIndex(p => p.id === postId)

  if (index === -1) {
    throw new Error('帖子不存在')
  }

  posts[index] = {
    ...posts[index],
    ...updateData,
    updatedAt: '刚刚编辑'
  }

  savePosts(posts)
  return posts[index]
}

// 5. ✅ 删除帖子（新增！）
export const deletePostApi = async (postId) => {
  await delay(400)

  const posts = getStoredPosts()
  const index = posts.findIndex(p => p.id === postId)

  if (index === -1) {
    throw new Error('帖子不存在')
  }

  posts.splice(index, 1)
  savePosts(posts)

  return { success: true }
}