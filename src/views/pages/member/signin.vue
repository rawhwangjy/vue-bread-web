<template>
  <Header />
  <div class="content login" id="content-body">
    <div class="login-title">
      <h3>로그인</h3>
    </div>
    <div class="login-content">
      <div class="login-form">
        <div class="form-row">
          <Input
            v-model="userId"
            label="아이디"
            name="currentDefault"
          />
        </div>
        <div class="form-row">
          <Input
            v-model="userPw"
            label="비밀번호"
            name="currentDefault"
          />
        </div>
      </div>
    </div>
    <div class="login-btns side">
      <button type="button" class="btn xl primary" @click="onSignin">로그인</button>
      <button type="button" class="btn lg dark" @click="onSignup">회원가입</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Header from '@/views/layout/Header.vue'
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
    Header,
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
      if (!user.userId) {
        alert('아이디를 입력해 주세요.')
        return false
      }
      if (!user.userPw) {
        alert('비밀번호를 입력해 주세요.')
        return false
      }
      const result = await memberStore.actionHttpSignin(user)
      if (result.state === 'Y') {
        alert('로그인 완료')
        console.log('로그인 완료', result.accessToken)
        // router.push({
        //   path: '/'
        // })
      } else {
        console.log('아이디 확인해 주세요.')
      }
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
