import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'

import { ReqMemberCheckIdInterface } from '@/service/member/interface/memberCheckId.interface'
import { ReqMemberCreateInterface } from '@/service/member/interface/memberCreate.interface'
import { ReqMemberSigninInterface } from '@/service/member/interface/memberSignin.interface'
import { ReqMemberRefreshInterface } from '@/service/member/interface/memberRefreshToken.interface'

enum Api {
  checkId = '/member/signup/:id',
  setMemberAccount = '/member/signup',
  signin = '/member/signin',
  reIssusAccessToken = '/member/refresh'
}

/**
 * @description Check ID
 */
export const httpCheckId = (reqData: ReqMemberCheckIdInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.checkId,
    data: reqData
  })
}

/**
 * @description Signup
 */
export const httpSetMemberAccount = (reqData: ReqMemberCreateInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.setMemberAccount,
    data: reqData
  })
}

/**
 * @description Signin
 */
export const httpMemberSignin = (reqData: ReqMemberSigninInterface) => {
  return axiosInstance({
    // headers: {
    //   'content-type': 'text/json',
    //   'x-access-token': token
    // },
    method: RequestEnum.POST,
    url: Api.signin,
    data: reqData
  })
}

/**
 * @description Refresh Token
 */
export const httpReIssueRefreshTokken = (reqData: ReqMemberRefreshInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.reIssusAccessToken,
    data: reqData
  })
}
