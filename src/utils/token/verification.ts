import jwtDecode, { JwtPayload } from 'jwt-decode'

export function decodedToken (token: string) {
  const decoded = jwtDecode(token) as JwtPayload
  // console.log('decoded, ', decoded.exp)
  if ((decoded?.exp as JwtPayload) < new Date().getTime()) {
    return true
  } else {
    return false
  }
}
