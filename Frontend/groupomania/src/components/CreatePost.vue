<template>
  <div class="post-card shadow">
    <!--cross to be clicked to close the create a post action-->
    <img
      src="../assets/4115230-cancel-close-cross-delete_114048.svg"
      alt="close window"
      class="close"
      v-if="writeIsClicked"
      @click="close"
    />
    <!--displays the name and avatar of the user currently logged in-->
    <div class="post-top">
      <div class="createPost-user-data">
        <img
          :src="currentUserData.avatar"
          alt="user avatar"
          class="user-avatar"
        />
        <p class="user-name">{{ currentUserData.userName }}</p>
      </div>
      <!--unfolds the textarea so that the user can create a post-->
      <div class="new-post" v-if="!writeIsClicked">
        <img
          src="../assets/write-smth.svg"
          alt="click to write a post"
          @click="toggleWriteAPost"
        />
      </div>
    </div>
    <!--text area to write the text-->
    <div class="post-text" v-if="writeIsClicked">
      <img v-if="url" :src="url" alt="image du post" class="post-image" />
      <form action="submit" @submit.prevent="createANewPost" ref="newPost">
        <textarea
          v-model="postData.content"
          class="to-publish"
          type="text"
          oninput='this.style.height = "";this.style.height =
                this.scrollHeight + "px"'
          placeholder="écrivez votre texte ici..."
          ref="newPost"
        />
        <input type="submit" value="Publier" class="publier button" />
      </form>
    </div>
    <!--the image is included in the label so that the input event is triggered on clicking the image-->
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
          alt="ajouter une image"
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
    //allows a preview of the file before posting it
    previewImg() {
      const file = this.postData.image;
      this.url = URL.createObjectURL(file);
    },
    addFile(e) {
      this.postData.image = e.target.files[0];
      this.previewImg();
    },
    // creating a new post
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
        url: "https://carolinep13-groupomania.herokuapp.com/api/posts",
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
  @media (min-width: 620px) {
    height: 50px;
  }
  @media (min-width: 1600px) {
    height: 60px;
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

.post-text {
  width: 95%;
  textarea {
    font-family: "Murecho", sans-serif;
    height: fit-content;
    font-size: 1.2em;
    @media (min-width: 1600px) {
      font-size: 1.6em;
    }
  }
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
  @media (min-width: 620px) {
    height: 70px;
    width: 70px;
  }
  @media (min-width: 1600px) {
    height: 90px;
    width: 90px;
  }
}
form {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.to-publish {
  width: 100%;

  min-height: 60px;
  max-height: 250px;
  margin-bottom: 10px;
  border-radius: 8px;
  @media (min-width: 620px) {
    min-height: 90px;
    max-height: 250px;
  }
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
