<template>
  <Header />
  <div class="content-body login" id="content-body">
    <div class="title-area">
      <h3 class="main-title">로그인</h3>
    </div>
    <div class="content-area">
      <div class="form-area">
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
    <div class="footer-area side">
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
        router.push({
          path: '/project'
        })
      } else {
        alert('아이디, 비밀번호를 확인해 주세요.')
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
