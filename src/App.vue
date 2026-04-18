<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* 全局基础重置 */
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; font-family: 'Noto Serif SC', serif; }
#app { min-height: 100vh; }

/* 全局滚动条美化（可选） */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #b59020; }
</style>