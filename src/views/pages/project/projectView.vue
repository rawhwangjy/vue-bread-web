<template>
  <Header />
  <div class="content-body project" id="content-body">
      <div class="project-title">
        <h3 class="main-title">{{ projectDetail.title }}</h3>
      </div>
      <div class="content-area">
        <Swiper
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
        </Swiper>
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
import { defineComponent, onMounted, ref, reactive } from 'vue'
import Header from '@/views/layout/Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import { ReqProjectDetailInterface, ResProjectDetailInterface } from '@/service/project/interface/projectDetail.interface'
import Swiper from '@/components/Swiper.vue'
import { API_URL } from '@/utils/common.constants'

export default defineComponent({
  name: 'projectView',
  components: {
    Header,
    Swiper
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
      projectDetail.value.jobs = JSON.parse(result[0].jobs)
      // projectDetail.value.fileList.mobile = result[0].fileListMobile
      // projectDetail.value.fileList.pc = result[0].fileListPc
      console.log('!!', projectDetail.value)
      // fileList 가공 후 재할당
      if (result[0].fileListMobile !== '' && projectDetail.value.fileList.mobile !== null) {
        const target = result[0].fileListMobile.split(',')
        for (let i = 0; i < target.length; i++) {
          const targetUrl = `${API_URL}/views/upload/${target[i]}`
          projectDetail.value.fileList.mobile = []
          projectDetail.value.fileList.mobile.push(targetUrl)
        }
      }
      if (result[0].fileListPc !== '') {
        const target = result[0].fileListPc.split(',')
        projectDetail.value.fileList.pc = []
        for (let i = 0; i < target.length; i++) {
          const targetUrl = `${API_URL}/views/upload/${target[i]}`
          projectDetail.value.fileList.pc.push(targetUrl)
        }
      }
      // console.log('fileList.mobile', projectDetail.value.fileListMobile)
      // console.log('fileList.pc', projectDetail.value.fileListPc)
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
