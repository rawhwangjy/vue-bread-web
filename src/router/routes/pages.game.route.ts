const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')

const games = () => import(/* webpackChunkName: "pageGame" */ '@/views/pages/game/games.vue')

export default {
  path: '/games',
  component: container,
  children: [
    {
      path: '/games',
      name: 'games',
      component: games
    }
  ]
}
