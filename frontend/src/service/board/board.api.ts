import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'
import { ReqBoardListInaterface } from '@/service/board/interface/getBoardList.interface'
import { ReqBoardDetailInaterface } from '@/service/board/interface/getBoardDetail.interface'

enum Api {
  getBoardList = '/board/board/boardList',
  getBoard = '/board/board/:id'
}

/**
 * @description Get Board List
 */
export const httpGetBoardList = (fdata: ReqBoardListInaterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoardList,
    data: fdata
  })
}

/**
 * @description Get Board View
 */
export const httpGetBoard = (fdata: ReqBoardDetailInaterface) => {
  console.log('dddd', fdata.id)
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getBoard,
    data: fdata
  })
}
