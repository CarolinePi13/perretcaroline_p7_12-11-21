<template>
  <div class="isLoggedIn position">
    <createPost :currentUserData="currentUserData" />
    <postCard
      v-for="post in Posts"
      :key="post.id"
      :post="post"
      @reloadPosts="updatePosts"
      :currentUserData="currentUserData"
    />
  </div>
</template>

<script>
import createPost from "../components/CreatePost.vue";
import postCard from "../components/Post.vue";
import axios from "axios";
export default {
  name: "Wall",

  data() {
    return {
      Posts: "",
      userId: "",
      token: "",
      currentUserData: "",
    };
  },
  components: {
    postCard,

    createPost,
  },
  methods: {
    logged() {
      this.isLoggedIn = true;
    },
    getLocalStorage() {
      this.userId = localStorage.getItem("userId");
      this.token = localStorage.getItem("token");
    },

    updatePosts() {
      this.getAllPosts();
    },
    displayCurrentUser() {
      this.getLocalStorage();
      axios({
        method: "GET",
        url: `http://localhost:3000/api/user/${this.userId}`,
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((response) => (this.currentUserData = response.data))
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error

          console.log(response);
        });
    },
    getAllPosts() {
      axios({
        method: "GET",
        url: `http://localhost:3000/api/posts`,
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "multipart/form-data",
        },
      })
        .then((response) => (this.Posts = response.data))
        .then(function (response) {
          //handle success

          console.log(response);
        })
        .catch(function (response) {
          //handle error

          console.log(response);
        });
    },
  },
  beforeMount() {
    this.getAllPosts();
    this.displayCurrentUser();
  },
};
</script>
<style lang="scss">
.position {
  position: relative;
}
</style>
