/**
 * @description: board detail
 * BoardDetailInterface Request, Response
 */
export interface ReqBoardDetailInterface {
  id: number
}

export interface ResBoardDetailInterface {
  id: number,
  category: string,
  title: string,
  content: string,
  showHide: boolean | number,
  fileList: Array<string>
}
