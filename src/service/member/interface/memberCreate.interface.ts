/**
 * @description: member
 * MemberCreateInterface Request
 */
export interface ReqMemberCreateInterface {
  userId: string,
  userPw: string,
  userName: string
}

export type ResMemberCreateInterface = {
  state: string,
  userId: string,
  accessToken: string,
  refreshToken: string
}
