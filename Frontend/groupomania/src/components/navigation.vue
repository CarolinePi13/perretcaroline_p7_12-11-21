<template>
  <header>
    <nav class="shadow">
      <router-link
        class="user"
        :to="{ name: 'User' }"
        @mouseover="myAccountShow = true"
        @mouseleave="myAccountShow = false"
      >
        <img src="../assets/user_account_icon_145918.png" />
      </router-link>

      <router-link :to="{ name: 'admin' }" v-if="isAdmin == 'true'">
        Admin</router-link
      >

      <router-link
        class="wall"
        :to="{ name: 'Wall' }"
        @mouseover="myWallShow = true"
        @mouseleave="myWallShow = false"
      >
        <img class="mon-compte" src="../assets/small-icone-coupe.png" />
      </router-link>

      <img
        src="../assets/log_out_icon_197724.png"
        alt="logout"
        class="logout"
        @click="logout"
        @mouseover="myLogoutShow = true"
        @mouseleave="myLogoutShow = false"
      />
    </nav>
    <div class="pop-up_nav">
      <div class="pop-up_mon-compte" v-show="myAccountShow">Mon Compte</div>
      <div class="pop-up_wall" v-show="myWallShow">Mur</div>
      <div class="pop-up_disconnect" v-show="myLogoutShow">Se déconnecter</div>
    </div>
  </header>
</template>

<script>
export default {
  name: "navigation",

  data() {
    return {
      isAdmin: "",
      hover: false,
      myAccountShow: false,
      myWallShow: false,
      myLogoutShow: false,
    };
  },
  methods: {
    getLocalStorage() {
      this.isAdmin = localStorage.getItem("isAdmin");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
  beforeMount() {
    this.getLocalStorage();
  },
};
</script>

<style scoped lang="scss">
.logout,
.wall,
.user {
  position: relative;
}
img,
p {
  height: 50px;
  font-weight: 1.2em;
  color: black;
}

nav {
  display: flex;

  justify-content: space-between;
  padding: 10px;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
    font-size: 1.4em;
    display: flex;
    align-items: center;
    position: relative;
    &:hover {
    }
  }
  background-color: rgba(204, 90, 90, 1);
}
.pop-up_nav {
  height: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 10px;
  align-items: center;
}

.logout {
  cursor: pointer;
}
</style>
