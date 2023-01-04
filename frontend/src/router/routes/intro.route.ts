const container = () => import(/* webpackChunkName: "guide" */ '@/views/guide/_iaContainer.vue')
const spec = () => import(/* webpackChunkName: "guide" */ '@/views/guide/intro/spec.vue')
const convention = () => import(/* webpackChunkName: "guide" */ '@/views/guide/intro/convention.vue')
const accessibility = () => import(/* webpackChunkName: "guide" */ '@/views/guide/intro/accessibility.vue')
const testing = () => import(/* webpackChunkName: "guide" */ '@/views/guide/intro/testing.vue')

export default {
  path: '/guide',
  component: container,
  redirect: '/guide/intro/spec',
  children: [
    {
      path: '/guide/intro/spec',
      component: spec
    },
    {
      path: '/guide/intro/convention',
      component: convention
    },
    {
      path: '/guide/intro/accessibility',
      component: accessibility
    },
    {
      path: '/guide/intro/testing',
      component: testing
    }
  ]
}
