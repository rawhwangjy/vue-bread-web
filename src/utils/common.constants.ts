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
