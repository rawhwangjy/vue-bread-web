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
 * BoardUpdateRegisterInterface Request, Response
 */
export interface ReqBoardUpdateRegisterInterface {
  id: number
}

export interface ResBoardUpdateRegisterInterface {
  id: number,
  boardType: string,
  title: string,
  content: string,
  agree: boolean | number
}
