<template>
  <div class="">
    <navigation />

    <Title />

    <router-view />
  </div>
</template>

<script>
import navigation from "./components/navigation.vue";
import Title from "./components/AppTitle.vue";

export default {
  name: "App",
  components: {
    navigation,
    Title,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: black;
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
