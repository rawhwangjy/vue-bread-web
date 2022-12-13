import { defineStore } from 'pinia'

import { ReqBoardListInterface, ResBoardListInterface } from '@/service/board/interface/getBoardList.interface'
import { ReqBoardDetailInterface, ResBoardDetailInterface } from '@/service/board/interface/getBoardDetail.interface'
import { ReqBoardRegisterInterface } from '@/service/board/interface/boardRegister.interface'

import { httpGetBoardList, httpGetBoard, httpSetBoard } from '@/service/board/board.api'

interface boardState {
  getBoardList: ResBoardListInterface[],
  getBoardDetail: ResBoardDetailInterface,
  boardRegister: ReqBoardRegisterInterface
}

export const getBoardListInit = {
  id: 0,
  boardType: '',
  title: '',
  content: '',
  agree: false
}
export const boardRegisterInit = {
  boardType: '',
  title: '',
  content: '',
  agree: false
}

export const useBoardStore = defineStore({
  id: '',
  state: (): boardState => ({
    getBoardList: [],
    getBoardDetail: {
      id: 0,
      boardType: '',
      title: '',
      content: '',
      agree: false
    },
    boardRegister: {
      boardType: '',
      title: '',
      content: '',
      agree: false
    }
  }),
  actions: {
    async actionHttpGetBoardList (fdata: ReqBoardListInterface) {
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
    async actionHttpGetBoard (fdata: ReqBoardDetailInterface) {
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
    },
    async actionHttpBoardRegister (fdata: ReqBoardRegisterInterface) {
      this.boardRegister = boardRegisterInit
      try {
        const res = await httpSetBoard(fdata)
        res.data.agree === true ? res.data.agree = 1 : res.data.agree = 0
        if (res.data) {
          this.boardRegister = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
