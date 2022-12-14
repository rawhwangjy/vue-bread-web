import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'
import { ReqBoardListInterface } from '@/service/board/interface/boardList.interface'
import { ReqBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ReqBoardRegisterInterface } from '@/service/board/interface/boardRegister.interface'
import { ReqBoardUpdateDetailInterface, ReqBoardUpdateRegisterInterface } from '@/service/board/interface/boardUpdate.interface'

enum Api {
  getBoardType = '/board/:boardType',
  getBoardList = '/board/board/boardList',
  getBoardDetail = '/board/:boardType/:id',
  boardRegister = '/board/register',
  boardUpdateDetail = '/board/:boardType/update/:id',
  boardUpdateRegister = '/board/:boardType/register/:id'
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
 * @description Board Register
 */
export const httpSetBoard = (fdata: ReqBoardRegisterInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.boardRegister,
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
 * @description Board Update Register
 */
export const httpSetBoardUpdate = (fdata: ReqBoardUpdateRegisterInterface) => {
  return axiosInstance({
    method: RequestEnum.PUT,
    url: Api.boardUpdateRegister,
    data: fdata
  })
}
