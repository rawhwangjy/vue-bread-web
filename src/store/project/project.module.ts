import { defineStore } from 'pinia'

import { ReqProjectListInterface, ReqProjectListYearInterface, ReqProjectListTypeInterface, ResProjectListInterface } from '@/service/project/interface/projectList.interface'
import { ReqProjectDetailInterface, ResProjectDetailInterface } from '@/service/project/interface/projectDetail.interface'
import { ResProjectCreateInterface } from '@/service/project/interface/projectCreate.interface'
import { ReqProjectUpdateInterface, ResProjectUpdateInterface } from '@/service/project/interface/projectUpdate.interface'
import { ReqProjectDeleteInterface, ResProjectDeleteInterface } from '@/service/project/interface/projectDelete.interface'

import {
  httpGetProjectListAll,
  httpGetProjectListYear,
  httpGetProjectListType,
  httpGetProject,
  httpSetProject,
  httpProjectUpdate,
  httpProjectDelete
} from '@/service/project/project.api'

interface projectState {
  projectListAll: ResProjectListInterface[],
  projectListYear: ResProjectListInterface[],
  projectListType: ResProjectListInterface[],
  projectDetail: ResProjectDetailInterface,
  projectCreate: ResProjectCreateInterface,
  projectUpdate: ResProjectUpdateInterface,
  projectDelete: ResProjectDeleteInterface
}

export const projectDetailInit = {
  id: 0,
  title: '',
  introduce: '',
  role: '',
  company: '',
  orderCompany: '',
  jobs: [],
  typeMobile: false,
  typePc: false,
  startYear: 0,
  startMonth: 0,
  endYear: 0,
  endMonth: 0,
  fileListMobile: [],
  fileListPc: [],
  skills: {
    html4: false,
    html5: false,
    css2: false,
    css3: false,
    sass: false,
    photoshop: false,
    sketch: false,
    zeplin: false,
    javascript: false,
    typescript: false,
    vue2: false,
    vue3: false,
    jquery: false,
    gitlab: false,
    eclipse: false,
    node: false,
    npm: false,
    react: false,
    axios: false
  }
}
export const projectCreateInit = { }
export const projectUpdateInit = { }
export const projectDeleteInit = {
  id: 0
}
export const projectListDeleteInit = {
  id: 0
}

export const useProjectStore = defineStore({
  id: 'project',
  state: (): projectState => ({
    // Res에 대한 초기값
    // 스토어가 생성될 때의 초기값
    projectListAll: [],
    projectListYear: [],
    projectListType: [],
    projectDetail: {
      id: 0,
      title: '',
      introduce: '',
      role: '',
      company: '',
      orderCompany: '',
      jobs: [],
      typeMobile: false,
      typePc: false,
      startYear: 0,
      startMonth: 0,
      endYear: 0,
      endMonth: 0,
      fileListMobile: [],
      fileListPc: [],
      skills: {
        html4: false,
        html5: false,
        css2: false,
        css3: false,
        sass: false,
        photoshop: false,
        sketch: false,
        zeplin: false,
        javascript: false,
        typescript: false,
        vue2: false,
        vue3: false,
        jquery: false,
        gitlab: false,
        eclipse: false,
        node: false,
        npm: false,
        react: false,
        axios: false
      }
    },
    projectCreate: { },
    projectUpdate: { },
    projectDelete: {
      id: 0
    }
  }),
  actions: {
    async actionHttpGetProjectListAll () {
      this.projectListAll = []
      try {
        const res = await httpGetProjectListAll()
        if (res.data) {
          this.projectListAll = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpGetProjectListYear (reqData: ReqProjectListYearInterface) {
      this.projectListYear = []
      try {
        const res = await httpGetProjectListYear(reqData)
        if (res.data) {
          this.projectListYear = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpGetProjectListType (reqData: ReqProjectListTypeInterface) {
      this.projectListType = []
      try {
        const res = await httpGetProjectListType(reqData)
        if (res.data) {
          this.projectListType = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpGetProject (reqData: ReqProjectDetailInterface) {
      this.projectDetail = projectDetailInit
      try {
        const res = await httpGetProject(reqData)
        if (res.data) {
          this.projectDetail = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpProjectCreate (reqData: FormData) {
      this.projectCreate = projectCreateInit
      try {
        const res = await httpSetProject(reqData)
        if (res.data) {
          this.projectCreate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpProjectUpdate (reqData: FormData) {
      this.projectUpdate = projectUpdateInit
      try {
        const res = await httpProjectUpdate(reqData)
        if (res.data) {
          this.projectUpdate = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async actionHttpProjectDelete (reqData: ReqProjectDeleteInterface) {
      this.projectDelete = projectDeleteInit
      try {
        const res = await httpProjectDelete(reqData)
        if (res.data) {
          this.projectDelete = res.data
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
