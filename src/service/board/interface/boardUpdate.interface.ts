/**
 * @description: board update
 * BoardUpdateInterface Request, Response
 */
export interface ReqBoardUpdateInterface {
  id: number,
  category: string,
  title: string,
  content: string,
  agree: boolean | number,
  fileList: Array<string> | FileList | null
}

export type ResBoardUpdateInterface = Record<string, never>
