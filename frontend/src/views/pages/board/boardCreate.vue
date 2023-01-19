<template>
  <div class="board-wrap">
    <div class="board-title">
      <h3>글 쓰기</h3>
    </div>
    <div class="board-content">
      <div class="board-form">
        <div class="form-row">
          <Select
            v-model="boardDetail.category"
            initTitle="카테고리를 선택해주세요."
            :selectData="categoryList"
          />
          <Input
            v-model="boardDetail.title"
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
          <Checkbox
            v-model="boardDetail.agree"
            label="동의합니다."
            value="html5"
            name="skills"
          />
        </div>
      </div>
    </div>
    <div class="board-btns side">
      <button class="btn lg light" @click="back">목록</button>
      <button class="btn lg dark" @click="boardCreate">저장</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'
import { ReqBoardCreateInterface } from '@/service/board/interface/boardCreate.interface'
import { quillEditor } from 'vue3-quill'
import Select from '@/components/Select.vue'
import Input from '@/components/Input.vue'
import Checkbox from '@/components/Checkbox.vue'

interface vueEditor {
  quill: object,
  html: string,
  text: string
}

export default defineComponent({
  name: 'boardCreate',
  components: {
    quillEditor,
    Select,
    Input,
    Checkbox
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()
    const categoryStore = useCategoryStore()

    // init data
    const currentCategory = ref('')
    const categoryObject = ref<ResCategoryListInterface[]>([])
    const categoryList = ref<string[]>([])
    const boardDetail = ref<ReqBoardCreateInterface>({
      category: '',
      title: '',
      content: '',
      agree: false,
      fileList: null
    })
    // const previews = ref<string[]>([])
    const firstFocus = ref<HTMLInputElement | null>()

    // api
    async function getCategoryList () {
      const result = await categoryStore.actionHttpGetCategoryList()
      categoryObject.value = result
      result.filter((item: ResCategoryListInterface) => {
        return categoryList.value.push(item.category)
      })
    }
    function changeFile (value : FileList) {
      boardDetail.value.fileList = value
    }
    async function boardCreate () {
      if (boardDetail.value.category === '') {
        alert('카테고리를 선택해 주세요.')
        return false
      }
      if (boardDetail.value.title === '') {
        alert('제목을 입력해 주세요.')
        return false
      }
      if (boardDetail.value.content === '') {
        alert('내용을 입력해 주세요.')
        return false
      }

      const formData = new FormData()
      categoryObject.value.filter((item: ResCategoryListInterface) => {
        if (boardDetail.value.category === item.category) {
          formData.append('categoryId', String(item.id))
        }
        return false
      })
      formData.append('title', boardDetail.value.title)
      formData.append('content', boardDetail.value.content)
      formData.append('agree', String(boardDetail.value.agree))
      if (boardDetail.value.fileList !== null) {
        for (let i = 0; i < boardDetail.value.fileList.length; i++) {
          formData.append('fileList', boardDetail.value.fileList[i])
        }
      } else {
        formData.append('fileList', '')
      }

      const result = await boardStore.actionHttpBoardCreate(formData)
      currentCategory.value = boardDetail.value.category
      alert('글 등록이 완료되었습니다.')
      router.push({
        path: `/board/${currentCategory.value}/${result.insertId}`
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
      boardDetail.value.content = event.text
    }

    function back () {
      window.history.back()
      router.push({
        path: `/board/${currentCategory.value}`
      })
    }

    onMounted(() => {
      getCategoryList()
      // 첫번쨰 인풋 포커스
      firstFocus.value?.focus()

      firstFocus.value?.addEventListener('selection-change', () => {
        firstFocus.value?.focus()
      })
    })

    return {
      route,
      getCategoryList,
      categoryList,
      boardDetail,
      boardCreate,
      back,
      editor,
      onEditorChange,
      firstFocus,
      changeFile
    }
  }
})
</script>
