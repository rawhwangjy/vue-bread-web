/**
 * @description: board update
 * BoardUpdateInterface Request, Response
 */
export interface ReqBoardUpdateInterface {
  id: number
}

export interface ResBoardUpdateInterface {
  id: number,
  categoryId: number,
  title: string,
  content: string,
  agree: boolean | number,
  fileList: Array<string> | FileList
}
