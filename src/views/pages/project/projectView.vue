<template>
  <div class="project-wrap">
    <div class="project-title">
      <h3>{{ projectDetail.title }}</h3>
    </div>
      <Swiper
        :options="options"
        @slide-change="changeSwiper"
      >
      <!-- <template
        v-for="(item, index) in projectDetail.fileList.mobile"
        :key="`ss${index}`"
        v-slot:[`slide${index}`]
      >
        <span
          :key="`projectImg${index}`"
          class="img-area"
        >
          <img :src="`${item}`" />
        </span>
      </template> -->
    </Swiper>
    <div class="project-btns side">
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
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import { ReqProjectDetailInterface, ResProjectDetailInterface } from '@/service/project/interface/projectDetail.interface'
import Swiper from '@/components/Swiper.vue'

export default defineComponent({
  name: 'projectView',
  components: {
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
      date: {
        startDate: {
          year: 0,
          month: 0
        },
        endDate: {
          year: 0,
          month: 0
        }
      },
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
      console.log('!!', projectDetail.value.fileList)
      // fileList 가공 후 재할당
      // if (result[0].fileList.mobile !== '') {
      //   const target = result[0].fileList.mobile.split(',')
      //   projectDetail.value.fileList.mobile = []
      //   for (let i = 0; i < target.length; i++) {
      //     const targetUrl = `http://127.0.0.1:8001/upload/${target[i]}`
      //     projectDetail.value.fileList.mobile.push(targetUrl)
      //   }
      // }
      // if (result[0].fileList.pc !== '') {
      //   const target = result[0].fileList.pc.split(',')
      //   projectDetail.value.fileList.pc = []
      //   for (let i = 0; i < target.length; i++) {
      //     const targetUrl = `http://127.0.0.1:8001/upload/${target[i]}`
      //     projectDetail.value.fileList.pc.push(targetUrl)
      //   }
      // }

      // fileList 가공 후 재할당
      // if (result[0].fileList !== '') {
      //   const target = result[0].fileList.split(',')
      //   projectDetail.value.fileList = []
      //   for (let i = 0; i < target.length; i++) {
      //     const targetUrl = `http://127.0.0.1:8001/upload/${target[i]}`
      //     projectDetail.value.fileList.push(targetUrl)
      //   }
      // }
      console.log('ddd', result)
    }

    function back () {
      router.push({
        path: '/project'
      })
    }

    onMounted(() => {
      getProjectDetail()
    })
    const options = reactive({
      pagination: 'dot',
      navigation: true
    })
    function changeSwiper (index: number) {
      console.log('current', index)
    }

    return {
      route,
      projectDetail,
      back,
      options,
      changeSwiper
    }
  }
})
</script>
