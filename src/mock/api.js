import { MOCK_USERS, INIT_POSTS } from './data'

// 模拟网络延迟
const delay = (ms) => new Promise(res => setTimeout(res, ms))

// 登录接口
export const loginApi = async (username, password) => {
  await delay(800)
  const user = MOCK_USERS.find(u => u.username === username && u.password === password)
  if (!user) throw new Error('账号或密码错误')
  return { token: `mock_token_${Date.now()}`, user: { ...user, password: undefined } }
}

// 获取帖子
export const fetchPostsApi = async (tab = '最新帖子') => {
  await delay(500)
  return INIT_POSTS.filter(p => tab === '全部' || p.tab === tab)
}

// 发帖接口
export const createPostApi = async (postData) => {
  await delay(600)
  const newPost = { id: Date.now(), ...postData, replies: 0, views: '0', time: '刚刚' }
  INIT_POSTS.unshift(newPost) // 写入内存模拟入库
  return newPost
}