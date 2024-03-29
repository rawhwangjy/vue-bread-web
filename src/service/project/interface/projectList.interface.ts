/**
 * @description: project list
 * ProjectListInterface Request, Response
 */
export interface ReqProjectListInterface {
  category: string
}
export interface ReqProjectListYearInterface {
  year: string
}
export interface ReqProjectListTypeInterface {
  type: string
}

export interface ResProjectListInterface {
  id: number,
  title: string,
  introduce: string,
  role: string,
  typePc: boolean,
  typeMobile: boolean,
  company: string,
  orderCompany: string,
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
}
