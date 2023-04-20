import jwtDecode, { JwtPayload } from 'jwt-decode'

export function decodedToken (token: string) {
  const decoded = jwtDecode(token) as JwtPayload
  // console.log('decoded, ', decoded.exp)
  // if ((decoded?.exp as JwtPayload) < new Date().getTime()) {
  //   console.log('token true')
  //   return true
  // } else {
  //   console.log('token false')
  //   return false
  // }
  const expredTime = decoded?.exp
  if (expredTime) {
    if (Date.now() >= expredTime * 1000) {
      console.log('token false')
      return false
    } else {
      console.log('token true')
      return true
    }
  }
  return true
}
