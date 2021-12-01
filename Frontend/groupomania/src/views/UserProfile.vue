<template>
  <div class="user-card shadow">
    <div class="user">
      <img
        src="../assets/655E3260-384A-41B1-BA96-A5E153DFB5A1_1_201_a.jpeg"
        alt="user avatar"
        class="user-avatar"
      />
      <div class="user-data">
        <p class="first-name">Prenom: Joe</p>
        <p class="last-name">Nom: Joe</p>
        <p class="email">Email:</p>
        <p class="password">Mot-de-passe:</p>
      </div>
      <img
        src="../assets/three-dots-more-indicator_icon-icons.com_72518.svg"
        alt=""
        class="three-dots"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "user",
};
</script>
<style lang="scss">
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
