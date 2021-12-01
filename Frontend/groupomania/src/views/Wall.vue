<template>
  <post @toggleComments="displayComments" />
  <div v-if="showComments">
    <comments />
  </div>
</template>

<script>
import post from "../components/Post.vue";
import comments from "../components/comment.vue";
export default {
  name: "SinglePost",

  data() {
    return {
      showComments: false,
    };
  },
  components: {
    post,
    comments,
  },
  methods: {
    displayComments() {
      this.showComments = !this.showComments;
    },
  },
};
</script>
<style lang=""></style>
