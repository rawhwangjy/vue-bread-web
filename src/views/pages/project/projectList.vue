<template>
	<Header />
	<div
		id="content-body"
		class="content-body project"
	>
		<div class="title-area">
			<h3 class="main-title">프로젝트</h3>
		</div>
		<div class="content-area">
			<div class="project-filter">
				<Select
					v-model="currentFilter"
					init-title="전체"
					:select-data="filterList"
					:class="{
						'half-width':
							currentFilter === '연도별' ||
							currentFilter === '타입별',
					}"
					@change="changeFilter"
				/>
				<slot v-if="currentFilter === '연도별'">
					<Select
						v-model="currentFilterYear"
						init-title="전체"
						:select-data="filterListYear"
						class="half-width"
						@change="changeFilterYear"
					/>
				</slot>
				<slot v-if="currentFilter === '타입별'">
					<Select
						v-model="currentFilterType"
						init-title="전체"
						:select-data="filterListType"
						class="half-width"
						@change="changeFilterType"
					/>
				</slot>
			</div>
			<div
				v-if="projectList.length !== 0"
				class="project-list"
			>
				<div
					v-for="(project, index) in projectList"
					:key="`project${index}`"
					class="project-wrap"
				>
					<button
						type="button"
						@click="getProjectDetail(project.id)"
					>
						<div
							class="project-title"
							:class="{
								wBadge: project.typePc || project.typeMobile,
							}"
						>
							<h4>{{ project.title }}</h4>
							<span class="types-badge">
								<span
									v-if="project.typePc"
									class="pc"
									>PC</span
								>
								<span
									v-if="project.typeMobile"
									class="mobile"
									>모바일</span
								>
							</span>
						</div>
						<div class="date-area">
							<span class="date">
								<span aria-label="시작년도"
									>{{ project.startYear }}.</span
								>
								<span aria-label="시작월">{{
									project.startMonth < 10
										? `0${project.startMonth}`
										: project.startMonth
								}}</span>
							</span>
							~
							<span class="date">
								<span aria-label="종료년도"
									>{{ project.endYear }}.</span
								>
								<span aria-label="종료월">{{
									project.endMonth < 10
										? `0${project.endMonth}`
										: project.endMonth
								}}</span>
							</span>
						</div>
						<span class="introduce">{{ project.introduce }}</span>
						<div class="companies">
							<span
								>소속 :
								<strong>{{ project.company }}</strong></span
							>
							<span
								>발주사 :
								<strong>{{
									project.orderCompany
								}}</strong></span
							>
						</div>
					</button>
				</div>
			</div>
			<div v-else>데이터가 없습니다.</div>
			<Pagination
				v-if="originProjectList.length !== 0"
				:total-data-length="originProjectList.length"
				:data-per-page="windowWidth >= 768 ? 6 : 2"
				@update="onPageMove"
			/>
		</div>
		<div class="footer-area right">
			<button
				class="btn lg dark"
				@click="projectCreate"
			>
				글쓰기
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from 'vue';
import Header from '@/views/layout/Header.vue';
import { useRouter, useRoute } from 'vue-router';
import { useProjectStore } from '@/store/project/project.module';
import { ResProjectListInterface } from '@/service/project/interface/projectList.interface';
import { cloneDeep } from 'lodash';
import Pagination from '@/components/Pagination.vue';
import { LocalKey } from '@/utils/common.constants';
import Select from '@/components/Select.vue';

export default defineComponent({
	name: 'projectList',
	components: {
		Header,
		Select,
		Pagination,
	},
	// beforeRouteEnter(to: any, from: any, next: any) {
	// 	// Login 컴포넌트가 화면에 표시되기 전에 수행될 로직
	// 	// Login 컴포넌트는 아직 생성되지 않은 시점
	// 	console.log('🌀beforeRouteUpdate >>> from', from);
	// 	console.log('🌀beforeRouteUpdate >>> to', to);
	// 	console.log('🌀beforeRouteUpdate >>> next', next);
	// 	next();
	// },
	// beforeRouteUpdate(to: any, from: any, next: any) {
	// 	// 화면에 표시된 컴포넌트가 변경될 때 수행될 로직
	// 	// `this`로 Login 컴포넌트를 접근할 수 있음
	// 	console.log('👻beforeRouteUpdate >>> from', from);
	// 	console.log('👻beforeRouteUpdate >>> to', to);
	// 	console.log('👻beforeRouteUpdate >>> next', next);
	// 	next();
	// },
	// beforeRouteLeave(to: any, from: any, next: any) {
	// 	// Login 컴포넌트를 화면에 표시한 url 값이 변경되기 직전의 로직
	// 	// `this`로 Login 컴포넌트를 접근할 수 있음
	// 	console.log('⭐️beforeRouteUpdate >>> from', from);
	// 	console.log('⭐️beforeRouteUpdate >>> to', to);
	// 	console.log('⭐️beforeRouteUpdate >>> next', next);
	// 	next();
	// },
	setup() {
		// router & store
		const router = useRouter();
		const route = useRoute();
		const projectStore = useProjectStore();

		// init data

		function projectCreate() {
			router.push({
				path: '/project/create',
			});
		}

		// init data
		// data
		const originProjectList = ref<ResProjectListInterface[]>([]);
		const projectList = ref<ResProjectListInterface[]>([]);
		// filter
		const filterList = ref(['전체', '연도별', '타입별']);
		const currentFilter = ref('전체');
		const currentFilterYear = ref('2022');
		const currentFilterType = ref('전체');
		const filterListYear = ref<string[]>([]);
		const filterListType = ref<string[]>(['전체', '모바일', 'PC']);
		// watch(
		//   () => originProjectList.value,
		//   updateValue => {
		//     console.log('ori', originProjectList.value)
		//     console.log('updateValue', updateValue)
		//     originProjectList.value = updateValue
		//   }
		// )

		function changeFilter(value: string) {
			currentFilter.value = value;
			localStorage.setItem(LocalKey.lastPageNum, 'lastPageNum');
			if (value === '전체') {
				getProjectListAll();
			} else if (value === '연도별') {
				changeFilterYear('전체');
			} else if (value === '타입별') {
				changeFilterType('전체');
			}
		}
		async function changeFilterYear(value: string) {
			currentFilterYear.value = value;
			localStorage.setItem(LocalKey.lastPageNum, 'lastPageNum');
			const targetYear = {
				year:
					currentFilterYear.value === '전체'
						? 'all'
						: currentFilterYear.value,
			};
			originProjectList.value = [];
			originProjectList.value =
				await projectStore.actionHttpGetProjectListYear(targetYear);
			nextTick(() => {
				dataMapping(originProjectList.value);
			});
		}
		async function changeFilterType(value: string) {
			currentFilterType.value = value;
			localStorage.setItem(LocalKey.lastPageNum, 'lastPageNum');
			const targetType = {
				type:
					currentFilterType.value === '전체'
						? 'all'
						: currentFilterType.value === '모바일'
						? 'mobile'
						: 'pc',
			};
			originProjectList.value = [];
			originProjectList.value =
				await projectStore.actionHttpGetProjectListType(targetType);
			nextTick(() => {
				dataMapping(originProjectList.value);
			});
		}

		// api
		async function getProjectListAll() {
			originProjectList.value = [];
			originProjectList.value =
				await projectStore.actionHttpGetProjectListAll();
			dataMapping(originProjectList.value);
			if (filterListYear.value.length === 0) {
				dateProcess(originProjectList.value);
			}
		}
		function dateProcess(targetData: ResProjectListInterface[]) {
			const dummyArr = ref<string[]>([]);
			targetData.filter((item: ResProjectListInterface) => {
				return dummyArr.value.push(String(item.startYear));
			});
			const set = new Set(dummyArr.value);
			filterListYear.value = [...set];
			filterListYear.value.sort((a: string, b: string): number => {
				return Number(b) - Number(a);
			});
			filterListYear.value.unshift('전체');
		}
		// data 가공 공통 함수
		function dataMapping(targetData: ResProjectListInterface[]) {
			targetData.sort(
				(
					a: ResProjectListInterface,
					b: ResProjectListInterface
				): number => {
					return b.id - a.id;
				}
			);
			projectList.value = cloneDeep(targetData).splice(
				0,
				windowWidth.value >= 768 ? 6 : 2
			);
		}

		// 화면 사이즈 체크
		const windowWidth = ref(window.innerWidth);
		function checkSize() {
			// console.log('사이즈', windowWidth)
			window.addEventListener('resize', () => {
				windowWidth.value = window.innerWidth;
			});
		}
		onMounted(() => {
			getProjectListAll();
			checkSize();
		});
		function getProjectDetail(targetId: number) {
			const id = targetId;
			router.push({
				path: `/project/${id}`,
			});
		}
		// 페이징
		const currentPage = ref(1);
		function onPageMove(
			targetPage: number,
			startOffset: number,
			endOffset: number
		) {
			projectList.value = cloneDeep(originProjectList.value).slice(
				startOffset,
				endOffset
			); // 마지막 처리
			// // console.log('clicked page startOffset', startOffset)
			// // console.log('clicked page endOffset', endOffset)
			currentPage.value = targetPage;
			localStorage.setItem(
				LocalKey.lastPageNum,
				String(currentPage.value)
			);
		}

		return {
			currentFilter,
			currentFilterYear,
			currentFilterType,
			filterList,
			filterListYear,
			filterListType,
			changeFilter,
			changeFilterYear,
			changeFilterType,
			windowWidth,
			projectCreate,
			originProjectList,
			projectList,
			getProjectDetail,
			onPageMove,
		};
	},
});
</script>
