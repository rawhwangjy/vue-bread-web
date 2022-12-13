import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'
import { ReqBoardListInterface } from '@/service/board/interface/getBoardList.interface'
import { ReqBoardDetailInterface } from '@/service/board/interface/getBoardDetail.interface'
import { ReqBoardRegisterInterface } from '@/service/board/interface/boardRegister.interface'
import { ReqBoardTypeInterface } from '@/service/board/interface/getBoardType.interfac'

enum Api {
  getBoardType = '/board/:boardType',
  getBoardList = '/board/board/boardList',
  getBoard = '/board/board/:id',
  boardRegister = '/board/board/register'
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
    url: Api.getBoard,
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
