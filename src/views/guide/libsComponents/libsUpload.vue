<template>
  <Header />
  <div class="guide-body">
    <GuideNav />
    <div class="guide-content">
      <h2 class="guide-title">{{ pageTitle }}</h2>
      <div class="box">
        <div class="api-box">
          <h3>Create FILE API</h3>
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
                <th scope="row">files</th>
                <td>
                  <span class="type-boolean">Boolean</span>
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
                <th scope="row">preview</th>
                <td>
                  <span class="type-boolean">Boolean</span>
                </td>
                <td class="td-center">false</td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required">선택</em>
                </td>
                <th scope="row">init-data</th>
                <td>
                  <span class="type-object">&lt;string&gt;[]</span>
                </td>
                <td class="td-center"></td>
              </tr>
              <tr>
                <td>
                  <em class="icon-required">선택</em>
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
          <h3>Create File</h3>
          <div class="example">
            <Input
              files
              preview
              label="name1"
              name="currentDefault"
              @change="onChangeFile"
            />
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;Input
    files
    preview
    label=&quot;name1&quot;
    name=&quot;currentDefault&quot;
    @change=&quot;onChangeFile&quot;
  /&gt;
&lt;/template&gt;

&lt;script&gt;
  import Input from '@/components/Input.vue'

  function onChangeFile (value : FileList) {
    console.log('parent input', value)
  }
&lt;/script&gt;
  </code>
</pre>
          </div>
        </div><!-- // .lib-box -->
        <div class="api-box">
          <h3>View FILE API</h3>
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
                <th scope="row">filelist</th>
                <td>
                  <span class="type-object">&lt;string&gt;[]</span>
                </td>
                <td class="td-center">
                  ['절대경로', '절대경로']
                </td>
              </tr>
            </tbody>
          </table>
        </div><!-- // .api-box -->
        <div class="lib-box">
          <h3>View File</h3>
          <div class="example">
            <Preview :file-list="testData" />
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;Preview :file-list=&quot;testData&quot; /&gt;
&lt;/template&gt;

&lt;script&gt;
  import Preview from '@/components/Preview.vue'

  const testData = ref&lt;string[]/&gt;([])
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
import { useBoardStore } from '@/store/board/board.module'
import Input from '@/components/Input.vue'
import Preview from '@/components/Preview.vue'
import { ReqBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { API_URL } from '@/utils/common.constants'

export default defineComponent({
  name: 'libsUpload',
  components: {
    Header,
    GuideNav,
    Input,
    Preview
  },
  setup () {
    // router & store
    const route = useRoute()
    const boardStore = useBoardStore()
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      Prism.highlightAll()
      getBoardDetail()
    })

    const testData = ref<string[]>([])
    function onChangeFile (value : FileList) {
      console.log('parent input', value)
    }

    // test api
    async function getBoardDetail () {
      const targetBoard: ReqBoardDetailInterface = {
        id: Number(99999)
      }
      const result = await boardStore.actionHttpBoardDetail(targetBoard)

      // fileList 가공 후 재할당
      if (result[0].fileList !== '') {
        const target = result[0].fileList.split(',')
        testData.value = []
        for (let i = 0; i < target.length; i++) {
          const targetUrl = `${API_URL}/upload/${target[i]}`
          testData.value.push(targetUrl)
        }
      }
    }

    return {
      pageTitle,
      testData,
      onChangeFile
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
