import { defineStore } from 'pinia'

import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'

import {
  httpGetCategoryList
} from '@/service/category/category.api'

interface categoryState {
  getCategoryList: ResCategoryListInterface[]
}

export const useCategoryStore = defineStore({
  id: 'category',
  state: (): categoryState => ({
    getCategoryList: []
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
    }
  }
})
