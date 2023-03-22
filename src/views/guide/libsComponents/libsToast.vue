<template>
  <Header />
  <div class="guide-body">
    <GuideNav />
    <div class="guide-content">
      <h2 class="guide-title">{{ pageTitle }}</h2>
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
                <th scope="row">ref</th>
                <td>
                  <span class="type-string">String</span>
                </td>
                <td class="td-center"></td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">message</th>
                <td>
                  <span class="type-string">String</span>
                </td>
                <td class="td-center"></td>
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
                <td class="td-center">'center'</td>
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
  &lt;button
    type=&quot;button&quot;
    aria-controls=&quot;targetAlert&quot;
    @click=&quot;openToast&quot;
  &gt;토스트 열기&lt;/button&gt;
  &lt;Toast
    id=&quot;targetAlert&quot;
    ref=&quot;toast&quot;
    message=&quot;message&quot;
    content-align=&quot;center&quot;
    @click=&quot;openToast&quot;
  /&gt;
&lt;/template&gt;

&lt;script&gt;
  import Toast from '@/components/Toast.vue'

  const toast = ref&lt;InstanceType&lt;typeof Toast&gt; | null&gt;(null)
  function openToast () {
    toast.value?.showToast()
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
import Header from '@/views/layout/Header.vue'
import GuideNav from '@/views/layout/GuideNav.vue'
import { useRoute } from 'vue-router'
import Toast from '@/components/Toast.vue'

export default defineComponent({
  name: 'libsToast',
  components: {
    Header,
    GuideNav,
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
