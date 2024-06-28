<template>
	<Container />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue';
import Container from '@/views/_container.vue';
import { logger } from '@/utils/instance.logger';

export default defineComponent({
	name: 'App',
	components: {
		Container,
	},
	setup() {
		onMounted(() => {
			// logger.info('[MODE] >>> onMounted >>> ', process.env.NODE_ENV);
			// logger.info(
			// 	'[API] >>> onMounted >>> ',
			// 	process.env.VUE_APP_API_URL
			// );
		});
		// onUpdated(() => {
		// 	logger.info('[MODE] >>> onUpdated >>> ', process.env.NODE_ENV);
		// 	logger.info(
		// 		'[API] >>> onUpdated >>> ',
		// 		process.env.VUE_APP_API_URL
		// 	);
		// });
		return {};
	},
});
</script>
