<template>
  <div class="user-card shadow">
    <div class="user">
      <img :src="userData.avatar" alt="user avatar" class="user-avatar" />
      <div class="user-data">
        <p class="first-name">Prenom: {{ userData.firstName }}</p>
        <p class="last-name">Nom: {{ userData.lastName }}</p>
        <p class="email">Email: {{ userData.email }}</p>
        <p class="password">Mot-de-passe:</p>
      </div>
      <img
        src="../assets/three-dots-more-indicator_icon-icons.com_72518.svg"
        alt=""
        class="three-dots"
        @click="toggleModule"
      />
      <div class="" v-if="showModule">
        <SuppModModule @deleteOrConfirm="confirmDelete" />
      </div>
    </div>
  </div>
  <div class="confirm" v-if="showConfirm">
    <p class="confirm_text">
      Etes vous sur de vouloir supprimer cet utilisateur ?
    </p>
    <button class="confirm_btn--supp" @click="deleteUser">supprimer</button>
    <button class="confirm_btn--cancel" @click="cancelDeleteUser">
      annuler
    </button>
  </div>
</template>
<script>
import SuppModModule from "../components/modal.vue";
import axios from "axios";

export default {
  name: "user",
  components: {
    SuppModModule,
  },

  data() {
    return {
      showConfirm: false,
      userData: {},
      showModule: false,
      token: "",
      userId: "",
    };
  },
  methods: {
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
  },
  beforeCreate() {
    let token = localStorage.getItem("token");
    this.token = token;
    let userId = localStorage.getItem("userId");
    this.userId = userId;
    console.log(userId);

    const displayUser = () => {
      axios({
        method: "GET",
        url: `http://localhost:3000/api/user/${userId}`,
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
        .then((response) => (this.userData = response.data))
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error

          console.log(response);
        });
    };
    displayUser();
  },

  computed: {},
};
</script>
<style scoped lang="scss">
.user-card {
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

.user {
  display: flex;
  align-items: center;
  width: 90%;
}
.user-data {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.three-dots {
  position: absolute;
  right: 10px;
  top: 5px;
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
.shadow {
  box-shadow: 1px 1px 3px 1px rgb(94, 86, 86);
}
</style>
