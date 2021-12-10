<template>
  <div class="modify-bg">
    <div class="mod-card shadow">
      <img
        src="../assets/4115230-cancel-close-cross-delete_114048.svg"
        alt="close window"
        class="close"
        @click="close"
      />
      <div class="post-content">
        <form
          action="submit"
          @submit.prevent="updateAPost"
          class="form-content"
        >
          <div class="show-img" v-if="newPostData.image">
            <img :src="previewPostUrl" alt="image du post" class="post-image" />
          </div>

          <textarea
            class="to-publish"
            type="text"
            oninput='this.style.height = "";this.style.height =
                this.scrollHeight + "px"'
            rows:10
            max-length:1200
            min-length:1
            v-model="newPostData.content"
          />

          <div class="form-bottom">
            <div class="upload-file">
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
                <span v-if="newPostData.image">Modifiez l'image</span>
                <span v-else>Ajoutez une Image</span>
              </label>
            </div>
            <button type="submit">publier</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  nom: "modifyPost",
  props: ["post"],
  emits: ["cancelUpdate"],
  data() {
    return {
      newPostData: {
        content: this.post.content,
        image: this.post.imageUrl,
        userId: this.post.userId,
      },
      token: "",
      postId: this.post.id,
      previewPostUrl: this.post.imageUrl,
      hideInputOn: false,
    };
  },
  methods: {
    close() {
      this.$emit("cancelUpdate");
    },
    addFile(e) {
      this.newPostData.image = e.target.files[0];
      this.previewPostUrl = e.target.files[0];
      this.previewImg();
    },
    previewImg() {
      const file = this.newPostData.image;
      this.previewPostUrl = URL.createObjectURL(file);
    },
    getLocalStorage() {
      this.token = localStorage.getItem("token");
    },
    updateAPost() {
      this.getLocalStorage();
      let id = this.postId;
      let formData = new FormData();
      formData.append("content", this.newPostData.content);
      formData.append("image", this.newPostData.image);
      formData.append("userId", this.newPostData.userId);
      for (var value of formData.values()) {
        console.log(value);
      }
      var body = formData;
      axios({
        method: "PUT",
        url: `http://localhost:3000/api/posts/${id}`,
        data: body,
        headers: {
          authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "content-type": "multipart/form-data",
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
  height: 450px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  flex-direction: column;
}
.post-text {
  height: 80%;
  margin: 5px;
}
.to-publish {
  height: 100%;
  min-height: 50px;
  max-height: 200px;
  border-radius: 8px;
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
form {
  height: 100%;
}

.form-bottom {
  width: 100%;
  display: flex;
  padding: 2%;
  justify-content: space-around;
  text-align: center;
  img {
    width: 30px;
  }
}
.upload-file {
  width: 50%;
}
.label-img {
  display: flex;
  align-items: center;
}
.post-content {
  width: 100%;
  height: 100%;
}
.form-content {
  justify-content: space-between;
}
.post-image {
  width: 100%;
  height: auto;
  margin-top: 5px;
}
.close {
  align-self: flex-end;
  margin: 1px;
}
</style>
