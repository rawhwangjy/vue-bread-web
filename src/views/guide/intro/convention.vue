<template>
	<Header />
	<div class="guide-body">
		<GuideNav />
		<div class="guide-content convention">
			<h2 class="guide-title">{{ pageTitle }}</h2>
			<div class="box">
				<div class="table-box">
					<h3 class="sub-title">속성의 선언 순서</h3>
					<table class="table">
						<colgroup>
							<col style="width: 20%" />
							<col style="width: 20%" />
							<col />
						</colgroup>
						<thead>
							<tr>
								<th>구분</th>
								<th>속성</th>
								<th>속성 값</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td rowspan="3">1. 위치</td>
								<td>position</td>
								<td>absolute, fixed, relative, static</td>
							</tr>
							<tr>
								<td class="td-line">
									top, right, bottom, left
								</td>
								<td>length(px), %</td>
							</tr>
							<tr>
								<td class="td-line">z-index</td>
								<td>number</td>
							</tr>
							<tr>
								<td rowspan="2">2. 넘침/흐름</td>
								<td>overflow</td>
								<td>visible, hidden, scroll, auto</td>
							</tr>
							<tr>
								<td class="td-line">float</td>
								<td>left, right, none</td>
							</tr>
							<tr>
								<td rowspan="2">3. 표시</td>
								<td>display</td>
								<td>
									none, block, inline, inline-block,
									inline-table, list-item, table,
									table-caption, table-cell, table-column,
									table-column-group, table-footer-group,
									table-header-group, table-row,
									table-row-group, flex
								</td>
							</tr>
							<tr>
								<td class="td-line">visibility</td>
								<td>visible, hidden, collapse</td>
							</tr>
							<tr>
								<td rowspan="4">4. 크기/간격</td>
								<td>width, max-width, min-width</td>
								<td>auto, length(px, em, rem), %</td>
							</tr>
							<tr>
								<td class="td-line">
									height, max-height, min-height
								</td>
								<td>auto, length(px, em, rem), %</td>
							</tr>
							<tr>
								<td class="td-line">margin</td>
								<td>auto, length(px, em, rem), %</td>
							</tr>
							<tr>
								<td class="td-line">padding</td>
								<td>auto, length(px, em, rem), %</td>
							</tr>
							<tr>
								<td rowspan="3">5. 박스모양</td>
								<td>border</td>
								<td>
									border-width, border-style, border-color
								</td>
							</tr>
							<tr>
								<td class="td-line">border-radius</td>
								<td>length(px, em, rem), %</td>
							</tr>
							<tr>
								<td class="td-line">background</td>
								<td>
									background-color, background-image,
									background-repeat, background-attachment,
									background-position, background-size
								</td>
							</tr>
							<tr>
								<td rowspan="4">6. 글꼴/정렬</td>
								<td>color</td>
								<td>hex_number</td>
							</tr>
							<tr>
								<td class="td-line">font</td>
								<td>
									font-style, font-variant, font-weigth,
									font-size/line-height, font-family,
									letter-spacing
								</td>
							</tr>
							<tr>
								<td class="td-line">text-align</td>
								<td>left, right, center, justify</td>
							</tr>
							<tr>
								<td class="td-line">vertical-align</td>
								<td>top, middle, bottom, baseline</td>
							</tr>
							<tr>
								<td>7. 기타</td>
								<td />
								<td>
									언급되지 않은 속성들은 후순위로 적용한다.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!-- // box -->
		</div>
		<!-- // guide-content -->
	</div>
</template>

<script lang="ts">
// import Prism from 'prismjs'
// import 'prismjs/themes/prism.css'
import { defineComponent, onMounted } from 'vue';
import Header from '@/views/layout/Header.vue';
import GuideNav from '@/views/layout/GuideNav.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'convention',
	components: {
		Header,
		GuideNav,
	},
	setup() {
		const route = useRoute();
		const pageTitle = route.path.replace(/^.*\//, '');

		onMounted(() => {
			// Prism.highlightAll()
		});

		return {
			pageTitle,
		};
	},
});
</script>
<style lang="scss" scoped></style>
