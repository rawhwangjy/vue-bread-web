import { defineStore } from 'pinia'

import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'
import { ReqCategoryCreateInterface, ResCategoryCreateInterface } from '@/service/category/interface/categoryCreate.interface'
import { ReqCategoryUpdateInterface, ResCategoryUpdateInterface } from '@/service/category/interface/categoryUpdate.interface'
import { ReqCategoryDeleteInterface, ResCategoryDeleteInterface } from '@/service/category/interface/categoryDelete.interface'

import {
  httpGetCategoryList,
  httpSetCategory,
  httpCategoryUpdate,
  httpCategoryDelete
} from '@/service/category/category.api'

interface categoryState {
  getCategoryList: ResCategoryListInterface[],
  categoryCreate: ResCategoryCreateInterface,
  categoryUpdate: ResCategoryUpdateInterface,
  categoryDelete: ResCategoryDeleteInterface
}

export const categoryCreateInit = {
  category: ''
}
export const getCategoryUpdateInit = {
  id: 0,
  category: ''
}
export const getCategoryDeleteInit = {
  id: 0
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
    },
    categoryDelete: {
      id: 0
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
    async actionHttpCategoryCreate (reqData: ReqCategoryCreateInterface) {
      this.categoryCreate = categoryCreateInit
      try {
        const res = await httpSetCategory(reqData)
        if (res.data) {
          this.categoryCreate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpCategoryUpdate (reqData: ReqCategoryUpdateInterface) {
      this.categoryUpdate = getCategoryUpdateInit
      try {
        const res = await httpCategoryUpdate(reqData)
        if (res.data) {
          this.categoryUpdate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpCategoryDelete (reqData: ReqCategoryDeleteInterface) {
      this.categoryDelete = getCategoryDeleteInit
      try {
        const res = await httpCategoryDelete(reqData)
        if (res.data) {
          this.categoryDelete = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
