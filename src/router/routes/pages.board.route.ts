const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')

const boardList = () => import(/* webpackChunkName: "pageBoard" */ '@/views/pages/board/boardList.vue')
const boardView = () => import(/* webpackChunkName: "pageBoard" */ '@/views/pages/board/boardView.vue')
const boardCreate = () => import(/* webpackChunkName: "pageBoard" */ '@/views/pages/board/boardCreate.vue')
const boardUpdate = () => import(/* webpackChunkName: "pageBoard" */ '@/views/pages/board/boardUpdate.vue')

export default {
  path: '/board/:category',
  component: container,
  children: [
    {
      path: '/board/:category',
      name: 'boardList',
      component: boardList
    },
    {
      path: '/board/:category/:id',
      name: 'boardView',
      component: boardView
    },
    {
      path: '/board/:category/create',
      component: boardCreate
    },
    {
      path: '/board/:category/update/:id',
      component: boardUpdate
    }
  ]
}
