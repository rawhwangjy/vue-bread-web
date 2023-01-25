import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import '@/assets/scss/root.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencil, faTrash, faCircleXmark, faXmark, faCaretUp, faCaretDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import vClickOutside from 'click-outside-vue3'

library.add(faPencil, faTrash, faCircleXmark, faXmark, faCaretUp, faCaretDown, faChevronLeft, faChevronRight)

createApp(App).use(router).use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(vClickOutside)
  .mount('#app')
