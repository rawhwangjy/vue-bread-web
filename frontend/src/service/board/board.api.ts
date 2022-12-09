import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'
import { GetBoardListInterface, GetBoardListInterfaceAAAA } from '@/service/board/interface/getBoardList.interface'

enum Api {
  getBoardList = '/board/board/boardList',
  getBoard = '/board/board/:id'
}

/**
 * @description Get Board List
 */
export const httpGetBoardList = (fdata: GetBoardListInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoardList,
    data: fdata
  })
}

/**
 * @description Get Board View
 */
export const httpGetBoard = (fdata: GetBoardListInterfaceAAAA) => {
  console.log('dddd', fdata.id)
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoard,
    data: fdata
  })
}
