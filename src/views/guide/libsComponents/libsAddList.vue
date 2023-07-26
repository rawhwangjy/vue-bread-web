<template>
	<Header />
	<div class="guide-body">
		<GuideNav />
		<div class="guide-content">
			<h2 class="guide-title">{{ pageTitle }}</h2>
			<div class="box">
				<div class="api-box">
					<h3>공통 API</h3>
					<h4>Basic</h4>
					<table class="api-table">
						<colgroup>
							<col class="width20" />
							<col class="width25" />
							<col class="widthAll" />
							<col class="width20" />
						</colgroup>
						<thead>
							<tr>
								<th scope="col">Required</th>
								<th scope="col">Options</th>
								<th scope="col">Params</th>
								<th scope="col">Default</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<em class="icon-required required">필수</em>
								</td>
								<th scope="row">v-model</th>
								<td>
									<span class="type-string"
										>Input Element</span
									>
								</td>
								<td class="td-center"></td>
							</tr>
							<tr>
								<td>
									<em class="icon-required required">선택</em>
								</td>
								<th scope="row">list-class</th>
								<td>
									<span class="type-string">String</span>
								</td>
								<td class="td-center">dot-list</td>
							</tr>
							<tr>
								<td>
									<em class="icon-required required">선택</em>
								</td>
								<th scope="row">btn-text</th>
								<td>
									<span class="type-string">String</span>
								</td>
								<td class="td-center">등록</td>
							</tr>
							<tr>
								<td>
									<em class="icon-required required">선택</em>
								</td>
								<th scope="row">no-data-text</th>
								<td>
									<span class="type-string">String</span>
								</td>
								<td class="td-center">
									등록된 리스트가 없습니다.
								</td>
							</tr>
							<tr>
								<td>
									<em class="icon-required required">필수</em>
								</td>
								<th scope="row">@change</th>
								<td>
									<span class="type-object">Function</span>
								</td>
								<td class="td-center">onAddChange</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- // .api-box -->
				<div class="lib-box">
					<h3>Basic</h3>
					<div class="example">
						<AddList
							v-model="stringArray"
							list-class="dot-list"
							btn-text="등록"
							no-data-text="등록된 리스트가 없습니다."
							@change="onAddChange"
						/>
					</div>
					<div class="code">
						<pre>
  <code class="language-html">
&lt;template&gt;
  &lt;AddList
    v-model=&quot;stringArray&quot;
    list-class=&quot;dot-list&quot;
    btn-text=&quot;등록&quot;
    no-data-text=&quot;등록된 리스트가 없습니다.&quot;
    @change=&quot;onAddChange&quot;
  /&gt;
&lt;/template&gt;

&lt;script&gt;
  import AddList from '@/components/AddList.vue'

  const stringArray = ref&lt;string[]&gt;([])
  function onAddChange (value: string[]) {
    stringArray.value = value
  }
&lt;/script&gt;
  </code>
</pre>
					</div>
				</div>
				<!-- // .lib-box -->
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
import AddList from '@/components/AddList.vue';

export default defineComponent({
	name: 'libsAddList',
	components: {
		Header,
		GuideNav,
		AddList,
	},
	setup() {
		const route = useRoute();
		const pageTitle = route.path.replace(/^.*\//, '');

		onMounted(() => {
			Prism.highlightAll();
		});

		const stringArray = ref<string[]>([]);
		function onAddChange(value: string[]) {
			stringArray.value = value;
		}
		return {
			pageTitle,
			stringArray,
			onAddChange,
		};
	},
});
</script>
<style lang="scss" scoped></style>
