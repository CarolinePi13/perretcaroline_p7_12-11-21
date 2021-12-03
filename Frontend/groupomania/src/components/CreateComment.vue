<template>
  <div class="supp">
    <img
      src="../assets/4115230-cancel-close-cross-delete_114048.svg"
      alt="close window"
      class="close"
      @click="closeComment"
    />
  </div>
  <div class="new-comment_text">
    <form action="submit">
      <textarea
        class="to-publish"
        type="text"
        placeholder="écrivez votre texte ici..."
        oninput='this.style.height = "";this.style.height =
      this.scrollHeight + "px"'
        rows:10
        max-length:1200
        min-length:1
      />
      <input type="submit" value="Publier" class="publier" />
    </form>
  </div>
</template>
<script>
export default {
  name: "CreateComment",
  components: {},
  data() {
    return {};
  },
  methods: {
    closeComment() {
      this.$emit("closeWriteComment");
    },
  },
};
</script>
<style lang="scss">
.new-comment {
  width: 90%;
  height: fit-content;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  background-color: white;
  border-radius: 0 0 15px 15px;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 1.5px;
}
.to-publish {
  width: 90%;
  border-radius: 8px;
  min-height: 60px;
  height: fit-content;
  margin-bottom: 10px;
}
.smaller-dots {
  height: 15px;
  width: 15px;
}
.supp {
  display: flex;
  justify-content: flex-end;
  margin: 5px;
}
textarea {
  resize: none;
}
form {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.new-comment_text {
  margin-bottom: 10px;
}
.close {
  cursor: pointer;
}
</style>
