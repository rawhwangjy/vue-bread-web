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
  categoryList: ResCategoryListInterface[],
  categoryCreate: ResCategoryCreateInterface,
  categoryUpdate: ResCategoryUpdateInterface,
  categoryDelete: ResCategoryDeleteInterface
}

export const categoryCreateInit = {
  category: ''
}
export const categoryUpdateInit = {
  id: 0,
  category: ''
}
export const categoryDeleteInit = {
  id: 0
}

export const useCategoryStore = defineStore({
  id: 'category',
  state: (): categoryState => ({
    categoryList: [],
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
      this.categoryList = []
      try {
        const res = await httpGetCategoryList()
        if (res.data) {
          this.categoryList = res.data
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
      this.categoryUpdate = categoryUpdateInit
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
      this.categoryDelete = categoryDeleteInit
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
