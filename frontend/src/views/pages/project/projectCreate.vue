<template>
  <div class="project-wrap">
    <div class="project-title">
      <h3>글 쓰기</h3>
    </div>
    <div class="project-content">
      <div class="project-form">
        <div class="form-row flex">
          <Input
            v-model="projectDetail.title"
            label="제목"
          />
          <div class="date-wrap">
            <h4>시작일</h4>
            <Datepicker
              v-model="startDate"
              :format="dateFormat(startDate)"
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
            <h4>종료일</h4>
            <Datepicker
              v-model="endDate"
              :format="dateFormat(endDate)"
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
          <h4>내용</h4>
          <div class="editor-wrap">
            <quill-editor
              v-model="editor.content"
              :options="editor.editorOption"
              @change="onEditorChange"
            />
          </div>
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
            label="name1"
            name="currentDefault"
            @change="onChangeFile('pc', $event)"
          />
        </div>
        <div class="form-row" v-show="projectDetail.type.mobile">
          <h4>프로젝트 이미지 mobile</h4>
          <Input
            files
            preview
            label="name2"
            name="currentDefault"
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
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/store/project/project.module'
import { ReqProjectCreateInterface } from '@/service/project/interface/projectCreate.interface'
import { quillEditor } from 'vue3-quill'
import Input from '@/components/Input.vue'
import Checkbox from '@/components/Checkbox.vue'

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
    Checkbox
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const projectStore = useProjectStore()

    // init data
    const thisYear = new Date().getFullYear()
    const thisMonth = new Date().getMonth() + 1
    const dateInit = reactive({
      startDate: {
        year: thisYear,
        month: thisMonth
      },
      endDate: {
        year: thisYear,
        month: thisMonth
      }
    })
    const dateFormat = (date: dateFormat) => {
      const year = date.year
      const month = date.month
      return `${year}-${month < 10 ? '0' + month : month}`
    }
    const projectDetail = ref<ReqProjectCreateInterface>({
      title: '',
      introduce: '',
      type: {
        mobile: false,
        pc: false
      },
      fileList: {
        mobile: null,
        pc: null
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
    function onChangeFile (target: string, value : FileList) {
      if (target === 'pc') {
        projectDetail.value.fileList.pc = value
      } else if (target === 'mobile') {
        projectDetail.value.fileList.mobile = value
      }
    }
    async function projectCreate () {
      if (projectDetail.value.title === '') {
        alert('제목을 입력해 주세요.')
        return false
      }
      if (projectDetail.value.introduce === '') {
        alert('내용을 입력해 주세요.')
        return false
      }

      const formData = new FormData()
      formData.append('title', projectDetail.value.title)
      formData.append('introduce', projectDetail.value.introduce)
      formData.append('startYear', String(projectDetail.value.date.startDate.year))
      formData.append('startMonth', String(projectDetail.value.date.startDate.year))
      formData.append('endYear', String(projectDetail.value.date.endDate.month))
      formData.append('endMonth', String(projectDetail.value.date.endDate.month))

      // type
      for (const [key, value] of Object.entries(projectDetail.value.type)) {
        formData.append(key, String(value))
      }
      // skills
      for (const [key, value] of Object.entries(projectDetail.value.skills)) {
        formData.append(key, String(value))
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
        if (
          date.year < dateInit.endDate.year ||
          (dateInit.endDate.year === date.year && dateInit.endDate.month < date.month + 1)
        ) {
          alert('시작일은 종료일보다 이전입니다.')
          dateInit.startDate.year = thisYear
          dateInit.startDate.month = thisMonth
        } else {
          dateInit.startDate.year = date.year
          dateInit.startDate.month = date.month + 1
        }
        projectDetail.value.date.startDate = date
      } else {
        if (
          dateInit.startDate.year > date.year ||
          (dateInit.startDate.year === date.year && dateInit.startDate.month > date.month + 1)
        ) {
          alert('종료일은 시작일보다 이전입니다.')
          dateInit.endDate.year = thisYear
          dateInit.endDate.month = thisMonth
        } else if (dateInit.startDate.year === date.year && thisMonth < date.month + 1) {
          alert('종료일은 최대 이번달입니다.')
          dateInit.endDate.year = thisYear
          dateInit.endDate.month = thisMonth
        } else {
          dateInit.endDate.year = date.year
          dateInit.endDate.month = date.month + 1
        }
        projectDetail.value.date.endDate = date
      }
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
      ...toRefs(dateInit),
      dateFormat,
      handleDate,
      alertFn
    }
  }
})
</script>
