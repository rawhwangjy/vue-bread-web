/**
 * @description: board list
 * GetBoardListInterface
 */

export interface GetBoardCategoryInterface {
  boardType: string
}

/**
 * @description: board list
 * GetBoardListInterface
 */

export interface GetBoardListInterface {
  id: number,
  boardType: string,
  title: string
}

export interface GetBoardListInterfaceAAAA {
  id: number,
  boardType: string
}

// req, res 두 가지 interface 각각 주기
