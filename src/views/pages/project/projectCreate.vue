<template>
  <div class="project-wrap">
    <div class="project-title">
      <h3>프로젝트 등록</h3>
    </div>
    <div class="project-content">
      <div class="project-form">
        <div class="form-row flex">
          <Input
            v-model="projectDetail.title"
            label="프로젝트명"
          />
          <div class="date-wrap">
            <h4>투입 시작일</h4>
            <Datepicker
              v-model="projectDetail.date.startDate"
              :format="dateFormat(projectDetail.date.startDate)"
              month-picker
              uid="date"
              locale="kr"
              select-text="시작일 선택"
              cancel-text="취소"
              @update:modelValue="handleDate('start', $event)"
              :clearable="false"
            />
          </div>
          <div class="date-wrap">
            <h4>투입 종료일</h4>
            <Datepicker
              v-model="projectDetail.date.endDate"
              :format="dateFormat(projectDetail.date.endDate)"
              month-picker
              uid="date"
              locale="kr"
              select-text="종료일 선택"
              cancel-text="취소"
              @update:modelValue="handleDate('end', $event)"
              :clearable="false"
            />
          </div>
        </div>
        <div class="form-row">
          <h4>프로젝트 소개</h4>
          <div class="editor-wrap">
            <quill-editor
              v-model="editor.content"
              :options="editor.editorOption"
              @change="onEditorChange"
            />
          </div>
        </div>
        <div class="form-row flex">
          <Input
            v-model="projectDetail.role"
            label="담당 역할"
          />
          <Input
            v-model="projectDetail.company"
            label="소속 회사"
          />
          <Input
            v-model="projectDetail.orderCompany"
            label="발주처"
          />
        </div>
        <div class="form-row">
          <h4>주요 업무</h4>
          <AddList
            v-model="projectDetail.jobs"
            list-class="dot-list"
            btn-text="등록"
            no-data-text="등록된 리스트가 없습니다."
            @change="onAddChange"
          />
        </div>
        <div class="form-row">
          <h4>타입</h4>
          <div class="check-list">
            <template
              v-for="(project, index) in projectDetail.type"
              :key="`type${index}`"
            >
              <Checkbox
                v-model="projectDetail.type[index]"
                :label="`${index}`"
                :value="`${index}`"
                :name="`${index}`"
              />
            </template>
          </div>
        </div>
        <div class="form-row">
          <h4>사용 스킬</h4>
          <div class="check-list">
            <template
              v-for="(project, index) in projectDetail.skills"
              :key="`skill${index}`"
            >
              <Checkbox
                v-model="projectDetail.skills[index]"
                :label="`${index}`"
                :value="`${index}`"
                :name="`${index}`"
              />
            </template>
          </div>
        </div>
        <div class="form-row" v-show="projectDetail.type.pc">
          <h4>프로젝트 이미지 pc</h4>
          <Input
            files
            preview
            label="추가"
            @change="onChangeFile('pc', $event)"
          />
        </div>
        <div class="form-row" v-show="projectDetail.type.mobile">
          <h4>프로젝트 이미지 mobile</h4>
          <Input
            files
            preview
            label="추가"
            @change="onChangeFile('mobile', $event)"
          />
        </div>
      </div>
    </div>
    <div class="project-btns side">
      <button class="btn lg light" @click="back">목록</button>
      <button class="btn lg dark" @click="projectCreate">저장</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import { ReqProjectCreateInterface } from '@/service/project/interface/projectCreate.interface'
import { quillEditor } from 'vue3-quill'
import Input from '@/components/Input.vue'
import Checkbox from '@/components/Checkbox.vue'
import AddList from '@/components/AddList.vue'

interface vueEditor {
  quill: object,
  html: string,
  text: string
}
interface dateFormat {
  year: number,
  month: number
}

export default defineComponent({
  name: 'projectCreate',
  components: {
    quillEditor,
    Input,
    Checkbox,
    AddList
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const projectStore = useProjectStore()

    // init data
    const thisYear = new Date().getFullYear()
    const thisMonth = new Date().getMonth()
    const dateFormat = (date: dateFormat) => {
      const year = date.year
      const month = date.month + 1
      return `${year}-${month < 10 ? '0' + month : month}`
    }
    const projectDetail = ref<ReqProjectCreateInterface>({
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
      fileList: {
        mobile: [],
        pc: null
      },
      date: {
        startDate: {
          year: thisYear,
          month: thisMonth
        },
        endDate: {
          year: thisYear,
          month: thisMonth
        }
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
    // const previews = ref<string[]>([])
    const firstFocus = ref<HTMLInputElement | null>()

    // api
    function onChangeFile (target: string, files : FileList) {
      if (target === 'pc') {
        projectDetail.value.fileList.pc = files
      } else if (target === 'mobile') {
        for (const [key, value] of Object.entries(files)) {
          console.log('key', key)
          console.log('value', value)
          console.log('22', typeof projectDetail.value.fileList.mobile)
          // Array.from(projectDetail.value.fileList.mobile).push(value.name)
          // if (projectDetail.value.fileList.mobile === []) {
          //   projectDetail.value.fileList.mobile.push(value)
          // }
          // Array.from(value).filter((item: Object) => {
          //   return console.log('item', item)
          //   // for (const [mobileKey, mobileValue] of Object.entries(item)) {
          //   //   if (mobileKey === 'name') {
          //   //     project.fileList.mobile.push(mobileValue)
          //   //   }
          //   // }
          // })
        }
        // projectDetail.value.fileList.mobile = value
        // console.log('mobile', value)
      }
    }
    async function projectCreate () {
      // if (projectDetail.value.title === '') {
      //   alert('제목을 입력해 주세요.')
      //   return false
      // }
      // if (projectDetail.value.introduce === '') {
      //   alert('내용을 입력해 주세요.')
      //   return false
      // }

      const formData = new FormData()
      formData.append('title', projectDetail.value.title)
      formData.append('introduce', projectDetail.value.introduce)
      formData.append('role', projectDetail.value.role)
      formData.append('company', projectDetail.value.company)
      formData.append('orderCompany', projectDetail.value.orderCompany)

      formData.append('startYear', JSON.stringify(projectDetail.value.date.startDate.year))
      formData.append('startMonth', JSON.stringify(projectDetail.value.date.startDate.month + 1))
      formData.append('endYear', JSON.stringify(projectDetail.value.date.endDate.year))
      formData.append('endMonth', JSON.stringify(projectDetail.value.date.endDate.month + 1))

      // jobs
      if (projectDetail.value.jobs.length === 0) {
        alert('주요 업무를 입력해 주세요.')
        return false
      }
      formData.append('jobs', JSON.stringify(projectDetail.value.jobs))
      // type
      if (projectDetail.value.type.mobile === false && projectDetail.value.type.pc === false) {
        alert('프로젝트 타입 선택해 주세요.')
        return false
      } else {
        for (const [key, value] of Object.entries(projectDetail.value.type)) {
          formData.append(key, JSON.stringify(value))
        }
      }
      // skills
      let skillResults = 0
      for (const [key, value] of Object.entries(projectDetail.value.skills)) {
        if (value !== false) {
          skillResults++
        }
        formData.append(key, JSON.stringify(value))
      }
      if (skillResults === 0) {
        alert('사용 스킬을 선택해 주세요.')
        return false
      }
      // fileList
      if (projectDetail.value.fileList.mobile !== null) {
        for (let i = 0; i < projectDetail.value.fileList.mobile.length; i++) {
          formData.append('fileListMobile', projectDetail.value.fileList.mobile[i])
        }
      }
      if (projectDetail.value.fileList.pc !== null) {
        for (let i = 0; i < projectDetail.value.fileList.pc.length; i++) {
          formData.append('fileListPc', projectDetail.value.fileList.pc[i])
        }
      }

      const result = await projectStore.actionHttpProjectCreate(formData)
      alert('글 등록이 완료되었습니다.')
      router.push({
        path: `/project/${result.insertId}`
      })
    }
    // editor
    const editor = reactive({
      content: '',
      _content: '',
      editorOption: {
        placeholder: '내용을 입력해 주세요.',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['link', 'image']
          ]
        }
      }
    })
    const onEditorChange = (event: vueEditor) => {
      editor._content = event.html
      projectDetail.value.introduce = event.text
    }
    // add list
    function onAddChange (value: string[]) {
      projectDetail.value.jobs = value
    }

    function back () {
      window.history.back()
      router.push({
        path: '/project'
      })
    }

    onMounted(() => {
      // 첫번쨰 인풋 포커스
      firstFocus.value?.focus()

      firstFocus.value?.addEventListener('selection-change', () => {
        firstFocus.value?.focus()
      })
    })
    function handleDate (standard: string, date: dateFormat) {
      if (standard === 'start') {
        console.log('선택한 날짜', date)
        // projectDetail.value.date => 오늘 날짜 이거나 / 과거 선택한 날짜
        if (
          date.year > projectDetail.value.date.endDate.year ||
          (date.year === projectDetail.value.date.endDate.year && date.month > projectDetail.value.date.endDate.month)
        ) {
          alert('시작일은 종료일보다 이전입니다.')
          projectDetail.value.date.startDate.year = thisYear
          projectDetail.value.date.startDate.month = thisMonth
        } else {
          projectDetail.value.date.startDate.year = date.year
          projectDetail.value.date.startDate.month = date.month
        }
      } else if (standard === 'end') {
        if (
          date.year < projectDetail.value.date.startDate.year ||
          (date.year === projectDetail.value.date.startDate.year && date.month < projectDetail.value.date.startDate.month)
        ) {
          alert('종료일은 시작일보다 이후입니다.')
          projectDetail.value.date.endDate.year = thisYear
          projectDetail.value.date.endDate.month = thisMonth
        } else if (projectDetail.value.date.endDate.year === thisYear && date.month > thisMonth) {
          alert('종료일은 최대 이번달입니다.')
          projectDetail.value.date.endDate.year = thisYear
          projectDetail.value.date.endDate.month = thisMonth
        } else {
          projectDetail.value.date.endDate.year = date.year
          projectDetail.value.date.endDate.month = date.month
        }
      }
      console.log('handleDate', projectDetail.value.date)
    }
    const alertFn = () => {
      alert('Value cleared')
    }

    return {
      route,
      editor,
      projectDetail,
      projectCreate,
      back,
      onEditorChange,
      firstFocus,
      onChangeFile,
      dateFormat,
      handleDate,
      alertFn,
      onAddChange
    }
  }
})
</script>
