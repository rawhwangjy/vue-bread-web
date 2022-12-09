import { defineStore } from 'pinia'

import { GetBoardListInterface } from '@/service/board/interface/getBoardList.interface'

import { httpGetBoardList, httpGetBoard } from '@/service/board/board.api'

interface boardState {
  getBoardList: GetBoardListInterface[],
  getBoardDetail: GetBoardListInterface
}

export const getBoardListInit = {
  id: 0,
  boardType: '',
  title: ''
}

export const useBoardStore = defineStore({
  id: '',
  state: (): boardState => ({
    getBoardList: [],
    getBoardDetail: {
      id: 0,
      boardType: '',
      title: ''
    }
  }),
  actions: {
    async actionHttpGetBoardList (fdata: GetBoardListInterface) {
      this.getBoardList = []
      try {
        const res = await httpGetBoardList(fdata)
        if (res.data) {
          this.getBoardList = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpGetBoard (fdata: GetBoardListInterface) {
      this.getBoardDetail = getBoardListInit
      try {
        const res = await httpGetBoard(fdata)
        if (res.data) {
          this.getBoardDetail = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
