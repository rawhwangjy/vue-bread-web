import { defineStore } from 'pinia'

import { ReqMemberCheckIdInterface, ResMemberCheckIdInterface } from '@/service/member/interface/memberCheckId.interface'
import { ReqMemberCreateInterface, ResMemberCreateInterface } from '@/service/member/interface/memberCreate.interface'

import {
  httpCheckId,
  httpSetMemberAccount
} from '@/service/member/member.api'

interface memberState {
  checkId: ResMemberCheckIdInterface,
  signup: ResMemberCreateInterface
}

export const checkIdInit = {
  state: ''
}
export const signupInit = { }

export const useMemberStore = defineStore({
  id: 'member',
  state: (): memberState => ({
    checkId: {
      state: ''
    },
    signup: { }
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
    }
  }
})
