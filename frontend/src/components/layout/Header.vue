<template>
  <header>
    <nav>
      <div class="global-nav-links">
        <router-link to="/board/board" class="global-nav-item">board</router-link>
        <router-link to="/board/notice" class="global-nav-item">notice</router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'Header',
  components: {
  },
  props: {
    scrollTop: {
      type: Boolean,
      default: false
    },
    scrollBottom: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    onMounted(() => {
      // console.log('props.scrollTop', props.scrollTop)
    })

    return {
    }
  }
})
</script>
