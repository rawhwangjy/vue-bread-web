<template>
  <Header />
  <div class="content-body project" id="content-body">
    <div class="title-area">
      <h3 class="main-title">프로젝트 등록</h3>
    </div>
    <div class="content-area">
      <div class="form-area">
        <div class="form-row flex">
          <Input
            v-model="title"
            label="프로젝트명"
          />
          <div class="date-wrap">
            <h4>투입 시작일</h4>
              <!-- :format="dateFormat(start)" -->
            <Datepicker
              v-model="startDate"
              :format="dateFormat(startDate)"
              :preview-format="dateFormat(startDate)"
              month-picker
              uid="date"
              locale="kr"
              select-text="시작일 선택"
              cancel-text="취소"
              @update:modelValue="handleDate('start', $event)"
              :clearable="false"
              :max-date="new Date()"
            />
          </div>
          <div class="date-wrap">
            <h4>투입 종료일</h4>
            <Datepicker
              v-model="endDate"
              :format="dateFormat(endDate)"
              :preview-format="dateFormat(endDate)"
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
        <div class="form-row flex">
          <Input
            v-model="role"
            label="담당 역할"
          />
          <Input
            v-model="company"
            label="소속 회사"
          />
          <Input
            v-model="orderCompany"
            label="발주처"
          />
        </div>
        <div class="form-row">
          <h4>프로젝트 내용</h4>
          <div class="editor-wrap">
            <quill-editor
              v-model="editor.content"
              :options="editor.editorOption"
              @change="onEditorChange"
            />
          </div>
        </div>
        <div class="form-row">
          <h4>주요 업무</h4>
          <AddList
            v-model="jobs"
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
              v-for="(project, index) in type"
              :key="`type${index}`"
            >
              <Checkbox
                v-model="type[index]"
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
              v-for="(project, index) in skills"
              :key="`skill${index}`"
            >
              <Checkbox
                v-model="skills[index]"
                :label="`${index}`"
                :value="`${index}`"
                :name="`${index}`"
              />
            </template>
          </div>
        </div>
        <div class="form-row" v-show="type.pc">
          <h4>프로젝트 이미지 pc</h4>
          <Input
            files
            preview
            label="추가"
            @change="onChangeFile('pc', $event)"
          />
        </div>
        <div class="form-row" v-show="type.mobile">
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
    <div class="footer-area side">
      <button class="btn lg light" @click="back">목록</button>
      <button class="btn lg dark" @click="projectCreate">저장</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue'
import Header from '@/views/layout/Header.vue'
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
interface DateFormat {
  year: number,
  month: number
}

interface Date {
  startDate: {
    year: number,
    month: number
  },
  endDate: {
    year: number,
    month: number
  }
}

export default defineComponent({
  name: 'projectCreate',
  components: {
    Header,
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
    const date = reactive<Date>({
      startDate: {
        year: thisYear,
        month: thisMonth
      },
      endDate: {
        year: thisYear,
        month: thisMonth
      }
    })
    const dateFormat = (date: DateFormat) => {
      const year = date.year
      const month = date.month + 1
      return `${year}-${month < 10 ? '0' + month : month}`
    }
    const projectDetail = reactive<ReqProjectCreateInterface>({
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
      fileListMobile: null,
      fileListPc: null,
      // startYear: date.startDate.year,
      // startMonth: date.startDate.month,
      // endYear: date.endDate.year,
      // endMonth: date.endDate.month,
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
        gitlab: false,
        eclipse: false,
        node: false,
        npm: false,
        react: false,
        axios: false
      }
    })
    // const previews = ref<string[]>([])
    const firstFocus = ref<HTMLInputElement | null>()

    // api
    function onChangeFile (target: string, files : FileList) {
      if (target === 'pc') {
        projectDetail.fileListPc = files
      } else if (target === 'mobile') {
        projectDetail.fileListMobile = files
        // for (const [key, value] of Object.entries(files)) {
        //   // Array.from(projectDetail.fileList.mobile).push(value.name)
        //   // if (projectDetail.fileList.mobile === []) {
        //   //   projectDetail.fileList.mobile.push(value)
        //   // }
        //   // Array.from(value).filter((item: Object) => {
        //   //   return // console.log('item', item)
        //   //   // for (const [mobileKey, mobileValue] of Object.entries(item)) {
        //   //   //   if (mobileKey === 'name') {
        //   //   //     project.fileList.mobile.push(mobileValue)
        //   //   //   }
        //   //   // }
        //   // })
        // }
        // projectDetail.fileList.mobile = value
        // // console.log('mobile', value)
      }
    }
    async function projectCreate () {
      // // console.log('시작날', projectDetail.startYear)
      // console.log('시작날', projectDetail.date.startDate.year)
      // console.log('시작날', projectDetail.date.startDate.month)
      // console.log('종료날', projectDetail.date.endDate.year)
      // console.log('종료날', projectDetail.date.endDate.month)
      // if (projectDetail.title === '') {
      //   alert('제목을 입력해 주세요.')
      //   return false
      // }
      // if (projectDetail.introduce === '') {
      //   alert('내용을 입력해 주세요.')
      //   return false
      // }

      const formData = new FormData()
      formData.append('title', projectDetail.title)
      formData.append('introduce', projectDetail.introduce)
      formData.append('role', projectDetail.role)
      formData.append('company', projectDetail.company)
      formData.append('orderCompany', projectDetail.orderCompany)

      formData.append('startYear', JSON.stringify(projectDetail.date.startDate.year))
      formData.append('startMonth', JSON.stringify(projectDetail.date.startDate.month + 1))
      formData.append('endYear', JSON.stringify(projectDetail.date.endDate.year))
      formData.append('endMonth', JSON.stringify(projectDetail.date.endDate.month + 1))

      // jobs
      if (projectDetail.jobs.length === 0) {
        alert('주요 업무를 입력해 주세요.')
        return false
      }
      formData.append('jobs', JSON.stringify(projectDetail.jobs))
      // type
      if (projectDetail.type.mobile === false && projectDetail.type.pc === false) {
        alert('프로젝트 타입 선택해 주세요.')
        return false
      } else {
        for (const [key, value] of Object.entries(projectDetail.type)) {
          formData.append(key, JSON.stringify(value))
        }
      }
      // skills
      let skillResults = 0
      for (const [key, value] of Object.entries(projectDetail.skills)) {
        if (value !== false) {
          skillResults++
        }
        // console.log('kk', key)
        formData.append(key, JSON.stringify(value))
      }
      if (skillResults === 0) {
        alert('사용 스킬을 선택해 주세요.')
        return false
      }
      // fileList
      if (projectDetail.fileListMobile !== null) {
        // console.log()
        for (let i = 0; i < projectDetail.fileListMobile.length; i++) {
          formData.append('fileListMobile', projectDetail.fileListMobile[i])
        }
      }
      if (projectDetail.fileListPc !== null) {
        for (let i = 0; i < projectDetail.fileListPc.length; i++) {
          formData.append('fileListPc', projectDetail.fileListPc[i])
          // console.log('projectDetail.fileListPc[i]', projectDetail.fileListPc[i])
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
      projectDetail.introduce = event.text
    }
    // add list
    function onAddChange (value: string[]) {
      projectDetail.jobs = value
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
    function handleDate (standard: string, selectDate: DateFormat) {
      if (standard === 'start') {
        // console.log('선택한 날짜', selectDate)
        if (
          selectDate.year > projectDetail.date.endDate.year ||
          (selectDate.year === projectDetail.date.endDate.year && selectDate.month > projectDetail.date.endDate.month)
        ) {
          alert('시작일은 종료일보다 이전입니다.')
          projectDetail.date.startDate.year = thisYear
          projectDetail.date.startDate.month = thisMonth
        } else {
          projectDetail.date.startDate.year = selectDate.year
          projectDetail.date.startDate.month = selectDate.month
        }
      } else if (standard === 'end') {
        if (
          selectDate.year < projectDetail.date.startDate.year ||
          (selectDate.year === projectDetail.date.startDate.year && selectDate.month < projectDetail.date.startDate.month)
        ) {
          alert('종료일은 시작일보다 이후입니다.')
          projectDetail.date.endDate.year = thisYear
          projectDetail.date.endDate.month = thisMonth
        } else {
          projectDetail.date.endDate.year = selectDate.year
          projectDetail.date.endDate.month = selectDate.month
        }
        // // console.log('시작날', projectDetail.date.startDate.year)
        // // console.log('시작날', projectDetail.date.startDate.month)
        // // console.log('종료날', projectDetail.date.endDate.year)
        // // console.log('종료날', projectDetail.date.endDate.month)
      }
      // console.log('가공 날짜', date.startDate)
    }

    return {
      route,
      editor,
      ...toRefs(projectDetail),
      ...toRefs(date),
      date,
      projectCreate,
      back,
      onEditorChange,
      firstFocus,
      onChangeFile,
      dateFormat,
      handleDate,
      onAddChange
    }
  }
})
</script>
