import { SceneInfo } from './common.interface'

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

/**
 * Set Layout
 * @returns {void}
 */
export function setLayout (target: SceneInfo): void {
  target.scrollHeight = target.heightNum * window.innerHeight
  if (target.objs?.container) {
    const objs = target.objs.container
    objs.style.minHeight = `${target.scrollHeight}px`
  }
  document.body.id = `showScene${target.id}`
}

/**
 * Calculate Current Scroll Locate
 * @returns {void}
 */
export function calcValues (target: SceneInfo, values: [number, number, {start: number, end: number}], currentYOffset: number): number {
  let returnValue = 0
  const scrollHeight = target.scrollHeight
  const scrollRatio = currentYOffset / scrollHeight
  if (values.length === 3) {
    const partScrollStart = values[2].start * scrollHeight
    const partScrollEnd = values[2].end * scrollHeight
    const partScrollHeight = partScrollEnd - partScrollStart
    if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
      returnValue = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]
    } else if (currentYOffset < partScrollStart) {
      returnValue = values[0]
    } else if (currentYOffset > partScrollEnd) {
      returnValue = values[1]
    }
  } else {
    returnValue = scrollRatio * (values[1] - values[0]) + values[0]
  }
  return returnValue
}
