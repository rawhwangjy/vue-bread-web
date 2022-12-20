import { defineStore } from 'pinia'

import { ReqBoardListInterface, ResBoardListInterface } from '@/service/board/interface/boardList.interface'
import { ReqBoardDetailInterface, ResBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ReqBoardCreateInterface, ResBoardCreateInterface } from '@/service/board/interface/boardCreate.interface'
import { ReqBoardUpdateDetailInterface, ResBoardUpdateDetailInterface, ReqBoardUpdateCreateInterface, ResBoardUpdateCreateInterface } from '@/service/board/interface/boardUpdate.interface'
import { ResBoardDeleteInterface } from '@/service/board/interface/boardDelete.interface'

import {
  httpGetBoardList,
  httpGetBoard,
  httpSetBoard,
  httpGetBoardUpdate,
  httpSetBoardUpdate,
  httpDeleteBoard
} from '@/service/board/board.api'

interface boardState {
  getBoardList: ResBoardListInterface[],
  getBoardDetail: ResBoardDetailInterface,
  boardCreate: ResBoardCreateInterface,
  boardUpdateDetail: ResBoardUpdateDetailInterface,
  boardUpdateCreate: ResBoardUpdateCreateInterface,
  boardDelete: ResBoardDeleteInterface
}

export const getBoardDetailInit = {
  id: 0,
  category: '',
  title: '',
  content: '',
  agree: false
}
export const boardCreateInit = {
  category: '',
  title: '',
  content: '',
  agree: false
}
export const boardUpdateInit = {
  id: 0,
  category: '',
  title: '',
  content: '',
  agree: false
}
export const getBoardUpdateDetailInit = {
  id: 0,
  category: '',
  title: '',
  content: '',
  agree: false
}
export const getBoardUpdateCreateInit = {
  id: 0,
  category: '',
  title: '',
  content: '',
  agree: false
}
export const getBoardDeleteInit = {
  id: 0
}

export const useBoardStore = defineStore({
  id: 'board',
  state: (): boardState => ({
    // 초기값
    // 스토어가 생성될 때의 초기값
    getBoardList: [],
    getBoardDetail: {
      id: 0,
      category: '',
      title: '',
      content: '',
      agree: false
    },
    boardCreate: {
      category: '',
      title: '',
      content: '',
      agree: false
    },
    boardUpdateDetail: {
      id: 0,
      category: '',
      title: '',
      content: '',
      agree: false
    },
    boardUpdateCreate: {
      id: 0,
      category: '',
      title: '',
      content: '',
      agree: false
    },
    boardDelete: {
      id: 0
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
      this.getBoardDetail = getBoardDetailInit
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
    async actionHttpBoardCreate (fdata: ReqBoardCreateInterface) {
      this.boardCreate = boardCreateInit
      try {
        const res = await httpSetBoard(fdata)
        if (res.data) {
          this.boardCreate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpBoardUpdateDetail (fdata: ReqBoardUpdateDetailInterface) {
      this.boardUpdateDetail = getBoardUpdateDetailInit
      try {
        const res = await httpGetBoardUpdate(fdata)
        if (res.data) {
          this.boardCreate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpBoardUpdateCreate (fdata: ReqBoardUpdateCreateInterface) {
      this.boardUpdateDetail = getBoardUpdateCreateInit
      try {
        const res = await httpSetBoardUpdate(fdata)
        if (res.data) {
          this.boardCreate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpBoardDelete (fdata: ResBoardDeleteInterface) {
      this.boardDelete = getBoardDeleteInit
      try {
        const res = await httpDeleteBoard(fdata)
        if (res.data) {
          this.boardCreate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
