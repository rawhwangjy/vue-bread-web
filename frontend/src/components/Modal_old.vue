<template>
  <teleport to="body">
      <div class="modal-popup">
        <div class="modal">
          <div class="board-wrap">
            <div
              class="img-slider-wrap"
              :class="{
                'both': board.images.pc && board.images.mo
              }"
            >
              <Tab
                :tab-data="tabData"
              >
                <template v-if="board.images.pc" #pc>
                  <Slide :images="board.images.pc" type="pc"/>
                </template>
                <template v-if="board.images.mo" #mo>
                  <Slide :images="board.images.mo" type="mo"/>
                </template>
              </Tab>
            </div>
            <div class="detail-wrap">
              <h3>{{ board.name }}</h3>
              <p class="introduce">{{ board.introduce }}</p>
              <dl class="info-list">
                <div class="period">
                  <dt>투입기간</dt>
                  <dd>
                    <span class="year">{{ board.startDate.year }}년</span>
                    <span class="month">{{ board.startDate.month }}월</span>
                    <span class="hyphen">~</span>
                    <span class="year">{{ board.endDate.year }}년</span>
                    <span class="month">{{ board.endDate.month }}월</span>
                  </dd>
                </div>
                <div class="skills">
                  <dt>사용기술</dt>
                  <dd>
                    <span
                      v-for="(item, index) in board.skills"
                      :key="`boardImage${index}`"
                      class="icon"
                      :class="{
                        'html': item.includes('html'),
                        'vue': item.includes('vue'),

                        'css': item.includes('css'),
                        'sass': item.includes('sass'),

                        'sketch': item.includes('sketch'),
                        'zeplin': item.includes('zeplin'),
                        'photoshop': item.includes('photoshop'),

                        'js': item.includes('js'),
                        'jquery': item.includes('jquery'),
                        'ts': item.includes('ts'),

                        'node': item.includes('node'),
                        'npm': item.includes('npm'),

                        'git': item.includes('git'),
                        'github': item.includes('github')

                      }"
                    >
                      {{ item }}
                    </span>
                  </dd>
                </div>
                <div class="order-company">
                  <dt>발주사</dt>
                  <dd>{{ board.orderCompany }}</dd>
                </div>
                <div class="results">
                  <dt>기여도</dt>
                  <dd>{{ board.results }}</dd>
                </div>
              </dl>
            </div>
          </div>
          <button type="button" @click="closeModal" class="btn-close">
            <span class="sr-only">닫기</span>
            <font-awesome-icon icon="fa-regular fa-circle-xmark" />
          </button>
        </div>
        <span v-if="winWidth > 1024" class="bg" @click="closeModal"></span>
      </div>
    </teleport>
  </template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Tab from '@/components/Tab.vue'

export default defineComponent({
  components: {
    FontAwesomeIcon,
    Tab
  },
  props: {
    board: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  setup (props, { emit }) {
    library.add(faCircleXmark)
    const tabData: Array<string> = []
    const winWidth = window.innerWidth
    onMounted(() => {
      // console.log('board2', props.board.images)
    })
    if (props.board.images.pc && props.board.images.mo) {
      tabData?.push('mo')
      tabData?.push('pc')
    } else if (props.board.images.pc) {
      tabData?.push('pc')
    } else if (props.board.images.mo) {
      tabData?.push('mo')
    }
    function closeModal () {
      emit('close')
    }
    return {
      closeModal,
      tabData,
      winWidth
    }
  }
})
</script>
