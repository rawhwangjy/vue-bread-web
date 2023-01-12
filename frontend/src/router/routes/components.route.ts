const container = () => import(/* webpackChunkName: "guide" */ '@/views/guide/_iaContainer.vue')
const alert = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsAlert.vue')
const checkbox = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsCheckbox.vue')
const input = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsInput.vue')
const modal = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsModal.vue')
const radio = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsRadio.vue')
const select = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsSelect.vue')
const swiper = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsSwiper.vue')
const tab = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsTab.vue')
const toast = () => import(/* webpackChunkName: "guide" */ '@/views/guide/libsComponents/libsToast.vue')

export default {
  path: '/guide/components/alert',
  component: container,
  children: [
    {
      path: '/guide/components/alert',
      component: alert
    },
    {
      path: '/guide/components/checkbox',
      component: checkbox
    },
    {
      path: '/guide/components/input',
      component: input
    },
    {
      path: '/guide/components/modal',
      component: modal
    },
    {
      path: '/guide/components/radio',
      component: radio
    },
    {
      path: '/guide/components/select',
      component: select
    },
    {
      path: '/guide/components/swiper',
      component: swiper
    },
    {
      path: '/guide/components/tab',
      component: tab
    },
    {
      path: '/guide/components/toast',
      component: toast
    }
  ]
}
