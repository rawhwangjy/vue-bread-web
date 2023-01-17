<template>
  <div class="board-wrap">
    <div class="board-title">
      <h3>글 쓰기</h3>
    </div>
    <div class="board-content">
    </div>
    <div class="board-list">
      <div class="form-row">
        <Select
          v-model="boardDetail.category"
          initTitle="카테고리를 선택해주세요."
          :selectData="categoryList"
        />
      </div>
      <div class="form-row">
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
        <Checkbox
          v-model="boardDetail.agree"
          label="동의합니다."
          value="html5"
          name="skills"
        />
      </div>
      <div class="form-row">
        <input
          type="file"
          id="fileUpload"
          multiple
          name="file"
          @change="uploadFile"
        />
        <div>
          미리보기
          <span
            v-for="(item, index) in previews"
            :key="`file${index}`"
            class="board-img"
          >
            <img :src="`${item}`" alt="">
          </span>
        </div>
      </div>
    </div>
    <button @click="boardCreate" class="btn lg dark">글쓰기</button>
    <button @click="back" class="btn-home">메인으로</button>
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
    const previews = ref<string[]>([])
    const firstFocus = ref<HTMLInputElement | null>()

    // api
    async function getCategoryList () {
      const result = await categoryStore.actionHttpGetCategoryList()
      categoryObject.value = result
      result.filter((item: ResCategoryListInterface) => {
        return categoryList.value.push(item.category)
      })
    }
    function uploadFile (value: FileList) {
      console.log('parent', value)
      // const { files } = event?.target as HTMLInputElement
      // console.log('value', value)
      // if (value) {
      //   boardDetail.value.fileList = value
      //   previews.value = []
      //   previewImg(value)
      // }
    }
    // function previewImg (files: FileList) {
    //   // const { files } = event?.target as HTMLInputElement
    //   if (files) {
    //     for (let i = 0; i < files.length; i++) {
    //       const reader: FileReader = new FileReader()
    //       reader.readAsDataURL(files[i])
    //       reader.addEventListener('load', () => {
    //         return previews.value.push(String(reader.result))
    //       })
    //     }
    //   }
    // }
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
        placeholder: '내용을 입력해 주세요.'
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
      uploadFile,
      previews,
      back,
      editor,
      onEditorChange,
      firstFocus
    }
  }
})
</script>
