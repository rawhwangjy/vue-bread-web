/**
 * @description: project list
 * ProjectListInterface Request, Response
 */
export interface ReqProjectListInterface {
  category: string
}

export interface ResProjectListInterface {
  id: number,
  title: string,
  introduce: string,
  role: string,
  type: string,
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
}
