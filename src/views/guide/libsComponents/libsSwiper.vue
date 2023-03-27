<template>
  <Header />
  <div class="guide-body">
    <GuideNav />
    <div class="guide-content">
      <h2 class="guide-title">{{ pageTitle }}</h2>
      <div class="box">
        <div class="api-box">
          <h3>공통 API</h3>
          <div class="scroll-wrap">
            <table class="api-table">
              <colgroup>
                <col class="width15" >
                <col class="width15" >
                <col class="width20" />
                <col class="widthAll" />
                <col class="width20" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">Required</th>
                  <th scope="col" colspan="2">Options</th>
                  <th scope="col">Params</th>
                  <th scope="col">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <em class="icon-required">선택</em>
                  </td>
                  <th scope="row" colspan="2">direction</th>
                  <td>
                    <span class="type-string">String</span>
                    'horizontal' | 'vertical'
                  </td>
                  <td class="td-center">horizontal</td>
                </tr>
                <tr>
                  <td>
                    <em class="icon-required">선택</em>
                  </td>
                  <th scope="row" colspan="2">pagination</th>
                  <td>
                    <span class="type-string">String</span>
                    'dot' | 'bar' | 'custom class' | boolean
                  </td>
                  <td class="td-center">'dot'</td>
                </tr>
                <tr>
                  <td>
                    <em class="icon-required">선택</em>
                  </td>
                  <th scope="row" colspan="2">navigation</th>
                  <td>
                    <span class="type-boolean">Boolean</span>
                    <span class="type-string">String</span>
                    'custom class'
                  </td>
                  <td class="td-center">false</td>
                </tr>
                <tr>
                  <td>
                    <em class="icon-required">선택</em>
                  </td>
                  <th scope="row" rowspan="2">tab</th>
                  <th scope="row">data</th>
                  <td>
                      <span class="type-object">Array</span>
                  </td>
                  <td class="td-center">[]</td>
                </tr>
                <tr>
                  <td>
                    <em class="icon-required">선택</em>
                  </td>
                  <th scope="row">customClass</th>
                  <td>
                    <span class="type-string">String</span>
                  </td>
                  <td class="td-center"></td>
                </tr>
                <tr>
                  <td>
                    <em class="icon-required">선택</em>
                  </td>
                  <th scope="row" rowspan="2">autoplay</th>
                  <th scope="row">default</th>
                  <td>
                      <span class="type-boolean">Boolean</span>
                  </td>
                  <td class="td-center">
                    false<br>
                    (true => 1500)
                  </td>
                </tr>
                <tr>
                  <td>
                    <em class="icon-required">선택</em>
                  </td>
                  <th scope="row">delay</th>
                  <td>
                    <span class="type-object">AutoplayOptions</span>
                    <span class="type-number">- Number</span>
                  </td>
                  <td class="td-center">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div><!-- // .api-box -->
        <div class="lib-box">
          <h3>Basic</h3>
          <div class="example">
            <Swiper
              :options="options"
              @update="changeSwiper"
            >
              <template #slide1>
                <button type="button" class="btn sm primary">버튼</button>
              </template>
              <template #slide2>
                slide2222
              </template>
              <template #slide3>
                slide3333
              </template>
              <template #slide4>
                slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444slide4444
              </template>
            </Swiper>
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;Swiper
    :options=&quot;options&quot;
    @slide-change=&quot;changeSwiper&quot;
  &gt;
    &lt;template #slide1&gt;
      slide1
    &lt;/template&gt;
    &lt;template #slide2&gt;
      slide2
    &lt;/template&gt;
    &lt;template #slide3&gt;
      slide3
    &lt;/template&gt;
    &lt;template #slide4&gt;
      slide4
    &lt;/template&gt;
  &lt;/Swiper&gt;
&lt;/template&gt;

&lt;script&gt;
  import Swiper from '@/components/Swiper.vue'

  const options = reactive({
    // styled horizontal
    direction: '',

    // pagination true & styled dot
    pagination: '',

    // pagination true & styled dot
    // pagination: true,

    navigation: true,

    // navigation true & add custom class 'fancy'
    // navigation: 'fancy',

    // tab true width 'Untitled' & add custom class 'tab'
    // tab: 'tab',

    // tab true
    // tab: ['AAA', 'BBB', 'CCC'],

    // tab true
    // tab: {
    //   data: ['AAA', 'BBB', 'CCC']
    // },

    // tab true width 'Untitled' & add custom class 'tab'
    // tab: {
    //   customClass: 'tab'
    // },

    tab: {
      data: ['AAA', 'BBB', 'CCC'],
      customClass: 'tt3ab'
    },

    // autoplay true & delay 1500
    // autoply: true

    autoplay: {
      delay: 2000
    }
  })

  function changeSwiper (index: number) {
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
import { defineComponent, onMounted, reactive } from 'vue'
import Header from '@/views/layout/Header.vue'
import GuideNav from '@/views/layout/GuideNav.vue'
import { useRoute } from 'vue-router'
import Swiper from '@/components/Swiper.vue'

export default defineComponent({
  name: 'libsSwiper',
  components: {
    Header,
    GuideNav,
    Swiper
  },
  setup () {
    const route = useRoute()
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      Prism.highlightAll()
    })

    const options = reactive({
      direction: '',
      tab: 'ttab',
      // tab: ['AAA', 'BBB', 'CCC'],
      // tab: {
      //   data: ['AAA', 'BBB', 'CCC']
      // },
      // tab: {
      //   customClass: 't1tab'
      // },
      // tab: {
      //   data: ['AAA', 'BBB', 'CCC'],
      //   customClass: 'tt3ab'
      // },
      // navigation: true,
      navigation: 'do2t',
      pagination: true
      // pagination: 'dot'
      // autoply: true // default : 1500
      // autoplay: {
      //   delay: 2000
      // }
    })
    function changeSwiper (index: number) {
      console.log('current', index)
    }
    return {
      pageTitle,
      options,
      changeSwiper
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
