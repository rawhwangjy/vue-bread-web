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
              <span class="types-badge">
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
      <Pagination
        v-if="originProjectList.length !== 0"
        :total-data-length="originProjectList.length"
        :data-per-page="windowWidth >= 768 ? 6 : 2"
        @update="onPageMove"
      />
    </div>
    <div class="footer-area right">
      <button @click="projectCreate" class="btn lg dark">글쓰기</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUpdated } from 'vue'
import Header from '@/views/layout/Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import { ResProjectListInterface } from '@/service/project/interface/projectList.interface'
import { cloneDeep } from 'lodash'
import Pagination from '@/components/Pagination.vue'
import { LocalKey } from '@/utils/common.constants'

export default defineComponent({
  name: 'projectList',
  components: {
    Header,
    Pagination
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
    const originProjectList = ref<ResProjectListInterface[]>([])
    const projectList = ref<ResProjectListInterface[]>([])
    // api
    async function getProjectList () {
      originProjectList.value = await projectStore.actionHttpGetProjectList()
      originProjectList.value.sort((a: ResProjectListInterface, b: ResProjectListInterface): number => {
        return b.id - a.id
      })
      projectList.value = cloneDeep(originProjectList.value).splice(0, 4)
      // projectList.value.filter(item => {
      //   return item.id === 1 ? item.focus() : // console.log('NO')
      // })
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
      // console.log('projects')
      getProjectList()
      checkSize()
    })
    const currentPage = ref(1)
    const currentProject = ref(1)
    // onMounted(() => {
    //   // console.log('projects', Number(localStorage.getItem(LocalKey.lastProjectOffsetY)))
    //   getProjectList()
    //   if (localStorage.getItem(LocalKey.lastProjectOffsetY) !== 'lastProjectOffsetY') {
    //     // console.log('움직여라')
    //     // window.scrollBy({ top: Number(localStorage.getItem(LocalKey.lastProjectOffsetY)) })
    //     window.scrollTo({ top: Number(localStorage.getItem(LocalKey.lastProjectOffsetY)) })
    //   }
    // })
    function getProjectDetail (targetId: number) {
      const id = targetId
      router.push({
        path: `/project/${id}`
      })
      // const _event = event as PointerEvent
      // // console.log('evvvet', _event.screenY)
      // localStorage.setItem(LocalKey.lastProjectOffsetY, String(_event.screenY))
    }
    function onPageMove (targetPage: number, startOffset: number, endOffset: number) {
      projectList.value = cloneDeep(originProjectList.value).slice(startOffset, endOffset) // 마지막 처리
      // // console.log('clicked page startOffset', startOffset)
      // // console.log('clicked page endOffset', endOffset)
      currentPage.value = targetPage
      localStorage.setItem(LocalKey.lastPageNum, String(currentPage.value))
    }

    return {
      windowWidth,
      projectCreate,
      originProjectList,
      projectList,
      getProjectDetail,
      onPageMove
    }
  }
})
</script>
