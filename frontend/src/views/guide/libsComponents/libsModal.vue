<template>
  <div class="guide-body">
    <h2 class="guide-title">{{ pageTitle }}</h2>
    <div class="guide-content">
      <div class="box">
        <div class="api-box">
          <h3>공통 API</h3>
          <h4>Button Modal</h4>
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
                <th scope="row">aria-haspopup</th>
                <td>
                  <span class="type-string">String</span>
                </td>
                <td class="td-center">'dialog'</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">aria-controls</th>
                <td>
                  <span class="type-string">String</span>
                </td>
                <td class="td-center">Target's ID</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">@click</th>
                <td>
                  <span class="type-object">Function</span>
                </td>
                <td class="td-center">method name</td>
              </tr>
            </tbody>
          </table>
          <h4>Target Modal</h4>
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
                <th scope="row">id</th>
                <td>
                  <span class="type-string">String</span>
                </td>
                <td class="td-center">Button's aria-controls</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">state</th>
                <td>
                  <span class="type-boolean">Boolean</span>
                </td>
                <td class="td-center">false</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">@close</th>
                <td>
                  <span class="type-object">Function</span>
                </td>
                <td class="td-center">method name</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required">선택</em>
                </td>
                <th scope="row">&lt;template #modal-header&gt;</th>
                <td>
                  <span class="type-object"></span>
                </td>
                <td class="td-center">Templae Header</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">&lt;template #modal-content&gt;</th>
                <td>
                  <span class="type-object"></span>
                </td>
                <td class="td-center">Templae Content</td>
              </tr>
            </tbody>
          </table>
        </div><!-- // .api-box -->
        <div class="lib-box">
          <h3>Basic</h3>
          <div class="example">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-controls="targetPopup"
              @click="openModal"
            >팝업 열기</button>
            <Modal
              id="targetPopup"
              :state="state"
              @close="state = false"
            >
              <template #modal-header>
                Title
              </template>
              <template #modal-content>
                Content
              </template>
            </Modal>
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;button
    type=&quot;button&quot;
    aria-haspopup=&quot;dialog&quot;
    aria-controls=&quot;targetPopup&quot;
    @click=&quot;openModal&quot;
  &gt;팝업 열기&lt;/button&gt;
  &lt;Modal
    id=&quot;targetPopup&quot;
    :state=&quot;state&quot;
    @close=&quot;state = false&quot;
  &gt;
    &lt;template #modal-header&gt;
      Title
    &lt;/template&gt;
    &lt;template #modal-content&gt;
      Content
    &lt;/template&gt;
  &lt;/Modal&gt;
&lt;/template&gt;

&lt;script&gt;
  const state = ref(false)

  function openModal () {
    state.value = !state.value
  }
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

    const state = ref(false)
    function openModal () {
      state.value = !state.value
    }
    return {
      pageTitle,
      state,
      openModal
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
