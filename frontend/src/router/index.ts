import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routerCommon from '@/router/routes/common.route'

const routes: Array<RouteRecordRaw> = [
  routerCommon
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
