import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'
import { ReqBoardListInterface } from '@/service/board/interface/boardList.interface'
import { ReqBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ReqBoardRegisterInterface } from '@/service/board/interface/boardRegister.interface'
import { ReqBoardUpdateInterface } from '@/service/board/interface/boardUpdate.interface'

enum Api {
  getBoardType = '/board/:boardType',
  getBoardList = '/board/board/boardList',
  getBoardDetail = '/board/:boardType/:id',
  boardRegister = '/board/:boardType/register',
  boardUpdate = '/board/:boardType/update/:id'
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
 * @description Get Board List
 */
export const httpGetBoardList = (fdata: ReqBoardListInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoardList,
    data: fdata
  })
}

/**
 * @description Get Board View
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
 * @description Board Update
 */
export const httpSetBoardUpdate = (fdata: ReqBoardUpdateInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.boardUpdate,
    data: fdata
  })
}
