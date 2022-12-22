import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'

import { ReqBoardListInterface } from '@/service/board/interface/boardList.interface'
import { ReqBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ReqBoardCreateInterface } from '@/service/board/interface/boardCreate.interface'
import { ReqBoardUpdateInterface } from '@/service/board/interface/boardUpdate.interface'
import { ReqBoardDeleteInterface } from '@/service/board/interface/boardDelete.interface'
import { ReqBoardListDeleteInterface } from '@/service/board/interface/boardListDelete.interface'

enum Api {
  getBoardList = '/board/:category/boardList',
  getBoardDetail = '/board/:category/:id',
  boardCreate = '/board/:category/register',
  boardUpdate = '/board/:category/update/:id',
  boardDelete = '/board/delete/:id',
  boardListDelete = '/board/deleteList/:id'
}

/**
 * @description Board List
 */
export const httpGetBoardList = (reqData: ReqBoardListInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoardList,
    data: reqData
  })
}

/**
 * @description Board View
 */
export const httpGetBoard = (reqData: ReqBoardDetailInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoardDetail,
    data: reqData
  })
}

/**
 * @description Board Create
 */
export const httpSetBoard = (reqData: ReqBoardCreateInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.boardCreate,
    data: reqData
  })
}

/**
 * @description Board Update Create
 */
export const httpBoardUpdate = (reqData: ReqBoardUpdateInterface) => {
  return axiosInstance({
    method: RequestEnum.PUT,
    url: Api.boardUpdate,
    data: reqData
  })
}

/**
 * @description Board Update Create
 */
export const httpBoardDelete = (reqData: ReqBoardDeleteInterface) => {
  return axiosInstance({
    method: RequestEnum.DELETE,
    url: Api.boardDelete,
    data: reqData
  })
}

/**
 * @description Board Update Create
 */
export const httpBoardListDelete = (reqData: ReqBoardListDeleteInterface) => {
  return axiosInstance({
    method: RequestEnum.DELETE,
    url: Api.boardListDelete,
    data: reqData
  })
}
