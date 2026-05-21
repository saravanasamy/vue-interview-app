import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import QuestionDetailPage from '../pages/QuestionDetailPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/question/:id', component: QuestionDetailPage },
  { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
