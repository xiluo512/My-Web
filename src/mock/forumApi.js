// src/mock/forumApi.js
import { INIT_POSTS } from './data' // 复用之前创建的全局数据

// 模拟网络延迟
const delay = (ms) => new Promise(res => setTimeout(res, ms))

// 获取帖子列表（支持 Tab 筛选）
export const fetchPostsApi = async (tab = '最新帖子') => {
  await delay(500) // 模拟加载
  if (tab === '全部') return [...INIT_POSTS]
  return INIT_POSTS.filter(p => p.tab === tab)
}

// 发布新帖子
export const createPostApi = async (postData) => {
  await delay(600) // 模拟提交延迟

  // 模拟当前登录用户（实际应从 auth store 获取）
  const currentUser = JSON.parse(localStorage.getItem('user') || '{"username":"旅行者"}')

  const newPost = {
    id: Date.now(), // 用时间戳模拟唯一 ID
    title: postData.title,
    content: postData.content,
    city: postData.city,
    author: currentUser.username,
    time: '刚刚',
    replies: 0,
    views: '0',
    tab: postData.tab || '最新帖子'
  }

  // 写入内存模拟入库（刷新会丢失，演示够用）
  INIT_POSTS.unshift(newPost)

  return newPost
}

// 获取版块列表
export const fetchCategoriesApi = async () => {
  await delay(300)
  return [
    { id: 1, title: '山水游记', icon: '🏔️', desc: '分享泰山日出、趵突泉赏水、沂蒙山风光等国内省内旅行经历。' },
    { id: 2, title: '美食探店', icon: '🍺', desc: '淄博烧烤怎么吃？青岛啤酒哪家鲜？济南把子肉推荐地。' },
    { id: 3, title: '摄影大片', icon: '📸', desc: '展示威海火炬八街、烟台雪景、日照帆船等精彩瞬间。' },
    { id: 4, title: '结伴同游', icon: '🤝', desc: '寻找曲阜研学伙伴、胶东海岸线自驾车友、登山互助小组。' }
  ]
}

// 编辑帖子
export const updatePostApi = async (postId, updateData) => {
  await new Promise(resolve => setTimeout(resolve, 500)) // 模拟延迟

  const postIndex = INIT_POSTS.findIndex(p => p.id === postId)
  if (postIndex === -1) {
    throw new Error('帖子不存在')
  }

  // 更新帖子
  INIT_POSTS[postIndex] = {
    ...INIT_POSTS[postIndex],
    ...updateData,
    updatedAt: '刚刚编辑'
  }

  return INIT_POSTS[postIndex]
}

// 删除帖子
export const deletePostApi = async (postId) => {
  await new Promise(resolve => setTimeout(resolve, 400))

  const postIndex = INIT_POSTS.findIndex(p => p.id === postId)
  if (postIndex === -1) {
    throw new Error('帖子不存在')
  }

  // 从数组中移除
  INIT_POSTS.splice(postIndex, 1)

  return { success: true }
}