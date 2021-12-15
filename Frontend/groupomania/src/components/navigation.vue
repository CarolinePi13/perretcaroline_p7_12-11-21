<template>
  <header>
    <nav class="Mon-compte">
      <router-link :to="{ name: 'Wall' }"> Fil d'actu</router-link>
      <router-link :to="{ name: 'admin' }"> admin</router-link>
      <router-link :to="{ name: 'User' }">
        <img src="../assets/user_account_icon_145918.png" />
        <span>Mon compte</span></router-link
      >
    </nav>

    <img src="../assets/log_out_icon_197724.png" alt="logout" @click="logout" />
  </header>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
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

.Mon-compte {
  display: flex;
}
</style>
