/**
 * @description: board update
 * BoardUpdateInterface Request, Response
 */
export interface ReqBoardUpdateInterface {
  id: number,
  boardType: string
}

export interface ResBoardUpdateInterface {
  id: number,
  boardType: string,
  title: string,
  content: string,
  agree: boolean | number
}
