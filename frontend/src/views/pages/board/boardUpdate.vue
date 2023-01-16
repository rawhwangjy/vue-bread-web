<template>
  <div class="board-wrap">
    <h3>{{ route.params.category }} update</h3>
    <div class="board-list">
      <dl>
        <div>
          <dt>타입</dt>
          <dd>
            <Select
              v-model="boardDetail.category"
              initTitle="카테고리를 선택해주세요."
              :initSelected="boardDetail.category"
              :selectData="categoryList"
            />
          </dd>
        </div>
        <div>
          <dt>제목</dt>
          <dd>
            <input type="text" v-model="boardDetail.title" ref="firstFocus">
          </dd>
        </div>
        <div>
          <dt>내용</dt>
          <dd>
            <div class="editor-wrap">
              <quill-editor
                v-model="editor.content"
                :value="editor.content"
                :options="editor.editorOption"
                :disabled="editor.disabled"
                @change="onEditorChange"
                @ready="onEditorReady($event)"
              />
            </div>
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
              :checked="boardDetail.agree === true"
            />
          </dd>
        </div>
        fileList
        <div v-if="curServerImg">
          <span
            v-for="(item, index) in boardDetail.fileList"
            :key="`file${index}`"
            class="board-img"
          >
            {{ item }}
            <img :src="`http://127.0.0.1:3000/upload/${item}`" alt="">
          </span>
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
    <button @click="boardUpdate" class="btn lg dark">수정</button>
    <button @click="back" class="btn-home">메인으로</button>
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
    const curServerImg = ref(false)
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
        curServerImg.value = true
        const target = result[0].fileList.split(',')
        boardDetail.value.fileList = []
        for (let i = 0; i < target.length; i++) {
          boardDetail.value.fileList.push(target[i])
        }
      }
      console.log('boardDetail.category', boardDetail.value.category)
      // 첫번쨰 인풋 포커스
      nextTick(() => {
        firstFocus.value?.focus()
      })
    }
    function uploadFile (event: Event) {
      const { files } = event?.target as HTMLInputElement
      if (files) {
        boardDetail.value.fileList = files
        curServerImg.value = false
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
        placeholder: '내용을 입력해 주세요.'
      },
      disabled: true
    })

    const onEditorReady = (quill: object) => {
      console.log('editor ready!', quill)
    }
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
      uploadFile,
      curServerImg,
      previews,
      back,
      editor,
      onEditorChange,
      firstFocus,
      onEditorReady
    }
  }
})
</script>
