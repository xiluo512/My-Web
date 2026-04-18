// src/mock/data.js

// 初始帖子数据
export const INIT_POSTS = [
  {
    id: 1,
    title: '【游记】凌晨三点夜爬泰山，终于看到了云海玉盘！附保暖攻略',
    city: '泰安',
    author: '登高望远',
    time: '2小时前',
    replies: 128,
    views: '2.5k',
    tab: '最新帖子',
    content: '全程徒步6小时，建议带冲锋衣和手套。红门出发→中天门→南天门→玉皇顶，凌晨4点登顶看日出最佳。'
  },
  {
    id: 2,
    title: '【求助】五一去青岛，想住离海边近又安静的地方，求推荐！',
    city: '青岛',
    author: '听海风',
    time: '4小时前',
    replies: 45,
    views: '890',
    tab: '最新帖子',
    content: '预算500以内，两个人，希望步行到海边不超过10分钟。'
  },
  {
    id: 3,
    title: '【分享】淄博烧烤三件套实测，小饼卷葱太香了！',
    city: '淄博',
    author: '撸串达人',
    time: '昨天',
    replies: 312,
    views: '5.1k',
    tab: '精华攻略',
    content: '一定要去八大局早市，小饼+小葱+蘸料，三件套绝配！'
  },
  {
    id: 4,
    title: '【摄影】威海的冬天简直是童话世界，雪后的布鲁威斯号太绝了',
    city: '威海',
    author: '光影猎人',
    time: '2天前',
    replies: 89,
    views: '3.4k',
    tab: '结伴同游',
    content: '附RAW格式原图，需要可以私聊。'
  }
]

// 用户数据
export const MOCK_USERS = [
  { id: 1, username: 'admin', password: '123456', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' },
  { id: 2, username: 'demo', password: 'demo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo' }
]