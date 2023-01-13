<template>
  <div v-show="isContentShown" class="test-code">
    dd
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Test',
  components: { },
  props: { },
  setup () {
    const isContentShown = ref(false)
    const open = () => (isContentShown.value = true)
    onMounted(() => {
      console.log('test')
    })

    return {
      isContentShown,
      open
    }
  }
})
</script>

<style lang="scss" scoped>
.test-code {
  border: 1px solid red;
}
</style>
