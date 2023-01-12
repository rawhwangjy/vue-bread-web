<template>
  <div class="guide-body">
    <h2 class="guide-title">{{ pageTitle }}</h2>
    <div class="guide-content">
      <div class="box">
        <div class="api-box">
          <h3>공통 API</h3>
          <table class="api-table">
            <colgroup>
              <col class="width20" >
              <col class="width25" />
              <col class="widthAll" />
              <col class="width20" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Required</th>
                <th scope="col">Options</th>
                <th scope="col">Params</th>
                <th scope="col">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">tab-data</th>
                <td>
                  <span class="type-object">Array</span>
                </td>
                <td class="td-center">[]</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">@change</th>
                <td>
                  <span class="type-object">Function</span>
                </td>
                <td class="td-center">method name</td>
              </tr>
            </tbody>
          </table>
        </div><!-- // .api-box -->
        <div class="lib-box">
          <h3>Basic</h3>
          <div class="example">
            <button
              type="button"
              aria-controls="targetAlert"
              @click="openToast"
            >토스트 열기</button>
            <Toast
              id="targetAlert"
              ref="toast"
              message="message"
              content-align="center"
              @click="openToast"
            />
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;

&lt;/template&gt;

&lt;script&gt;

&lt;/script&gt;
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
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Toast from '@/components/Toast.vue'

export default defineComponent({
  name: 'libsTab',
  components: {
    Toast
  },
  setup () {
    const route = useRoute()
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      Prism.highlightAll()
    })

    const toast = ref<InstanceType<typeof Toast> | null>(null)
    function openToast () {
      toast.value?.showToast()
    }
    return {
      pageTitle,
      toast,
      openToast
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
