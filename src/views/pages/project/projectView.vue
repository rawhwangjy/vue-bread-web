<template>
  <Header />
  <div class="content-body project" id="content-body">
      <!-- <div class="project-title">
        {{ projectDetail }}
        <h3 class="main-title">{{ projectDetail.title }}</h3>
      </div> -->
      텍스트로 된 정보는 다 넣기
      <div class="content-area">
        <table class="table-view">
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
              <td class="txt-center">{{ projectDetail.startYear }}.{{ projectDetail.startMonth }}</td>
              <th scope="row">종료일</th>
              <td class="txt-center">{{ projectDetail.endYear }}.{{ projectDetail.endMonth }}</td>
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
                <ul>
                  <li
                    v-for="(item, index) in projectDetail.jobs"
                    :key="`jobs${index}`"
                  >{{ item }}</li>
                </ul>
              </td>
            </tr>
            <!-- <tr>
              <th scope="row">프로젝트 타입</th>
              <td colspan="9">
                <span>{{ projectDetail.typeMobile }}</span>
              </td>
            </tr> -->
          </tbody>
        </table>
        <!-- <Swiper
          v-if="projectDetail.fileList.mobile.length !== 0"
          :options="options"
          @slide-change="changeSwiper"
        >
          <template
            v-for="(item, index) in projectDetail.fileList.mobile"
            :key="`ss${index}`"
            #[`slide${index+1}`]
          >
            <span
              class="img-area"
            >
              <img :src="`${item}`" />
            </span>
          </template>
        </Swiper> -->
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
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue'
import Header from '@/views/layout/Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import { ReqProjectDetailInterface, ResProjectDetailInterface } from '@/service/project/interface/projectDetail.interface'
// import Swiper from '@/components/Swiper.vue'
import { API_URL } from '@/utils/common.constants'

export default defineComponent({
  name: 'projectView',
  components: {
    Header
    // Swiper
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const projectStore = useProjectStore()

    // init data
    const currentCategory = route.params.category
    const projectDetail = ref<ResProjectDetailInterface>({
      id: 0,
      title: '',
      introduce: '',
      role: '',
      company: '',
      orderCompany: '',
      jobs: [],
      type: {
        mobile: false,
        pc: false
      },
      startYear: 0,
      startMonth: 0,
      endYear: 0,
      endMonth: 0,
      fileList: {
        mobile: [],
        pc: []
      },
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
      // projectDetail.value.jobs = JSON.parse(result[0].jobs)
      // console.log('vvv', JSON.parse(result[0].jobs))
      // JSON.parse(result[0].jobs).filter((item: string) => {
      //   return projectDetail.value.jobs.push(item)
      // })

      // projectDetail.value.fileList.mobile = result[0].fileListMobile
      // projectDetail.value.fileList.pc = result[0].fileListPc
      console.log('결과', result[0])
      // console.log('결과 result[0].jobs', JSON.parse(result[0].jobs))
      // if (result[0].fileListMobile !== '') {
      //   console.log('for문', [result[0].fileListMobile])
      // }

      // fileList 가공 후 재할당
      // if (result[0].fileListMobile !== '') {
      //   const target = result[0].fileListMobile
      //   console.log('ㅠㅠㅠtarget', target)
      //   // console.log('ㅠㅠㅠtarget2', JSON.parse(target))
      //   // const target = result[0].fileListMobile.split(',')
      //   for (let i = 0; i < target.length; i++) {
      //     const targetUrl = `${API_URL}/views/upload/${target[i]}`
      //     projectDetail.value.fileList.mobile.push(targetUrl)
      //     console.log('dd', i)
      //   }
      // }
      // if (result[0].fileListPc !== '') {
      //   const target = result[0].fileListPc.split(',')
      //   for (let i = 0; i < target.length; i++) {
      //     const targetUrl = `${API_URL}/views/upload/${target[i]}`
      //     projectDetail.value.fileList.pc.push(targetUrl)
      //   }
      // }
      // console.log('fileList.mobile', projectDetail.value.fileListMobile)
      // console.log('fileList.pc', projectDetail.value.value.fileListPc)
    }

    function back () {
      router.push({
        path: '/project'
      })
    }

    onMounted(() => {
      getProjectDetail()
      // nextTick(() => {
      //   options.pagination = 'dot'
      //   options.navigation = true
      // })
    })
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
      back,
      options,
      changeSwiper,
      onTouch
    }
  }
})
</script>
