const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')

const signup = () => import(/* webpackChunkName: "pages" */ '@/views/pages/signup/signup.vue')
const signupComplete = () => import(/* webpackChunkName: "pages" */ '@/views/pages/signup/signupComplete.vue')
const signin = () => import(/* webpackChunkName: "pages" */ '@/views/pages/signup/signin.vue')
const signinComplete = () => import(/* webpackChunkName: "pages" */ '@/views/pages/signup/signinComplete.vue')
const signoutComplete = () => import(/* webpackChunkName: "pages" */ '@/views/pages/signup/signoutComplete.vue')

export default {
  path: '/signup',
  component: container,
  children: [
    {
      path: '/signup',
      component: signup
    },
    {
      path: '/signup/complete',
      component: signupComplete
    },
    {
      path: '/signin',
      component: signin
    },
    {
      path: '/signin/complete',
      component: signinComplete
    },
    {
      path: '/signout/complete',
      component: signoutComplete
    }
  ]
}
