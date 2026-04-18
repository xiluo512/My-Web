<template>
  <div class="city-layout">
    <!-- 顶部导航栏 -->
    <header class="city-nav">
      <router-link to="/" class="back-btn">
        <span class="arrow">←</span>
        <span class="text">返回主站</span>
      </router-link>

      <nav class="city-links">
        <router-link to="/index" class="nav-link">首页</router-link>
        <router-link to="/food" class="nav-link">美食</router-link>
        <router-link to="/culture" class="nav-link">文化</router-link>
        <router-link to="/forum" class="nav-link">论坛</router-link>
      </nav>
    </header>

    <!-- 页面内容 -->
    <main class="city-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// 布局逻辑（如需添加可在此处）
</script>

<style scoped>
.city-layout {
  min-height: 100vh;
  width: 100%;
}

.city-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 20px;
  text-decoration: none;
  color: #2563eb;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(37, 99, 235, 0.2);
  transform: translateY(-2px);
}

.back-btn .arrow {
  font-size: 18px;
  font-weight: bold;
}

.city-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  padding: 6px 12px;
  text-decoration: none;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
}

.nav-link.router-link-active {
  background: #2563eb;
  color: #fff;
}

.city-content {
  padding-top: 60px; /* 与导航栏高度一致 */
  min-height: 100vh;
}

/* 响应式 */
@media (max-width: 768px) {
  .city-nav {
    padding: 0 15px;
  }

  .city-links {
    display: none; /* 移动端隐藏导航链接，仅保留返回按钮 */
  }

  .back-btn .text {
    display: none; /* 移动端仅显示箭头 */
  }
}
</style>