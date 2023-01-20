<template>
  <div class="board-wrap">
    <div class="board-title">
      <h3>글 수정</h3>
    </div>
    <div class="board-content">
      <div class="board-view">
        <div class="form-row">
          <Select
            v-model="boardDetail.category"
            initTitle="카테고리를 선택해주세요."
            :initSelected="boardDetail.category"
            :selectData="categoryList"
          />
          <Input
            v-model="boardDetail.title"
            label="제목"
            label-hide
            ref="firstFocus"
          />
        </div>
        <div class="form-row">
          <div class="editor-wrap">
            <quill-editor
              v-model="editor.content"
              :value="editor.content"
              :options="editor.editorOption"
              :disabled="editor.disabled"
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
            :init-data="previews"
            @change="changeFile"
          />
        </div>
        <div class="form-row">
          <Checkbox
            v-model="boardDetail.agree"
            label="동의합니다."
            value="html5"
            name="skills"
            :checked="boardDetail.agree === true"
          />
        </div>
      </div>
    </div>
    <div class="board-btns side">
      <button class="btn lg light" @click="back">목록</button>
      <button class="btn lg dark" @click="boardUpdate">수정</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'
import { ReqBoardDetailInterface } from '@/service/board/interface/boardDetail.interface'
import { ReqBoardUpdateInterface } from '@/service/board/interface/boardUpdate.interface'
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
  name: 'boardUpdate',
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
    const beforeCategory = route.params.category
    const afterCategory = ref('')
    const categoryObject = ref<ResCategoryListInterface[]>([])
    const categoryList = ref<string[]>([])
    const boardDetail = ref<ReqBoardUpdateInterface>({
      id: 0,
      category: '',
      title: '',
      content: '',
      agree: false,
      fileList: null
    })
    const previews = ref<string[]>([])
    // const firstFocus = ref<HTMLInputElement | null>()

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
    async function getBoardDetail () {
      const targetBoard: ReqBoardDetailInterface = {
        id: Number(route.params.id)
      }
      const result = await boardStore.actionHttpGetBoard(targetBoard)
      result[0].agree === 1 ? result[0].agree = true : result[0].agree = false
      boardDetail.value = result[0]
      editor.content = boardDetail.value.content
      // fileList 가공 후 재할당
      if (result[0].fileList !== '') {
        const target = result[0].fileList.split(',')
        boardDetail.value.fileList = []
        for (let i = 0; i < target.length; i++) {
          boardDetail.value.fileList.push(target[i])
        }
        previews.value = boardDetail.value.fileList
      }
      // 첫번쨰 인풋 포커스
      // nextTick(() => {
      //   firstFocus.value?.focus()
      // })
    }
    async function boardUpdate () {
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
      formData.append('id', String(boardDetail.value.id))
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
      await boardStore.actionHttpBoardUpdate(formData)
      afterCategory.value = boardDetail.value.category
      alert('글 수정이 완료되었습니다.')
      router.push({
        path: `/board/${afterCategory.value}`
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
      },
      disabled: true
    })
    const onEditorChange = (event: vueEditor) => {
      editor.disabled = false
      editor._content = event.html
      boardDetail.value.content = event.text
    }

    function back () {
      router.push({
        path: `/board/${beforeCategory}`
      })
    }

    onMounted(() => {
      getCategoryList()
      getBoardDetail()
    })

    return {
      route,
      categoryList,
      boardDetail,
      boardUpdate,
      back,
      editor,
      onEditorChange,
      // firstFocus,
      changeFile,
      previews
    }
  }
})
</script>
