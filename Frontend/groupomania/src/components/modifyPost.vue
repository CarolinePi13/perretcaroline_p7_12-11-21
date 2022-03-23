<template>
  <div class="modify-bg">
    <transition name="slide" appear>
      <div class="mod-card shadow">
        <!-- close the component without modifying-->
        <img
          src="../assets/4115230-cancel-close-cross-delete_114048.svg"
          alt="close window"
          class="close"
          @click="close"
        />
        <div class="post-content">
          <!--takes the post content to be displayed-->
          <form
            action="submit"
            @submit.prevent="updateAPost"
            class="form-content"
          >
            <div class="show-img" v-if="newPostData.image">
              <img
                :src="previewPostUrl"
                alt="image du post"
                class="post-image"
              />
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
                    alt=" add a file"
                    aria-label="ajouter ou changer une image"
                    class="add-img"
                  />
                  <span v-if="newPostData.image">Modifiez l'image</span>
                  <span v-else>Ajoutez une Image</span>
                </label>
              </div>
              <button type="submit" class="button">publier</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
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
      hideInputOn: false, //hides the file input
    };
  },
  methods: {
    close() {
      //closes the modal to cancel the modification
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
      // let self = this;
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
        url: `https://carolinep13-groupomania.herokuapp.com/api/posts/${id}`,
        data: body,
        headers: {
          authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "content-type": "multipart/form-data",
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
  max-height: 200px;
  border-radius: 8px;
  flex-grow: 1;
  font-size: 1.2em;
  @media (min-width: 620px) {
    min-height: 100px;
    max-height: 300px;
    font-size: 1.1em;
  }
  @media (min-width: 1600px) {
    min-height: 250px;
    max-height: 500px;
    font-size: 1.3em;
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
}
.upload-file {
  width: 50%;
}
.label-img {
  display: flex;
  align-items: center;
  @media (min-width: 620px) {
    font-size: 1.2em;
  }
}
.post-content {
  width: 100%;
  height: 100%;
}
.form-content {
  justify-content: space-between;
  min-height: 300px;
}
.post-image {
  margin-top: 5px;

  width: 95%;
  max-width: 250px;
  max-height: 250px;
  height: auto;
  @media (min-width: 620px) {
    min-width: 350px;
    min-height: auto;
    max-width: 450px;
    max-height: 450px;
  }
  @media (min-width: 1600px) {
    min-width: 450px;
    min-height: auto;
    max-width: 550px;
    max-height: 550px;
  }
}
.close {
  align-self: flex-end;
  margin: 1px;
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
