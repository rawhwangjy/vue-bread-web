<template>
	<Header />
	<div class="guide-body">
		<GuideNav />
		<div class="guide-content">
			<h2 class="guide-title">{{ pageTitle }}</h2>
			<div class="box">
				<!-- <Test ref="modal" /> -->
				<button @click="openModal">Open from parent</button>
			</div>
		</div>
		<!-- // guide-content -->
	</div>
</template>

<script lang="ts">
import Prism from 'prismjs';
import { defineComponent, onMounted, ref } from 'vue';
import Header from '@/views/layout/Header.vue';
import GuideNav from '@/views/layout/GuideNav.vue';
import { useRoute } from 'vue-router';
import Test from '@/components/Test.vue';

export default defineComponent({
	name: 'testing',
	components: {
		Header,
		GuideNav,
		Test,
	},
	setup() {
		const route = useRoute();
		const pageTitle = route.path.replace(/^.*\//, '');

		const modal = ref<InstanceType<typeof Test>>();
		const openModal = () => {
			modal.value?.open();
		};

		onMounted(() => {
			Prism.highlightAll();
		});
		return {
			pageTitle,
			modal,
			openModal,
		};
	},
});
</script>
<style lang="scss" scoped></style>
