/**
 * @description: board create
 * CreateBoardInterface Request
 */

export interface ReqBoardCreateInterface {
  category: string,
  title: string,
  content: string,
  showHide: boolean,
  fileList: FileList | null
}

export type ResBoardCreateInterface = Record<string, never>
