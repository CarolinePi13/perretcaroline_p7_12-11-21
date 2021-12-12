<template>
  <div>
    <div class="post-card shadow">
      <SuppModModule
        v-if="showModule"
        @deleteOrConfirm="deletePost(post.id)"
        @updateThis="toggleUpdatePost"
        :key="post.id"
      />

      <div class="user-data">
        <img :src="postUserData.avatar" alt="user avatar" class="user-avatar" />
        <p class="user-name">{{ postUserData.userName }}</p>
        <img
          src="../assets/three-dots-more-indicator_icon-icons.com_72518.svg"
          alt=""
          class="three-dots"
          @click="showIfAllowed()"
        />
      </div>
      <div class="post-content">
        <div class="show-img" v-show="post.imageUrl !== null">
          <img :src="post.imageUrl" alt="Post image" />
        </div>

        <div class="post-text">
          <p>
            {{ post.content }}
          </p>
        </div>
      </div>
      <div class="comment-count">
        <p>{{ numberOfComments }} commentaire(s)</p>
        <p>{{ totalLikes }} j'aime(s)</p>
      </div>
      <div class="post-actions">
        <div class="unfold">
          <img
            src="../assets/downarrow_120663.png"
            alt="down"
            aria-label="afficher les commentaires"
            class="down-arrow"
            @click="toggleComments()"
          />
        </div>
        <div class="comment-button" @click="displayWriteNewComment">
          <img src="../assets/commentmono_105952.svg" alt="click to comment" />
          <p>Commenter</p>
        </div>
        <div class="likes">
          <i
            class="fas fa-thumbs-up like-button like-button--plein"
            v-if="thisUserliked"
            @click="unlikePost()"
          ></i>

          <i
            class="far fa-thumbs-up like-button like-button--vide"
            @click="likePost()"
            v-if="!thisUserliked"
          ></i>
        </div>
      </div>
      <div class="new-comment" v-if="writeComment">
        <createComment
          @closeWriteComment="displayWriteNewComment"
          :postId="postId"
          @reloadComms="getAllComments"
        />
      </div>
      <div v-if="showComments" class="comments-card">
        <comments
          v-for="comment in comments"
          :comment="comment"
          :key="comment.id"
          @reloadComms="getAllComments"
        />
      </div>
    </div>
  </div>
  <teleport to="#modals">
    <modifyPost
      :post="post"
      v-if="modifyPostShow"
      @cancelUpdate="modifyPostShow = false"
    />
  </teleport>
</template>
<script>
import SuppModModule from "./modal.vue";
import axios from "axios";
import createComment from "../components/CreateComment.vue";
import modifyPost from "../components/modifyPost.vue";

import comments from "../components/comment.vue";
export default {
  name: "PostCard",
  props: ["post", "currentUserData"],
  emits: ["reloadPosts"],
  components: {
    SuppModModule,
    createComment,
    comments,
    modifyPost,
  },
  data() {
    return {
      showComments: false,
      writeComment: false,
      showModule: false,
      postId: this.post.id,
      postUserId: this.post.userId,
      token: "",
      userId: "",
      comments: "",
      numberOfComments: "",
      modifyMode: false,
      postUserData: "",
      totalLikes: 0,
      modifyPostShow: false,
      thisUserliked: false,
      thisVoteId: "",
    };
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    displayWriteNewComment() {
      this.writeComment = !this.writeComment;
    },

    getLocalStorage() {
      this.userId = localStorage.getItem("userId");
      this.token = localStorage.getItem("token");
    },
    toggleUpdatePost() {
      this.modifyPostShow = !this.modifyPostShow;
    },
    likePost() {
      let body = {
        userId: this.userId,
        vote: 1,
        postId: this.postId,
      };
      axios({
        method: "POST",
        url: `http://localhost:3000/api/posts/vote-post`,
        data: body,
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          this.thisUserliked = !this.thisUserliked;

          console.log(res);
        })
        .then(() => {
          this.getThisPostsVotes();
        })

        .catch((err) => {
          console.log(err);
        });
    },
    getThisVoteId() {
      let postId = this.postId;
      axios({
        method: "GET",
        url: `http://localhost:3000/api/posts/vote-post/${postId}`,

        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          // this.thisVoteId = res.data.id;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getThisPostsVotes() {
      let PostId = this.postId;

      axios({
        method: "GET",
        url: `http://localhost:3000/api/posts/all-votes-post/${PostId}`,

        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          this.totalLikes = res.data.length;

          console.log(res);
        })

        .catch((err) => {
          console.log(err);
        });
    },

    unlikePost() {
      let id = this.postId;
      axios({
        method: "DELETE",
        url: `http://localhost:3000/api/posts/vote-post/${id}`,

        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          this.thisUserliked = false;
          console.log(res);
        })
        .then(() => {
          this.getThisPostsVotes();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletePost(id) {
      const self = this;
      this.getLocalStorage();
      console.log(id);

      axios({
        method: "DELETE",
        url: `http://localhost:3000/api/posts/${id}`,

        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          //handle success

          console.log(response);
          self.$emit("reloadPosts");
        })

        .catch((error) => {
          //handle error

          console.log(error);
        });
    },
    getPostUserData() {
      this.getLocalStorage();
      const id = this.postUserId;

      axios({
        method: "GET",
        url: `http://localhost:3000/api/user/${id}`,
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((response) => (this.postUserData = response.data.user))
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error

          console.log(response);
        });
    },
    getAllComments() {
      let self = this;
      axios({
        method: "GET",
        url: `http://localhost:3000/api/comments/posts/${this.postId}`,

        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "multipart/form-data",
        },
      })
        .then((response) => (this.comments = response.data))
        .then(function (response) {
          //handle success
          console.log(response);
          self.numberOfComments = response.length;
        })
        .catch(function (response) {
          //handle error

          console.log(response);
        });
    },
    showIfAllowed() {
      if ((this.showModule == false) & (this.userId == this.post.userId)) {
        return (this.showModule = true);
      } else {
        return (this.showModule = false);
      }
    },
  },
  created() {
    this.getPostUserData();
    this.getThisPostsVotes();
  },
  mounted() {
    this.getAllComments();
  },
  computed: {},
};
</script>
<style lang="scss">
.post-card {
  width: 95%;
  height: fit-content;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  background-color: rgba(205, 120, 123, 0.65);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  margin: 15px auto;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
img {
  height: 30px;
}
.post-actions {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: rgba(204, 90, 90, 0.65);
  border-radius: 0 0 15px 15px;
}
.user-data {
  display: flex;
  align-items: center;
  width: 90%;
}
input {
  border-radius: 8px;
}
button {
  height: 30px;
  border-radius: 8px;
  background: linear-gradient(
    120deg,
    rgba(205, 120, 123, 0.65),
    rgba(216, 174, 174, 0.65),
    rgba(238, 236, 236, 0.65),
    rgba(175, 90, 93, 0.65)
  );
}
.unfold {
  display: flex;
  align-items: center;

  margin-left: 3%;
}
.comments-card {
  width: 100%;
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
.down-arrow {
  height: 20px;
  padding-right: 5px;
  cursor: pointer;
}
.likes {
  display: flex;
  margin-right: 3%;
  justify-content: space-around;
  align-items: center;
}
.like-button {
  height: 30px;
  font-size: 1.8em;
  cursor: pointer;
}
.like-button:hover {
  transform: scale(1.1);
}
.comment-button {
  width: 150px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.comment-button > img {
  margin-right: 10px;
}
.post-content {
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: center;
  img {
    width: 100%;
    max-width: 250px;
    max-height: 250px;
    height: auto;
  }
}
.post-text {
  text-align: justify;
  font-size: 14px;
  width: 100%;
}
.three-dots {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}
.user-avatar {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin-top: 5px;
}

.user-name {
  font-size: 1.2em;
  margin-left: 5%;
}
.separation {
  width: 100%;
  border-bottom: 1px solid black;
  box-shadow: 0 1px gray;
}
.comment-count {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
div.comment-count > p {
  margin: 0 2% 1% 2%;
}
#modals {
  width: 100%;
  height: 100vh;
}
</style>
