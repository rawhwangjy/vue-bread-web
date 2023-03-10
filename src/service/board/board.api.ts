import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'

import { ReqBoardListInterface } from '@/service/board/interface/boardList.interface'
import { ReqBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ReqBoardDeleteInterface } from '@/service/board/interface/boardDelete.interface'
import { ReqBoardListDeleteInterface } from '@/service/board/interface/boardListDelete.interface'

enum Api {
  getBoardList = '/board/:category/boardList',
  getBoardDetail = '/board/:category/:id',
  boardCreate = '/board/:category/create',
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
export const httpSetBoard = (reqData: FormData) => {
  // formData 잘 들어온다.
  // api 잘 찌른다.
  // headers 잘 들어간다.
  // for (const pair of reqData.file.entries()) {
  //   console.log('httpSetBoard pair', pair)
  // }
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.boardCreate,
    data: reqData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

/**
 * @description Board Update Create
 */
export const httpBoardUpdate = (reqData: FormData) => {
  console.log('httpSetBoard', reqData)
  for (const pair of reqData.entries()) {
    console.log('httpBoardUpdate pair', pair)
  }
  return axiosInstance({
    method: RequestEnum.PUT,
    url: Api.boardUpdate,
    data: reqData,
    headers: { 'Content-Type': 'multipart/form-data' }
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
