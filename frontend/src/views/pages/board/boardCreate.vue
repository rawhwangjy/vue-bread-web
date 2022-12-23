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
            <input type="text" name="" id="" v-model="boardDetail.title">
          </dd>
        </div>
        <div>
          <dt>내용</dt>
          <dd>
            <textarea name="" id="" cols="30" rows="10" v-model="boardDetail.content"></textarea>
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
              multiple="true"
              id="fileUpload"
              @change="uploadFile"
            />
            <img :src="testImg">
            <div id="target"></div>
          </dd>
        </div>
      </dl>
    </div>
    <button @click="boardCreate" class="btn lg dark">글쓰기</button>
    <button @click="back" class="btn-home">메인으로</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBoardStore } from '@/store/board/board.module'
import { useCategoryStore } from '@/store/category/category.module'
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface'
import { ResBoardCreateInterface } from '@/service/board/interface/boardCreate.interface'
import Checkbox from '@/components/Checkbox.vue'

export default defineComponent({
  name: 'boardCreate',
  components: {
    Checkbox
  },
  setup () {
    // router & store
    const router = useRouter()
    const route = useRoute()
    const boardStore = useBoardStore()
    const categoryStore = useCategoryStore()

    // init data
    const testImg = ref()
    const currentCategory = ref('')
    const categoryList = ref<ResCategoryListInterface[]>([])
    const boardDetail = ref<ResBoardCreateInterface>({
      categoryId: 0,
      title: '',
      content: '',
      agree: false
    })

    // api
    async function getCategoryList () {
      categoryList.value = await categoryStore.actionHttpGetCategoryList()
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
      await boardStore.actionHttpBoardCreate(boardDetail.value)
      categoryList.value.filter((item) => {
        if (item.id === boardDetail.value.categoryId) {
          currentCategory.value = item.category
        }
        return false
      })
      alert('글 등록이 완료되었습니다.')
      router.push({
        path: `/board/${currentCategory.value}`
      })
    }
    function uploadFile (event: Event) {
      const target = event?.target as HTMLInputElement
      const files = target.files
      if (files) {
        [].forEach.call(files, readAndPreview)
      }
    }
    function readAndPreview (file: File) {
      const preview = document.querySelector('#target')
      const fileReader = new FileReader()
      fileReader.onload = function () {
        const img = new Image()
        img.title = file.name
        img.src = String(this.result)
        if (preview) {
          preview.appendChild(img)
        }
      }
      fileReader.readAsDataURL(file)
    }

    function back () {
      window.history.back()
    }

    onMounted(() => {
      getCategoryList()
    })

    return {
      route,
      getCategoryList,
      categoryList,
      boardDetail,
      boardCreate,
      uploadFile,
      back,
      testImg
    }
  }
})
</script>
