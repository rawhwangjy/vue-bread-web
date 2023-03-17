const container = () => import(/* webpackChunkName: "pages" */ '@/views/pages/_pageContainer.vue')

const signup = () => import(/* webpackChunkName: "pages" */ '@/views/pages/member/signup.vue')
const signupComplete = () => import(/* webpackChunkName: "pages" */ '@/views/pages/member/signupComplete.vue')
const signin = () => import(/* webpackChunkName: "pages" */ '@/views/pages/member/signin.vue')
const signinComplete = () => import(/* webpackChunkName: "pages" */ '@/views/pages/member/signinComplete.vue')
const signoutComplete = () => import(/* webpackChunkName: "pages" */ '@/views/pages/member/signoutComplete.vue')

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
      path: '/signout',
      component: signoutComplete
    }
  ]
}
