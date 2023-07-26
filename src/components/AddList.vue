<template>
	<div class="add-list-wrap">
		<Input
			v-model="inputText"
			labe-hide
			:addList="btnText ? btnText : '등록'"
			@click="onAddItem"
		/>
		<div class="reault-list">
			<ul
				:class="listClass ? listClass : 'dot-list'"
				v-if="stringArray.length !== 0"
			>
				<li
					v-for="(item, index) in stringArray"
					:key="`stringArray${index}`"
				>
					<div class="text-wrap">
						<span>{{ item }}</span>
						<button
							type="button"
							class="btn-icon"
							@click="onDeleteTarget(item)"
						>
							<font-awesome-icon
								icon="fa-solid fa-trash"
								aria-label="삭제"
							/>
						</button>
					</div>
				</li>
			</ul>
			<p v-else>
				{{ noDataText ? noDataText : '등록된 리스트가 없습니다.' }}
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Input from '@/components/Input.vue';

export default defineComponent({
	name: 'AddList',
	components: {
		Input,
	},
	props: {
		btnText: {
			type: String,
			default: '',
		},
		listClass: {
			type: String,
			default: '',
		},
		noDataText: {
			type: String,
			default: '',
		},
	},
	emits: ['update:modelValue', 'change'],
	setup(_props, { emit }) {
		const inputText = ref('');
		const stringArray = ref<string[]>([]);

		function onAddItem(value: string) {
			if (!value) {
				alert('내용을 입력해주세요.');
				return false;
			}
			stringArray.value.push(value);
			emit('update:modelValue', stringArray);
			emit('change', stringArray);
		}
		function onDeleteTarget(item: string) {
			const target = item;
			for (let i = 0; i < stringArray.value.length; i++) {
				if (stringArray.value[i] === target) {
					stringArray.value.splice(i, 1);
				}
			}
		}
		return {
			inputText,
			stringArray,
			onAddItem,
			onDeleteTarget,
		};
	},
});
</script>
