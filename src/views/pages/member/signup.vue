<template>
  <Header />
  <div class="content login" id="content-body">
    <div class="login-title">
      <h3>회원가입</h3>
    </div>
    <div class="login-content">
      <div class="login-form">
        <div class="form-row id-check">
          <Input
            v-model="userId"
            label="아이디"
            btn
            btn-text="아이디 중복 검사"
            @change="onInputId"
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
            @change="onInputPw"
          />
          <span
            v-show="isShowPw"
            class="login-tip"
          >비밀번호를 입력해 주세요.</span>
        </div>
        <div class="form-row">
          <Input
            v-model="userRePw"
            label="비밀번호 확인"
            @change="onInputRePw"
          />
          <span
            v-show="isShowRePw"
            class="login-tip"
          >비밀번호가 일치하지 않습니다.</span>
        </div>
        <div class="form-row">
          <Input
            v-model="userName"
            label="이름"
          />
        </div>
      </div>
    </div>
    <div class="login-btns side">
      <button class="btn lg light" @click="back">목록</button>
      <button class="btn lg dark" @click="onRegistUser">회원가입</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import Header from '@/views/layout/Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { useMemberStore } from '@/store/member/member.module'
import { ReqMemberCreateInterface, ResMemberCreateInterface } from '@/service/member/interface/memberCreate.interface'
import Input from '@/components/Input.vue'
import Alert from '@/components/Alert.vue'

interface MemberModel {
  userId: string,
  userPw: string,
  userRePw: string,
  userName: string
}

export default defineComponent({
  name: '',
  components: {
    Header,
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
    const user = reactive<MemberModel>({
      userId: '',
      userPw: '',
      userRePw: '',
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
      const reqData = {
        userId: user.userId,
        userPw: user.userPw,
        userName: user.userName
      }
      const result = await memberStore.actionHttpSetUser(reqData)
      console.log('rr', result)

      if (result.state === 'Y') {
        alert('회원가입 완료')
        router.push({
          path: '/signup/complete'
        })
      }
    }
    function onInputId () {
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

    const isShowPw = ref<boolean>(false)
    const isShowRePw = ref<boolean>(false)
    function onInputPw () {
      isShowPw.value = false
      isShowRePw.value = false
    }
    function onInputRePw (value: string) {
      isShowPw.value = false
      isShowRePw.value = false
      if (user.userPw === '') {
        isShowPw.value = true
      } else if (user.userPw !== value) {
        isShowRePw.value = true
      }
    }

    function back () {
      window.history.back()
      router.push({
        path: '/'
      })
    }

    return {
      ...toRefs(user),
      onCheckId,
      onRegistUser,
      isShowCheckIdAlert,
      onInputId,
      checkIdResult,
      isShowPw,
      isShowRePw,
      onInputPw,
      onInputRePw,
      back
    }
  }
})
</script>
