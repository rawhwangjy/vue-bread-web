import { defineStore } from 'pinia'

import { ResBoardTypeInterface } from '@/service/board/interface/boardType.interface'
import { ReqBoardListInterface, ResBoardListInterface } from '@/service/board/interface/boardList.interface'
import { ReqBoardDetailInterface, ResBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ReqBoardRegisterInterface, ResBoardRegisterInterface } from '@/service/board/interface/boardRegister.interface'
import { ReqBoardUpdateDetailInterface, ResBoardUpdateDetailInterface, ReqBoardUpdateRegisterInterface, ResBoardUpdateRegisterInterface } from '@/service/board/interface/boardUpdate.interface'

import { httpGetBoardType, httpGetBoardList, httpGetBoard, httpSetBoard, httpGetBoardUpdate, httpSetBoardUpdate } from '@/service/board/board.api'

interface boardState {
  getBoardType: ResBoardTypeInterface[],
  getBoardList: ResBoardListInterface[],
  getBoardDetail: ResBoardDetailInterface,
  boardRegister: ResBoardRegisterInterface,
  boardUpdateDetail: ResBoardUpdateDetailInterface,
  boardUpdateRegister: ResBoardUpdateRegisterInterface
}

export const getBoardDetailInit = {
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
export const boardUpdateInit = {
  id: 0,
  boardType: '',
  title: '',
  content: '',
  agree: false
}
export const getBoardUpdateDetailInit = {
  id: 0,
  boardType: '',
  title: '',
  content: '',
  agree: false
}
export const getBoardUpdateRegisterInit = {
  id: 0,
  boardType: '',
  title: '',
  content: '',
  agree: false
}

export const useBoardStore = defineStore({
  id: '',
  state: (): boardState => ({
    getBoardType: [],
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
    },
    boardUpdateDetail: {
      id: 0,
      boardType: '',
      title: '',
      content: '',
      agree: false
    },
    boardUpdateRegister: {
      id: 0,
      boardType: '',
      title: '',
      content: '',
      agree: false
    }
  }),
  actions: {
    async actionHttpBoardType () {
      this.getBoardType = []
      try {
        const res = await httpGetBoardType()
        if (res.data) {
          this.getBoardType = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
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
    async actionHttpBoardRegister (fdata: ReqBoardRegisterInterface) {
      this.boardRegister = boardRegisterInit
      try {
        const res = await httpSetBoard(fdata)
        if (res.data) {
          this.boardRegister = res.data
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
          this.boardRegister = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpBoardUpdateRegister (fdata: ReqBoardUpdateRegisterInterface) {
      this.boardUpdateDetail = getBoardUpdateRegisterInit
      try {
        const res = await httpSetBoardUpdate(fdata)
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
