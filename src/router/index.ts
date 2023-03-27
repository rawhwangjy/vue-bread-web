import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routerIntro from '@/router/routes/intro.route'
import routerComponents from '@/router/routes/components.route'
import routerModules from '@/router/routes/modules.route'

import routerCategory from '@/router/routes/pages.category.route'
import routerBoard from '@/router/routes/pages.board.route'
import routerProject from '@/router/routes/pages.project.route'
import routerMember from '@/router/routes/pages.member.route'

const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')
const main = () => import(/* webpackChunkName: "pages" */ '@/views/pages/main.vue')
const projectList = () => import(/* webpackChunkName: "pages" */ '@/views/pages/project/projectList.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: projectList
  },
  routerIntro,
  routerComponents,
  routerModules,
  routerCategory,
  routerBoard,
  routerProject,
  routerMember
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
