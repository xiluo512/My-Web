import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'

// 全局字体引入（可选）
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap'
document.head.appendChild(link)

const app = createApp(App)
//使用pinia
app.use(createPinia())
//使用路由
app.use(router)

app.mount('#app')