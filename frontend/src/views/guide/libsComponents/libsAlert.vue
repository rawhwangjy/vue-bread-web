<template>
  <div class="guide-body">
    <h2 class="guide-title">{{ pageTitle }}</h2>
    <div class="guide-content">
      <div class="box">
        <div class="api-box">
          <h3>공통 API</h3>
          <h4>Button Alert</h4>
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
          <h4>Target Alert</h4>
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
                  <em class="icon-required">선택</em>
                </td>
                <th scope="row">content-align</th>
                <td>
                  <span class="type-string">String</span>
                  left | center | right
                </td>
                <td class="td-center">'left'</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required">선택</em>
                </td>
                <th scope="row">btn-align</th>
                <td>
                  <span class="type-string">String</span>
                  left | center | right
                </td>
                <td class="td-center">'left'</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required">선택</em>
                </td>
                <th scope="row">bg</th>
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
            </tbody>
          </table>
        </div><!-- // .api-box -->
        <div class="lib-box">
          <h3>Basic</h3>
          <div class="example">
            <button
              type="button"
              aria-controls="targetAlert"
              @click="openAlert"
            >팝업 열기</button>
            <Alert
              id="targetAlert"
              :state="state"
              content-align="center"
              btn-align="center"
              bg
              @close="state = false"
            >
              내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
            </Alert>
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;button type=&quot;button&quot; @click=&quot;openAlert&quot;&gt;팝업 열기&lt;/button&gt;

  &lt;Alert
    :state=&quot;state&quot;
    content-align=&quot;center&quot;
    btn-align=&quot;center&quot;
    bg
    @close=&quot;state = false&quot;
  &gt;
    내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
  &lt;/Alert&gt;
&lt;/template&gt;

&lt;script&gt;
  import Alert from '@/components/Alert.vue'

  const state = ref&lt;boolean&gt;(false)
  function openAlert () {
    state.value = !state.value
    console.log(state.value)
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
import Alert from '@/components/Alert.vue'

export default defineComponent({
  name: 'libsAlert',
  components: {
    Alert
  },
  setup () {
    const route = useRoute()
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      Prism.highlightAll()
    })

    const state = ref(false)
    function openAlert () {
      state.value = !state.value
    }
    return {
      pageTitle,
      state,
      openAlert
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
