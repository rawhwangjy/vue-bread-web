<template>
  <div class="project-wrap">
    <div class="project-title">
      <h3>글 쓰기</h3>
    </div>
    <div class="project-content">
      <div class="project-form">
        <div class="form-row">
          <Input
            v-model="projectDetail.title"
            label="제목"
            label-hide
          />
        </div>
        <div class="form-row">
          <div class="editor-wrap">
            <quill-editor
              v-model="editor.content"
              :options="editor.editorOption"
              aria-label="내용"
              @change="onEditorChange"
            />
          </div>
        </div>
        <div class="form-row">
          <Input
            files
            preview
            label="name1"
            name="currentDefault"
            @change="changeFile"
          />
        </div>
        <div class="form-row">
          <div class="skill-list">
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

interface vueEditor {
  quill: object,
  html: string,
  text: string
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
    const projectDetail = ref<ReqProjectCreateInterface>({
      title: '',
      introduce: '',
      type: {
        mo: false,
        pc: false,
        all: false
      },
      fileList: null,
      date: {
        startDate: 0,
        endDate: 0
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
    function changeFile (value : FileList) {
      projectDetail.value.fileList = value
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
      for (const [key, value] of Object.entries(projectDetail.value.skills)) {
        formData.append(key, String(value))
      }
      if (projectDetail.value.fileList !== null) {
        for (let i = 0; i < projectDetail.value.fileList.length; i++) {
          formData.append('fileList', projectDetail.value.fileList[i])
        }
      } else {
        formData.append('fileList', '')
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

    return {
      route,
      projectDetail,
      projectCreate,
      back,
      editor,
      onEditorChange,
      firstFocus,
      changeFile
    }
  }
})
</script>
