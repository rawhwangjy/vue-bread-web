<template>
  <header>
    <nav>
      <div class="global-nav-wrap">
        <nav>
          <ul>
            <li class="global-nav-item">
              <router-link to="/guide">
                guide
              </router-link>
            </li>
            <li class="global-nav-item">
              <button
                type="button"
                @click="onSateSub"
              >Boards</button>
              <div
                v-show="stateSub"
                class="local-nav-wrap"
              >
                <router-link
                  to="/board/category"
                  class="local-nav-item"
                >
                  Board 관리
                </router-link>
                <ul class="local-nav-item">
                  <li
                    v-for="(item, index) in categoryStore.categoryList"
                    :key="`select${index}`"
                  >
                    <router-link :to="`/board/${item.category}`" class="global-nav-item">{{ item.category }}</router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useCategoryStore } from '@/store/category/category.module'

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
    const categoryStore = useCategoryStore()

    // init
    const stateSub = ref(false)

    // api
    function onSateSub () {
      if (stateSub.value) {
        stateSub.value = false
      } else {
        stateSub.value = true
      }
    }

    onMounted(() => {
      //
    })

    return {
      categoryStore,
      stateSub,
      onSateSub
    }
  }
})
</script>
