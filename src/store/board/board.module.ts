import { defineStore } from 'pinia'

import { ReqBoardListInterface, ResBoardListInterface } from '@/service/board/interface/boardList.interface'
import { ReqBoardDetailInterface, ResBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ResBoardCreateInterface } from '@/service/board/interface/boardCreate.interface'
import { ResBoardUpdateInterface } from '@/service/board/interface/boardUpdate.interface'
import { ReqBoardDeleteInterface, ResBoardDeleteInterface } from '@/service/board/interface/boardDelete.interface'
import { ReqBoardListDeleteInterface, ResBoardListDeleteInterface } from '@/service/board/interface/boardListDelete.interface'

import {
  httpGetBoardList,
  httpGetBoard,
  httpSetBoard,
  httpBoardUpdate,
  httpBoardDelete,
  httpBoardListDelete
} from '@/service/board/board.api'

interface boardState {
  boardList: ResBoardListInterface[],
  boardDetail: ResBoardDetailInterface,
  boardCreate: ResBoardCreateInterface,
  boardUpdate: ResBoardUpdateInterface,
  boardDelete: ResBoardDeleteInterface,
  boardListDelete: ResBoardListDeleteInterface
}

export const boardDetailInit = {
  id: 0,
  category: '',
  title: '',
  content: '',
  agree: false,
  fileList: []
}
export const boardCreateInit = { }
export const boardUpdateInit = { }
export const boardDeleteInit = {
  id: 0
}
export const boardListDeleteInit = {
  id: 0
}

export const useBoardStore = defineStore({
  id: 'board',
  state: (): boardState => ({
    // Res에 대한 초기값
    // 스토어가 생성될 때의 초기값
    boardList: [],
    boardDetail: {
      id: 0,
      category: '',
      title: '',
      content: '',
      agree: false,
      fileList: []
    },
    boardCreate: { },
    boardUpdate: { },
    boardDelete: {
      id: 0
    },
    boardListDelete: {
      id: 0
    }
  }),
  actions: {
    async actionHttpGetBoardList (reqData: ReqBoardListInterface) {
      this.boardList = []
      try {
        const res = await httpGetBoardList(reqData)
        if (res.data) {
          this.boardList = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpGetBoard (reqData: ReqBoardDetailInterface) {
      this.boardDetail = boardDetailInit
      try {
        const res = await httpGetBoard(reqData)
        if (res.data) {
          this.boardDetail = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpBoardCreate (reqData: FormData) {
      this.boardCreate = boardCreateInit
      try {
        const res = await httpSetBoard(reqData)
        if (res.data) {
          this.boardCreate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpBoardUpdate (reqData: FormData) {
      this.boardUpdate = boardUpdateInit
      try {
        const res = await httpBoardUpdate(reqData)
        if (res.data) {
          this.boardUpdate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpBoardDelete (reqData: ReqBoardDeleteInterface) {
      this.boardDelete = boardDeleteInit
      try {
        const res = await httpBoardDelete(reqData)
        if (res.data) {
          this.boardDelete = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpBoardListDelete (reqData: ReqBoardListDeleteInterface) {
      this.boardListDelete = boardListDeleteInit
      try {
        const res = await httpBoardListDelete(reqData)
        if (res.data) {
          this.boardListDelete = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
