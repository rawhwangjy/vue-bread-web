<template>
  <Container />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Container from '@/views/_container.vue'

export default defineComponent({
  name: 'App',
  components: {
    Container
  },
  setup () {
    onMounted(() => {
      // console.log('app')
    })
    return {

    }
  }
})
</script>
