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
  content: string,
  type: string,
  date: {
    startDate: number,
    endDate: number
  }
}
