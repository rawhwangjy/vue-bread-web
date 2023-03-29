/**
 * @description: project update
 * ProjectUpdateInterface Request, Response
 */
export interface ReqProjectUpdateInterface {
  id: number,
  title: string,
  introduce: string,
  role: string,
  company: string,
  orderCompany: string,
  jobs: Array<string>,
  type: {
    mobile: boolean,
    pc: boolean
  },
  date: {
    startDate: number,
    endDate: number
  },
  fileList: {
    mobile: Array<string>,
    pc: Array<string>
  },
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

export type ResProjectUpdateInterface = Record<string, never>
