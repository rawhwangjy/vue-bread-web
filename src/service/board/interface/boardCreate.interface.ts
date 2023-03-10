/**
 * @description: board create
 * CreateBoardInterface Request
 */

export interface BoardCreateModel {
  category: string,
  title: string,
  content: string,
  showHide: boolean,
  fileList: FileList | null
}
export interface ReqBoardCreateInterface {
  data: BoardCreateModel
}

export type ResBoardCreateInterface = Record<string, never>
