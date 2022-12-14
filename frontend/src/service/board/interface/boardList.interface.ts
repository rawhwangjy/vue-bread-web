/**
 * @description: board list
 * BoardListInterface Request, Response
 */
export interface ReqBoardListInterface {
  boardType: string
}

export interface ResBoardListInterface {
  id: number,
  boardType: string,
  title: string
}
