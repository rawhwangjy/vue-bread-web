/**
 * @description: board register
 * CreateBoardInterface Request
 */
export interface ReqBoardCreateInterface {
  boardType: string,
  title: string,
  content: string,
  agree: boolean | number
}
export interface ResBoardCreateInterface {
  boardType: string,
  title: string,
  content: string,
  agree: boolean | number
}
