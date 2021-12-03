<template>
  <createPost />
  <post
    @toggleComments="displayComments"
    @toggleNewComment="displayWriteNewComment"
  />
  <div class="new-comment" v-if="writeComment">
    <createComment @closeWriteComment="displayWriteNewComment" />
  </div>

  <div v-if="showComments">
    <comments />
  </div>
</template>

<script>
import post from "../components/Post.vue";
import comments from "../components/comment.vue";
import createPost from "../components/CreatePost.vue";
import createComment from "../components/CreateComment.vue";
export default {
  name: "Wall",

  data() {
    return {
      showComments: false,
      writeComment: false,
    };
  },
  components: {
    post,
    comments,
    createPost,
    createComment,
  },
  methods: {
    displayComments() {
      this.showComments = !this.showComments;
    },
    displayWriteNewComment() {
      this.writeComment = !this.writeComment;
    },
  },
};
</script>
<style lang=""></style>
