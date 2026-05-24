import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Register1View from '../views/Register1View.vue'
import Register2View from '../views/Register2View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/register1', name: 'register1', component: Register1View },
    { path: '/register2', name: 'register2', component: Register2View },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
