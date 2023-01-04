/**
 * @description: board list
 * BoardListInterface Request, Response
 */
export interface ReqBoardListInterface {
  category: string
}

export interface ResBoardListInterface {
  id: number,
  category: string,
  title: string,
  content: string
}
