<template>
  <div class="board-wrap">
    <h3>{{ route.params.category }} update</h3>
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
            <input type="text" v-model="boardDetail.title" ref="firstFocus">
          </dd>
        </div>
        <div>
          <dt>내용</dt>
          <dd>
            <quill-editor
              v-model="editor.content"
              :value="editor.content"
              :options="editor.editorOption"
              :disabled="editor.disabled"
              @change="onEditorChange"
    @ready="onEditorReady($event)"
            />
            {{ editor.content }}
            {{ boardDetail.content }}
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
import { ReqBoardUpdateInterface, ResBoardUpdateInterface } from '@/service/board/interface/boardUpdate.interface'
import { quillEditor } from 'vue3-quill'
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
    const boardDetail = ref<ResBoardUpdateInterface>({
      id: 0,
      categoryId: 0,
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
      categoryList.value = await categoryStore.actionHttpGetCategoryList()
    }
    async function getBoardDetail () {
      const targetBoard: ReqBoardUpdateInterface = {
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
      await boardStore.actionHttpBoardUpdate(boardDetail.value)
      categoryList.value.filter((item) => {
        if (item.id === boardDetail.value.categoryId) {
          currentCategory.value = item.category
        }
        return false
      })
      alert('글 수정이 완료되었습니다.')
      router.push({
        path: `/board/${currentCategory.value}`
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
        path: `/board/${currentCategory.value}`
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
