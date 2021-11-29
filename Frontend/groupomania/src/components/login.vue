<template>
  <div class="login-card">
    <div class="onglets">
      <div class="onglet onglet--sign-up" data-anim="1">
        <p>Créer un compte</p>
      </div>

      <div class="onglet onglet--log-in" data-anim="2">
        <p>Connection</p>
      </div>
    </div>

    <div class="card">
      <form action="sign-up" class="card_flex">
        <div class="sign-up_email column">
          <label for="login-email">Email: </label>
          <input id="login-email" type="email" />
        </div>
        <div class="sign-up_password column">
          <label for="login-password">Mot de passe: </label>
          <input id="login-password" type="password" />
        </div>
        <input type="submit" id="sign-up" value="Connection" />
      </form>
    </div>
    <div class="card card_sign-up">
      <form action="login" class="card_flex">
        <div class="firstname column">
          <label for="firstname">Prénom: </label>
          <input id="firstname" type="text" />
        </div>
        <div class="lastname column">
          <label for="lastname">Nom: </label>
          <input id="lastname" type="text" />
        </div>
        <div class="login-input column">
          <label for="login-email">Email: </label>
          <input id="login-email" type="email" />
        </div>
        <div class="pass column">
          <label for="login-password">Mot de passe: </label>
          <input id="login-password" type="password" />
        </div>
        <div class="file column">
          <label for="avatar">Ajoutez une photo de profil:</label>
          <input type="file" />
        </div>
        <input type="submit" id="login" value="Créer un compte" />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
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
  transition: 300ms 300ms ease-in-out;
  cursor: pointer;
}
p:hover {
  transform: scale(1.2);
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
  background-color: rgba(205, 120, 123, 0.65);
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
  background-color: rgba(15, 31, 65, 0.5);
}
#sign-up,
#login {
  height: 30px;
  width: 150px;
  padding: 5px;
}
</style>
