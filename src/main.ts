import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import '@/assets/scss/root.scss'
// icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencil, faTrash, faCircleXmark, faXmark, faCaretUp, faCaretDown, faChevronLeft, faChevronRight, faCaretLeft, faCaretRight, faBars } from '@fortawesome/free-solid-svg-icons'
// module
import vClickOutside from 'click-outside-vue3'
import VueCookies from 'vue-cookies'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

library.add(faPencil, faTrash, faCircleXmark, faXmark, faCaretUp, faCaretDown, faChevronLeft, faChevronRight, faCaretLeft, faCaretRight, faBars)

createApp(App).use(router).use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(vClickOutside)
  .use(VueCookies)
  .component('Datepicker', Datepicker)
  .mount('#app')
