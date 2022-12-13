import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'
import { ReqBoardListInterface } from '@/service/board/interface/getBoardList.interface'
import { ReqBoardDetailInterface } from '@/service/board/interface/getBoardDetail.interface'
import { ReqBoardRegisterInterface } from '@/service/board/interface/boardRegister.interface'

enum Api {
  getBoardList = '/board/board/boardList',
  getBoard = '/board/board/:id',
  boardRegister = '/board/board/register'
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
