import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import './style.css'

const app = createApp(App)

// Install Pinia (state management) before mounting
app.use(createPinia())
app.use(router)
app.mount('#app')
