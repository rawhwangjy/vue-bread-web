/**
 * @description: board update
 * BoardUpdateInterface Request, Response
 */
export interface ReqBoardUpdateInterface {
  id: number
}

export interface ResBoardUpdateInterface {
  id: number,
  category: string,
  title: string,
  content: string,
  agree: boolean | number
}
