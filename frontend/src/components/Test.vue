<template>
  <div v-show="isContentShown" class="test-code">
    dd
  </div>
  <div>
    <div>
      <label for="index1">레이블</label>
      <input type="text" id="index1" v-model="input1"/>
    </div>
    <div>
      <label for="index2">레이블</label>
      <input type="text" id="index2" v-model="input2"/>
    </div>
    <div>
      <label for="index3">레이블</label>
      <input type="text" id="index3" v-model="input3"/>
    </div>
    {{ input1 }}
    <button type="button" @click="onCalc">버튼</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'Test',
  components: { },
  props: { },
  setup () {
    const isContentShown = ref(false)
    const open = () => (isContentShown.value = true)
    const state = reactive({
      input1: 0,
      input2: 0,
      input3: 0
    })
    onMounted(() => {
      console.log('test')
    })

    function onCalc () {
      console.log('input1', state.input1)
      console.log('input2', state.input2)
      console.log('input3', state.input3)
      let a = state.input1
      let b = state.input2
      let r
      while (b !== 0) {
        r = a % b
        a = b
        b = r
      }
      console.log('aa', a)
    }

    return {
      isContentShown,
      open,
      onCalc,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.test-code {
  border: 1px solid red;
}
</style>
