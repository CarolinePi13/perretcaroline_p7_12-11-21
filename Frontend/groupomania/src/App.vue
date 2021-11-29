<template>
  <navigation />
  <Title />
  <login />
</template>

<script>
import navigation from "./components/nav.vue";
import Title from "./components/Title.vue";
import login from "./components/login.vue";
export default {
  name: "App",
  components: {
    navigation,
    Title,
    login,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-image: url("assets/icon.png");
  background-position: center;
  background-attachment: fixed;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 1;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
