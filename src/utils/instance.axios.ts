import axios, { AxiosInstance } from 'axios'
import { API_URL } from '@/utils/common.constants'
import { logger } from '@/utils/instance.logger'
import { useMemberStore } from '@/store/member/member.module'
const memberStore = useMemberStore()

function createInstance () {
  logger.info('CREATE AXIOS INSTANCE 스타트')
  const instance: AxiosInstance = axios.create({
    timeout: 5000,
    baseURL: API_URL,
    headers: {
      authorization: localStorage.getItem('accessToken')
    }
  })
  return setInterceptors(instance)
}

export function setInterceptors (instance: AxiosInstance): AxiosInstance {
  instance.interceptors.request.use(
    (config) => {
      // 요청을 보내기 전 수행할 작업
      return config
    },
    (error) => {
      // 오류 요청 가공
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    (response) => {
      // 200대 response를 받아 응답 데이터를 가공하는 작업
      // console.log('instance.interceptors.response', response)
      if (response.status === 401) {
        //
      }
      return response
    },
    async (error) => {
      // // 200대 이외의 오류 응답을 가공
      // return Promise.reject(error)
      const { config, response: { status } } = error
      const originReq = config
      console.log('originReq', JSON.parse(originReq.data))
      console.log('originReq', JSON.parse(originReq.data).userId, JSON.parse(originReq.data).userPw)
      if (status === 401) {
        // console.log('RES >>> 401')
        if (error.response.data.message === 'Token Expired') {
          const reqData = {
            userId: JSON.parse(originReq.data).userId,
            userPw: JSON.parse(originReq.data).userPw,
            refreshToken: localStorage.getItem('refreshToken')
          }
          await memberStore.acctionHttpRefresh(reqData)
          // token refresh 요청
          originReq.headers = {
            ...originReq.headers,
            authorization: localStorage.getItem('accessToken')
          }
          // originReq.headers.authorization = localStorage.getItem('accessToken')
          return axios(originReq)
        }
      }
      return Promise.reject(error)
    }
  )
  return instance
}

export const axiosInstance = createInstance()
