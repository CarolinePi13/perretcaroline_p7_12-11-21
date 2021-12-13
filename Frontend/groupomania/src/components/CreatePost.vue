<template>
  <div class="post-card shadow">
    <img
      src="../assets/4115230-cancel-close-cross-delete_114048.svg"
      alt="close window"
      class="close"
      v-if="writeIsClicked"
      @click="close"
    />
    <div class="post-top">
      <div class="createPost-user-data">
        <img
          :src="currentUserData.avatar"
          alt="user avatar"
          class="user-avatar"
        />
        <p class="user-name">{{ currentUserData.userName }}</p>
      </div>
      <div class="new-post" v-if="!writeIsClicked">
        <img
          src="../assets/write-smth.svg"
          alt="click to write a post"
          @click="toggleWriteAPost"
        />
      </div>
    </div>

    <div class="post-text" v-if="writeIsClicked">
      <img v-if="url" :src="url" alt="image du post" class="post-image" />
      <form action="submit" @submit.prevent="createANewPost" ref="newPost">
        <textarea
          v-model="postData.content"
          class="to-publish"
          type="text"
          placeholder="écrivez votre texte ici..."
          ref="newPost"
        />
        <input type="submit" value="Publier" class="publier button" />
      </form>
    </div>

    <div class="upload-file" v-if="writeIsClicked">
      <label for="add-img" class="label-img">
        <input
          type="file"
          id="add-img"
          v-show="hideInputOn"
          @change="addFile"
        />
        <img
          src="../assets/frame_gallery_image_images_photo_picture_pictures_icon_123209.svg"
          alt="down"
          aria-label="afficher les commentaires"
          class="add-img"
        />
        <span>Ajoutez une image</span>
      </label>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CreatePost",
  props: ["currentUserData"],
  components: {},
  data() {
    return {
      writeIsClicked: false,
      hideInputOn: false,
      url: null,
      postData: [
        {
          content: "",
          image: "",
          userId: "",
        },
      ],
      token: "",
    };
  },
  methods: {
    toggleWriteAPost() {
      this.writeIsClicked = !this.writeIsClicked;
    },
    close() {
      this.writeIsClicked = !this.writeIsClicked;
      this.url = "";
    },
    getLocalStorage() {
      this.postData.userId = localStorage.getItem("userId");
      this.token = localStorage.getItem("token");
    },
    previewImg() {
      const file = this.postData.image;
      this.url = URL.createObjectURL(file);
    },
    addFile(e) {
      this.postData.image = e.target.files[0];
      this.previewImg();
    },

    createANewPost() {
      this.getLocalStorage();
      let formData = new FormData();
      formData.append("content", this.postData.content);
      formData.append("image", this.postData.image);
      formData.append("userId", this.postData.userId);
      for (var value of formData.values()) {
        console.log(value);
      }
      var body = formData;
      axios({
        method: "POST",
        url: "http://localhost:3000/api/posts",
        data: body,
        headers: {
          authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log(response);
          document.location.reload();
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
  margin: auto;
  justify-content: space-around;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
}
img {
  height: 30px;
}
.upload-file {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  background-color: rgba(204, 90, 90, 0.65);
  border-radius: 0 0 15px 15px;
  p {
    cursor: pointer;
    color: black;
  }
}
.createPost-user-data {
  margin: 10px;
  display: flex;
  align-items: center;
  width: 90%;
}
input {
  border-radius: 8px;
}
.button {
  height: 30px;
  border-radius: 8px;
  background: linear-gradient(
    120deg,
    rgba(205, 120, 123, 0.65),
    rgba(216, 174, 174, 0.65),
    rgba(238, 236, 236, 0.65),
    rgba(175, 90, 93, 0.65)
  );
  padding: 5px;

  color: black;
  cursor: pointer;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;

  &:hover {
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  }
}

.post-text {
  width: 95%;
}
.three-dots {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}
.user-avatar {
  height: 75px;
  width: 75px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin-top: 5px;
}
form {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.user-name {
  font-size: 1.2em;
  margin-left: 5%;
}

.to-publish {
  width: 100%;
  min-height: 50px;
  max-height: 250px;
  margin-bottom: 10px;
  border-radius: 8px;
}
.publier {
  margin-bottom: 10px;
  width: 70px;
  height: 30px;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.add-img {
  margin-left: 10px;
  margin-right: 10px;
}
.new-post {
  img {
    height: 50px;
    margin-right: 10px;
  }
}
.post-top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.label-img {
  display: flex;
  align-items: center;
}
.post-image {
  width: 100%;
  height: auto;
}
</style>
