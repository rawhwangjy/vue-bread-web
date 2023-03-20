/**
 * @description: member
 * ReqMemberSigninInterface Request
 */
export interface ReqMemberSigninInterface {
  userId: string,
  userPw: string,
}

export interface ResMemberSigninInterface {
  state: string,
  accessToken: string
}
