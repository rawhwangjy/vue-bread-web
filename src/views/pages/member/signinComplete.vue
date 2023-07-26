<template>
	<Header />
	<div
		class="content-body login"
		id="content-body"
	>
		<div class="title-area">
			<h3 class="main-title">로그인</h3>
		</div>
		<div class="content-area">로그인 완료</div>
		<div class="footer-area side">ㅇㅇ</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/views/layout/Header.vue';

export default defineComponent({
	name: 'signinComplete',
	components: {
		Header,
	},
	setup() {
		return {};
	},
});
</script>
