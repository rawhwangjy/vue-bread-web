import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'

import { ReqMemberCheckIdInterface } from '@/service/member/interface/memberCheckId.interface'
import { ReqMemberCreateInterface } from '@/service/member/interface/memberCreate.interface'

enum Api {
  checkId = '/member/signup/checkId',
  setMemberAccount = '/member/signup'
}

/**
 * @description Signup
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
