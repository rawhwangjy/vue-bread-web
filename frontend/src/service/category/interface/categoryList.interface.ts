/**
 * @description: category list
 * CategoryListInterface Request
 */

export interface ResCategoryListInterface {
  id: number,
  category: string
}
/**
 * @description: category update detail
 * CategoryUpdateDetailInterface Request, Response
 */
export interface ReqCategoryUpdateDetailInterface {
  id: number
}

export interface ResCategoryUpdateDetailInterface {
  id: number,
  category: string
}
