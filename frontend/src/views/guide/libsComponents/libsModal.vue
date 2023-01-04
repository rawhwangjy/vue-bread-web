<template>
  <div class="guide-body">
    <h2 class="guide-title">{{ pageTitle }}</h2>
    <div class="guide-content">
      <div class="box">
        <div class="api-box">
          <h3>공통 API</h3>
          <div class="code">
            ul.api-list
<pre>
  <code class="language-html">
(modal button + modal popup)
(modal button) aria-haspopup="dialog" aria-controls="modalID"
(modal popup) v-show="boolean" id="modalID" role="dialog" aria-modal="true"
  </code>
</pre>
          </div>
        </div><!-- // .api-box -->
        <div class="lib-box">
          <h3>Basic</h3>
          <div class="example">
            <button type="button" aria-haspopup="dialog" aria-controls="ddsd">팝업 열기</button>
            <Modal
              id="ddsd"
            >
              dd
            </Modal>
          </div>
          <div class="code">
<pre>
  <code class="language-html">
  </code>
</pre>
          </div>
        </div><!-- // .lib-box -->
      </div>
    </div><!-- // guide-content -->
  </div>
</template>

<script lang="ts">
import Prism from 'prismjs'
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Modal from '@/components/Modal.vue'

export default defineComponent({
  name: 'libsCheckbox',
  components: {
    Modal
  },
  setup () {
    const route = useRoute() // /guide/components/modal
    const pageTitle = route.path.replace(/^.*\//, '')
    onMounted(() => {
      Prism.highlightAll()
    })
    return {
      pageTitle
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
