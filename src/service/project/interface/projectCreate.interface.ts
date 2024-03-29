/**
 * @description: project create
 * CreateProjectInterface Request
 */
export interface ReqProjectCreateInterface {
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
    startDate: {
      year: number,
      month: number
    },
    endDate: {
      year: number,
      month: number
    }
  },
  fileListMobile: FileList | null,
  fileListPc: FileList | null,
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

export type ResProjectCreateInterface = Record<string, never>
