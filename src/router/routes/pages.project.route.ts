const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')

const projectList = () => import(/* webpackChunkName: "pageProject" */ '@/views/pages/project/projectList.vue')
const projectView = () => import(/* webpackChunkName: "pageProject" */ '@/views/pages/project/projectView.vue')
const projectCreate = () => import(/* webpackChunkName: "pageProject" */ '@/views/pages/project/projectCreate.vue')
const projectUpdate = () => import(/* webpackChunkName: "pageProject" */ '@/views/pages/project/projectUpdate.vue')

export default {
  path: '/project',
  component: container,
  children: [
    {
      path: '/project',
      name: 'projectList',
      component: projectList
    },
    {
      path: '/project/:id',
      name: 'projectView',
      component: projectView
    },
    {
      path: '/project/create',
      component: projectCreate
    },
    {
      path: '/project/update/:id',
      component: projectUpdate
    }
  ]
}
