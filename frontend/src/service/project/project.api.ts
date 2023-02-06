import { axiosInstance } from '@/utils/instance.axios'
import { RequestEnum } from '@/utils/common.constants'

import { ReqProjectListInterface } from '@/service/project/interface/projectList.interface'
import { ReqProjectDetailInterface } from '@/service/project/interface/projectDetail.interface'
import { ReqProjectDeleteInterface } from '@/service/project/interface/projectDelete.interface'

enum Api {
  getProjectList = '/project/projectList',
  getProjectDetail = '/project/:id',
  projectCreate = '/project/register',
  projectUpdate = '/project/update/:id',
  projectDelete = '/project/delete/:id'
}

/**
 * @description Project List
 */
export const httpGetProjectList = () => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getProjectList
  })
}

/**
 * @description Project View
 */
export const httpGetProject = (reqData: ReqProjectDetailInterface) => {
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.getProjectDetail,
    data: reqData
  })
}

/**
 * @description Project Create
 */
export const httpSetProject = (reqData: FormData) => {
  // formData 잘 들어온다.
  // api 잘 찌른다.
  // headers 잘 들어간다.
  // for (const pair of reqData.file.entries()) {
  //   console.log('httpSetProject pair', pair)
  // }
  return axiosInstance({
    method: RequestEnum.POST,
    url: Api.projectCreate,
    data: reqData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

/**
 * @description Project Update Create
 */
export const httpProjectUpdate = (reqData: FormData) => {
  console.log('httpSetProject', reqData)
  for (const pair of reqData.entries()) {
    console.log('httpProjectUpdate pair', pair)
  }
  return axiosInstance({
    method: RequestEnum.PUT,
    url: Api.projectUpdate,
    data: reqData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

/**
 * @description Project Update Create
 */
export const httpProjectDelete = (reqData: ReqProjectDeleteInterface) => {
  return axiosInstance({
    method: RequestEnum.DELETE,
    url: Api.projectDelete,
    data: reqData
  })
}
