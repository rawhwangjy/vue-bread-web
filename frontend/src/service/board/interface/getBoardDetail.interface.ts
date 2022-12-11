/**
 * @description: board detail
 * BoardDetailInaterface Request, Response
 */
export interface ReqBoardDetailInaterface {
  id: number,
  boardType: string
}

export interface ResBoardDetailInaterface {
  id: number,
  boardType: string,
  title: string
}
