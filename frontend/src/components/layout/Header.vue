<template>
  <header>
    <nav>
      <div class="global-nav-links">
        <nav>
          <ul>
            <li>
              <router-link
                to="/board/category"
                class="global-nav-item"
              >
                Board 관리
              </router-link>
            </li>
            <li>
              <button
                type="button"
                class="global-nav-item"
                @click="onSateSub"
              >Boards</button>
              <ul
                v-show="stateSub"
                class="local-nav-link"
              >
                <li
                  v-for="(item, index) in categoryStore.categoryList"
                  :key="`select${index}`"
                >
                  <router-link :to="`/board/${item.category}`" class="global-nav-item">{{ item.category }}</router-link>
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
