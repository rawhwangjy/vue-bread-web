import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import '@/assets/scss/root.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

library.add(faPencil)

createApp(App).use(router).use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
