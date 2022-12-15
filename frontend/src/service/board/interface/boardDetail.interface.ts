/**
 * @description: board detail
 * BoardDetailInterface Request, Response
 */
export interface ReqBoardDetailInterface {
  id: number
}

export interface ResBoardDetailInterface {
  id: number,
  boardType: string,
  title: string,
  content: string,
  agree: boolean | number
}
