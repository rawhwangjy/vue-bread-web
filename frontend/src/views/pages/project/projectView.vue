<template>
  <div class="project-wrap">
    <div class="project-title">
      <h3>{{ projectDetail.title }}</h3>
    </div>
    <div class="project-content">
      <div class="project-form">
        <div class="form-row">
          {{ projectDetail.introduce }}
        </div>
        <div class="form-row">
          <div class="preview-wrap">
            <div
              v-if="projectDetail.fileList"
              class="img-wrap"
            >
              <span
                v-for="(item, index) in projectDetail.fileList"
                :key="`uploadImg${index}`"
                class="img-area"
              >
                <img :src="`${item}`" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import { ReqProjectDetailInterface, ResProjectDetailInterface } from '@/service/project/interface/projectDetail.interface'

export default defineComponent({
  name: 'projectView',
  components: {
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
      // result[0].agree === 1 ? result[0].agree = true : result[0].agree = false
      projectDetail.value = result[0]

      // fileList 가공 후 재할당
      // if (result[0].fileList !== '') {
      //   const target = result[0].fileList.split(',')
      //   projectDetail.value.fileList = []
      //   for (let i = 0; i < target.length; i++) {
      //     const targetUrl = `http://127.0.0.1:3000/upload/${target[i]}`
      //     projectDetail.value.fileList.push(targetUrl)
      //   }
      // }
      console.log('ddd', result)
    }

    function back () {
      router.push({
        path: `/project/${currentCategory}`
      })
    }

    onMounted(() => {
      getProjectDetail()
    })

    return {
      route,
      projectDetail,
      back
    }
  }
})
</script>
