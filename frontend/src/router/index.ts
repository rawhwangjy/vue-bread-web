import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routerIntro from '@/router/routes/intro.route'
import routerComponents from '@/router/routes/components.route'
import routerModules from '@/router/routes/modules.route'
import routerPages from '@/router/routes/pages.route'

const routes: Array<RouteRecordRaw> = [
  routerIntro,
  routerPages,
  routerComponents,
  routerModules
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
