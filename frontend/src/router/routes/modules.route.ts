const container = () => import(/* webpackChunkName: "guide" */ '@/views/guide/_iaContainer.vue')
const button = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsModules/libsButton.vue')

export default {
  path: '/guide/modules/button',
  component: container,
  children: [
    {
      path: '/guide/modules/button',
      component: button
    }
  ]
}
