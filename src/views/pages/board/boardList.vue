<template>
	<Header />
	<div
		id="content-body"
		class="content-body board"
	>
		<div class="title-area">
			<h3 class="main-title">
				{{ targetCategory.category.toUpperCase() }}
			</h3>
		</div>
		<div class="content-area">
			<div class="data-table-area">
				<table class="table vertical">
					<colgroup>
						<!-- <col class="width10" > -->
						<col class="widthAll" />
						<col class="width20" />
					</colgroup>
					<thead>
						<tr>
							<!-- <th scope="col">ID</th> -->
							<th scope="col">Title</th>
							<th scope="col">btns</th>
						</tr>
					</thead>
					<tbody v-if="boardList.length > 0">
						<tr
							v-for="(board, index) in boardList"
							:key="`board${index}`"
						>
							<!-- <td>{{ board.id }}</td> -->
							<td>
								<a
									href="javascript:;"
									class="board-title"
									@click="getBoardDetail(board.id)"
								>
									{{ board.title }}
								</a>
							</td>
							<td>
								<div class="list-btns-wrap">
									<button
										type="button"
										class="btn-icon"
										@click="boardUpdate(board.id)"
									>
										<font-awesome-icon
											icon="fa-solid fa-pencil"
											aria-label="수정"
										/>
									</button>
									<button
										type="button"
										class="btn-icon"
										@click="boardDelete(board.id)"
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
							<td colspan="3">
								<p class="no-data">게시글이 없습니다.</p>
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
				@click="boardCreate"
			>
				글쓰기
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import Header from '@/views/layout/Header.vue';
import { useRouter, useRoute } from 'vue-router';
import { useBoardStore } from '@/store/board/board.module';
import { ResBoardListInterface } from '@/service/board/interface/boardList.interface';
import { logger } from '@/utils/instance.logger';

export default defineComponent({
	name: 'boardList',
	components: {
		Header,
	},
	setup() {
		// router & store
		const router = useRouter();
		const route = useRoute();
		const boardStore = useBoardStore();

		// init data
		const currentCategory = route.params.category;
		const boardList = ref<ResBoardListInterface[]>([]);
		const targetCategory = {
			category:
				typeof currentCategory === 'string'
					? currentCategory
					: currentCategory[0],
		};

		// api
		async function getBoardList() {
			boardList.value = await boardStore.actionHttpBoardList(
				targetCategory
			);
		}

		// route
		function getBoardDetail(targetId: number) {
			const id = targetId;
			router.push({
				path: `/board/${currentCategory}/${id}`,
			});
		}
		async function boardDelete(targetId: number) {
			const targetBoard = {
				id: targetId,
			};
			if (confirm('정말 삭제하시겠습니까?')) {
				alert('삭제되었습니다.');
				await boardStore.actionHttpBoardDelete(targetBoard);
				getBoardList();
			} else {
				alert('취소되었습니다.');
			}
		}
		function boardCreate() {
			router.push({
				path: `/board/${currentCategory}/create`,
			});
		}
		function boardUpdate(targetId: number) {
			const id = targetId;
			router.push({
				path: `/board/${currentCategory}/update/${id}`,
			});
		}

		onMounted(() => {
			getBoardList();
			// logger.info('BOARD List')
			// console.log('A')
		});
		function formatDate(data: number) {
			return data + 1;
		}

		watch(
			() => route.params.category,
			(newCategory) => {
				targetCategory.category = String(newCategory);
				getBoardList();
			}
		);

		return {
			boardStore,
			targetCategory,
			getBoardList,
			getBoardDetail,
			boardList,
			boardCreate,
			boardUpdate,
			boardDelete,
			formatDate,
		};
	},
});
</script>
