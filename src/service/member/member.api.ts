import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'

import { ReqMemberCheckIdInterface } from '@/service/member/interface/memberCheckId.interface'
import { ReqMemberCreateInterface } from '@/service/member/interface/memberCreate.interface'
import { ReqMemberSigninInterface } from '@/service/member/interface/memberSignin.interface'

const token = localStorage.getItem('jwt-token') || null
enum Api {
  checkId = '/member/signup/:id',
  setMemberAccount = '/member/signup',
  signin = '/member/signin'
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
// console.log('token', token)
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
