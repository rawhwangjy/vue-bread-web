<template>
  <Header />
  <div class="content-body login" id="content-body">
    <div class="title-area">
      <h3 class="main-title">회원가입</h3>
    </div>
    <div class="content-area">
      회원가입 완료
    </div>
    <div class="footer-area side">
      ㅇㅇ
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/views/layout/Header.vue'

export default defineComponent({
  name: '',
  components: {
    Header
  },
  setup () {
    return {
    }
  }
})
</script>
