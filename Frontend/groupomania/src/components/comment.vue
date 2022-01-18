<template>
  <div class="one_comment">
    <img
      :src="commentUserData.avatar"
      alt="user avatar"
      class="user-avatar--comment"
    />
    <div class="one_comment--text shadow">
      <div class="user-data--comment">
        <p class="user-name--comment">{{ commentUserData.userName }}</p>
        <!-- click on the treedots to display the delete/modify module-->
        <img
          src="../assets/three-dots-more-indicator_icon-icons.com_72518.svg"
          alt="bouton déroulant trois petits points"
          class="three-dots smaller-dots"
          @click="showIfAllowed()"
        />
      </div>
      <SuppModModule
        v-if="showModule"
        @updateThis="toggleUpdateComment"
        @deleteOrConfirm="deleteComment(comment.id)"
        :key="comment.id"
      />
      <div class="comment-text" @click="closeSuppModModule()">
        <p>
          {{ comment.content }}
        </p>
      </div>

      <!--  <div class="comment-likes">
        <p class="like-count">12</p>
        <img
          src="../assets/like_thumb_up_icon_empty.svg"
          alt="like button"
          class="comment-like-button"
        />
      </div>-->
    </div>
  </div>
  <teleport to="#modals" v-if="modifyCommentShow">
    <transition name="fade" appear>
      <modifyComment
        :comment="comment"
        :key="comment.id"
        @cancelUpdate="toggleUpdateComment()"
      />
    </transition>
  </teleport>
</template>
<script>
import modifyComment from "../components/modifyComment.vue";
import SuppModModule from "../components/modal.vue";
import axios from "axios";
export default {
  name: "comment",
  props: ["comment"], // the comment data itself is passed as a prop from the parent component Post.vue
  emits: ["reloadComms"],
  components: {
    SuppModModule,
    modifyComment,
  },
  data() {
    return {
      showModule: false,
      userId: "",
      token: "",
      commentUserData: "", // data of the user that writes the comment
      commentUserId: this.comment.userId,
      modifyCommentShow: false,
      isAdmin: "",
    };
  },
  methods: {
    closeSuppModModule() {
      this.showModule = false;
    },
    showIfAllowed() {
      // will display the delete/modify module if user created the comment or is admin
      if ((this.showModule == false) & (this.userId == this.comment.userId)) {
        return (this.showModule = true);
      } else if ((this.showModule == false) & (this.isAdmin == "true")) {
        return (this.showModule = true);
      } else {
        return (this.showModule = false);
      }
    },
    toggleUpdateComment() {
      this.modifyCommentShow = !this.modifyCommentShow;
      this.showModule = false;
    },

    getLocalStorage() {
      this.userId = localStorage.getItem("userId");
      this.token = localStorage.getItem("token");
      this.isAdmin = localStorage.getItem("isAdmin");
    },
    getCommentUserData() {
      // gets user name and avatar of this comment
      this.getLocalStorage();
      const id = this.commentUserId;

      axios({
        method: "GET",
        url: `http://localhost:3000/api/user/${id}`,
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((response) => (this.commentUserData = response.data.user))
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error

          console.log(response);
        });
    },
    deleteComment(id) {
      //allows to delete a comment
      const self = this;
      this.getLocalStorage();

      axios({
        method: "DELETE",
        url: `http://localhost:3000/api/comments/${id}`,

        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          //handle success

          console.log(response);
          self.$emit("reloadComms");
        })

        .catch((error) => {
          //handle error

          console.log(error);
        });
    },
  },
  created() {
    this.getCommentUserData();
  },
};
</script>
<style scoped lang="scss">
.one_comment {
  display: flex;
  margin: 3%;
  position: relative;
  width: 95%;
}
.one_comment--text {
  width: 100%;
  border-radius: 15px;
  background-color: rgba(146, 154, 173, 0.5);
  border: 1px solid gray;
  margin: auto;
}

p.user-name--comment {
  margin: 2%;
}
.user-data--comment {
  display: flex;
  align-items: center;
  @media (min-width: 620px) {
    font-size: 1.2em;
  }
}
.user-avatar--comment {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin: 2%;
}
.comment-text > p {
  white-space: pre-wrap;
  margin: 10px;
  font-size: 0.9em;
  @media (min-width: 620px) {
    font-size: 1.1em;
  }
}
.comment-likes {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.comment-like-button {
  height: 1.5em;
  margin: 0 10px 10px 10px;
}
p.like-count {
  margin: 0;
}
.shadow {
  box-shadow: 1px 1px 3px 1px rgb(94, 86, 86);
}
.smaller-dots {
  height: 20px;
  width: 20px;
  @media (min-width: 620px) {
    height: 30px;
    width: 30px;
    font-size: 1.1em;
  }
  @media (min-width: 1600px) {
    font-size: 1.2em;
  }
}
</style>
