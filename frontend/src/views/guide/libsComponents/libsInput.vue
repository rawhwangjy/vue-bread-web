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
                <th scope="row">v-model</th>
                <td>
                  <span class="type-element">Input Element</span>
                </td>
                <td class="td-center">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">label</th>
                <td>
                  <span class="type-string">String</span>
                </td>
                <td class="td-center">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">value</th>
                <td>
                  <span class="type-string">String</span>
                </td>
                <td class="td-center"></td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">name</th>
                <td>
                  <span class="type-string">String</span>
                </td>
                <td class="td-center"></td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required">선택</em>
                </td>
                <th scope="row">checked</th>
                <td>
                  <span class="type-boolean">Boolean</span>
                </td>
                <td class="td-center">false</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required">선택</em>
                </td>
                <th scope="row">disabled</th>
                <td>
                  <span class="type-boolean">Boolean</span>
                </td>
                <td class="td-center">false</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required">선택</em>
                </td>
                <th scope="row">label-hide</th>
                <td>
                  <span class="type-boolean">Boolean</span>
                </td>
                <td class="td-center">false</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required">필수</em>
                </td>
                <th scope="row">@change</th>
                <td>
                  <span class="type-function">Function</span>
                </td>
                <td class="td-center">method name</td>
              </tr>
            </tbody>
          </table>
        </div><!-- // .api-box -->
        <div class="lib-box">
          <h3>Basic</h3>
          <div class="example">
            <Input
              v-model="inputText"
              label="name1"
              name="currentDefault"
              @change="changeEvent"
            />
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;Input
    v-model=&quot;inputText&quot;
    label=&quot;name1&quot;
    name=&quot;currentDefault&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
&lt;/template&gt;

&lt;script&gt;
  const inputText = ref('')

  function changeEvent (value : string) {
    console.log('typing', value)
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
import Input from '@/components/Input.vue'

export default defineComponent({
  name: 'libsRadio',
  components: {
    Input
  },
  setup () {
    const route = useRoute()
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      Prism.highlightAll()
    })

    const inputText = ref('')
    function changeEvent (value : string) {
      console.log('typing', value)
    }
    return {
      pageTitle,
      inputText,
      changeEvent
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
