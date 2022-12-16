<template>
  <header>
    <nav>
      <div class="global-nav-links">
        <nav>
          <router-link :to="`/board/notice`" class="global-nav-item">notice</router-link>
          <ul>
            <li>
              <router-link
                :to="`/board/${boardTypeList[0]?.boardType}`"
                class="global-nav-item"
                @click="onSateSub"
                @blur="stateSub = false"
              >
                {{ boardTypeList[0]?.boardType }}
              </router-link>
              <ul
                v-show="stateSub"
                class="local-nav-link"
              >
                <li
                  v-for="(item, index) in boardTypeList"
                  :key="`select${index}`"
                >
                  <router-link :to="`/board/${item.boardType}`" class="global-nav-item">{{ item.boardType }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useBoardStore } from '@/store/board/board.module'
import { ResBoardTypeInterface } from '@/service/board/interface/boardType.interface'

export default defineComponent({
  name: 'Header',
  components: {
  },
  props: {
    scrollTop: {
      type: Boolean,
      default: false
    },
    scrollBottom: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    // router & store
    const boardStore = useBoardStore()

    // init
    const boardTypeList = ref<ResBoardTypeInterface[]>([])
    const stateSub = ref(false)
    // const computedState = computed(() => {
    //   return !stateSub.value
    // })

    // api
    async function getBoardType () {
      boardTypeList.value = await boardStore.actionHttpBoardType()
    }

    function onSateSub () {
      console.log('stateSub', stateSub.value)
      if (stateSub.value) {
        stateSub.value = false
      } else {
        stateSub.value = true
      }
    }

    onMounted(() => {
      getBoardType()
    })

    return {
      boardTypeList,
      stateSub,
      onSateSub
    }
  }
})
</script>
