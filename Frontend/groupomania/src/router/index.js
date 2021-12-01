import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Wall from '../views/Wall.vue'
import SinglePost from "../views/singlePost.vue"
import user from "../views/UserProfile.vue"
import CreatePost from "../views/CreatePost.vue"
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: "/wallposts",
    name: "Wall",
    component: Wall
  },
  {
    path: "/wallposts/boot",
    name: "SinglePost",
    component: SinglePost,
    props: true
  },
  {
    path: "/user",
    name: "User",
    component: user,
    props: true
  },
  {
    path: "/CreatePost",
    name: "CreatePost",
    component: CreatePost,
    props: true
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
