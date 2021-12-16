<template>
  <div class="modal-bg">
    <transition name="slide" appear>
      <div class="user-card-mod shadow">
        <img
          src="../assets/4115230-cancel-close-cross-delete_114048.svg"
          alt="close window"
          class="close"
          @click="close"
        />
        <div class="user">
          <form action="submit" @submit.prevent="updateUser()">
            <div class="user-avatar-change">
              <img
                :src="previewAvatarUrl"
                alt="user avatar"
                class="user-avatar"
              />
              <label for="file" class="button margin-button">
                <input type="file" @change="addFile" v-show="false" id="file" />
                <span>Changer la photo de profil</span>
              </label>
            </div>
            <div class="user-data">
              <input
                class="userName"
                type="text"
                v-model="newUserData.userName"
              />
              <input
                class="jobTitle"
                type="text"
                v-model="newUserData.jobTitle"
              />
            </div>
            <input type="submit" class="button margin-button" />
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "modifyUserData",
  props: ["userData"],
  emits: ["cancelUpdate"],
  data() {
    return {
      newUserData: {
        userName: this.userData.userName,
        jobTitle: this.userData.jobTitle,
        avatar: this.userData.avatar,
      },
      previewAvatarUrl: this.userData.avatar,
      token: "",
      userId: "",
    };
  },
  methods: {
    close() {
      this.$emit("cancelUpdate");
    },
    addFile(e) {
      this.newUserData.avatar = e.target.files[0];
      this.previewAvatarUrl = e.target.files[0];
      this.previewImg();
    },
    previewImg() {
      const file = this.newUserData.avatar;
      this.previewAvatarUrl = URL.createObjectURL(file);
    },
    getLocalStorage() {
      this.token = localStorage.getItem("token");
      this.userId = localStorage.getItem("userId");
    },
    updateUser() {
      this.getLocalStorage();
      let id = this.userId;
      let formData = new FormData();
      formData.append("image", this.newUserData.avatar);
      formData.append("userName", this.newUserData.userName);
      formData.append("jobTitle", this.newUserData.jobTitle);
      for (var value of formData.values()) {
        console.log(value);
      }

      axios({
        method: "PUT",
        url: `http://localhost:3000/api/user/${id}`,
        data: formData,
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
.user-card-mod {
  width: 95%;
  min-height: 450px;
  height: fit-content;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  background-color: rgb(214, 143, 146);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.user {
  display: flex;
  align-items: center;
  width: 90%;
}
.user-data {
  margin: 10px;
  width: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 2em;

  border-radius: 15px;
  padding: 10px;
  background-color: rgba(149, 55, 58, 0.5);

  border: 1px solid rgb(94, 86, 86);
  input {
    margin: 5px;
  }
}
.three-dots {
  position: absolute;
  right: 10px;
  top: 5px;
}

.user-avatar-change {
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    font-size: 1.2em;
  }
}
.user-avatar {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin-top: 5px;
}

.user-name {
  font-size: 1.5em;
  margin-left: 5%;
}
.shadow {
  box-shadow: 1px 1px 3px 1px rgb(94, 86, 86);
}
.margin-button {
  margin: 20px;
}
</style>
