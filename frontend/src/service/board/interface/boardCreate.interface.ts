/**
 * @description: board register
 * CreateBoardInterface Request
 */
export interface ReqBoardCreateInterface {
  categoryId: number,
  title: string,
  content: string,
  agree: boolean | number
}
export interface ResBoardCreateInterface {
  categoryId: number,
  title: string,
  content: string,
  agree: boolean | number
}
