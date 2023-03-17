<template>
  <div class="login-wrap">
    <div class="signup-form">
      <div class="form-row id-check">
        <Input
          v-model="userId"
          label="아이디"
          btn
          btn-text="아이디 중복 검사"
          @change="changInput"
          @click="onCheckId"
        />
        <Alert
          :state="isShowCheckIdAlert"
          content-align="center"
          btn-align="center"
          bg
          @close="isShowCheckIdAlert = false"
        >
          {{ checkIdResult }}
        </Alert>
      </div>
      <div class="form-row">
        <Input
          v-model="userPw"
          label="비밀번호"
          name="currentDefault"
        />
      </div>
      <div class="form-row">
        <Input
          v-model="userName"
          label="이름"
          name="currentDefault"
        />
      </div>
      <div class="signup-btns center">
        <button class="btn lg dark" @click="onRegistUser">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMemberStore } from '@/store/member/member.module'
import { ReqMemberCreateInterface, ResMemberCreateInterface } from '@/service/member/interface/memberCreate.interface'
import Input from '@/components/Input.vue'
import Alert from '@/components/Alert.vue'

export default defineComponent({
  name: '',
  components: {
    Input,
    Alert
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const memberStore = useMemberStore()

    const isCheckId = ref<boolean>(false)
    const isShowCheckIdAlert = ref<boolean>(false)
    const checkIdResult = ref<string>('')
    const idReg = /^[a-z0-9_-]{4,30}$/ // 소문자 + 숫자 + 언더바/하이픈 허용 4~20자리
    const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/ // 문자, 숫자 1개이상 포함, 8자리 이상
    const user = reactive<ReqMemberCreateInterface>({
      userId: '',
      userPw: '',
      userName: ''
    })
    async function onRegistUser () {
      if (!user.userId) {
        alert('아이디를 입력해 주세요.')
        return false
      }
      if (isCheckId.value === false) {
        alert('ID 중복 검사해 주세요.')
        return false
      }
      if (!idReg.test(user.userId)) {
        alert('아이디는 소문자, 숫자 조합으로 4자리 이상입니다.')
        return false
      }
      if (!pwReg.test(user.userPw)) {
        alert('비밀번호는 문자, 숫자를 1개 이상 포함한 10자리 이상입니다.')
        return false
      }
      if (!user.userName) {
        alert('이름을 입력해 주세요.')
        return false
      }
      const result = await memberStore.actionHttpSetUser(user)

      // 유효성 검사

      if (result.insertId) {
        alert('회원가입 완료')
        router.push({
          path: '/'
        })
      }
    }
    function changInput () {
      isCheckId.value = false
    }
    async function onCheckId () {
      if (!idReg.test(user.userId)) {
        alert('아이디는 소문자, 숫자 조합으로 4자리 이상입니다.')
        return false
      }
      isCheckId.value = true
      const reqData = {
        userId: user.userId
      }
      const result = await memberStore.actionHttpCheckId(reqData)
      isShowCheckIdAlert.value = true
      if (result.state === 'Y') {
        checkIdResult.value = '사용 가능한 ID 입니다.'
      } else {
        checkIdResult.value = '사용 불가능한 ID 입니다.'
        isCheckId.value = false
      }
    }

    return {
      ...toRefs(user),
      onCheckId,
      onRegistUser,
      isShowCheckIdAlert,
      changInput,
      checkIdResult
    }
  }
})
</script>
