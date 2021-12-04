<template>
  <div class="login-card">
    <div class="onglets">
      <div class="onglet onglet--sign-up" @click="showCreateAccount">
        <p>Créer un compte</p>
      </div>

      <div class="onglet onglet--log-in" @click="showLogin">
        <p>Connection</p>
      </div>
    </div>

    <div class="card" v-if="mode == 'login'">
      <form action="login" class="card_flex" @submit.prevent="submitLogin">
        <div class="login_email column">
          <label for="login-email">Email: </label>
          <input
            id="login-email"
            required
            type="email"
            v-model="loginUserData.email"
          />
        </div>
        <div class="login_password column">
          <label for="login-password">Mot de passe: </label>
          <input
            id="login-password"
            required
            type="password"
            v-model="loginUserData.password"
          />
        </div>
        <input type="submit" id="login" value="Connection" />
      </form>
    </div>
    <div class="card card_sign-up" v-if="mode == 'create'">
      <form action="sign-up" class="card_flex" @submit.prevent="createAccount">
        <div class="firstname column">
          <label for="firstname">Prénom: </label>
          <input
            id="firstname"
            required
            type="text"
            v-model="signupUserData.firstName"
          />
        </div>
        <div class="lastname column">
          <label for="lastname">Nom: </label>
          <input
            id="lastname"
            required
            type="text"
            v-model="signupUserData.lastName"
          />
        </div>
        <div class="sign-up-input column">
          <label for="sign-up-email">Email: </label>
          <input
            id="sign-up-email"
            required
            type="email"
            v-model="signupUserData.email"
          />
        </div>
        <div class="pass column">
          <label for="sign-up-password">Mot de passe: </label>
          <input
            id="sign-up-password"
            required
            type="password"
            v-model="signupUserData.password"
          />
        </div>
        <div class="file column">
          <label for="avatar">Ajoutez une photo de profil:</label>
          <input type="file" @change="addFile" />
        </div>
        <input
          type="submit"
          @submit.prevent="checkForm"
          id="login"
          value="Créer un compte"
        />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "login",

  data() {
    return {
      mode: "login",
      signupUserData: [
        {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          avatar: "",
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
    createAccount() {
      let formData = new FormData();
      formData.append("firstName", this.signupUserData.firstName);
      formData.append("lastName", this.signupUserData.lastName);
      formData.append("email", this.signupUserData.email);
      formData.append("password", this.signupUserData.password);
      formData.append("image", this.signupUserData.avatar);
      for (var value of formData.values()) {
        console.log(value);
      }

      var body = formData;

      axios({
        method: "POST",
        url: "http://localhost:3000/api/signup",
        data: body,
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
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
    addFile(e) {
      this.signupUserData.avatar = e.target.files[0];
    },
    submitLogin() {
      let body = {
        email: this.loginUserData.email,
        password: this.loginUserData.password,
      };

      axios({
        method: "POST",
        url: "http://localhost:3000/api/login",
        data: body,

        headers: {
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
  mounted() {},
};
</script>
<style scoped lang="scss">
.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 1.2em;
  font-weight: 600;

  cursor: pointer;
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
  height: 250px;
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
  height: 100px;
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
input {
  height: 25px;
  width: 250px;
  border-radius: 8px;
}
label {
  margin-top: 5px;
  font-size: 1.1em;
  color: black;
  font-weight: 900;
}
.card_sign-up {
  height: 450px;
  background-color: rgba(205, 120, 123, 0.65);
}
#sign-up,
#login {
  height: 30px;
  width: 150px;
  padding: 5px;
}
</style>
