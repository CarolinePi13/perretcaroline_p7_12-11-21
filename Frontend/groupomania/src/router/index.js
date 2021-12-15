import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Wall from '../views/Wall.vue'
import admin from '../views/admin.vue'
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
    path:"/admin",
    name:"admin",
    component: admin

  }

  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
