<template>
  <article>
    <div class="post-card shadow">
      <!--this module allows modify and delete-->
      <SuppModModule
        v-if="showModule"
        @deleteOrConfirm="deletePost(post.id)"
        @updateThis="toggleUpdatePost"
        :key="post.id"
      />
      <!--contains all user Data-->
      <div class="user-data">
        <img :src="postUserData.avatar" alt="user avatar" class="user-avatar" />
        <p class="user-name">{{ postUserData.userName }}</p>
        <!--click on the dots to open the delete/modify module for admin and user -->
        <img
          src="../assets/three-dots-more-indicator_icon-icons.com_72518.svg"
          alt="bouton déroulant trois petits points"
          class="three-dots"
          @click="showIfAllowed()"
        />
      </div>
      <span class="time">{{ postTime }}</span>
      <div class="post-content" @click="closeSuppModModule()">
        <!--affiche l'image si il y en a une-->
        <div class="show-img" v-show="post.imageUrl !== null">
          <img :src="post.imageUrl" alt="image du poste" />
        </div>
        <!--affiche le texte si il y en a un-->
        <div class="post-text">
          <p v-if="post.content !== 'undefined'">
            {{ post.content }}
          </p>
        </div>
      </div>
      <!--displays comments and like count-->
      <div class="comment-count">
        <p>{{ numberOfComments }} commentaire(s)</p>
        <p>{{ totalLikes }} j'aime(s)</p>
      </div>
      <div class="post-actions">
        <!--affiche les commemtaires-->
        <div class="unfold">
          <img
            src="../assets/downarrow_120663.png"
            alt="afficher les commentaires"
            aria-label="afficher les commentaires"
            class="down-arrow"
            @click="toggleComments()"
          />
        </div>
        <!--affiche le composant pour ecrire un commantaire-->
        <div class="comment-button" @click="displayWriteNewComment">
          <img src="../assets/commentmono_105952.svg" alt="click to comment" />
          <p>Commenter</p>
        </div>
        <!--click ici pour like ou unlike-->
        <div class="likes">
          <i
            class="fas fa-thumbs-up like-button like-button--plein"
            v-if="thisUserliked"
            aria-label="dislike"
            @click="unlikePost()"
          ></i>

          <i
            class="far fa-thumbs-up like-button like-button--vide"
            aria-label="like"
            @click="likePost()"
            v-if="!thisUserliked"
          ></i>
        </div>
      </div>
      <!--unfold comments -->
      <div v-if="showComments" class="comments-card">
        <comments
          v-for="comment in comments"
          :comment="comment"
          :key="comment.id"
          @reloadComms="getAllComments"
        />
      </div>
      <div class="new-comment" v-if="writeComment">
        <createComment
          @closeWriteComment="displayWriteNewComment"
          :postId="postId"
          @reloadComms="getAllComments"
        />
      </div>
    </div>
  </article>
  <!--affiche le composant de modification du post-->
  <transition name="fade" appear>
    <modifyPost
      :post="post"
      v-if="modifyPostShow"
      @cancelUpdate="modifyPostShow = false"
    />
  </transition>
  <div id="modals"></div>
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
      postId: this.post.id, // gets the id of the post
      postUserId: this.post.userId, //gets the user that created the post
      token: "",
      userId: "",
      comments: "", // gatters all comments to pass to the comments components
      numberOfComments: "", // allows to display the total number of comments
      postUserData: "", // data about the user who wrote the post
      totalLikes: 0,
      modifyPostShow: false, //allows to display the modify post component
      thisUserliked: "", // allows to display full or empty thumb up if user likes the specific post or not
      isAdmin: "",
      postTime: "", // allows to display the post time
    };
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    displayWriteNewComment() {
      this.writeComment = !this.writeComment;
    },

    formatDate() {
      //to display the date in french in a standard format
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      let d = new Date(this.post.createdAt);
      const date = d.toLocaleDateString("fr-FR", options);
      console.log(date);
      this.postTime = date;
    },

    getLocalStorage() {
      // fecthes data in local storage
      this.userId = localStorage.getItem("userId");
      this.token = localStorage.getItem("token");
      this.isAdmin = localStorage.getItem("isAdmin");
    },
    toggleUpdatePost() {
      this.modifyPostShow = !this.modifyPostShow;
      this.showModule = false;
    },
    closeSuppModModule() {
      this.showModule = false;
    },
    showIfAllowed() {
      // will display the delete/modify module if user created the post or is admin
      if ((this.showModule == false) & (this.userId == this.post.userId)) {
        return (this.showModule = true);
      } else if ((this.showModule == false) & (this.isAdmin == "true")) {
        return (this.showModule = true);
      } else {
        return (this.showModule = false);
      }
    },
    likePost() {
      let body = {
        userId: this.userId,
        vote: 1,
        postId: this.postId,
      };
      axios({
        method: "POST",
        url: `https://carolinep13-groupomania.herokuapp.com/api/posts/vote-post`,
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
    getThisPostsVotes() {
      //to display all votes for the post
      let PostId = this.postId;

      axios({
        method: "GET",
        url: `https://carolinep13-groupomania.herokuapp.com/api/posts/all-votes-post/${PostId}`,

        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          this.totalLikes = res.data.length;
          this.allLikes = res.data;
        })

        .catch((err) => {
          console.log(err);
        });
    },
    getOneVote() {
      // to display wether or not the user likes this post or not
      let id = this.postId;

      axios({
        method: "GET",
        url: `https://carolinep13-groupomania.herokuapp.com/api/posts/one-vote/${id}`,

        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.id) {
            this.thisUserliked = true;
          } else {
            this.thisUserliked = false;
          }
        })

        .catch((err) => {
          console.log(err);
        });
    },

    unlikePost() {
      // removes the vote
      let id = this.postId;
      axios({
        method: "DELETE",
        url: `https://carolinep13-groupomania.herokuapp.com/api/posts/vote-post/${id}`,

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
      //remove the post
      const self = this;
      this.getLocalStorage();

      axios({
        method: "DELETE",
        url: `https://carolinep13-groupomania.herokuapp.com/api/posts/${id}`,

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
      // collects data form the user that created the post
      this.getLocalStorage();
      const id = this.postUserId;

      axios({
        method: "GET",
        url: `https://carolinep13-groupomania.herokuapp.com/api/user/${id}`,
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
      // collects all comments for that post
      let self = this;
      axios({
        method: "GET",
        url: `https://carolinep13-groupomania.herokuapp.com/api/comments/posts/${this.postId}`,

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
  },

  created() {
    this.getLocalStorage();
    this.getPostUserData();
    this.getThisPostsVotes();
    this.formatDate();
  },
  mounted() {
    this.getAllComments();
    this.getOneVote();
  },
  computed: {},
};
</script>
<style scoped lang="scss">
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

.post-actions {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: rgba(204, 90, 90, 0.65);
  border-radius: 0 0 15px 15px;
  @media (min-width: 620px) {
    height: 50px;
  }
  @media (min-width: 1600px) {
    height: 60px;
  }
}
.user-data {
  display: flex;
  align-items: center;
  width: 90%;
  @media (min-width: 620px) {
    font-size: 1.3em;
    margin-top: 10px;
  }
  @media (min-width: 1600px) {
    margin-top: 20px;
  }
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
  width: 90%;
  align-items: center;
  margin-top: 10px;

  img {
    width: 100%;
    height: auto;
    max-width: 250px;
    @media (min-width: 620px) {
      max-width: 350px;
      max-height: 450px;
    }
    @media (min-width: 920px) {
      max-width: 450px;
    }
    @media (min-width: 1600px) {
      max-width: 550px;
      max-height: 550px;
    }
  }
}
.post-text {
  font-size: 14px;
  width: 100%;
  font-size: 1.1em;
  margin-bottom: 30px;
  margin-top: 10px;
  white-space: pre-wrap;
  @media (min-width: 620px) {
    font-size: 1.3em;
  }
  @media (min-width: 1600px) {
    font-size: 1.6em;
  }
  p {
    margin: 0;
    background-color: lighten(rgba(204, 90, 90, 0.65), 40%);
    box-shadow: 1px 1px 3px 1px rgba(0.4, 0.4, 0.4, 0.4);
    border-radius: 8px;
    padding: 15px;
  }
}

.user-avatar {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin-top: 5px;
  @media (min-width: 620px) {
    height: 70px;
    width: 70px;
  }
  @media (min-width: 1600px) {
    height: 90px;
    width: 90px;
  }
}

.comment-count {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  @media (min-width: 620px) {
    font-size: 1.1em;
  }
}
div.comment-count > p {
  margin: 0 2% 1% 2%;
}
</style>
