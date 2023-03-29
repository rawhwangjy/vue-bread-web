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
          <h3>Basic <span>default : {{ defaultCheckbox }} / checked : {{ defaultChecked }} / disabled : {{ defaultDisabeld }}</span></h3>
          <div class="example">
            <ul>
              <li>
                <Checkbox
                  v-model="defaultCheckbox"
                  label="default"
                  value="default"
                  name="currentDefault"
                  @change="changeEvent"
                />
              </li>
              <li>
                <Checkbox
                  v-model="defaultChecked"
                  label="checked"
                  value="checked"
                  checked
                  name="currentChecked"
                  @change="changeEvent"
                />
              </li>
              <li>
                <Checkbox
                  v-model="defaultDisabeld"
                  label="disabled"
                  value="disabled"
                  disabled
                  name="currentDisabled"
                  @change="changeEvent"
                />
              </li>
            </ul>
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;!-- default --&gt;
  &lt;Checkbox
    v-model=&quot;defaultCheckbox&quot;
    label=&quot;default&quot;
    value=&quot;default&quot;
    name=&quot;currentDefault&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
  &lt;!-- checked --&gt;
  &lt;Checkbox
    v-model=&quot;defaultChecked&quot;
    label=&quot;checked&quot;
    value=&quot;checked&quot;
    checked
    name=&quot;currentChecked&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
  &lt;!-- disabled --&gt;
  &lt;Checkbox
    v-model=&quot;defaultDisabeld&quot;
    label=&quot;disabled&quot;
    value=&quot;disabled&quot;
    disabled
    name=&quot;currentDisabled&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
&lt;/template&gt;

&lt;script&gt;
  const state = reactive({
    defaultCheckbox: false,
    defaultChecked: true,
    defaultDisabeld: false
  })
&lt;/script&gt;
  </code>
</pre>
          </div>
        </div><!-- // .lib-box -->
        <div class="lib-box">
          <h3>Array <span>checked : {{ arrayCheckbox }}</span></h3>
          <div class="example">
            <ul>
              <li>
                <Checkbox
                  v-model="arrayCheckbox"
                  label="name1"
                  value="name1"
                  name="arrayCheckbox"
                  @change="changeEvent"
                />
              </li>
              <li>
                <Checkbox
                  v-model="arrayCheckbox"
                  label="name2"
                  value="name2"
                  name="arrayCheckbox"
                  @change="changeEvent"
                />
              </li>
              <li>
                <Checkbox
                  v-model="arrayCheckbox"
                  label="name3"
                  value="name3"
                  name="arrayCheckbox"
                  @change="changeEvent"
                />
              </li>
            </ul>
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;Checkbox
    v-model=&quot;arrayCheckbox&quot;
    label=&quot;name1&quot;
    value=&quot;name1&quot;
    name=&quot;arrayCheckbox&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
  &lt;Checkbox
    v-model=&quot;arrayCheckbox&quot;
    label=&quot;name2&quot;
    value=&quot;name2&quot;
    name=&quot;arrayCheckbox&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
  &lt;Checkbox
    v-model=&quot;arrayCheckbox&quot;
    label=&quot;name3&quot;
    value=&quot;name3&quot;
    name=&quot;arrayCheckbox&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
&lt;/template&gt;

&lt;script&gt;
  import Checkbox from '@/components/Checkbox.vue'

  const state = reactive({
    arrayCheckbox: []
  })
  function changeEvent (value : boolean | []) {
    // console.log('checked', value)
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
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import Header from '@/views/layout/Header.vue'
import GuideNav from '@/views/layout/GuideNav.vue'
import { useRoute } from 'vue-router'
import Checkbox from '@/components/Checkbox.vue'

export default defineComponent({
  name: 'libsCheckbox',
  components: {
    Header,
    GuideNav,
    Checkbox
  },
  setup () {
    const route = useRoute()
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      Prism.highlightAll()
    })

    const state = reactive({
      defaultCheckbox: false,
      defaultChecked: true,
      defaultDisabeld: false,
      arrayCheckbox: []
    })
    function changeEvent (value : boolean | []) {
      // console.log('checked', value)
    }
    return {
      pageTitle,
      ...toRefs(state),
      changeEvent
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
