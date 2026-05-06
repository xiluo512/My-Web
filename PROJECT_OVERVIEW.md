# 齐鲁神韵 — 山东旅游文化平台

## 项目概述

"齐鲁神韵"是一个以山东省 16 个地级市为核心的旅游文化展示与互动平台。涵盖城市风貌、非遗文化、鲁菜美食、旅行论坛、AI 智能行程规划等功能，面向对山东文化旅游感兴趣的用户群体。

### 核心功能

| 模块 | 说明 |
|------|------|
| 用户认证 | 注册/登录（PBKDF2-SHA256 密码哈希），路由守卫控制页面访问权限 |
| 首页 | Hero 全屏 3D 粒子背景 + 热门景点卡片 + 非遗文化 + 地域美食 + 精选路线 |
| 16 城市子站 | 每城独立页面，含景点推荐、特色美食、主题色配置（CityLayout 统一布局） |
| 文化体验 | 山东非遗文化展示（风筝、陶瓷、皮影戏、年画等），带自定义鼠标交互 |
| 鲁菜美食 | 山东各地经典美食分类展示 |
| 旅行论坛 | 帖子发布/编辑/删除/点赞，版块浏览（localStorage 持久化） |
| AI 行程规划 | 接入通义千问（qwen-plus），根据出发地/天数/预算/偏好生成结构化旅行计划 |
| 高德地图 | 行程路线可视化渲染，城市坐标地理编码 |
| 个人中心 | 查看已保存行程、我的帖子、点赞记录 |

---

## 技术栈

### 前端

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5 | 核心框架（Composition API + `<script setup>`） |
| Vite | 8.0 | 构建工具 |
| Vue Router | 5.0 | 客户端路由（懒加载 + 导航守卫） |
| Pinia | 3.0 | 状态管理 |
| Three.js | 0.184 | 千里江山 3D 粒子背景（35 万粒子 WebGL 渲染） |
| 高德 JSAPI | 2.0 | 地图展示与路径绘制 |
| 通义千问 | qwen-plus | AI 行程生成 + 流式对话 |

### 后端

| 技术 | 版本 | 用途 |
|------|------|------|
| FastAPI | >=0.115 | Web 框架 |
| PyMySQL | >=1.1 | MySQL 数据库操作 |
| hashlib (标准库) | — | PBKDF2-SHA256 密码哈希 |
| python-dotenv | >=1.0 | 环境变量管理 |
| OpenAI SDK | >=1.0 | 通义千问 API 调用（兼容模式） |
| uvicorn | >=0.34 | ASGI 服务器 |

### 数据库

- MySQL (`travel_web` 库)
  - `register` 表：用户账号（username, email, password）
  - `trip_plans` 表：已保存行程（username, title, plan_json）

---

## 项目结构

```
vue-project/
├── index.html                     # Vite 入口 HTML
├── vite.config.js                 # Vite 配置（@ 别名、Vue 插件）
├── package.json                   # 前端依赖
├── .gitignore
├── src/
│   ├── main.js                    # 应用入口：挂载 Pinia + Router + 全局字体
│   ├── App.vue                    # 根组件（纯 <router-view> 容器）
│   ├── router/
│   │   └── index.js               # 路由表 + beforeEach 导航守卫
│   ├── stores/
│   │   ├── auth.js                # 认证状态（登录/注册/登出，统一入口）
│   │   ├── forum.js               # 论坛状态（帖子 CRUD + 点赞 + 版块）
│   │   ├── chat.js                # 聊天状态
│   │   └── audio.js               # 音频状态
│   ├── composables/
│   │   └── useQwenStream.js       # AI 流式响应（SSE 解析）
│   ├── mock/
│   │   ├── api.js                 # [旧] 内存 mock（登录+发帖）
│   │   ├── forumApi.js            # [新] localStorage 论坛 CRUD
│   │   └── data.js                # 种子数据
│   ├── data/
│   │   └── citiesData.js          # 16 城市全景数据集（景点/美食/主题色）
│   ├── layouts/
│   │   └── CityLayout.vue         # 城市页统一布局（返回按钮 + 导航）
│   ├── views/
│   │   ├── Landing.vue            # 登录页（全屏 3D 粒子背景 + 玻璃拟态）
│   │   ├── Register.vue           # 注册页
│   │   ├── Index.vue              # 首页（Hero + 景点 + 文化 + 美食 + 路线）
│   │   ├── Profile.vue            # 个人中心（行程/帖子/点赞）
│   │   ├── Food.vue               # 鲁菜美食页
│   │   ├── Culture.vue            # 非遗文化页（自定义鼠标交互）
│   │   ├── Forum.vue              # 旅行论坛
│   │   ├── RoutePlanner.vue       # AI 行程规划（左表单 + 右地图）
│   │   └── citys/                 # 16 个城市页面组件
│   │       ├── Jinan.vue  ... Heze.vue
│   ├── components/
│   │   ├── CyberLandscape.vue     # Three.js 千里江山粒子动画核心组件
│   │   ├── NavBar.vue             # 可复用导航栏（16 城市完整路由）
│   │   ├── Footer.vue             # 页脚组件
│   │   ├── VideoPlayer.vue        # 视频播放器
│   │   └── OceanParticles.vue     # 海洋粒子效果
│   └── assets/                    # 城市地图、地标、美食图片（25+ 张）
├── backend/
│   ├── main.py                    # FastAPI 服务（6 个 API 端点）
│   ├── .env.example               # 环境变量模板
│   ├── .env                       # 环境变量（已排除 git 追踪）
│   └── requirements.txt           # Python 依赖
└── dist/                          # Vite 构建产物
```

---

## 路由表

| 路径 | 组件 | 认证要求 | 说明 |
|------|------|----------|------|
| `/` | Landing | 否 | 登录首页（已登录自动跳转 `/index`） |
| `/index` | Index | 是 | 主站首页 |
| `/register` | Register | 否 | 注册页 |
| `/profile` | Profile | 是 | 个人中心 |
| `/food` | Food | 否 | 鲁菜美食 |
| `/forum` | Forum | 否 | 旅行论坛 |
| `/culture` | Culture | 否 | 非遗文化 |
| `/route` | RoutePlanner | 否 | AI 行程规划 |
| `/jinan` ~ `/heze` | 各城市组件 | 否 | 16 个城市子站（CityLayout 嵌套路由） |

**导航守卫逻辑**（[src/router/index.js](src/router/index.js#L75)）：
- 访问 `requiresAuth` 页面但 `localStorage.isLogged !== 'true'` → 重定向到 `/`
- 已登录用户访问 `/` → 自动跳转 `/index`

---

## API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/register` | 用户注册（PBKDF2 哈希密码） |
| POST | `/api/login` | 用户登录（PBKDF2 验证） |
| GET | `/api/user/{username}` | 获取用户信息 |
| POST | `/api/trip/plan` | AI 生成行程（通义千问） |
| POST | `/api/trip/save` | 保存行程到 MySQL |
| GET | `/api/trip/list/{username}` | 获取已保存行程列表 |
| POST | `/api/chat/stream` | AI 流式对话（SSE） |

---

## 数据流

```
浏览器 ──fetch──> FastAPI ──PyMySQL──> MySQL (用户/行程)
  │                    │
  │                    └──OpenAI SDK──> 通义千问 qwen-plus (AI 生成)
  │
  ├── Pinia auth store ──> 统一认证状态
  │
  └── localStorage ──> 论坛帖子 + 点赞 (客户端持久化)
```

---

## 关键技术点

### 1. Three.js 千里江山粒子背景

`CyberLandscape.vue` 使用 35 万粒子模拟中国传统山水画意境：
- 自定义 ShaderMaterial，通过正弦波函数生成连绵山脉
- 纵向 4 段拼接形成"千里江山"长卷效果
- 相机沿 Z 轴自动飞行，模拟"人在画中游"
- 金色河流线（400 条）穿梭于山脉之间

### 2. AI 行程生成与修复

[backend/main.py:322-392](backend/main.py#L322-L392)：
- 首次调用通义千问生成行程 JSON
- 通过 `_plan_is_valid()` 进行严格结构校验（summary/days/route/food/notes）
- 校验失败时自动发起第二次"JSON 修复"请求（temperature=0）
- 两次失败返回 502 错误

### 3. 高德地图集成

[RoutePlanner.vue:109-177](src/views/RoutePlanner.vue#L109-L177)：
- `watch(plan)` 监听 AI 生成结果，自动渲染路径
- 16 城市内置坐标字典优先匹配，未命中则调用 Geocoder 地理编码
- Polyline + Marker 组合渲染，`setFitView` 自适应视野

### 4. 论坛 localStorage 持久化

[src/mock/forumApi.js](src/mock/forumApi.js)：
- 帖子数据与点赞数据分离存储（`shandong_forum_posts` / `shandong_forum_likes_{username}`）
- 每次操作全量读写，适合当前轻量数据规模
- 多用户切换时点赞数据按用户名隔离

### 5. 密码安全

[backend/main.py](backend/main.py)：
- 注册时 `hash_password()` 使用 PBKDF2-SHA256 + 32 字节随机盐（10 万次迭代）
- 登录时 `verify_password()` 验证，密码从不以明文形式比对
- 全部使用 Python 内置 `hashlib`，无需外部依赖
- `.env` 文件已加入 `.gitignore`，不再被 git 追踪

### 6. auth store 统一认证入口

[src/stores/auth.js](src/stores/auth.js)：
- `login()` / `register()` / `logout()` 三个方法封装完整认证流程
- 所有页面通过 `useAuthStore()` 调用，不再直接 fetch API 或操作 localStorage
- `isLoggedIn` 为 computed 属性，自动响应状态变化

---

## 开发命令

```bash
# 前端
npm install
npm run dev        # 开发服务器 (默认 http://localhost:5173)
npm run build      # 生产构建
npm run preview    # 预览构建产物

# 后端
cd backend
pip install -r requirements.txt
python main.py     # FastAPI 服务 (http://0.0.0.0:8000)
```

## 环境变量

前端（可选，`.env` 文件或 Vite 环境变量）：
- `VITE_API_BASE_URL` — 后端 API 地址（默认 `http://127.0.0.1:8000`）

后端（必需，参考 `backend/.env.example`）：
- `DASHSCOPE_API_KEY` — 阿里云 DashScope API 密钥
- `DB_HOST` / `DB_PORT` / `DB_USER` / `DB_PASSWORD` / `DB_NAME` / `DB_TABLE` — MySQL 连接

---

## 已知限制与后续方向

1. **论坛数据**：当前基于 localStorage，未来可接入 MySQL 后端实现多端同步
2. **密码迁移**：如数据库中存在旧明文密码，需执行一次性哈希迁移脚本
3. **响应式适配**：部分页面（RoutePlanner）在移动端左侧面板与地图的比例需优化
4. **SEO**：当前为纯 SPA，若需 SEO 可考虑 SSR（Nuxt）或预渲染
5. **CI/CD**：可接入 GitHub Actions 自动构建部署到 Netlify（已配置 `netlify.toml`）
