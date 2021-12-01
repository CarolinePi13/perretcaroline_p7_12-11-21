<template>
  <div class="post-card shadow">
    <SuppModModule v-if="showModule" />
    <div class="user-data">
      <img
        src="../assets/655E3260-384A-41B1-BA96-A5E153DFB5A1_1_201_a.jpeg"
        alt="user avatar"
        class="user-avatar"
      />
      <p class="user-name">Joe Blow</p>
      <img
        src="../assets/three-dots-more-indicator_icon-icons.com_72518.svg"
        alt=""
        class="three-dots"
        @click="toggleModule"
      />
    </div>

    <div class="post-text">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ipsa
        quibusdam tempore dolorem aliquid modi! Eveniet beatae consequuntur
        temporibus reiciendis nobis, iure soluta alias sunt ipsa aperiam
        molestias voluptatem? Natus.
      </p>
    </div>
    <div class="comment-count">
      <p>12 commentaires</p>
      <p>12 j'aime</p>
    </div>
    <div class="post-actions">
      <div class="unfold">
        <img
          src="../assets/downarrow_120663.png"
          alt="down"
          aria-label="afficher les commentaires"
          class="down-arrow"
          @click="toggle"
        />
      </div>
      <div class="comment-button">
        <img src="../assets/commentmono_105952.svg" alt="" />Commenter
      </div>
      <div class="likes">
        <img
          src="../assets/like-thumbs-up-hand-social-media_icon-icons.com_61429.png"
          alt="like button"
          class="like-button"
        />
      </div>
    </div>
  </div>
</template>
<script>
import SuppModModule from "../components/modal.vue";
export default {
  name: "Post",
  components: {
    SuppModModule,
  },
  data() {
    return {
      showModule: false,
    };
  },
  methods: {
    toggle() {
      this.$emit("toggleComments");
    },
    toggleModule() {
      this.showModule = !this.showModule;
    },
  },
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
  margin: auto;
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
.post-text {
  margin: 0 5%;
  text-align: justify;
  font-size: 14px;
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
</style>
