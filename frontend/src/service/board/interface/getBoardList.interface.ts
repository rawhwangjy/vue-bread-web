/**
 * @description: board list
 * BoardListInaterface Request, Response
 */
export interface ReqBoardListInaterface {
  boardType: string
}

export interface ResBoardListInaterface {
  id: number,
  boardType: string,
  title: string
}
