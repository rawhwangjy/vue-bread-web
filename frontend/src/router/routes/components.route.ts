const container = () => import(/* webpackChunkName: "guide" */ '@/views/guide/_iaContainer.vue')
const alert = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsAlert.vue')
const button = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsModules/libsButton.vue')
const checkbox = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsCheckbox.vue')
const radio = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsRadio.vue')
const tab = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsTab.vue')
const swiper = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsSwiper.vue')
const modal = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsModal.vue')

export default {
  path: '/guide/components/alert',
  component: container,
  children: [
    {
      path: '/guide/components/alert',
      component: alert
    },
    {
      path: '/guide/components/button',
      component: button
    },
    {
      path: '/guide/components/checkbox',
      component: checkbox
    },
    {
      path: '/guide/components/radio',
      component: radio
    },
    {
      path: '/guide/components/tab',
      component: tab
    },
    {
      path: '/guide/components/swiper',
      component: swiper
    },
    {
      path: '/guide/components/modal',
      component: modal
    }
  ]
}
