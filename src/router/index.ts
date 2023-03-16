import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routerIntro from '@/router/routes/intro.route'
import routerComponents from '@/router/routes/components.route'
import routerModules from '@/router/routes/modules.route'

import routerCategory from '@/router/routes/pages.category.route'
import routerBoard from '@/router/routes/pages.board.route'
import routerProject from '@/router/routes/pages.project.route'
import routerSignup from '@/router/routes/pages.signup.route'

const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: container
  },
  routerIntro,
  routerComponents,
  routerModules,
  routerCategory,
  routerBoard,
  routerProject,
  routerSignup
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
