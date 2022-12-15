/**
 * @description: board update detail
 * BoardUpdateDetailInterface Request, Response
 */
export interface ReqBoardUpdateDetailInterface {
  id: number
}

export interface ResBoardUpdateDetailInterface {
  id: number,
  boardType: string,
  title: string,
  content: string,
  agree: boolean | number
}
/**
 * @description: board update register
 * BoardUpdateCreateInterface Request, Response
 */
export interface ReqBoardUpdateCreateInterface {
  id: number
}

export interface ResBoardUpdateCreateInterface {
  id: number,
  boardType: string,
  title: string,
  content: string,
  agree: boolean | number
}
