<template>
  <div class="user-card shadow">
    <div class="user">
      <img :src="userData.avatar" alt="user avatar" class="user-avatar" />
      <div class="user-data">
        <p class="userName">{{ userData.userName }}</p>
        <p class="jobTitle">{{ userData.jobTitle }}</p>
      </div>
      <img
        src="../assets/three-dots-more-indicator_icon-icons.com_72518.svg"
        alt=""
        class="three-dots"
        @click="toggleModule"
      />
      <div class="" v-if="showModule">
        <SuppModModule
          @deleteOrConfirm="confirmDelete()"
          @updateThis="showModify()"
        />
      </div>
    </div>
  </div>
  <div class="confirm modal-bg shadow" v-if="showConfirm">
    <div class="modal-text">
      <p>Etes vous sur de vouloir supprimer cet utilisateur ?</p>
      <button class="confirm_btn confirm_btn--supp" @click="deleteUser">
        supprimer
      </button>
      <button class="confirm_btn confirm_btn--cancel" @click="cancelDeleteUser">
        annuler
      </button>
    </div>
  </div>
  <transition name="fade" appear>
    <modifyUserData
      v-if="modifyMode"
      :userData="userData"
      @cancelUpdate="modifyMode = false"
    />
  </transition>
</template>
<script>
import SuppModModule from "../components/modal.vue";
import axios from "axios";
import modifyUserData from "../components/modifyUserData";
export default {
  name: "user",
  components: {
    SuppModModule,
    modifyUserData,
  },

  data() {
    return {
      showConfirm: false,
      userData: "",
      showModule: false,
      token: "",
      userId: "",
      modifyMode: false,
    };
  },
  methods: {
    showModify() {
      this.modifyMode = true;
    },
    toggleModule() {
      this.showModule = !this.showModule;
    },
    confirmDelete() {
      this.showConfirm = true;
    },
    cancelDeleteUser() {
      this.showConfirm = false;
    },
    deleteUser() {
      let token = localStorage.getItem("token");
      this.token = token;
      let userId = localStorage.getItem("userId");
      this.userId = userId;
      console.log(token);

      axios({
        method: "DELETE",
        url: `http://localhost:3000/api/user/${userId}`,
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch((error) => {
          //handle error

          console.log(error);
        });
    },
    displayUser() {
      let token = localStorage.getItem("token");
      this.token = token;
      let userId = localStorage.getItem("userId");
      this.userId = userId;
      console.log(userId);

      axios({
        method: "GET",
        url: `http://localhost:3000/api/user/${userId}`,
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
        .then((response) => (this.userData = response.data.user))
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error

          console.log(response);
        });
    },
  },
  created() {
    this.displayUser();
  },
};
</script>
<style scoped lang="scss">
.user-card {
  width: 95%;
  height: 500px;
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
.shadow {
  box-shadow: 1px 1px 3px 1px rgb(94, 86, 86);
}
.modal-text {
  // width: 300px;
  height: 150px;
  background-color: white;
  text-align: center;
  border-radius: 15px;
}
.confirm_btn {
  width: 80px;
  margin: 5px;
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
