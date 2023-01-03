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
// export interface ResBoardCreateInterface {
// categoryId: number,
// title: string,
// content: string,
// agree: boolean | number,
// fileList: FileList
// }
export type ResBoardCreateInterface = Record<string, never>
