import { createApp } from 'vue'
import './assets/css/index.css'
import App from './App.vue'
import { initTheme } from './themes/useTheme'

// Paint the saved palette before the first render.
initTheme()

createApp(App).mount('#app')
