import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'

import { ReqCategoryCreateInterface } from '@/service/category/interface/categoryCreate.interface'
import { ReqCategoryUpdateInterface } from '@/service/category/interface/categoryUpdate.interface'

enum Api {
  categoryList = '/board/category/categoryList',
  categoryCreate = '/board/category/register',
  categoryUpdate = '/board/category/register/:id'
}

/**
 * @description Category List
 */
export const httpGetCategoryList = () => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.categoryList
  })
}

/**
 * @description Category Create
 */
export const httpSetCategory = (fdata: ReqCategoryCreateInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.categoryCreate,
    data: fdata
  })
}

/**
 * @description Category Update Create
 */
export const httpSetCategoryUpdate = (fdata: ReqCategoryUpdateInterface) => {
  return axiosInstance({
    method: RequestEnum.PUT,
    url: Api.categoryUpdate,
    data: fdata
  })
}
