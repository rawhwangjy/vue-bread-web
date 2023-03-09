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
                <th scope="row">Class</th>
                <td>
                  <span class="type-string">String</span>
                  class="radio-button-type"
                </td>
                <td class="td-center"></td>
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
          <h3>Basic <span>checked : {{ defaultRadio }}</span></h3>
          <div class="example">
            <ul>
              <li>
                <Radio
                  v-model="defaultRadio"
                  label="default"
                  value="default"
                  name="currentDefault"
                  @change="changeEvent"
                />
              </li>
              <li>
                <Radio
                  v-model="defaultRadio"
                  label="checked"
                  value="checked"
                  checked
                  name="currentDefault"
                  @change="changeEvent"
                />
              </li>
              <li>
                <Radio
                  v-model="defaultRadio"
                  label="disabled"
                  value="disabled"
                  disabled
                  name="currentDefault"
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
  &lt;Radio
    v-model=&quot;defaultRadio&quot;
    label=&quot;default&quot;
    value=&quot;default&quot;
    name=&quot;currentDefault&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
  &lt;!-- checked --&gt;
  &lt;Radio
    v-model=&quot;defaultRadio&quot;
    label=&quot;checked&quot;
    value=&quot;checked&quot;
    checked
    name=&quot;currentDefault&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
  &lt;!-- disabled --&gt;
  &lt;Radio
    v-model=&quot;defaultRadio&quot;
    label=&quot;disabled&quot;
    value=&quot;disabled&quot;
    disabled
    name=&quot;currentDefault&quot;
    @change=&quot;changeEvent&quot;
  /&gt;
&lt;/template&gt;

&lt;script&gt;
  import Radio from '@/components/Radio.vue'

  const state = reactive({
    defaultRadio: ''
  })
  function changeEvent (value : string) {
    console.log('checked', value)
  }
&lt;/script&gt;
  </code>
</pre>
          </div>
        </div><!-- // .lib-box -->
        <div class="lib-box">
          <h3>Button <span>checked : {{ defaultRadio2 }}</span></h3>
          <div class="example">
            <div class="radio-button-type">
              <ul>
                <li>
                  <Radio
                    v-model="defaultRadio2"
                    label="name1"
                    value="name1"
                    name="currentDefault"
                    @change="changeEvent"
                  />
                </li>
                <li>
                  <Radio
                    v-model="defaultRadio2"
                    label="name2"
                    value="name2"
                    name="currentDefault"
                    @change="changeEvent"
                  />
                </li>
                <li>
                  <Radio
                    v-model="defaultRadio2"
                    label="name3"
                    value="name3"
                    name="currentDefault"
                    @change="changeEvent"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div class="code">
<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;div class=&quot;radio-button-type&quot;&gt;
    &lt;ul&gt;
      &lt;li&gt;
        &lt;Radio
          v-model=&quot;defaultRadio2&quot;
          label=&quot;name1&quot;
          value=&quot;name1&quot;
          name=&quot;currentDefault&quot;
          @change=&quot;changeEvent&quot;
        /&gt;
      &lt;/li&gt;
      &lt;li&gt;
        &lt;Radio
          v-model=&quot;defaultRadio2&quot;
          label=&quot;name2&quot;
          value=&quot;name2&quot;
          name=&quot;currentDefault&quot;
          @change=&quot;changeEvent&quot;
        /&gt;
      &lt;/li&gt;
      &lt;li&gt;
        &lt;Radio
          v-model=&quot;defaultRadio2&quot;
          label=&quot;name3&quot;
          value=&quot;name3&quot;
          name=&quot;currentDefault&quot;
          @change=&quot;changeEvent&quot;
        /&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import Radio from '@/components/Radio.vue'

  const state = reactive({
    defaultRadio2: ''
  })
  function changeEvent (value : string) {
    console.log('checked', value)
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
import { useRoute } from 'vue-router'
import Radio from '@/components/Radio.vue'

export default defineComponent({
  name: 'libsRadio',
  components: {
    Radio
  },
  setup () {
    const route = useRoute()
    const pageTitle = route.path.replace(/^.*\//, '')

    onMounted(() => {
      Prism.highlightAll()
    })

    const state = reactive({
      defaultRadio: '',
      defaultRadio2: ''
    })
    function changeEvent (value : string) {
      console.log('checked', value)
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
