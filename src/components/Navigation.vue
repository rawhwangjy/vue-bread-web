<template>
	<div class="navigation-wrap">
		<div class="menu-area">
			<nav ref="navWrap">
				<ul
					ref="menuList"
					class="menu-list"
				>
					<li
						v-for="(item, index) in navData"
						:key="`nav${index}`"
						:class="{
							active: item.isActive === true,
						}"
					>
						<button
							type="button"
							:class="{
								active: item.isActive === true,
								'btn-home': item.menu === '홈',
							}"
							:aria-label="
								item.menu !== '홈'
									? `${item.menu} 메인 화면 이동`
									: ''
							"
							@click="onClickMove(item)"
						>
							<span>{{ item.menu }}</span>
						</button>
					</li>
				</ul>
			</nav>
		</div>
		<div class="more-area">
			<div
				ref="btnAllMenu"
				class="btn-more-area"
			>
				<button
					type="button"
					class="btn-more"
					:class="{
						active: isShowModal,
					}"
					@click="onClickIsShowAllMenu"
				>
					<span class="sr-only"
						>전체메뉴 {{ isShowModal ? '닫기' : '열기' }}</span
					>
				</button>
			</div>
			<div
				v-show="isShowModal"
				class="modal-area"
			>
				<strong class="sr-only">전체메뉴</strong>
				<ul class="menu-list">
					<template
						v-for="(item, index) in navData"
						:key="`nav${index}`"
					>
						<li v-if="item.menu !== '홈'">
							<button
								type="button"
								:class="{
									active: item.isActive === true,
								}"
								:aria-label="`${item.menu} 메인 화면 이동`"
								@click="onClickMove(item)"
							>
								{{ item.menu }}
							</button>
						</li>
					</template>
				</ul>
				<span
					class="dim"
					@click="onClose"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { cloneDeep } from 'lodash';

interface MenuInterface {
	menu: string;
	link: string;
	isActive: boolean;
}

export default defineComponent({
	name: 'Navagation',
	setup() {
		// const isShowModal = ref(false)
		// const isCurrentMenu = ref(0)
		// const navData = ref<string[]>(['홈', '자산', '소비', '퀴즈 온더 챌린지', '절세꿀팁', '금융캘린더', '목표', '나만 아는 투자소식', '투자 캐릭터'])
		// const modalData = ref<string[]>(['자산', '소비', '퀴즈 온더\n챌린지', '절세꿀팁', '금융\n캘린더', '목표', '나만 아는\n투자소식', '투자\n캐릭터'])

		const btnAllMenu = ref<HTMLDivElement | null>(null);
		const menuList = ref<HTMLDivElement | null>(null);
		const navWrap = ref<HTMLDivElement | null>(null);

		const navData = ref<MenuInterface[]>([
			{
				menu: '홈',
				link: '/mm/mm0000',
				isActive: true,
			},
			{
				menu: '메뉴1',
				link: '/mm/mm0001',
				isActive: true,
			},
		]);

		const defaultNavData = ref<MenuInterface[]>([
			{
				menu: '홈',
				link: '/mm/mm0000',
				isActive: false,
			},
			{
				menu: '메뉴1',
				link: '/mm/mm0001',
				isActive: false,
			},
		]);

		const isShowModal = ref(false);
		onMounted(() => {
			navData.value = defaultNavData.value;
			const activeMenu = navData.value.filter(
				(item) => item.link === '/mm/mm0001'
			);
			if (activeMenu !== undefined) {
				activeMenu[0].isActive = true;
				setTimeout(() => {
					const listWidth = menuList.value?.clientWidth || 0;
					const boxWidth = navWrap.value?.clientWidth || 0;
					const boxHalf = boxWidth / 2;

					const target = document.querySelector(
						'#page < .navigation-wrap > .menu-area > li > button.active'
					);

					if (target !== null) {
						const targetLeft = target.getBoundingClientRect().left;
						const selectTargetPos =
							targetLeft + target.clientWidth / 2;

						if (selectTargetPos <= boxHalf) {
							scrollMenuList(0);
						} else if (listWidth - selectTargetPos <= boxHalf) {
							scrollMenuList(listWidth - boxWidth);
						} else {
							scrollMenuList(selectTargetPos - boxHalf);
						}
					}
				}, 100);
			} else {
				navData.value[0].isActive = true;
			}
		});
		function scrollMenuList(x: number) {
			if (navWrap.value === null) {
				return;
			}
			navWrap.value.scrollTo({
				left: x,
				behavior: 'smooth',
			});
		}

		function onClickIsShowAllMenu() {
			// console.log(isShowModal.value)
			isShowModal.value
				? (isShowModal.value = false)
				: (isShowModal.value = true);
		}
		function onClickMove(item: MenuInterface) {
			// 메뉴 초기화
			navData.value = cloneDeep(defaultNavData.value);
			// 메뉴 액티브값 변경
			item.isActive = true;
		}
		function onClose() {
			isShowModal.value = false;
		}
		return {
			btnAllMenu,
			menuList,
			navWrap,
			navData,
			isShowModal,
			onClickIsShowAllMenu,
			onClickMove,
			onClose,
		};
	},
});
</script>
