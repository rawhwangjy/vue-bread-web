import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'
import { ReqBoardListInterface } from '@/service/board/interface/boardList.interface'
import { ReqBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ReqBoardCreateInterface } from '@/service/board/interface/boardCreate.interface'
import { ReqBoardUpdateDetailInterface, ReqBoardUpdateCreateInterface } from '@/service/board/interface/boardUpdate.interface'

enum Api {
  getBoardType = '/board/:boardType',
  getBoardList = '/board/board/boardList',
  getBoardDetail = '/board/:boardType/:id',
  boardCreate = '/board/register',
  boardUpdateDetail = '/board/:boardType/update/:id',
  boardUpdateCreate = '/board/:boardType/register/:id'
}

/**
 * @description Board Type
 */
export const httpGetBoardType = () => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoardType
  })
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
 * @description Board Update View
 */
export const httpGetBoardUpdate = (fdata: ReqBoardUpdateDetailInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.boardUpdateDetail,
    data: fdata
  })
}

/**
 * @description Board Update Create
 */
export const httpSetBoardUpdate = (fdata: ReqBoardUpdateCreateInterface) => {
  return axiosInstance({
    method: RequestEnum.PUT,
    url: Api.boardUpdateCreate,
    data: fdata
  })
}
