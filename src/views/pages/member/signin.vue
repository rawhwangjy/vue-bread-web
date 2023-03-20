<template>
  <div class="login-wrap">
    <div class="login">
      <Input
        v-model="userId"
        label="아이디"
        name="currentDefault"
      />
      <Input
        v-model="userPw"
        label="비밀번호"
        name="currentDefault"
      />
      <button type="button" class="btn xl primary" @click="onSignin">로그인</button>
    </div>
    <div class="board-btns right">
      <button type="button" class="btn lg dark" @click="onSignup">회원가입</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMemberStore } from '@/store/member/member.module'
import Input from '@/components/Input.vue'

interface MemberModel {
  userId: string,
  userPw: string
}

export default defineComponent({
  name: '',
  components: {
    Input
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const memberStore = useMemberStore()

    const user = reactive<MemberModel>({
      userId: '',
      userPw: ''
    })
    async function onSignin () {
      const result = await memberStore.actionHttpSignin(user)
    }
    function onSignup () {
      router.push({
        path: '/signup'
      })
    }
    return {
      ...toRefs(user),
      onSignin,
      onSignup
    }
  }
})
</script>
