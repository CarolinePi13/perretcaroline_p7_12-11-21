<template>
  <div class="modify-bg">
    <div class="mod-card shadow">
      <div class="post-content">
        <div class="show-img" v-show="post.imageUrl !== null">
          <img :src="post.imageUrl" alt="Post image" />
        </div>

        <div class="post-text">
          <textarea
            class="to-publish"
            type="text"
            placeholder="{{post.content}}"
            oninput='this.style.height = "";this.style.height =
      this.scrollHeight + "px"'
            rows:10
            max-length:1200
            min-length:1
            v-model="content"
          />
        </div>
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
            <span>Ajoutez une image</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  nom: "modifyPost",
  props: ["post"],
  data() {
    return {
      postData: [
        {
          content: "",
          image: "",
          userId: "",
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
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
.mod-card {
  height: 100px;
}
.show-img {
  width: 50px;
}
.upload-file {
  img {
    width: 30px;
  }
}
</style>
