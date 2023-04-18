import { defineStore } from 'pinia'

import { ReqMemberCheckIdInterface, ResMemberCheckIdInterface } from '@/service/member/interface/memberCheckId.interface'
import { ReqMemberCreateInterface, ResMemberCreateInterface } from '@/service/member/interface/memberCreate.interface'
import { ReqMemberSigninInterface, ResMemberSigninInterface, ResMemberSigninStateInterface } from '@/service/member/interface/memberSignin.interface'
import { ReqMemberRefreshInterface, ResMemberRefreshInterface } from '@/service/member/interface/memberRefreshToken.interface'
import VueCookies from 'vue-cookies'

import {
  httpCheckId,
  httpSetMemberAccount,
  httpMemberSignin,
  httpReIssueRefreshTokken
} from '@/service/member/member.api'
import { LocalKey } from '@/utils/common.constants'

interface memberState {
  checkId: ResMemberCheckIdInterface,
  signup: ResMemberCreateInterface,
  signin: ResMemberSigninInterface,
  signinState: ResMemberSigninStateInterface,
  refresh: ResMemberRefreshInterface
}

export const checkIdInit = {
  state: ''
}
export const signupInit = {
  state: '',
  userId: '',
  accessToken: '',
  refreshToken: ''
}
export const signinInit = {
  state: '',
  message: '',
  userId: '',
  userName: '',
  accessToken: '',
  refreshToken: ''
}
export const refreshInit = {
  accessToken: '',
  refreshToken: ''
}

export const useMemberStore = defineStore({
  id: 'member',
  state: (): memberState => ({
    checkId: {
      state: ''
    },
    signup: {
      state: '',
      userId: '',
      accessToken: '',
      refreshToken: ''
    },
    signin: {
      state: '',
      message: '',
      userId: '',
      userName: '',
      accessToken: '',
      refreshToken: ''
    },
    signinState: {
      userId: '',
      userName: '',
      accessToken: ''
    },
    refresh: {
      accessToken: '',
      refreshToken: ''
    }
  }),
  getters: {
    getLoginInfo (): ResMemberSigninStateInterface | null {
      return this.signinState
    }
  },
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
            localStorage.setItem(LocalKey.accessToken, res.data.accessToken)
            // VueCookies.VueCookies.set(`${res.data.userId}AccessToken`, res.data.accessToken, 300)
          }
          if (res.data.refreshToken) {
            localStorage.setItem(LocalKey.refreshToken, res.data.refreshToken)
            // VueCookies.VueCookies.set(`${res.data.userId}RefreshToken`, res.data.refreshToken, 300)
          }
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async acctionHttpRefresh (reqData: ReqMemberRefreshInterface) {
      this.refresh = refreshInit
      try {
        const res = await httpReIssueRefreshTokken(reqData)
        if (res.data) {
          this.refresh = res.data
          if (res.data.accessToken) {
            localStorage.setItem(LocalKey.accessToken, res.data.accessToken)
            console.log('return accessToken 재설정', res.data.accessToken)
          }
          if (res.data.refreshToken) {
            localStorage.setItem(LocalKey.refreshToken, res.data.refreshToken)
            console.log('return refreshToken 재설정', res.data.refreshToken)
          }
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
