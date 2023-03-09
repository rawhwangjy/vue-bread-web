/**
 * @description: board register
 * CreateBoardInterface Request
 */
export interface ReqBoardCreateInterface {
  category: string,
  title: string,
  content: string,
  agree: boolean | number,
  fileList: FileList | null
}

export type ResBoardCreateInterface = Record<string, never>
