<template>
  <header>
    <nav class="shadow">
      <router-link :to="{ name: 'User' }">
        <img src="../assets/user_account_icon_145918.png" />
      </router-link>
      <span v-if="hover"></span>

      <router-link :to="{ name: 'admin' }" v-if="isAdmin == 'true'">
        Admin</router-link
      >
      <span class="pop"></span>
      <router-link :to="{ name: 'Wall' }">
        <img class="mon-compte" src="../assets/snall-icone-coupe.png" />
      </router-link>
      <span class="pop"></span>
      <img
        src="../assets/log_out_icon_197724.png"
        alt="logout"
        @click="logout"
      />
    </nav>
  </header>
</template>

<script>
export default {
  name: "navigation",

  data() {
    return {
      isAdmin: "",
      hover: false,
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
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
img,
p {
  height: 50px;
  font-weight: 1.2em;
  color: black;
}

nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
    font-size: 1.4em;
    display: flex;
    align-items: center;
    &:hover {
    }
  }
  background-color: rgba(204, 90, 90, 1);
}
</style>
