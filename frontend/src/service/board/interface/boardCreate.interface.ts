/**
 * @description: board register
 * CreateBoardInterface Request
 */
export interface ReqBoardCreateInterface {
  category: string,
  title: string,
  content: string,
  agree: boolean | number
}
export interface ResBoardCreateInterface {
  category: string,
  title: string,
  content: string,
  agree: boolean | number
}
