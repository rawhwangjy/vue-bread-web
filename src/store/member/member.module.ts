import { defineStore } from 'pinia'

import { ReqMemberCheckIdInterface, ResMemberCheckIdInterface } from '@/service/member/interface/memberCheckId.interface'
import { ReqMemberCreateInterface, ResMemberCreateInterface } from '@/service/member/interface/memberCreate.interface'
import { ReqMemberSigninInterface, ResMemberSigninInterface } from '@/service/member/interface/memberSignin.interface'

import {
  httpCheckId,
  httpSetMemberAccount,
  httpMemberSignin
} from '@/service/member/member.api'

interface memberState {
  checkId: ResMemberCheckIdInterface,
  signup: ResMemberCreateInterface,
  signin: ResMemberSigninInterface
}

export const checkIdInit = {
  state: ''
}
export const signupInit = { }
export const signinInit = {
  state: '',
  accessToken: ''
}

export const useMemberStore = defineStore({
  id: 'member',
  state: (): memberState => ({
    checkId: {
      state: ''
    },
    signup: { },
    signin: {
      state: '',
      accessToken: ''
    }
  }),
  actions: {
    async actionHttpCheckId (reqData: ReqMemberCheckIdInterface) {
      this.checkId = checkIdInit
      try {
        const res = await httpCheckId(reqData)
        if (res.data) {
          this.checkId = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpSetUser (reqData: ReqMemberCreateInterface) {
      this.signup = signupInit
      try {
        const res = await httpSetMemberAccount(reqData)
        if (res.data) {
          this.signup = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpSignin (reqData: ReqMemberSigninInterface) {
      this.signin = signinInit
      try {
        const res = await httpMemberSignin(reqData)
        if (res.data) {
          this.signup = res.data
          if (res.data.accessToken) {
            localStorage.setItem('jst-token', res.data.accessToken)
          }
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
