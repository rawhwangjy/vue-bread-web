import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routerIntro from '@/router/routes/intro.route'
import routerComponents from '@/router/routes/components.route'
import routerModules from '@/router/routes/modules.route'

import routerCategory from '@/router/routes/pages.category.route'
import routerBoard from '@/router/routes/pages.board.route'
import routerProject from '@/router/routes/pages.project.route'
import routerMember from '@/router/routes/pages.member.route'
import routerGame from '@/router/routes/pages.game.route'

const intro = () => import(/* webpackChunkName: "pages" */ '@/views/pages/intro.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: intro
  },
  routerIntro,
  routerComponents,
  routerModules,
  routerCategory,
  routerBoard,
  routerProject,
  routerMember,
  routerGame
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
