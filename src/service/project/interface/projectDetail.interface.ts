/**
 * @description: project detail
 * ProjectDetailInterface Request, Response
 */
export interface ReqProjectDetailInterface {
  id: number
}

export interface ResProjectDetailInterface {
  id: number,
  title: string,
  introduce: string,
  role: string,
  company: string,
  orderCompany: string,
  jobs: Array<string>,
  typeMobile: boolean,
  typePc: boolean,
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number,
  fileListMobile: Array<string>,
  fileListPc: Array<string>,
  // fileList: {
  //   mobile: Array<string>,
  //   pc: Array<string>
  // },
  skills: {
    html4: boolean,
    html5: boolean,
    css2: boolean,
    css3: boolean,
    sass: boolean,
    photoshop: boolean,
    sketch: boolean,
    zeplin: boolean,
    javascript: boolean,
    typescript: boolean,
    vue2: boolean,
    vue3: boolean,
    jquery: boolean,
    gitlab: boolean,
    eclipse: boolean,
    node: boolean,
    npm: boolean,
    react: boolean,
    axios: boolean
  }
}
