<template>
  <div class="project-wrap">
    <section class="main-section" id="scrollSection2" ref="mainSection">
      <h2 class="sr-only">Lorem Ipsum</h2>
      <div class="sticky-element" ref="scrollX">
        <slot v-for="(project, index) in projectList" :key="`project${index}`">
          <a
            href="javascript:;"
            class="board-title"
            @click="getProjectDetail(project.id)"
          >
            <project :data="project" />
          </a>
        </slot>
        <!-- <ul class="project-list">
          <li
            v-for="(project, index) in projects"
            :key="`project${index}`"
            @mouseover="focusIn"
            @mouseout="focusOut"
          >
            <button type="button" class="btn-project" @click="openModal(project)">
              <project :item="project" />
            </button>
          </li>
        </ul> -->
      </div>
    </section>
    <button @click="projectCreate" class="btn lg dark btn-project-create">글쓰기</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import project from '@/views/pages/project/components/project.vue'
import { ResProjectListInterface } from '@/service/project/interface/projectList.interface'

interface SceneObject {
  objs?: {
    [key: string]: HTMLElement | null
  }
}
interface SceneInfo extends SceneObject {
  id: number
  // type: string
  heightNum: number
  scrollHeight: number
  // values?: {
  //     [key: string]: [number, number, {start: number, end: number}]
  // }
  values?: {
    [key: string]: [number, number, {start: number, end: number}]
  }
}
export default defineComponent({
  name: 'projectList',
  components: {
    project
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const projectStore = useProjectStore()

    // init data

    function projectCreate () {
      router.push({
        path: '/project/register'
      })
    }
    /**
 * Set Layout
 * @returns {void}
 */
    function setLayout (target: SceneInfo): void {
      target.scrollHeight = target.heightNum * window.innerHeight
      if (target.objs?.container) {
        const objs = target.objs.container
        objs.style.minHeight = `${target.scrollHeight}px`
      }
      document.body.id = `showScene${target.id}`
    }

    /**
 * Calculate Current Scroll Locate
 * @returns {void}
 */
    function calcValues (target: SceneInfo, values: [number, number, {start: number, end: number}], currentYOffset: number): number {
      let returnValue = 0
      const scrollHeight = target.scrollHeight
      const scrollRatio = currentYOffset / scrollHeight
      if (values.length === 3) {
        const partScrollStart = values[2].start * scrollHeight
        const partScrollEnd = values[2].end * scrollHeight
        const partScrollHeight = partScrollEnd - partScrollStart
        if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
          returnValue = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]
        } else if (currentYOffset < partScrollStart) {
          returnValue = values[0]
        } else if (currentYOffset > partScrollEnd) {
          returnValue = values[1]
        }
      } else {
        returnValue = scrollRatio * (values[1] - values[0]) + values[0]
      }
      return returnValue
    }
    // const projects: ProjectItem[] = projectsData
    const modalValue = ref<boolean>(false)
    const projectData = ref<object>({})
    const sceneInfo: SceneInfo = {
      id: 2,
      heightNum: 8,
      scrollHeight: 0,
      values: {
        listOpacityIn: [0, 1, { start: 0.05, end: 0.1 }],
        listTranslateIn: [20, -50, { start: 0.05, end: 0.2 }]
      }
    }

    const mainSection = ref<HTMLElement | null>(null)
    const scrollX = ref<HTMLElement | null>(null)

    const yOffset = ref<number>(0)
    function playAnimation (): void {
      const objs = sceneInfo.objs
      const values = sceneInfo.values
      const currentYOffset = yOffset.value
      const scrollHeight = sceneInfo.scrollHeight
      const scrollRatio = currentYOffset / scrollHeight

      if (objs && values) {
        const listOpacityIn = calcValues(sceneInfo, values?.listOpacityIn, currentYOffset)
        const yRatio = currentYOffset / (scrollHeight - window.innerHeight)
        if (scrollRatio <= 1) {
          if (scrollX.value) {
            const xLeft = (scrollX?.value?.scrollWidth - scrollX?.value?.clientWidth) * yRatio
            if (scrollRatio <= 1) {
              scrollX.value.setAttribute('style', `opacity: ${listOpacityIn}; transform: translate3d(-${xLeft}px, -50%, 0)`)
            }
          }
        }
      }
    }
    // function openModal (project: any) {
    //   modalValue.value = true
    //   projectData.value = project
    //   document.body.style.overflowY = 'hidden'
    // }
    // function closeModal () {
    //   modalValue.value = false
    //   document.body.style.overflowY = 'initial'
    // }
    // function focusIn (event: { target: HTMLElement }) {
    //   if (window.innerWidth > 1024) {
    //     const target = event.target?.closest('li') as HTMLElement
    //     target.style.transform = 'translate3d(0, -20px, 0)'
    //     target.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)'
    //     target.style.transition = 'transform .3s ease-in'
    //   }
    // }
    // function focusOut (event: { target: HTMLElement }) {
    //   if (window.innerWidth > 1024) {
    //     const target = event.target?.closest('li') as HTMLElement
    //     target.style.transform = 'translate3d(0, 0, 0)'
    //     target.style.boxShadow = 'none'
    //     target.style.transition = 'transform .3s ease-out'
    //   }
    // }

    // init data
    const currentCategory = route.params.category
    const projectList = ref<ResProjectListInterface[]>([])
    // api
    async function getProjectList () {
      projectList.value = await projectStore.actionHttpGetProjectList()
    }

    onMounted(() => {
      console.log('projects')
      const refHTML: SceneObject = {
        objs: {
          container: mainSection.value,
          scrollX: scrollX.value
        }
      }
      getProjectList()
      Object.assign(sceneInfo, refHTML)
      // 페이지마다 resize를 걸면, 겹칠 수 있다.
      setLayout(sceneInfo)
      window.addEventListener('resize', () => {
        setLayout(sceneInfo)
        console.log('projects')
      })
      window.addEventListener('scroll', () => {
        yOffset.value = window.pageYOffset
        playAnimation()
      })
    })
    function getProjectDetail (targetId: number) {
      const id = targetId
      router.push({
        path: `/project/${id}`
      })
    }

    return {
      projectCreate,
      setLayout,
      sceneInfo,
      projectData,
      mainSection,
      scrollX,
      playAnimation,
      calcValues,
      modalValue,
      projectList,
      getProjectDetail
      // openModal,
      // closeModal,
      // focusIn,
      // focusOut
    }
  }
})
</script>
