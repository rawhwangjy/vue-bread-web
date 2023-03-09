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
                <th scope="row">initTitle</th>
                <td>
                  <span class="type-string">String</span>
                </td>
                <td class="td-center">'선택해 주세요.'</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required required">필수</em>
                </td>
                <th scope="row">selectData</th>
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
            <Select
              v-model="seletedText"
              initTitle="선택해 주세요."
              :selectData="selectData"
              :initSelected="selectData[1]"
              @change="changeEvent"
            />
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;Select
    v-model=&quot;seletedText&quot;
    initTitle=&quot;선택해 주세요.&quot;
    :selectData=&quot;selectData&quot;
    :initSelected=&quot;selectData[1]&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
&lt;/template&gt;

&lt;script&gt;
  import Select from '@/components/Select.vue'

  const seletedText = ref('')
  const selectData = ['123', '테스트', '데이터']
  function changeEvent (value : string) {
    console.log('selected', value)
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
import Select from '@/components/Select.vue'

export default defineComponent({
  name: 'libsSelect',
  components: {
    Select
  },
  setup () {
    const route = useRoute() // /guide/components/modal
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      Prism.highlightAll()
    })

    const seletedText = ref('')
    const selectData = ['123', '테스트', '데이터']
    function changeEvent (value : string) {
      console.log('selected', value)
    }
    return {
      pageTitle,
      seletedText,
      selectData,
      changeEvent
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
