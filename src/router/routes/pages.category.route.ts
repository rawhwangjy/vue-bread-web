const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')

const categoryList = () => import(/* webpackChunkName: "pageCategory" */ '@/views/pages/category/categoryList.vue')
const categoryCreate = () => import(/* webpackChunkName: "pageCategory" */ '@/views/pages/category/categoryCreate.vue')

export default {
  path: '/board/category',
  component: container,
  children: [
    {
      path: '/board/category',
      name: 'categoryList',
      component: categoryList
    },
    {
      path: '/board/category/create',
      name: 'categoryCreate',
      component: categoryCreate
    }
  ]
}
