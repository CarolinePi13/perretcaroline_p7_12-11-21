<template>
  <div class="isLoggedIn">
    <createPost />
    <postCard v-for="post in Posts" :key="post.id" :post="post" />
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
  },
  beforeMount() {
    const getAllPosts = () => {
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
    };
    getAllPosts();
  },
};
</script>
<style lang=""></style>
