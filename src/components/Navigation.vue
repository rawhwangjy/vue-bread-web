<template>
  <div class="navigation-wrap">
    <div class="menu-area">
      <nav ref="navWrap">
        <ul
          ref="menuList"
          class="menu-list"
          :style="`transform: translate3d(-${scrollX}px, 0, 0); transition-duration: 500ms;`"
          @wheel="isScrolling"
        >
          <li
            v-for="(item, index) in navData"
            :key="`nav${index}`"
          >
            <button
              type="button"
              :class="{
                'active': isCurrentMenu === index,
                'btn-home': item === '홈'
              }"
              :aria-label="item !== '홈' ? `${item} 메인 화면 이동` : ''"
              @click.stop="isScrollMenu(index, $event)"
            >
              <span>{{ item }}</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div class="more-area">
      <div
        ref="btnAllMenu"
        class="btn-more-area"
      >
        <button
          type="button"
          class="btn-more"
          :class="{
            'active': isShowModal,
          }"
          @click="isShowAllMenu"
        >
          <span class="sr-only">전체메뉴 {{ isShowModal ? '닫기' : '열기' }}</span>
        </button>
      </div>
      <div
        v-show="isShowModal"
        class="modal-area"
      >
        <strong class="sr-only">전체메뉴</strong>
        <ul class="menu-list">
          <li
            v-for="(item, index) in modalData"
            :key="`nav${index}`"
          >
            <button
              type="button"
              :class="{
                'active': isCurrentMenu - 1 === index,
              }"
              :aria-label="`${item} 메인 화면 이동`"
              @click="isActiveMenu(index + 1)"
            >
              {{ item }}
            </button>
          </li>
        </ul>
        <span
          class="dim"
          @click="onClose"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'

export default defineComponent({
  setup () {
    const isShowModal = ref(false)
    const isCurrentMenu = ref(0)
    const navData = ref<string[]>(['홈', '자산', '소비', '퀴즈 온더 챌린지', '절세꿀팁', '금융캘린더', '목표', '나만 아는 투자소식', '투자 캐릭터'])
    const modalData = ref<string[]>(['자산', '소비', '퀴즈 온더\n챌린지', '절세꿀팁', '금융\n캘린더', '목표', '나만 아는\n투자소식', '투자\n캐릭터'])

    const btnAllMenu = ref<HTMLDivElement | null>(null)
    const menuList = ref<HTMLDivElement | null>(null)
    const navWrap = ref<HTMLDivElement | null>(null)
    const state = reactive({
      boxWidth: 0,
      boxHalf: 0,
      btnLeft: 0,
      listWidth: 0,
      btnWidth: 0,
      scrollX: 0
    })

    function isShowAllMenu () {
      isShowModal.value ? isShowModal.value = false : isShowModal.value = true
    }
    function scrollMenuList (x: number) {
      if (navWrap.value === null) {
        return
      }
      navWrap.value.scrollTo({
        left: x,
        behavior: 'smooth'
      })
      state.scrollX = x
      console.log()
    }
    function isScrollMenu (index: number, event: Event) {
      isActiveMenu(index)
      state.btnWidth = btnAllMenu.value?.clientWidth || 0

      state.listWidth = menuList.value?.clientWidth || 0
      state.boxWidth = navWrap.value?.clientWidth || 0
      state.boxHalf = state.boxWidth / 2

      const target = (event.currentTarget as HTMLButtonElement)
      const targetLeft = target.offsetLeft
      const selectTargetPos = targetLeft + (target.clientWidth / 2)

      if (selectTargetPos <= state.boxHalf) {
        scrollMenuList(0)
      } else if ((state.listWidth - selectTargetPos) <= state.boxHalf) {
        scrollMenuList(state.listWidth - state.boxWidth)
      } else {
        scrollMenuList(selectTargetPos - state.boxHalf)
      }
    }
    function isScrolling (e: Event) {
      const event = e as WheelEvent
      console.log('스크롤 중', event.screenX)
      // state.scrollX = 0
    }
    function isActiveMenu (index: number) {
      isCurrentMenu.value = index
      isShowModal.value = false
    }
    function onClose () {
      isShowModal.value = false
    }
    return {
      navData,
      modalData,
      isCurrentMenu,
      isScrollMenu,
      isScrolling,
      isActiveMenu,
      navWrap,
      btnAllMenu,
      menuList,
      ...toRefs(state),
      isShowModal,
      isShowAllMenu,
      onClose
    }
  }
})
</script>
