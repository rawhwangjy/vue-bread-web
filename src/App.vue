<template>
  <Container />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Container from '@/views/_container.vue'
import { logger } from '@/utils/instance.logger'

export default defineComponent({
  name: 'App',
  components: {
    Container
  },
  setup () {
    onMounted(() => {
      if (process.env.NODE_ENV === 'development') {
        logger.info('[MODE]', process.env.NODE_ENV)
        logger.info('[API]', process.env.VUE_APP_API_URL)
      }
    })
    return {

    }
  }
})
</script>
