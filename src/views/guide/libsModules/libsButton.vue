<template>
	<Header />
	<div class="guide-body">
		<GuideNav />
		<div class="guide-content">
			<h2 class="guide-title">{{ pageTitle }}</h2>
			<div class="box">
				<div class="api-box">
					<h3>공통 API</h3>
					<table class="api-table">
						<thead>
							<tr>
								<th scope="col">Required</th>
								<th scope="col">Options</th>
								<th scope="col">Params</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<em class="icon-required required">필수</em>
								</td>
								<th scope="row">Reset Class</th>
								<td>btn</td>
							</tr>
							<tr>
								<td>
									<em class="icon-required">선택</em>
								</td>
								<th scope="row">Size Class</th>
								<td>xs | sm | md | lg | xl | custom class</td>
							</tr>
							<tr>
								<td>
									<em class="icon-required">선택</em>
								</td>
								<th scope="row">Style Class</th>
								<td>
									primary | secondary | dark | light | custom
									class
								</td>
							</tr>
							<tr>
								<td>
									<em class="icon-required">선택</em>
								</td>
								<th scope="row">Border Radius Class</th>
								<td>border</td>
							</tr>
						</tbody>
					</table>
					<p class="notice-dot">
						공통 버튼 디자인이 아닐 경우, "btn-" 접두사를 붙여
						커스텀 클래스를 작성할 수 있다.
					</p>
				</div>
				<!-- // .api-box -->
				<div class="lib-box">
					<h3>
						Size Class :
						<em class="font-primary">xs | sm | md | lg | xl</em>
						+ Style Class :
						<em class="font-primary">primary</em>
					</h3>
					<div class="example">
						<ul class="flex-box">
							<li>
								<em
									>Size :
									<span class="font-primary">xs</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>primary</span
									></em
								>
								<button
									type="button"
									class="btn xs primary"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">sm</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>primary</span
									></em
								>
								<button
									type="button"
									class="btn sm primary"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">md</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>primary</span
									></em
								>
								<button
									type="button"
									class="btn md primary"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">lg</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>primary</span
									></em
								>
								<button
									type="button"
									class="btn lg primary"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">xl</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>primary</span
									></em
								>
								<button
									type="button"
									class="btn xl primary"
								>
									Button text
								</button>
							</li>
						</ul>
					</div>
					<div class="code">
						<pre>
  <code class="language-html">
&lt;!-- Extra Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xs primary&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn sm primary&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Medium --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn md primary&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn lg primary&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Extra Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xl primary&quot;&gt;Button text&lt;/button&gt;
  </code>
</pre>
					</div>
				</div>
				<!-- // .lib-box -->
				<div class="lib-box">
					<h3>
						Size Class :
						<em class="font-primary">xs | sm | md | lg | xl</em>
						+ Style Class :
						<em class="font-primary">secondary</em>
					</h3>
					<div class="example">
						<ul class="flex-box">
							<li>
								<em
									>Size :
									<span class="font-primary">xs</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>secondary</span
									></em
								>
								<button
									type="button"
									class="btn xs secondary"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">sm</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>secondary</span
									></em
								>
								<button
									type="button"
									class="btn sm secondary"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">md</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>secondary</span
									></em
								>
								<button
									type="button"
									class="btn md secondary"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">lg</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>secondary</span
									></em
								>
								<button
									type="button"
									class="btn lg secondary"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">xl</span></em
								>
								<em
									>Style :
									<span class="font-primary"
										>secondary</span
									></em
								>
								<button
									type="button"
									class="btn xl secondary"
								>
									Button text
								</button>
							</li>
						</ul>
					</div>
					<div class="code">
						<pre>
  <code class="language-html">
&lt;!-- Extra Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xs secondary&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn sm secondary&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Medium --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn md secondary&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn lg secondary&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Extra Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xl secondary&quot;&gt;Button text&lt;/button&gt;
  </code>
</pre>
					</div>
				</div>
				<!-- // .lib-box -->
				<div class="lib-box">
					<h3>
						Size Class :
						<em class="font-primary">xs | sm | md | lg | xl</em>
						+ Style Class :
						<em class="font-primary">dark</em>
					</h3>
					<div class="example">
						<ul class="flex-box">
							<li>
								<em
									>Size :
									<span class="font-primary">xs</span></em
								>
								<em
									>Style :
									<span class="font-primary">dark</span></em
								>
								<button
									type="button"
									class="btn xs dark"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">sm</span></em
								>
								<em
									>Style :
									<span class="font-primary">dark</span></em
								>
								<button
									type="button"
									class="btn sm dark"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">md</span></em
								>
								<em
									>Style :
									<span class="font-primary">dark</span></em
								>
								<button
									type="button"
									class="btn md dark"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">lg</span></em
								>
								<em
									>Style :
									<span class="font-primary">dark</span></em
								>
								<button
									type="button"
									class="btn lg dark"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">xl</span></em
								>
								<em
									>Style :
									<span class="font-primary">dark</span></em
								>
								<button
									type="button"
									class="btn xl dark"
								>
									Button text
								</button>
							</li>
						</ul>
					</div>
					<div class="code">
						<pre>
  <code class="language-html">
&lt;!-- Extra Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xs dark&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn sm dark&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Medium --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn md dark&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn lg dark&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Extra Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xl dark&quot;&gt;Button text&lt;/button&gt;
  </code>
</pre>
					</div>
				</div>
				<!-- // .lib-box -->
				<div class="lib-box">
					<h3>
						Size Class :
						<em class="font-primary">xs | sm | md | lg | xl</em>
						+ Style Class :
						<em class="font-primary">light</em>
					</h3>
					<div class="example">
						<ul class="flex-box">
							<li>
								<em
									>Size :
									<span class="font-primary">xs</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn xs light"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">sm</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn sm light"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">md</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn md light"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">lg</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn lg light"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">xl</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn xl light"
								>
									Button text
								</button>
							</li>
						</ul>
					</div>
					<div class="code">
						<pre>
  <code class="language-html">
&lt;!-- Extra Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xs light&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn sm light&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Medium --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn md light&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn lg light&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Extra Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xl light&quot;&gt;Button text&lt;/button&gt;
  </code>
</pre>
					</div>
				</div>
				<!-- // .lib-box -->
				<div class="lib-box">
					<h3>
						Size Class :
						<em class="font-primary">xs | sm | md | lg | xl</em>
						+ Style Class :
						<em class="font-primary">primary</em>
						+ Border Radius Class :
						<em class="font-primary">border</em>
					</h3>
					<div class="example">
						<ul class="flex-box">
							<li>
								<em
									>Size :
									<span class="font-primary">xs</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn xs primary border"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">sm</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn sm primary border"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">md</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn md primary border"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">lg</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn lg primary border"
								>
									Button text
								</button>
							</li>
							<li>
								<em
									>Size :
									<span class="font-primary">xl</span></em
								>
								<em
									>Style :
									<span class="font-primary">light</span></em
								>
								<button
									type="button"
									class="btn xl primary border"
								>
									Button text
								</button>
							</li>
						</ul>
					</div>
					<div class="code">
						<pre>
  <code class="language-html">
&lt;!-- Extra Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xs primary border&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Small --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn sm primary border&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Medium --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn md primary border&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn lg primary border&quot;&gt;Button text&lt;/button&gt;

&lt;!-- Extra Large --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn xl primary border&quot;&gt;Button text&lt;/button&gt;
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
import { defineComponent, onMounted } from 'vue';
import Header from '@/views/layout/Header.vue';
import GuideNav from '@/views/layout/GuideNav.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'libsButton',
	components: {
		Header,
		GuideNav,
	},
	setup() {
		const route = useRoute();
		const pageTitle = route.path.replace(/^.*\//, '');
		onMounted(() => {
			Prism.highlightAll();
		});
		return {
			pageTitle,
		};
	},
});
</script>
<style lang="scss" scoped></style>
