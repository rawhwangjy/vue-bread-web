import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'

enum Api {
  categoryList = '/board/category/categoryList'
}

/**
 * @description Board List
 */
export const httpGetCategoryList = () => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.categoryList
  })
}
