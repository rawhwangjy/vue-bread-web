<template>
	<div class="page-container">
		<router-view />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: '_pageContainer',
	components: {},
	setup() {
		return {};
	},
});
</script>
