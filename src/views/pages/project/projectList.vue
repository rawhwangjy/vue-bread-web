<template>
  <Header />
  <div class="content-body project" id="content-body">
    <div class="title-area">
      <h3 class="main-title">프로젝트</h3>
    </div>
    <div class="content-area">
      <div class="project-list">
        <button
          v-for="(project, index) in projectList"
          :key="`project${index}`"
          type="button"
          class="project-wrap"
          @click="getProjectDetail(project.id)"
        >
          <h4>{{ project.title }}</h4>
          <div class="date-area">
            <span class="date">
              <span aria-label="시작년도">{{ project.startYear }}.</span>
              <span aria-label="시작월">{{ project.startMonth }}</span>
            </span> ~
            <span class="date">
              <span aria-label="종료년도">{{ project.endYear }}.</span>
              <span aria-label="종료월">{{ project.endMonth }}</span>
            </span>
          </div>
        </button>
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
