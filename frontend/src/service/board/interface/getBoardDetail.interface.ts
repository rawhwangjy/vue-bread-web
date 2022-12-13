/**
 * @description: board detail
 * BoardDetailInterface Request, Response
 */
export interface ReqBoardDetailInterface {
  id: number,
  boardType: string
}

export interface ResBoardDetailInterface {
  id: number,
  boardType: string,
  title: string,
  content: string,
  agree: boolean
}
