/**
 * @description: board register
 * RegisterBoardInterface Request
 */

export interface ReqBoardRegisterInterface {
  boardType: string,
  title: string,
  content: string,
  agree: boolean
}
