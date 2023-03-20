/**
 * @description: member
 * ReqMemberSigninInterface Request
 */
export interface ReqMemberSigninInterface {
  userId: string,
  userPw: string,
}

export type ResMemberSigninInterface = Record<string, never>
