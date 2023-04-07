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
  userId: string,
  userName: string,
  accessToken: string
}

export interface ResMemberSigninStateInterface {
  userId: string,
  userName: string,
  accessToken: string
}
