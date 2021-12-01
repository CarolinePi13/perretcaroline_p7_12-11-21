<template>
  <div class="comments-card shadow">
    <div class="one_comment">
      <img
        src="../assets/account_avatar_face_man_people_profile_user_icon_123197.png"
        alt="user avatar"
        class="user-avatar--comment"
      />
      <div class="one_comment--text shadow">
        <div class="user-data--comment">
          <p class="user-name--comment">Joe Blow</p>
          <img
            src="../assets/three-dots-more-indicator_icon-icons.com_72518.svg"
            alt=""
            class="three-dots smaller-dots"
            @click="toggleModule"
          />
        </div>
        <SuppModModule v-if="showModule" :type="type" />
        <div class="comment-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ipsa
            quibusdam tempore dolorem aliquid modi! Eveniet beatae consequuntur
            temporibus reiciendis nobis, iure soluta alias sunt ipsa aperiam
            molestias voluptatem? Natus.
          </p>
        </div>

        <div class="comment-likes">
          <p class="like-count">12</p>
          <img
            src="../assets/like-thumbs-up-hand-social-media_icon-icons.com_61429.png"
            alt="like button"
            class="comment-like-button"
          />
        </div>
      </div>
    </div>
    <div class="one_comment">
      <img
        src="../assets/655E3260-384A-41B1-BA96-A5E153DFB5A1_1_201_a.jpeg"
        alt="user avatar"
        class="user-avatar--comment"
      />
      <div class="one_comment--text shadow">
        <div class="user-data--comment">
          <p class="user-name--comment">Joe Blow</p>
        </div>
        <div class="comment-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ipsa
            quibusdam tempore dolorem aliquid modi! Eveniet beatae consequuntur
            temporibus reiciendis nobis, iure soluta alias sunt ipsa aperiam
            molestias voluptatem? Natus.
          </p>
        </div>

        <div class="comment-likes">
          <p class="like-count">12</p>
          <img
            src="../assets/like-thumbs-up-hand-social-media_icon-icons.com_61429.png"
            alt="like button"
            class="comment-like-button"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SuppModModule from "../components/modal.vue";
export default {
  name: "comment",
  components: {
    SuppModModule,
  },
  data() {
    return {
      showModule: false,
      type: "commentaire",
    };
  },
  methods: {
    toggleModule() {
      this.showModule = !this.showModule;
    },
  },
};
</script>
<style lang="scss">
.comments-card {
  width: 90%;
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
.one_comment {
  display: flex;
  margin: 3%;
  position: relative;
}
.one_comment--text {
  width: 90%;
  border-radius: 15px;
  background-color: rgba(146, 154, 173, 0.5);
  border: 1px solid gray;
  margin: auto;
}
.comment-text {
  font-size: 0.8em;
}
p.user-name--comment {
  margin: 2%;
}
.user-data--comment {
  display: flex;
  align-items: center;
}
.user-avatar--comment {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin: 2%;
}
div.comment-text > p {
  margin: 5px;
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
  height: 15px;
  width: 15px;
}
</style>
