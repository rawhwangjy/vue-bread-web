<template>
  <div class="board-wrap">
    <h3>{{ route.params.category }} register</h3>
    <div class="board-list">
        <dl>
          <div>
            <dt>타입</dt>
            <dd>
              <select v-model="boardDetail.categoryId">
                <option value="0">카테고리를 선택해주세요.</option>
                <option
                  v-for="(item, index) in categoryList"
                  :key="`select${index}`"
                  :value="item.id"
                >
                  {{ item.category }}
                </option>
              </select>
            </dd>
          </div>
          <div>
            <dt>제목</dt>
            <dd>
              <input type="text" v-model="boardDetail.title" ref="firstFocus" autofocus>
            </dd>
          </div>
          <div>
            <dt>내용</dt>
            <dd>
              <quill-editor
                v-model="editor.content"
                :options="editor.editorOption"
                @change="onEditorChange"
              />
            </dd>
          </div>
          <div>
            <dt>동의</dt>
            <dd>
              <Checkbox
                v-model="boardDetail.agree"
                label="동의합니다."
                value="html5"
                name="skills"
              />
            </dd>
          </div>
          <div>
            <dt>파일 업로드</dt>
            <dd>
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
            </dd>
          </div>
        </dl>
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
    const categoryList = ref<ResCategoryListInterface[]>([])
    const boardDetail = ref<ReqBoardCreateInterface>({
      categoryId: 0,
      title: '',
      content: '',
      agree: false,
      fileList: null
    })
    const previews = ref<string[]>([])
    const firstFocus = ref<HTMLInputElement | null>()

    // api
    async function getCategoryList () {
      categoryList.value = await categoryStore.actionHttpGetCategoryList()
    }
    function uploadFile (event: Event) {
      const { files } = event?.target as HTMLInputElement
      if (files) {
        boardDetail.value.fileList = files
        previews.value = []
        previewImg(event)
      }
    }
    function previewImg (event: Event) {
      const { files } = event?.target as HTMLInputElement
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const reader: FileReader = new FileReader()
          reader.readAsDataURL(files[i])
          reader.addEventListener('load', () => {
            return previews.value.push(String(reader.result))
          })
        }
      }
    }
    async function boardCreate () {
      if (boardDetail.value.categoryId === 0) {
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
      formData.append('categoryId', String(boardDetail.value.categoryId))
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
      categoryList.value.filter((item) => {
        if (item.id === boardDetail.value.categoryId) {
          currentCategory.value = item.category
        }
        return false
      })

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
