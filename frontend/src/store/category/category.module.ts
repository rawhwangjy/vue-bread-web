import { defineStore } from 'pinia'

import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'
import { ReqCategoryCreateInterface, ResCategoryCreateInterface } from '@/service/category/interface/categoryCreate.interface'
import { ReqCategoryUpdateInterface, ResCategoryUpdateInterface } from '@/service/category/interface/categoryUpdate.interface'

import {
  httpGetCategoryList,
  httpSetCategory,
  httpSetCategoryUpdate
} from '@/service/category/category.api'

interface categoryState {
  getCategoryList: ResCategoryListInterface[],
  categoryCreate: ResCategoryCreateInterface,
  categoryUpdate: ResCategoryUpdateInterface
}

export const categoryCreateInit = {
  category: ''
}
export const getCategoryUpdateInit = {
  id: 0,
  category: ''
}

export const useCategoryStore = defineStore({
  id: 'category',
  state: (): categoryState => ({
    getCategoryList: [],
    categoryCreate: {
      category: ''
    },
    categoryUpdate: {
      id: 0,
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
    },
    async actionHttpCategoryUpdate (fdata: ReqCategoryUpdateInterface) {
      this.categoryUpdate = getCategoryUpdateInit
      try {
        const res = await httpSetCategoryUpdate(fdata)
        if (res.data) {
          this.categoryUpdate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
