<template>
  <Header />
  <div class="content-body main" id="content-body">
    <section class="main-section" id="section0" ref="mainSection">
      <h2>안녕하세요.</h2>
      <div class="sticky-element a" ref="message1">
        <p>프론트엔드 개발자<br/>황지영입니다.</p>
      </div>
      <div class="sticky-element b" ref="message2">
        <p>이 사이트는 포트폴리오 사이트입니다.<br/>디자인부터 DB까지 모든 것을 작업했습니다.</p>
      </div>
      <div class="sticky-element c" ref="message3">
        <p>매일 리팩토링 작업 중입니다.<br/>부족하지만 재밌게 봐주세요.</p>
      </div>
      <div class="sticky-element d" ref="message4">
        <p>행복하세요.&#x1F970;</p>
        <span class="img-area">
          <img src="~@/assets/images/visual/bye.jpeg">
        </span>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Header from '@/views/layout/Header.vue'
import { SceneObject, SceneInfo } from '@/utils/common.interface'
import { setLayout, calcValues } from '@/utils/common.function'

export default defineComponent({
  name: 'Main',
  components: {
    Header
  },
  setup () {
    const sceneInfo: SceneInfo = {
      id: 0,
      heightNum: 17,
      scrollHeight: 0,
      values: {
        messageAOpacityIn: [0, 1, { start: 0.1, end: 0.2 }],
        messageBOpacityIn: [0, 1, { start: 0.3, end: 0.4 }],
        messageCOpacityIn: [0, 1, { start: 0.5, end: 0.6 }],
        messageDOpacityIn: [0, 1, { start: 0.7, end: 0.8 }],
        messageATranslateYIn: [20, 0, { start: 0.1, end: 0.2 }],
        messageBTranslateYIn: [20, 0, { start: 0.3, end: 0.4 }],
        messageCTranslateYIn: [20, 0, { start: 0.5, end: 0.6 }],
        messageDTranslateYIn: [20, 0, { start: 0.7, end: 0.8 }],
        messageAOpacityOut: [1, 0, { start: 0.25, end: 0.3 }],
        messageBOpacityOut: [1, 0, { start: 0.45, end: 0.5 }],
        messageCOpacityOut: [1, 0, { start: 0.65, end: 0.7 }],
        messageDOpacityOut: [1, 0, { start: 0.85, end: 0.9 }],
        messageATranslateYOut: [0, -20, { start: 0.25, end: 0.3 }],
        messageBTranslateYOut: [0, -20, { start: 0.45, end: 0.5 }],
        messageCTranslateYOut: [0, -20, { start: 0.65, end: 0.7 }],
        messageDTranslateYOut: [0, -20, { start: 0.85, end: 0.9 }]
      }
    }

    onMounted(() => {
      const refHTML: SceneObject = {
        objs: {
          container: mainSection.value,
          messageA: message1.value,
          messageB: message2.value,
          messageC: message3.value,
          messageD: message4.value
        }
      }
      Object.assign(sceneInfo, refHTML)
      setLayout(sceneInfo)
      window.addEventListener('resize', () => {
        setLayout(sceneInfo)
      })
      window.addEventListener('scroll', () => {
        yOffset.value = window.pageYOffset
        playAnimation()
      })
    })

    const mainSection = ref<HTMLElement | null>(null)
    // section 0 objs
    const message1 = ref<HTMLDivElement | null>(null)
    const message2 = ref<HTMLDivElement | null>(null)
    const message3 = ref<HTMLDivElement | null>(null)
    const message4 = ref<HTMLDivElement | null>(null)

    const yOffset = ref<number>(0)
    function playAnimation (): void {
      const objs = sceneInfo.objs
      const values = sceneInfo.values
      const currentYOffset = yOffset.value
      const scrollHeight = sceneInfo.scrollHeight
      const scrollRatio = currentYOffset / scrollHeight

      if (objs && values) {
        const messageAOpacityIn = calcValues(sceneInfo, values?.messageAOpacityIn, currentYOffset)
        const messageAOpacityOut = calcValues(sceneInfo, values?.messageAOpacityOut, currentYOffset)
        const messageATranslateYIn = calcValues(sceneInfo, values?.messageATranslateYIn, currentYOffset)
        const messageATranslateYOut = calcValues(sceneInfo, values?.messageATranslateYOut, currentYOffset)
        if (scrollRatio <= 0.22) {
          objs?.messageA?.setAttribute('style', `opacity: ${messageAOpacityIn}; transform: translate3d(0, ${messageATranslateYIn}%, 0)`)
        } else {
          objs?.messageA?.setAttribute('style', `opacity: ${messageAOpacityOut}; transform: translate3d(0, ${messageATranslateYOut}%, 0)`)
        }
        const messageBOpacityIn = calcValues(sceneInfo, values?.messageBOpacityIn, currentYOffset)
        const messageBOpacityOut = calcValues(sceneInfo, values?.messageBOpacityOut, currentYOffset)
        const messageBTranslateYIn = calcValues(sceneInfo, values?.messageBTranslateYIn, currentYOffset)
        const messageBTranslateYOut = calcValues(sceneInfo, values?.messageBTranslateYOut, currentYOffset)
        if (scrollRatio <= 0.42) {
          objs?.messageB?.setAttribute('style', `opacity: ${messageBOpacityIn}; transform: translate3d(0, ${messageBTranslateYIn}%, 0)`)
        } else {
          objs?.messageB?.setAttribute('style', `opacity: ${messageBOpacityOut}; transform: translate3d(0, ${messageBTranslateYOut}%, 0)`)
        }
        const messageCOpacityIn = calcValues(sceneInfo, values?.messageCOpacityIn, currentYOffset)
        const messageCOpacityOut = calcValues(sceneInfo, values?.messageCOpacityOut, currentYOffset)
        const messageCTranslateYIn = calcValues(sceneInfo, values?.messageCTranslateYIn, currentYOffset)
        const messageCTranslateYOut = calcValues(sceneInfo, values?.messageCTranslateYOut, currentYOffset)
        if (scrollRatio <= 0.62) {
          objs?.messageC?.setAttribute('style', `opacity: ${messageCOpacityIn}; transform: translate3d(0, ${messageCTranslateYIn}%, 0)`)
        } else {
          objs?.messageC?.setAttribute('style', `opacity: ${messageCOpacityOut}; transform: translate3d(0, ${messageCTranslateYOut}%, 0)`)
        }
        const messageDOpacityIn = calcValues(sceneInfo, values?.messageDOpacityIn, currentYOffset)
        const messageDOpacityOut = calcValues(sceneInfo, values?.messageDOpacityOut, currentYOffset)
        const messageDTranslateYIn = calcValues(sceneInfo, values?.messageDTranslateYIn, currentYOffset)
        const messageDTranslateYOut = calcValues(sceneInfo, values?.messageDTranslateYOut, currentYOffset)
        if (scrollRatio <= 0.82) {
          objs?.messageD?.setAttribute('style', `opacity: ${messageDOpacityIn}; transform: translate3d(0, ${messageDTranslateYIn}%, 0)`)
        } else {
          objs?.messageD?.setAttribute('style', `opacity: ${messageDOpacityOut}; transform: translate3d(0, ${messageDTranslateYOut}%, 0)`)
        }
      }
    }
    return {
      setLayout,
      sceneInfo,
      mainSection,
      message1,
      message2,
      message3,
      message4,
      playAnimation,
      calcValues
    }
  }
})
</script>
