<template>
	<Header />
	<div
		class="content-body board"
		id="content-body"
	>
		<div class="title-area">
			<h3 class="main-title">카테고리 관리</h3>
		</div>
		<div class="content-area">
			<div class="data-table-area">
				<table class="table vertical">
					<colgroup>
						<col class="width10" />
						<col class="widthAll" />
					</colgroup>
					<thead>
						<tr>
							<!-- <th scope="col">No.</th> -->
							<th scope="col">Title</th>
						</tr>
					</thead>
					<tbody v-if="categoryList.length > 0">
						<tr
							v-for="(category, index) in categoryList"
							:key="`category${index}`"
						>
							<!-- <td class="txt-center">{{ category.id }}</td> -->
							<td>
								<div class="edit-btns-wrap">
									<div class="editable-area">
										<!-- before EDIT -->
										<span
											v-show="
												categoryDetail.id !==
												category.id
											"
											class="before-edit"
											@click="onEditText(category)"
										>
											<span class="category-title">{{
												category.category
											}}</span>
											<button
												type="button"
												class="btn-icon"
											>
												<font-awesome-icon
													icon="fa-solid fa-pencil"
													aria-label="수정"
												/>
											</button>
										</span>
										<!-- // before EDIT -->
										<!-- clicked EDIT -->
										<span
											v-show="
												categoryDetail.id ===
												category.id
											"
											class="editable"
										>
											<Input
												v-model="
													categoryDetail.category
												"
												label="카테고리 수정 내용 입력"
												label-hide
												name="currentCategory"
											/>
											<button
												type="button"
												class="btn md primary"
												@click="
													categoryUpdate(
														categoryDetail
													)
												"
											>
												완료
											</button>
										</span>
										<!-- // clicked EDIT -->
									</div>
									<button
										type="button"
										class="btn-icon"
										@click="categoryDelete(category.id)"
									>
										<font-awesome-icon
											icon="fa-solid fa-trash"
											aria-label="삭제"
										/>
									</button>
								</div>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="2">
								<p class="no-data">카테고리가 없습니다.</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="footer-area right">
			<button
				type="button"
				class="btn lg dark"
				@click="categoryCreate"
			>
				카테고리 추가
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Header from '@/views/layout/Header.vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/store/board/board.module';
import { useCategoryStore } from '@/store/category/category.module';
import { ResCategoryListInterface } from '@/service/category/interface/categoryList.interface';
import { ResCategoryDetailInterface } from '@/service/category/interface/categoryDetail.interface';
import { ResCategoryUpdateInterface } from '@/service/category/interface/categoryUpdate.interface';
import Input from '@/components/Input.vue';

export default defineComponent({
	name: 'categoryList',
	components: {
		Header,
		Input,
	},
	setup() {
		// router & store
		const router = useRouter();
		const boardStore = useBoardStore();
		const categoryStore = useCategoryStore();

		// init data
		const categoryList = ref<ResCategoryListInterface[]>([]);
		const categoryDetail = ref<ResCategoryDetailInterface>({
			id: 0,
			category: '',
		});

		// api
		async function getCategoryList() {
			const result = await categoryStore.actionHttpGetCategoryList();
			categoryList.value = result;
			// console.log('result', result)
		}
		async function categoryUpdate(target: ResCategoryUpdateInterface) {
			await categoryStore.actionHttpCategoryUpdate(target);
			getCategoryList();
			categoryDetail.value.id = 0;
		}
		async function categoryDelete(targetId: number) {
			const targetBoard = {
				id: targetId,
			};
			if (confirm('정말 삭제하시겠습니까?')) {
				alert('삭제되었습니다.');
				// console.log('targetBoard', targetBoard)
				await categoryStore.actionHttpCategoryDelete(targetBoard);
				getCategoryList();
				await boardStore.actionHttpBoardListDelete(targetBoard);
			} else {
				alert('취소되었습니다.');
			}
		}

		// route
		function categoryCreate() {
			router.push({
				path: '/board/category/create',
			});
		}
		function onEditText(target: ResCategoryUpdateInterface) {
			categoryDetail.value.id = target.id;
			categoryDetail.value.category = target.category;
		}

		onMounted(() => {
			getCategoryList();
		});

		return {
			categoryStore,
			getCategoryList,
			categoryList,
			categoryCreate,
			onEditText,
			categoryUpdate,
			categoryDetail,
			categoryDelete,
		};
	},
});
</script>
