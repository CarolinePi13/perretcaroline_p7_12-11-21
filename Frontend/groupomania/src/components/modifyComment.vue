<template>
  <div class="modify-bg">
    <div class="mod-card">
      <div class="supp">
        <img
          src="../assets/4115230-cancel-close-cross-delete_114048.svg"
          alt="close window"
          class="close"
          @click="close"
        />
      </div>
      <div class="new-comment_text">
        <form action="submit" class="form" @submit.prevent="updateAComment()">
          <textarea
            class="to-publish"
            type="text"
            placeholder="écrivez votre texte
                ici..."
            oninput='this.style.height = "";this.style.height =
                this.scrollHeight + "px"'
            rows:10
            max-length:1200
            min-length:1
            v-model="content"
          />
          <input type="submit" value="Publier" class="publier" />
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "modifyComment",
  props: ["comment"],
  emits: ["cancelUpdate"],
  data() {
    return {
      content: this.comment.content,
      commentId: this.comment.id,
      token: "",
      userId: "",
    };
  },
  methods: {
    getLocalStorage() {
      this.userId = localStorage.getItem("userId");
      this.token = localStorage.getItem("token");
    },
    close() {
      this.$emit("cancelUpdate");
    },
    updateAComment() {
      this.getLocalStorage();
      let id = this.commentId;

      let content = this.content;
      axios({
        method: "PUT",
        url: `http://localhost:3000/api/comments/${id}`,
        body: content,
        headers: {
          authorization: `Bearer ${this.token}`,

          "content-type": "application/json",
        },
      })
        .then(function (response) {
          console.log(response);
        })

        .catch(function (response) {
          //handle error
          console.log(response);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.mod-card {
  width: 95%;
  height: 300px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  flex-direction: column;
}
.modify-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(168, 140, 141, 1);
  img {
  }
}
.to-publish {
  width: 90%;
  height: 90%;
}
.new-comment_text {
  width: 100%;
  height: inherit;
}
.supp {
  align-self: flex-end;
  margin: 1px;
}
.form {
  height: 100%;
  width: 100%;
  justify-content: space-around;
}
</style>
