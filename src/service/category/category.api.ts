import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'

import { ReqCategoryCreateInterface } from '@/service/category/interface/categoryCreate.interface'
import { ReqCategoryUpdateInterface } from '@/service/category/interface/categoryUpdate.interface'
import { ReqCategoryDeleteInterface } from '@/service/category/interface/categoryDelete.interface'

enum Api {
  categoryList = '/board/category/categoryList',
  categoryCreate = '/board/category/register',
  categoryUpdate = '/board/category/update/:id',
  CategoryDelete = '/board/category/delete/:id'
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
export const httpSetCategory = (reqData: ReqCategoryCreateInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.categoryCreate,
    data: reqData
  })
}

/**
 * @description Category Update
 */
export const httpCategoryUpdate = (reqData: ReqCategoryUpdateInterface) => {
  return axiosInstance({
    method: RequestEnum.PUT,
    url: Api.categoryUpdate,
    data: reqData
  })
}

/**
 * @description Category Delete
 */
export const httpCategoryDelete = (reqData: ReqCategoryDeleteInterface) => {
  return axiosInstance({
    method: RequestEnum.DELETE,
    url: Api.CategoryDelete,
    data: reqData
  })
}
