<template>
  <div class="login-wrap">
    <div class="login">
      <Input
        v-model="inputText"
        label="아이디"
        name="currentDefault"
      />
      <Input
        v-model="inputText"
        label="비밀번호"
        name="currentDefault"
      />
      <button type="button" class="btn xl primary">로그인</button>
    </div>
    <div class="board-btns right">
      <button @click="onSignup" class="btn lg dark">회원가입</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Input from '@/components/Input.vue'

export default defineComponent({
  name: '',
  components: {
    Input
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()

    const inputText = ref('')
    function onSignup () {
      router.push({
        path: '/signup'
      })
    }
    return {
      inputText,
      onSignup
    }
  }
})
</script>
