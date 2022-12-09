export interface Target {
  id?: number,
  name?: string,
  type?: string,
  introduce?: string,
  startDate?: number,
  endDate?: number,
  orderedCompany?: string,
  results?: string
}
export interface Swiper {
  direction?: string | null,
  tab?: {
    data?: string[] | null,
    customClass?: string | null
  } | string[] | string | null,
  navigation?: string | boolean | null,
  pagination?: string | boolean | null,
  autoplay?: {
    delay?: number | null
  } | boolean | null
}
export interface DomType {
  swiper?: HTMLElement | null,
  slides?: NodeListOf<Element> | null,
  tab?: HTMLElement | null,
  pagination?: HTMLElement | null,
  navigation?: {
    navRoot? : HTMLElement | null,
    btnPrev?: HTMLElement | null,
    btnNext?: HTMLElement | null
  }
}
