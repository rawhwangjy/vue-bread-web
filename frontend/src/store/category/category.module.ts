import { defineStore } from 'pinia'

import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'
import { ReqCategoryCreateInterface, ResCategoryCreateInterface } from '@/service/category/interface/categoryCreate.interface'

import {
  httpGetCategoryList,
  httpSetCategory
} from '@/service/category/category.api'

export const categoryCreateInit = {
  category: ''
}
interface categoryState {
  getCategoryList: ResCategoryListInterface[],
  categoryCreate: ResCategoryCreateInterface
}

export const useCategoryStore = defineStore({
  id: 'category',
  state: (): categoryState => ({
    getCategoryList: [],
    categoryCreate: {
      category: ''
    }
  }),
  actions: {
    async actionHttpGetCategoryList () {
      this.getCategoryList = []
      try {
        const res = await httpGetCategoryList()
        if (res.data) {
          this.getCategoryList = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpCategoryCreate (fdata: ReqCategoryCreateInterface) {
      this.categoryCreate = categoryCreateInit
      try {
        const res = await httpSetCategory(fdata)
        if (res.data) {
          this.categoryCreate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
