const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')

const categoryList = () => import(/* webpackChunkName: "pages" */ '@/views/pages/category/categoryList.vue')
const categoryCreate = () => import(/* webpackChunkName: "pages" */ '@/views/pages/category/categoryCreate.vue')

const boardList = () => import(/* webpackChunkName: "pages" */ '@/views/pages/board/boardList.vue')
const boardView = () => import(/* webpackChunkName: "pages" */ '@/views/pages/board/boardView.vue')
const boardCreate = () => import(/* webpackChunkName: "pages" */ '@/views/pages/board/boardCreate.vue')
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
      path: '/board/category',
      name: 'categoryList',
      component: categoryList
    },
    {
      path: '/board/category/register',
      name: 'categoryCreate',
      component: categoryCreate
    },
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
      path: '/board/:category/register',
      component: boardCreate
    },
    {
      path: '/board/:category/update/:id',
      component: boardUpdate
    }
  ]
}
