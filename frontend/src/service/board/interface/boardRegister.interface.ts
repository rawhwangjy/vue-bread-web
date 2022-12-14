/**
 * @description: board register
 * RegisterBoardInterface Request
 */

import { Ref } from 'vue'

export interface ReqBoardRegisterInterface {
  boardType: string,
  title: string,
  content: string,
  agree: boolean | number
}
export interface ResBoardRegisterInterface {
  boardType: string | Ref<string>,
  title: string,
  content: string,
  agree: boolean | number
}
