<template>
  <div class="post-card shadow">
    <img
      src="../assets/4115230-cancel-close-cross-delete_114048.svg"
      alt="close window"
      class="close"
    />

    <div class="createPost-user-data">
      <img
        src="../assets/655E3260-384A-41B1-BA96-A5E153DFB5A1_1_201_a.jpeg"
        alt="user avatar"
        class="user-avatar"
      />
      <p class="user-name">Joe Blow</p>
    </div>

    <div class="post-text">
      <form action="submit">
        <textarea
          class="to-publish"
          type="text"
          placeholder="écrivez votre texte ici..."
        />
        <input type="submit" value="Publier" class="publier" />
      </form>
    </div>

    <div class="upload-file">
      <img
        src="../assets/frame_gallery_image_images_photo_picture_pictures_icon_123209.svg"
        alt="down"
        aria-label="afficher les commentaires"
        class="add-img"
      />

      <p>Ajouter une image</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Post",
  components: {},
  data() {
    return {};
  },
  methods: {},
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

.comment-count {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
div.comment-count > p {
  margin: 0 2% 1% 2%;
}
.to-publish {
  width: 100%;
  min-height: 250px;
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
</style>
