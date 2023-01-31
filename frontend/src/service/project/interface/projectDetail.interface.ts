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
  type: {
    mo: boolean,
    pc: boolean,
    all: boolean
  },
  fileList: Array<string>
  date: {
    startDate: number,
    endDate: number
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
    git: boolean,
    eclipse: boolean,
    node: boolean,
    npm: boolean
  }
}
