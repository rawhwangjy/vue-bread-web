/**
 * @description: member
 * ReqMemberSigninInterface Request
 */
export interface ReqMemberRefreshInterface {
  refreshToken: string | null
}

export interface ResMemberRefreshInterface {
  accessToken: string
}
