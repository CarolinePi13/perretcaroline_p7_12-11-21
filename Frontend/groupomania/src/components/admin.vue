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
export default {
  name: "admin",
  data() {
    return {
      token: "",
      userId: "",
      allUserData: "",
    };
  },
  methods: {
    displayUser() {
      let token = localStorage.getItem("token");
      this.token = token;
      let userId = localStorage.getItem("userId");
      this.userId = userId;
      console.log(userId);

      axios({
        method: "GET",
        url: `http://localhost:3000/api/user/`,
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
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
  beforeMount() {
    this.displayUser();
  },
};
</script>
