<template>
  <Header />
  <div class="guide-body">
    <GuideNav />
    <div class="guide-content">
      <h2 class="guide-title">{{ pageTitle }}</h2>
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
              <Tab
                :tab-data="tabData"
                @update="changeTab"
              >
                <template #tab1>Tab1</template>
                <template #tab2>
                  1. 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
                  2. 남산 위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
                  3. 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
                  4. 이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
                </template>
              </Tab>
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;Tab
    :tab-data=&quot;tabData&quot;
    @update=&quot;changeTab&quot;
  &gt;
    &lt;template #tab1&gt;Tab1&lt;/template&gt;
    &lt;template #tab2&gt;
      1. 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
      2. 남산 위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
      3. 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
      4. 이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
    &lt;/template&gt;
  &lt;/Tab&gt;
&lt;/template&gt;

&lt;script&gt;
  import Tab from '@/components/Tab.vue'

  const tabData: Array&lt;string&gt; = ['Tab01', 'Tab02']
  function changeTab (index: number) {
    console.log('current', index)
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
import { defineComponent, onMounted } from 'vue'
import Header from '@/views/layout/Header.vue'
import GuideNav from '@/views/layout/GuideNav.vue'
import { useRoute } from 'vue-router'
import Tab from '@/components/Tab.vue'

export default defineComponent({
  name: 'libsTab',
  components: {
    Header,
    GuideNav,
    Tab
  },
  setup () {
    const route = useRoute()
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      Prism.highlightAll()
    })

    const tabData: Array<string> = ['Tab01', 'Tab02']
    function changeTab (index: number) {
      console.log('current', index)
    }
    return {
      pageTitle,
      tabData,
      changeTab
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
