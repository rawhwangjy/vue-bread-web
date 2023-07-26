const container = () =>
	import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue');

const game = () =>
	import(/* webpackChunkName: "pageGame" */ '@/views/pages/game/game.vue');

export default {
	path: '/game',
	component: container,
	children: [
		{
			path: '/game',
			name: 'game',
			component: game,
		},
	],
};
