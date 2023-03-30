<template>
  <div
    class="swiper-component"
    ref="SWIPERROOT"
  >
    <div
      v-if="initParams.tab.data"
      class="swiper-tab-wrap"
      :class="tabCustomClass"
    >
      <ul class="swiper-tab">
        <li
          v-for="(slot, index) of Object.keys($slots)"
          :key="`swiper-tab-${slot}`"
          :class="{
            'active': index === current
          }"
        >
          <button type="button" class="tab" @click="changeSwiper(index)">
            <span>{{ tabArray[index] }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div
      class="swiper-wrap"
    >
      <div
        class="swiper"
        :class="{
          'vertical': initParams.direction === 'vertical'
        }"
      >
        <div
          v-for="(slot, index) of Object.keys($slots)"
          :key="`slide${index}`"
          class="slide"
        >
          <slot :name="slot" />
        </div>
      </div>
    </div>
    <div
      v-if="initParams.navigation"
      class="navigation-wrap"
      :class="navCustomClass"
      :style="btnNavTop"
    >
      <button type="button" class="btn-prev" aria-label="이전">
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>
      <button type="button" class="btn-next" aria-label="다음">
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
      </button>
    </div>
    <div v-if="initParams.pagination" class="pagination-wrap">
      <ul
        class="pagination"
        :class="pageCustomClass"
      >
        <li
          v-for="(slot, index) of Object.keys($slots)"
          :key="`indicator-${slot}`"
          :class="{
            'active': index === current
          }"
        >
          <button type="button" class="indicator" @click="changeSwiper(index)">
            <span class="sr-only">{{ slot }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType, reactive, toRefs, ref, computed } from 'vue'
import { Swiper, DomType } from '@/utils/common.interface'

export default defineComponent({
  name: 'Swiper',
  components: { },
  props: {
    options: {
      type: Object as PropType<Swiper>,
      default: () => ({})
    }
  },
  emits: ['update'],
  setup (props, { emit }) {
    const SWIPERROOT = ref<HTMLElement | null>(null)
    const initProps = reactive({
      slideLength: 0,
      slideWidth: 0,
      slideHeight: 0,
      tabHeight: 0,
      btnNavTop: {},
      btnNavHeight: 0,
      btnPageHeight: 0
    })
    const swiperDom: DomType = {}
    const tabArray: string[] = []
    const initParams = {
      direction: props.options.direction
        ? props.options.direction
        : 'horizontal',
      tab: {
        data: props.options.tab ? tabArray : null,
        customClass: typeof props.options.tab === 'string'
          ? props.options.tab
          : Array.isArray(props.options.tab) ? null : props.options.tab?.customClass
      },
      pagination: props.options.pagination
        ? props.options.pagination
        : false,
      navigation: props.options.navigation
        ? props.options.navigation
        : false,
      autoplay: {
        delay: typeof props.options.autoplay === 'boolean'
          ? 1500
          : props.options.autoplay?.delay ? props.options.autoplay?.delay : null
      }
    }
    const customClass = reactive({
      tabCustomClass: '',
      navCustomClass: '',
      pageCustomClass: ''
    })
    const swiperHeight = ref()
    const curSlider = reactive({
      curSlide: 0,
      curPositon: 0
    })
    const current = computed(() => {
      return curSlider.curSlide
    })
    onMounted(() => {
      if (typeof initParams.tab?.customClass === 'string') {
        customClass.tabCustomClass = initParams.tab?.customClass
      }
      if (typeof initParams.navigation === 'string') {
        customClass.navCustomClass = initParams.navigation
      } else {
        customClass.navCustomClass = 'dot'
      }
      if (typeof initParams.pagination === 'string') {
        customClass.pageCustomClass = initParams.pagination
      }
      const getSwiperDom: DomType = {
        swiperWrap: SWIPERROOT.value?.querySelector('.swiper-wrap'),
        swiper: SWIPERROOT.value?.querySelector('.swiper'),
        slides: SWIPERROOT.value?.querySelectorAll('.slide'),
        tab: SWIPERROOT.value?.querySelector('.swiper-tab'),
        pagination: SWIPERROOT.value?.querySelector('.pagination'),
        navigation: {
          navRoot: SWIPERROOT.value?.querySelector('.navigation-wrap'),
          btnPrev: SWIPERROOT.value?.querySelector('.btn-prev'),
          btnNext: SWIPERROOT.value?.querySelector('.btn-next')
        }
      }
      Object.assign(swiperDom, getSwiperDom)
      initProps.slideLength = Number(getSwiperDom.swiper?.children.length)
      initProps.slideWidth = Number(getSwiperDom.swiper?.clientWidth)
      initProps.tabHeight = Number(getSwiperDom.tab?.clientHeight)
      initProps.btnNavHeight = Number(getSwiperDom.navigation?.btnPrev?.clientHeight)
      initProps.btnPageHeight = Number(getSwiperDom.pagination?.clientHeight)
      console.log('mount', initProps.slideWidth)
      initFunc()
    })

    function initFunc () {
      const timer = ref()
      if (swiperDom.swiperWrap) {
        if (initParams.tab) {
          swiperDom.swiperWrap.style.cssText = `width: ${initProps.slideWidth}px; margin-top: ${initProps.tabHeight}px;`
        }
        if (initParams.pagination) {
          swiperDom.swiperWrap.style.cssText = `width: ${initProps.slideWidth}px; margin-bottom: ${initProps.btnPageHeight + 30}px;`
        }
        if (initParams.tab && initParams.pagination) {
          swiperDom.swiperWrap.style.cssText = `width: ${initProps.slideWidth}px; margin-top: ${initProps.tabHeight}px; margin-bottom: ${initProps.btnPageHeight + 30}px;`
        }
      }
      if (initParams.autoplay.delay) {
        timer.value = setInterval(autoplay, initParams.autoplay.delay)
      }
      if (initParams.pagination) {
        // any => Element
        swiperDom.pagination?.querySelectorAll('button').forEach((item: Element, index: number) => {
          item.addEventListener('click', () => {
            moveTo(index)
            if (initParams.autoplay.delay) {
              clearInterval(timer.value)
              timer.value = setInterval(autoplay, initParams.autoplay.delay)
            }
          })
        })
      }
      if (initParams.tab) {
        // any => Element
        swiperDom.tab?.querySelectorAll('button').forEach((item: Element, index: number) => {
          item.addEventListener('click', () => {
            moveTo(index)
            if (initParams.autoplay.delay) {
              clearInterval(timer.value)
              timer.value = setInterval(autoplay, initParams.autoplay.delay)
            }
          })
        })
        if (props.options?.tab) {
          // '' => [] empty
          // [] => []
          // {[]} => []
          // {X} => [] empty
          const tabType = typeof props.options.tab === 'string'
            ? []
            : Array.isArray(props.options.tab)
              ? props.options.tab
              : props.options.tab.data
                ? props.options.tab?.data
                : []
          const diff = initProps.slideLength - Number(tabType?.length)
          // console.log(Number(tabType?.length))
          if (Number(tabType?.length) === 0) {
            for (let i = 0; i < initProps.slideLength; i++) {
              tabArray.push('Untitled')
            }
          } else {
            for (let i = 0; i < initProps.slideLength; i++) {
              // any => string
              tabType?.forEach((item: string, index: number) => {
                if (initProps.slideLength === tabType?.length) {
                  tabArray.push(item)
                } else {
                  if (diff === 0) {
                    tabArray.push(item)
                    // console.log('여기')
                  } else {
                    // console.log('저기')
                    if (index < i) {
                      tabArray.push('Untitled')
                    } else {
                      tabArray.push(item)
                    }
                  }
                }
              })
            }
          }
        }
      }
      if (swiperDom.slides) {
        const slidesHeight: number[] = []
        // any => Element
        swiperDom.slides.forEach((slide: Element, index: number) => {
          slidesHeight.push(slide.clientHeight)
          // touch events
          slide.addEventListener('touchstart', touchStart(index))
          slide.addEventListener('touchend', touchEnd)
          slide.addEventListener('touchmove', touchMove)
          // mouse events
          slide.addEventListener('mousedown', touchStart(index))
          slide.addEventListener('mouseup', touchEnd)
          slide.addEventListener('mousemove', touchMove)
          slide.addEventListener('mouseleave', touchEnd)
        })
        initProps.slideHeight = Math.max.apply(null, slidesHeight)
        swiperHeight.value = {
          height: `${initProps.slideHeight}px`
        }
      }
      if (initParams.navigation) {
        swiperDom.navigation?.btnPrev?.classList.add('disabled')
        swiperDom.navigation?.btnNext?.addEventListener('click', onNext)
        swiperDom.navigation?.btnPrev?.addEventListener('click', onPrev)
        if (swiperDom.navigation?.navRoot) {
          initProps.btnNavTop = {
            top: initParams.tab
              ? `${(initProps.slideHeight / 2) - (initProps.btnNavHeight / 2) + initProps.tabHeight}px`
              : `${(initProps.slideHeight / 2) - (initProps.btnNavHeight / 2)}px`
          }
        }
      }
      window.addEventListener('resize', setPositionByIndex)
      window.oncontextmenu = (event: Event) => {
        event.preventDefault()
        event.stopPropagation()
        return false
      }
    }
    onUnmounted(() => {
      window.removeEventListener('resize', setPositionByIndex)
    })
    function autoplay () {
      if (curSlider.curSlide < initProps.slideLength - 1) {
        onNext()
      } else {
        for (let i = 0; i < initProps.slideLength; i++) {
          onPrev()
        }
      }
    }
    /// //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const draggingSlider = reactive({
      isDragging: false,
      startPos: 0,
      currentTranslate: 0,
      prevTranslate: 0,
      animationID: 0
    })
    function getPositionX (event: Event) {
      const e = event as TouchEvent
      const e_ = event as MouseEvent
      return event.type.includes('mouse') ? e_.pageX : e.touches[0].clientX
    }
    function getPositionY (event: Event) {
      const e = event as TouchEvent
      const e_ = event as MouseEvent
      return event.type.includes('mouse') ? e_.pageY : e.touches[0].clientY
    }
    function touchStart (index: number) {
      return (event: Event) => {
        event.preventDefault()
        if (initParams.direction === 'vertical') {
          document.body.classList.add('scroll-hidden')
        }
        curSlider.curSlide = index
        draggingSlider.startPos =
          initParams.direction === 'horizontal'
            ? getPositionX(event)
            : getPositionY(event)
        draggingSlider.isDragging = true
        draggingSlider.animationID = requestAnimationFrame(animation)
        swiperDom.swiper?.classList.add('grabbing')
      }
    }

    function touchMove (event: Event) {
      if (draggingSlider.isDragging) {
        const currentPosition =
          initParams.direction === 'horizontal'
            ? getPositionX(event)
            : getPositionY(event)
        draggingSlider.currentTranslate = draggingSlider.prevTranslate + currentPosition - draggingSlider.startPos
      }
    }

    function touchEnd () {
      if (initParams.direction === 'vertical') {
        document.body.classList.remove('scroll-hidden')
      }
      cancelAnimationFrame(draggingSlider.animationID)
      draggingSlider.isDragging = false
      const movedBy = draggingSlider.currentTranslate - draggingSlider.prevTranslate

      if (movedBy < -100) {
        if (curSlider.curSlide < initProps.slideLength - 1) {
          swiperDom.navigation?.btnPrev?.classList.remove('disabled')
          curSlider.curSlide += 1
        }
        if (curSlider.curSlide === initProps.slideLength - 1) {
          swiperDom.navigation?.btnNext?.classList.add('disabled')
        }
      }
      if (movedBy > 100) {
        if (curSlider.curSlide > 0) {
          swiperDom.navigation?.btnNext?.classList.remove('disabled')
          curSlider.curSlide -= 1
        }
        if (curSlider.curSlide === 0) {
          swiperDom.navigation?.btnPrev?.classList.add('disabled')
        }
      }
      setPositionByIndex()
      swiperDom.swiper?.classList.remove('grabbing')
    }

    function animation () {
      setSliderPosition()
      if (draggingSlider.isDragging) {
        requestAnimationFrame(animation)
      }
    }

    function setPositionByIndex () {
      draggingSlider.currentTranslate =
        initParams.direction === 'horizontal'
          ? -(curSlider.curSlide * initProps.slideWidth)
          : -(curSlider.curSlide * initProps.slideHeight)
      draggingSlider.prevTranslate = draggingSlider.currentTranslate
      setSliderPosition()
    }

    function setSliderPosition () {
      if (swiperDom.swiper) {
        // initParams.direction === 'horizontal'
        //   ? swiperDom.swiper.style.cssText = `transform: translate3d(${draggingSlider.currentTranslate}px, 0, 0)`
        //   : swiperDom.swiper.style.cssText = `transform: translate3d(0, ${draggingSlider.currentTranslate}px, 0)`
        initParams.direction === 'horizontal'
          ? swiperDom.swiper.style.cssText = `width: ${initProps.slideWidth}px; transform: translate3d(${draggingSlider.currentTranslate}px, 0, 0)`
          : swiperDom.swiper.style.cssText = `height: ${initProps.slideHeight}px; transform: translate3d(0, ${draggingSlider.currentTranslate}px, 0)`
      }
    }
    /// //////////////////////////////////////////////////////////////////////////////////////////////////////////
    function onPrev () {
      if (curSlider.curSlide > 0) {
        swiperDom.navigation?.btnNext?.classList.remove('disabled')
        initParams.direction === 'horizontal'
          ? curSlider.curPositon = -((curSlider.curSlide - 1) * initProps.slideWidth)
          : curSlider.curPositon = -((curSlider.curSlide - 1) * initProps.slideHeight)
        if (swiperDom.swiper) {
          initParams.direction === 'horizontal'
            ? swiperDom.swiper.style.cssText = `transform: translate3d(${curSlider.curPositon}px, 0, 0)`
            : swiperDom.swiper.style.cssText = `transform: translate3d(0, ${curSlider.curPositon}px, 0)`
        }
        curSlider.curSlide -= 1
      }
      if (curSlider.curSlide === 0) {
        swiperDom.navigation?.btnPrev?.classList.add('disabled')
      }
    }
    function onNext () {
      if (curSlider.curSlide < initProps.slideLength - 1) {
        swiperDom.navigation?.btnPrev?.classList.remove('disabled')
        initParams.direction === 'horizontal'
          ? curSlider.curPositon = -((curSlider.curSlide + 1) * initProps.slideWidth)
          : curSlider.curPositon = -((curSlider.curSlide + 1) * initProps.slideHeight)
        if (swiperDom.swiper) {
          initParams.direction === 'horizontal'
            ? swiperDom.swiper.style.cssText = `transform: translate3d(${curSlider.curPositon}px, 0, 0)`
            : swiperDom.swiper.style.cssText = `transform: translate3d(0, ${curSlider.curPositon}px, 0)`
        }
        curSlider.curSlide += 1
      }
      if (curSlider.curSlide === initProps.slideLength - 1) {
        swiperDom.navigation?.btnNext?.classList.add('disabled')
      }
    }
    function moveTo (clickedPos: number) {
      const steps = Math.abs(clickedPos - curSlider.curSlide)
      if (curSlider.curSlide < clickedPos) {
        for (let i = 0; i < steps; i++) {
          onNext()
        }
      } else {
        for (let i = 0; i < steps; i++) {
          onPrev()
        }
      }
    }
    function changeSwiper (target: number) {
      emit('update', target)
    }
    return {
      swiperHeight,
      SWIPERROOT,
      tabArray,
      ...toRefs(initProps),
      ...toRefs(customClass),
      ...toRefs(curSlider),
      initParams,
      swiperDom,
      current,
      initFunc,
      onPrev,
      onNext,
      moveTo,
      autoplay,
      ...toRefs(draggingSlider),
      getPositionX,
      getPositionY,
      touchStart,
      touchMove,
      touchEnd,
      animation,
      setPositionByIndex,
      setSliderPosition,
      changeSwiper
    }
  }
})
</script>
