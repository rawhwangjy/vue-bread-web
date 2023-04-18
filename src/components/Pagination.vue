<template>
  <div class="page-pagination">
    <button
      type="button"
      class="btn-prev"
      :disabled="currentPage === 1"
      @click="onPageMove(currentPage - 1)"
    >
      <font-awesome-icon
        icon="fa-solid fa-caret-left"
        aria-label="이전 10개 보기"
      />
    </button>
    <ol>
      <li
        v-for="(index) in pagesNum"
        :key="`pagesNum${index}`"
      >
        <button
          type="button"
          :class="{
            'active': currentPage === index
          }"
          @click="onPageMove(index)"
        >
          <span>{{ index }}</span>
        </button>
      </li>
    </ol>
    <button
      type="button"
      class="btn-right"
      :disabled="currentPage === pagesNum"
      @click="onPageMove(currentPage + 1)"
    >
      <font-awesome-icon
        icon="fa-solid fa-caret-right"
        aria-label="다음 10개 보기"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { LocalKey } from '@/utils/common.constants'

export default defineComponent({
  name: 'Test',
  components: { },
  props: {
    totalDataLength: {
      type: Number,
      default: 0
    },
    dataPerPage: {
      type: Number,
      default: 0
    }
  },
  emits: ['update'],
  setup (props, { emit }) {
    const totalCount = ref<number>(props.totalDataLength) // 27
    const pagesNum = Math.ceil(totalCount.value / props.dataPerPage) // 5

    const currentPage = ref(1)
    onMounted(() => {
      if (localStorage.getItem(LocalKey.lastPageNum) !== 'lastPageNum') {
        currentPage.value = Number(localStorage.getItem(LocalKey.lastPageNum))
        onPageMove(Number(localStorage.getItem(LocalKey.lastPageNum)))
      }
    })
    function onPageMove (index: number) {
      currentPage.value = index // currentPage
      // console.log('현재 페이지', currentPage.value)
      const startOffset = (currentPage.value - 1) * props.dataPerPage
      const endOffset = startOffset + props.dataPerPage
      emit('update', currentPage.value, startOffset, endOffset)
    }

    return {
      currentPage,
      pagesNum,
      onPageMove
    }
  }
})
</script>
