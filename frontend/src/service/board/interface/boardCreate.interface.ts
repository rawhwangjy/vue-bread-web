/**
 * @description: board register
 * CreateBoardInterface Request
 */
export interface ReqBoardCreateInterface {
  categoryId: number,
  title: string,
  content: string,
  agree: boolean | number,
  fileList: FileList | null
}

export type ResBoardCreateInterface = Record<string, never>
