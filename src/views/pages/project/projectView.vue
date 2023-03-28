<template>
  <Header />
  <div class="content-body project" id="content-body">
      <!-- <div class="project-title">
        {{ projectDetail }}
        <h3 class="main-title">{{ projectDetail.title }}</h3>
      </div> -->
      <div class="content-area">
        <table
          v-if="windowWidth > 767"
          class="table-view"
        >
          <colgroup>
            <col style="width: 10%">
            <col style="width: 10%">
            <col style="width: 10%">
            <col style="width: 10%">
            <col style="width: 10%">
            <col style="width: 10%">
            <col style="width: 10%">
            <col style="width: 10%">
            <col style="width: 10%">
            <col style="width: 10%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">프로젝트명</th>
              <td colspan="5">{{ projectDetail.title }}</td>
              <th scope="row">투입일</th>
              <td class="txt-center">{{ projectDetail.startYear }}.{{ projectDetail.startMonth < 10 ? `0${projectDetail.startMonth}` : projectDetail.startMonth }}</td>
              <th scope="row">종료일</th>
              <td class="txt-center">{{ projectDetail.endYear }}.{{ projectDetail.endMonth < 10 ? `0${projectDetail.endMonth}` : projectDetail.endMonth }}</td>
            </tr>
            <tr>
              <th scope="row">담당 역할</th>
              <td colspan="3">{{ projectDetail.role }}</td>
              <th scope="row">소속회사</th>
              <td colspan="2">{{ projectDetail.company }}</td>
              <th scope="row">발주처</th>
              <td colspan="2">{{ projectDetail.orderCompany }}</td>
            </tr>
            <tr>
              <th scope="row">프로젝트<br>내용</th>
              <td colspan="9">{{ projectDetail.introduce }}</td>
            </tr>
            <tr>
              <th scope="row">주요 업무</th>
              <td colspan="9">
                <ul class="jobs">
                  <li
                    v-for="(item, index) in projectDetail.jobs"
                    :key="`jobs${index}`"
                  >
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">프로젝트<br>타입</th>
              <td colspan="9">
                <span class="types">
                  <span v-if="projectDetail.typePc">PC</span>
                  <span v-if="projectDetail.typeMobile">모바일</span>
                </span>
              </td>
            </tr>
            <tr v-if="tabData.length !== 0">
              <td colspan="10">
                <Tab :tab-data="tabData">
                  <template v-if="projectDetail.fileListMobile.length !== 0" #tab1>
                    <Swiper
                      v-if="projectDetail.fileListMobile.length !== 0"
                      :options="options"
                      @slide-change="changeSwiper"
                    >
                      <template
                        v-for="(item, index) in projectDetail.fileListMobile"
                        :key="`mobileImg${index}`"
                        #[`slide${index+1}`]
                      >
                        <span
                          class="img-area"
                        >
                          <img :src="`${item}`" />
                        </span>
                      </template>
                    </Swiper>
                  </template>
                  <template v-if="projectDetail.fileListPc.length !== 0" #tab2>
                  <Swiper
                    v-if="projectDetail.fileListPc.length !== 0"
                    :options="options"
                    @slide-change="changeSwiper"
                  >
                    <template
                      v-for="(item, index) in projectDetail.fileListPc"
                      :key="`pcImg${index}`"
                      #[`slide${index+1}`]
                    >
                      <span
                        class="img-area"
                      >
                        <img :src="`${item}`" />
                      </span>
                    </template>
                  </Swiper>
                  </template>
                </Tab>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          v-else
          class="table-view"
        >
          <colgroup>
            <col style="width: 20%">
            <col style="width: 30%">
            <col style="width: 20%">
            <col style="width: 30%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">프로젝트명</th>
              <td colspan="3">{{ projectDetail.title }}</td>
            </tr>
            <tr>
              <th scope="row">투입일</th>
              <td class="txt-center">{{ projectDetail.startYear }}.{{ projectDetail.startMonth }}</td>
              <th scope="row">종료일</th>
              <td class="txt-center">{{ projectDetail.endYear }}.{{ projectDetail.endMonth }}</td>
            </tr>
            <tr>
              <th scope="row">담당 역할</th>
              <td colspan="3">{{ projectDetail.role }}</td>
            </tr>
            <tr>
              <th scope="row">소속회사</th>
              <td>{{ projectDetail.company }}</td>
              <th scope="row">발주처</th>
              <td>{{ projectDetail.orderCompany }}</td>
            </tr>
            <tr>
              <th scope="row">프로젝트<br>내용</th>
              <td colspan="3">{{ projectDetail.introduce }}</td>
            </tr>
            <tr>
              <th scope="row">주요 업무</th>
              <td colspan="9">
                <ul class="jobs">
                  <li
                    v-for="(item, index) in projectDetail.jobs"
                    :key="`jobs${index}`"
                  >
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">프로젝트<br>타입</th>
              <td colspan="3">
                <span class="types">
                  <span v-if="projectDetail.typePc">PC</span>
                  <span v-if="projectDetail.typeMobile">모바일</span>
                </span>
              </td>
            </tr>
            <tr v-if="tabData.length !== 0">
              <td colspan="4">
                <Tab :tab-data="tabData">
                  <template v-if="projectDetail.fileListMobile.length !== 0" #tab1>
                    <Swiper
                      v-if="projectDetail.fileListMobile.length !== 0"
                      :options="options"
                      @slide-change="changeSwiper"
                    >
                      <template
                        v-for="(item, index) in projectDetail.fileListMobile"
                        :key="`ss${index}`"
                        #[`slide${index+1}`]
                      >
                        <span
                          class="img-area"
                        >
                          <img :src="`${item}`" />
                        </span>
                      </template>
                    </Swiper>
                  </template>
                  <template v-if="projectDetail.fileListPc.length !== 0" #tab2>
                  <Swiper
                    v-if="projectDetail.fileListPc.length !== 0"
                    :options="options"
                    @slide-change="changeSwiper"
                  >
                    <template
                      v-for="(item, index) in projectDetail.fileListPc"
                      :key="`ss${index}`"
                      #[`slide${index+1}`]
                    >
                      <span
                        class="img-area"
                      >
                        <img :src="`${item}`" />
                      </span>
                    </template>
                  </Swiper>
                  </template>
                </Tab>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="footer-area side">
        <button class="btn lg light" @click="back">목록</button>
        <!-- <button class="btn lg dark" @click="projectUpdate">수정</button> -->
      </div>
      <!-- <div class="btn-wrap">
        <button type="button" @click="goToUpdate(project.id)">수정</button>
        <button type="button" @click="requestApiHttpDelProject(project)">삭제</button>
      </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, nextTick } from 'vue'
import Header from '@/views/layout/Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import { ReqProjectDetailInterface, ResProjectDetailInterface } from '@/service/project/interface/projectDetail.interface'
import Swiper from '@/components/Swiper.vue'
import Tab from '@/components/Tab.vue'
import { API_URL } from '@/utils/common.constants'

export default defineComponent({
  name: 'projectView',
  components: {
    Header,
    Tab,
    Swiper
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const projectStore = useProjectStore()

    // init data
    const tabData = ref<string[]>([])
    const projectDetail = ref<ResProjectDetailInterface>({
      id: 0,
      title: '',
      introduce: '',
      role: '',
      company: '',
      orderCompany: '',
      jobs: [],
      typeMobile: false,
      typePc: false,
      startYear: 0,
      startMonth: 0,
      endYear: 0,
      endMonth: 0,
      fileListMobile: [],
      fileListPc: [],
      skills: {
        html4: false,
        html5: false,
        css2: false,
        css3: false,
        sass: false,
        photoshop: false,
        sketch: false,
        zeplin: false,
        javascript: false,
        typescript: false,
        vue2: false,
        vue3: false,
        jquery: false,
        git: false,
        eclipse: false,
        node: false,
        npm: false
      }
    })

    // api
    async function getProjectDetail () {
      const targetProject: ReqProjectDetailInterface = {
        id: Number(route.params.id)
      }
      const result = await projectStore.actionHttpGetProject(targetProject)
      projectDetail.value = result[0]
      projectDetail.value.jobs = JSON.parse(result[0].jobs)
      console.log('결과', result[0])

      // fileList 가공 후 재할당
      if (result[0].fileListMobile) {
        tabData.value.push('모바일')
        const target = result[0].fileListMobile.split(',')
        projectDetail.value.fileListMobile = []
        for (let i = 0; i < target.length; i++) {
          const targetUrl = `${API_URL}/views/upload/${target[i]}`
          projectDetail.value.fileListMobile.push(targetUrl)
        }
      }
      // if (result[0].fileListPc !== '') {
      //   const target = result[0].fileListPc.split(',')
      //   for (let i = 0; i < target.length; i++) {
      //     const targetUrl = `${API_URL}/views/upload/${target[i]}`
      //     projectDetail.value.fileList.pc.push(targetUrl)
      //   }
      // }
      // console.log('fileList.mobile', projectDetail.value.fileListMobile)
      // console.log('fileList.pc', projectDetail.value.value.fileListPc)
      if (result[0].fileListPc) {
        tabData.value.push('PC')
        const target = result[0].fileListPc.split(',')
        projectDetail.value.fileListPc = []
        for (let i = 0; i < target.length; i++) {
          const targetUrl = `${API_URL}/views/upload/${target[i]}`
          projectDetail.value.fileListPc.push(targetUrl)
        }
      }
    }

    function back () {
      router.push({
        path: '/project'
      })
    }

    // 화면 사이즈 체크
    const windowWidth = ref(window.innerWidth)
    function checkSize () {
      // console.log('사이즈', windowWidth)
      window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
      })
    }
    onMounted(() => {
      checkSize()
      getProjectDetail()
      // nextTick(() => {
      //   if (projectDetail.value.fileListMobile) {
      //     tabData.value.push('모바일')
      //   } else if (projectDetail.value.fileListPc) {
      //     tabData.value.push('PC')
      //   }
      // })
      console.log('onMounted tabData', tabData.value)
    })
    // watch(
    //   () => tabData.value,
    //   bindData => {
    //     // if (projectDetail.value.fileListMobile) {
    //     //   tabData.value.push('모바일')
    //     // } else if (projectDetail.value.fileListPc) {
    //     //   tabData.value.push('PC')
    //     // }
    //     console.log('watch tabData', tabData.value)
    //     console.log('watch bindData', bindData)
    //   }
    // )
    const options = reactive({
      pagination: 'dot',
      navigation: true
    })
    function changeSwiper (index: number) {
      console.log('current', index)
    }
    function onTouch () {
      console.log('ddd')
    }

    return {
      route,
      projectDetail,
      windowWidth,
      back,
      tabData,
      options,
      changeSwiper,
      onTouch
    }
  }
})
</script>
