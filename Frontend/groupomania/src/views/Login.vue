<template>
  <div class="login-card">
    <div class="onglets">
      <div
        class="onglet onglet--sign-up"
        @click="showCreateAccount(), (errorMessage = false)"
      >
        <p>Créer un compte</p>
      </div>

      <div
        class="onglet onglet--log-in"
        @click="showLogin(), (errorMessage = false)"
      >
        <p>Connection</p>
      </div>
    </div>
    <!--login after sign-up-->
    <div class="card" v-if="mode == 'login'">
      <form action="login" class="card_flex" @submit.prevent="loginRequest">
        <div class="login_email column">
          <label for="login-email">Email: </label>
          <input
            id="login-email"
            required
            class="type-input"
            type="email"
            v-model="loginUserData.email"
            @input="errorMessage = false"
          />
        </div>
        <div class="login_password column">
          <label for="login-password">Mot de passe: </label>
          <input
            id="login-password"
            required
            class="type-input"
            type="password"
            v-model="loginUserData.password"
            autocomplete="current-password"
            @input="errorMessage = false"
          />
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <input type="submit" id="login" class="button" value="Connection" />
      </form>
    </div>
    <!-- create an account-->
    <div class="card card_sign-up" v-if="mode == 'create'">
      <form action="sign-up" class="card_flex" @submit.prevent="createAccount">
        <div class="userName column">
          <label for="userName">Nom et Prenom: </label>
          <input
            id="userName"
            required
            type="text"
            class="type-input"
            v-model="signupUserData.userName"
            @input="errorMessage = false"
          />
        </div>
        <div class="jobTitle column">
          <label for="jobTitle">Poste: </label>
          <input
            id="jobTitle"
            required
            class="type-input"
            type="text"
            v-model="signupUserData.jobTitle"
            @input="errorMessage = false"
          />
        </div>

        <div class="sign-up-input column">
          <label for="sign-up-email">Email: </label>
          <input
            id="sign-up-email"
            required
            class="type-input"
            type="email"
            v-model="signupUserData.email"
            @input="errorMessage = false"
          />
        </div>
        <div class="pass column">
          <label for="sign-up-password">Mot de passe: </label>
          <input
            id="sign-up-password"
            required
            class="type-input"
            type="password"
            v-model="signupUserData.password"
            @input="errorMessage = false"
          />
        </div>
        <div class="file column">
          <label for="avatar">Ajouter une photo de profil:</label>
          <input type="file" class="file_choose" @change="addFile" />
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <input
          type="submit"
          id="login"
          value="Créer un compte"
          class="button"
        />
      </form>
    </div>
  </div>
  <div class="modal" v-if="showModal">
    <modalConnect @removeModal="closeModal" :modalText="modalText" />
  </div>
</template>
<script>
import axios from "axios";
import modalConnect from "../components/basicModal.vue";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "login",

  components: {
    modalConnect,
  },
  data() {
    return {
      mode: "login",

      signupUserData: [
        {
          userName: "",
          email: "",
          password: "",
          avatar: "",
          jobTitle: "",
        },
      ],
      loginUserData: [
        {
          email: "",
          password: "",
        },
      ],
      showModal: false,
      modalText: "Compte créé vous pouvez vous connecter",
      errorMessage: "",
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      signupUserData: [
        {
          userName: "",
          email: "",
          password: "",
          avatar: "",
          jobTitle: "",
        },
      ],
      loginUserData: [
        {
          email: "",
          password: "",
        },
      ],
    };
  },
  methods: {
    showCreateAccount() {
      this.mode = "create";
    },
    showLogin() {
      this.mode = "login";
    },
    closeModal() {
      this.showModal = !this.showModal;
      document.location.reload();
    },

    createAccount() {
      let formData = new FormData();
      let self = this;
      formData.append("userName", this.signupUserData.userName);
      formData.append("jobTitle", this.signupUserData.jobTitle);
      formData.append("email", this.signupUserData.email);
      formData.append("password", this.signupUserData.password);
      formData.append("image", this.signupUserData.avatar);
      for (var value of formData.values()) {
        console.log(value);
      }

      var body = formData;

      axios({
        method: "POST",
        url: "http://localhost:3000/api/user/signup",
        data: body,
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
      })
        .then(function (response) {
          //handle success
          console.log(response);
          let userId = response.data.userId;
          localStorage.setItem("userId", userId);
          self.showModal = true;
        })

        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            self.errorMessage = error.response.data.message;
            console.log(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received

            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    addFile(e) {
      this.signupUserData.avatar = e.target.files[0];
    },
    loginRequest() {
      let self = this;
      let body = {
        email: this.loginUserData.email,
        password: this.loginUserData.password,
      };
      let isLoggedIn = true;
      axios({
        method: "POST",
        url: "http://localhost:3000/api/user/login",
        data: body,
        headers: {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          //handle success
          let token = response.data.token;
          localStorage.setItem("token", token);
          let userId = response.data.userId;
          localStorage.setItem("userId", userId);
          console.log(response);
          localStorage.setItem("loggedIn", isLoggedIn);

          localStorage.setItem("isAdmin", response.data.isAdmin);
        })
        .then(() => {
          this.$router.push("/wallposts");
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            self.errorMessage = error.response.data.message;
            console.log(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received

            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
  },

  mounted() {},
};
</script>
<style scoped lang="scss">
.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: fit-content;
  margin-bottom: 30px;
}

.onglets {
  display: flex;
  background-color: rgba(205, 120, 123, 1);
  width: 90%;
  justify-content: space-around;
  border-radius: 15px 15px 0 0;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  text-align: center;
}
.onglet {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;

  cursor: pointer;
  @media (min-width: 620px) {
    font-size: 1.4rem;
  }
  @media (min-width: 1600px) {
    font-size: 1.6rem;
  }
}

.onglet--sign-up {
  width: 50%;
}
.onglet--log-in {
  background-color: #0f1f41;
  border-radius: 0 15px 0 0;
  width: 50%;
}
.card {
  width: 90%;

  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  background-color: rgba(15, 31, 65, 0.5);

  border-radius: 0 0 15px 15px;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
}
.card_flex {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-content: center;
  align-items: center;
  row-gap: 10px;
}
.column {
  display: flex;
  row-gap: 10px;
  flex-direction: column;
}
.sign-up_password {
  margin-top: 10px;
}
.type-input {
  height: 25px;
  width: 250px;
  font-size: 0.9rem;
  border-radius: 8px;
  @media (min-width: 620px) {
    width: 400px;
    height: 30px;
    font-size: 1.1rem;
  }
  @media (min-width: 1600px) {
    width: 700px;
    height: 40px;
    font-size: 1.3rem;
  }
}
label {
  margin-top: 5px;
  font-size: 1.1em;
  color: black;
  font-weight: 900;
  @media (min-width: 620px) {
    font-size: 1.4rem;
  }
  @media (min-width: 1600px) {
    font-size: 1.6rem;
  }
}
.card_sign-up {
  min-height: 450px;
  height: fit-content;
  background-color: rgba(205, 120, 123, 0.65);
}

.file {
  margin: 10px;
}
.error {
  color: darken(red, 20%);
  font-size: 1.1em;
  font-weight: bold;
  margin: 4px;
  text-align: center;
  height: fit-content;
  width: 50%;
}
.button {
  margin-top: 10px;
  margin-bottom: 15px;
}
.file_choose {
  border-radius: none;
}
</style>
