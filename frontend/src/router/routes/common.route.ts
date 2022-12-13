const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')
const boardList = () => import(/* webpackChunkName: "pages" */ '@/views/pages/board/boardList.vue')
const boardView = () => import(/* webpackChunkName: "pages" */ '@/views/pages/board/boardView.vue')
const boardRegister = () => import(/* webpackChunkName: "pages" */ '@/views/pages/board/boardRegister.vue')
const boardUpdate = () => import(/* webpackChunkName: "pages" */ '@/views/pages/board/boardUpdate.vue')

const test = () => import(/* webpackChunkName: "pages" */ '@/views/pages/test.vue')

export default {
  path: '/',
  component: container,
  redirect: '/',
  children: [
    {
      path: '/',
      component: test
    },
    {
      path: '/test',
      component: test
    },
    {
      path: '/board/:boardType',
      name: 'boardList',
      component: boardList
    },
    {
      path: '/board/:boardType/:id',
      name: 'boardView',
      component: boardView
    },
    {
      path: '/board/:boardType/register',
      component: boardRegister
    },
    {
      path: '/board/:boardType/update/:id',
      component: boardUpdate
    }
  ]
}
