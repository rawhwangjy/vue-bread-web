<template>
	<teleport to="body">
		<div class="cookie-popup">
			<div class="cookie-content">
				<div class="content">
					<p>이 사이트는 Vue3 프레임워크를 이용해 만들었습니다.</p>
					<a
						href="http://rbreadg.dothome.co.kr/"
						target="_blank"
						role="button"
						class="btn sm primary border"
					>
						React 포트폴리오 사이트 바로가기
					</a>
				</div>
				<div class="cookie-btns">
					<Checkbox
						v-model="cookieState"
						label="1시간동안 보지 않기"
						@change="changeEvent"
					/>
					<button
						type="button"
						class="btn sm light"
						@click="closePopup"
					>
						<span>확인</span>
					</button>
				</div>
			</div>
			<span class="dim" />
		</div>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Checkbox from '@/components/Checkbox.vue';

export default defineComponent({
	name: 'CookiePopup',
	components: {
		Checkbox,
	},
	emits: ['change'],
	setup(_props, { emit }) {
		const cookieState = ref(false);

		function changeEvent(value: boolean) {
			cookieState.value = value;
		}

		function closePopup() {
			if (cookieState.value) {
				const date = new Date();
				date.setMinutes(date.getMinutes() + 60);
				document.cookie = `vueExpires=true; expires=${date.toUTCString()}`;
			}
			emit('change', false);
		}

		return {
			cookieState,
			changeEvent,
			closePopup,
		};
	},
});
</script>
