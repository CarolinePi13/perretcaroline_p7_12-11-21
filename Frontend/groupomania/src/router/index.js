import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Wall from '../views/Wall.vue'
import updatePost from "../components/modifyPost.vue"
import user from "../views/UserProfile.vue"

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
    path: "/user",
    name: "User",
    component: user,
    props: true
  },
  {
    path:"/updatePost",
    name:"UpdatePost",
    component: updatePost,
    props:true
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
