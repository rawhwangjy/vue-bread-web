import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'

import { ReqBoardListInterface } from '@/service/board/interface/boardList.interface'
import { ReqBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ReqBoardCreateInterface } from '@/service/board/interface/boardCreate.interface'
import { ReqBoardUpdateInterface } from '@/service/board/interface/boardUpdate.interface'
import { ReqBoardDeleteInterface } from '@/service/board/interface/boardDelete.interface'

enum Api {
  getBoardList = '/board/:category/boardList',
  getBoardDetail = '/board/:category/:id',
  boardCreate = '/board/:category/register',
  boardUpdate = '/board/:category/update/:id',
  boardDelete = '/board/delete/:id',
}

/**
 * @description Board List
 */
export const httpGetBoardList = (fdata: ReqBoardListInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoardList,
    data: fdata
  })
}

/**
 * @description Board View
 */
export const httpGetBoard = (fdata: ReqBoardDetailInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoardDetail,
    data: fdata
  })
}

/**
 * @description Board Create
 */
export const httpSetBoard = (fdata: ReqBoardCreateInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.boardCreate,
    data: fdata
  })
}

/**
 * @description Board Update Create
 */
export const httpBoardUpdate = (fdata: ReqBoardUpdateInterface) => {
  return axiosInstance({
    method: RequestEnum.PUT,
    url: Api.boardUpdate,
    data: fdata
  })
}

/**
 * @description Board Update Create
 */
export const httpDeleteBoard = (fdata: ReqBoardDeleteInterface) => {
  return axiosInstance({
    method: RequestEnum.DELETE,
    url: Api.boardDelete,
    data: fdata
  })
}
