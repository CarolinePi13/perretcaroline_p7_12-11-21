<template>
  <div class="modify-bg">
    <transition name="slide" appear>
      <div class="mod-card shadow">
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
            <input type="submit" class="button" value="Publier" />
          </form>
        </div>
      </div>
    </transition>
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

      let body = {
        content: content,
      };
      console.log(body);

      axios({
        method: "PUT",
        url: `http://localhost:3000/api/comments/${id}`,
        data: body,
        headers: {
          authorization: `Bearer ${this.token}`,

          "content-type": "application/json",
        },
      })
        .then(function (response) {
          document.location.reload();
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
.to-publish {
  min-height: 350px;
  max-height: 600px;
}
.new-comment_text {
  width: 100%;
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
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>
