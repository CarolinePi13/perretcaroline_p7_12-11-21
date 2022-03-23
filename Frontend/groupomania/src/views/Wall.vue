<template>
  <div class="wall">
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
    getLocalStorage() {
      this.userId = localStorage.getItem("userId");
      this.token = localStorage.getItem("token");
    },

    updatePosts() {
      this.getAllPosts();
    },
    displayCurrentUser() {
      this.getLocalStorage();
      let self = this;
      axios({
        method: "GET",
        url: `https://carolinep13-groupomania.herokuapp.com/api/user/${this.userId}`,
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((response) => (self.currentUserData = response.data.user))
        .then(function (response) {
          //handle success
          console.log(response);
          console.log(self.currentUserData.userName);
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            // The request was made and the server responded with a status code
            localStorage.clear();
            this.$router.push("/");
          } else if (error.request) {
            // The request was made but no response was received

            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    getAllPosts() {
      this.getLocalStorage();

      axios({
        method: "GET",
        url: `https://carolinep13-groupomania.herokuapp.com/api/posts`,
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
        .catch(function (error) {
          if (error.response.status === 401) {
            // The request was made and the server responded with a status code
            localStorage.clear();
            this.$router.push("/");
          } else if (error.request) {
            // The request was made but no response was received

            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
  },
  beforeMount() {
    this.getAllPosts();
    this.displayCurrentUser();
  },
};
</script>
<style lang="scss"></style>
