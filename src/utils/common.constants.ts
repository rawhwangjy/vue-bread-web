/**
 * @description: common request methods
 */

export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

/**
 * @description: ENV
 */
export const API_URL = process.env.VUE_APP_API_URL

/**
 * @description: LocalStorage Names
 */
export enum LocalKey {
  token = 'TOKEN',
  lastPageNum = 'lastPageNum',
  lastProjectOffsetY = 'lastProjectOffsetY',
  goProjectList = 'goProjectList',
  accessToken = 'accessToken',
  refreshToken = 'refreshToken'
}
// import { LocalKey } from ''
// localStorage.setItem(LocalKey.token, '')
// const token = localStorage.getItem(LocalKey.token)
