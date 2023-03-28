<template>
  <Header />
  <div class="content-body project" id="content-body">
    <div class="title-area">
      <h3 class="main-title">프로젝트</h3>
    </div>
    <div class="content-area">
      <div class="project-list">
        <div
          v-for="(project, index) in projectList"
          :key="`project${index}`"
          class="project-wrap"
        >
          <button
            type="button"
            @click="getProjectDetail(project.id)"
          >
            <div class="project-title">
              <h4>{{ project.title }}</h4>
              <span class="types">
                <span v-if="project.typePc" class="pc">PC</span>
                <span v-if="project.typeMobile" class="mobile">모바일</span>
              </span>
            </div>
            <div class="date-area">
              <span class="date">
                <span aria-label="시작년도">{{ project.startYear }}.</span>
                <span aria-label="시작월">{{ project.startMonth < 10 ? `0${project.startMonth}` : project.startMonth }}</span>
              </span> ~
              <span class="date">
                <span aria-label="종료년도">{{ project.endYear }}.</span>
                <span aria-label="종료월">{{ project.endMonth < 10 ? `0${project.endMonth}` : project.endMonth }}</span>
              </span>
            </div>
            <span class="introduce">{{ project.introduce }}</span>
            <div class="companies">
              <span>소속 : <strong>{{ project.company }}</strong></span>
              <span>발주사 : <strong>{{ project.orderCompany }}</strong></span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="footer-area right">
      <button @click="projectCreate" class="btn lg dark">글쓰기</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Header from '@/views/layout/Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import { ResProjectListInterface } from '@/service/project/interface/projectList.interface'

export default defineComponent({
  name: 'projectList',
  components: {
    Header
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const projectStore = useProjectStore()

    // init data

    function projectCreate () {
      router.push({
        path: '/project/create'
      })
    }

    // init data
    const currentCategory = route.params.category
    const projectList = ref<ResProjectListInterface[]>([])
    // api
    async function getProjectList () {
      projectList.value = await projectStore.actionHttpGetProjectList()
      console.log('projectList', projectList.value)
      // projectList.value.sort((a: number, b: number) => {
      //   return a.id - b.id
      // })
    }

    onMounted(() => {
      console.log('projects')
      getProjectList()
    })
    function getProjectDetail (targetId: number) {
      const id = targetId
      router.push({
        path: `/project/${id}`
      })
    }

    return {
      projectCreate,
      projectList,
      getProjectDetail
    }
  }
})
</script>
