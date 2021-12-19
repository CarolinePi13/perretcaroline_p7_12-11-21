<template>
  <div class="user-card shadow">
    <div class="user">
      <img :src="user.avatar" alt="user avatar" class="user-avatar" />
      <div class="user-data">
        <p class="userName">{{ user.userName }}</p>
        <p class="jobTitle">{{ user.jobTitle }}</p>
        <p class="createdAt">{{}}</p>
      </div>

      <button class="button" @click="modifyMode = true">Modifier</button>
      <button class="button" @click="showConfirm = true">Supprimer</button>
    </div>
  </div>
  <div class="confirm modal-bg shadow" v-if="showConfirm">
    <div class="modal-text">
      <p>Etes vous sur de vouloir supprimer cet utilisateur ?</p>
      <button class="confirm_btn confirm_btn--supp button" @click="deleteUser">
        SUPPRIMER
      </button>
      <button
        class="confirm_btn confirm_btn--cancel button"
        @click="cancelDeleteUser"
      >
        ANNULER
      </button>
    </div>
  </div>
  <transition name="fade" appear>
    <AdminModifyUserData
      v-if="modifyMode"
      :eachUser="eachUser"
      @cancelUpdate="modifyMode = false"
    />
  </transition>
</template>
<script>
import AdminModifyUserData from "../components/AdminModifyUserData";
import axios from "axios";
export default {
  name: "userCard",
  props: ["user"],
  components: {
    AdminModifyUserData,
  },
  data() {
    return {
      showConfirm: false,
      modifyMode: false,
      eachUser: this.user,
    };
  },
  methods: {
    confirmDelete() {
      this.showConfirm = true;
    },
    cancelDeleteUser() {
      this.showConfirm = false;
    },
    updateUser() {
      this.getLocalStorage();
      let id = this.eachUser.id;
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
    deleteUser() {
      let token = localStorage.getItem("token");
      this.token = token;
      let id = this.user.id;
      console.log(token);

      axios({
        method: "DELETE",
        url: `http://localhost:3000/api/user/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          //handle success
          console.log(response);
          document.location.reload();
        })
        .catch((error) => {
          //handle error

          console.log(error);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.user-card {
  width: 95%;
  height: 400px;
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

  margin-top: 50px;
}

.user {
  display: flex;
  flex-direction: column;
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
  p {
    margin: 5px;
  }
}
.three-dots {
  position: absolute;
  right: 10px;
  top: 5px;
}
.user-avatar {
  height: 120px;
  width: 120px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin-top: 5px;
}

.user-name {
  font-size: 1.2em;
  margin-left: 5%;
}

.modal-text {
  width: 70%;
  height: 150px;
  background-color: white;
  text-align: center;
  border-radius: 15px;
  font-weight: 1.2em;
  z-index: 97;
}
.confirm_btn {
  font-size: 1em;
  &--supp {
    background: linear-gradient(
      120deg,
      rgba(230, 45, 51, 0.9),
      rgba(151, 13, 13, 0.9),
      rgba(190, 12, 12, 0.9),
      rgba(233, 14, 18, 0.9)
    );
    font-weight: 800;
  }
  &--cancel {
    background: rgba(15, 31, 65, 0.7);
  }
}
.button {
  margin: 10px;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
.fade-leave-from,
.fade-enter-to {
  opactity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 1s ease;
}
</style>
