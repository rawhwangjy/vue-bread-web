/**
 * @description: project register
 * CreateProjectInterface Request
 */
export interface ReqProjectCreateInterface {
  title: string,
  introduce: string,
  type: {
    mo: boolean,
    pc: boolean,
    all: boolean
  },
  date: {
    startDate: number,
    endDate: number
  },
  fileList: FileList | null,
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

export type ResProjectCreateInterface = Record<string, never>
