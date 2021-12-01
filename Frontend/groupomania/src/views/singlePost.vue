<template>
  <div>
    <post />
    <comments />
  </div>
</template>
<script>
import post from "../components/Post.vue";
import comments from "../components/comment.vue";

export default {
  name: "SinglePost",
  components: {
    post,
    comments,
  },
};
</script>
