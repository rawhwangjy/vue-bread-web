import axios, { AxiosInstance } from 'axios'

function createInstance () {
  const instance: AxiosInstance = axios.create({
    timeout: 5000,
    baseURL: '/api'
  })
  return setInterceptors(instance)
}

export function setInterceptors (instance: AxiosInstance): AxiosInstance {
  instance.interceptors.request.use(
    config => {
      // console.log('instance.interceptors.request', config)
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    response => {
      // console.log('instance.interceptors.response', response)
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )
  return instance
}

export const axiosInstance = createInstance()
