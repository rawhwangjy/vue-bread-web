/**
 * Get Random Id
 * @returns {string}
 */
export function getRandomId (): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
  const stringLength = 15
  let randomstring = ''
  for (let i = 0; i < stringLength; i++) {
    const rNum = Math.floor(Math.random() * chars.length)
    randomstring += chars.substring(rNum, rNum + 1)
  }
  return randomstring
}
