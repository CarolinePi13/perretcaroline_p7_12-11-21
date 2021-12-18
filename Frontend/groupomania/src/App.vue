<template>
  <div class="app-container">
    <navigation v-if="!['Login'].includes($route.name)" />

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
    return {
      loggedIn: true,
    };
  },
  methods: {},
};
</script>
//all generall css that applies to the entire project is down here
<style lang="scss">
#app {
  font-family: "Murecho", sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  color: black;
}
.three-dots {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}
html {
  height: 100%;
}
img {
  height: 30px;
  @media (min-width: 620px) {
    height: 40px;
  }
  @media (min-width: 1600px) {
    height: 50px;
  }
}
input {
  border-radius: 8px;
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
.modify-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  background-color: rgba(168, 140, 141, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;
}
.mod-card {
  width: 80%;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 91;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;
  @media (min-width: 620px) {
    max-width: 600px;
  }
  @media (min-width: 1600px) {
    max-width: 900px;
  }
}
.user-name {
  font-size: 1.3rem;
  margin-left: 5%;
  @media (min-width: 620px) {
    font-size: 1.6rem;
  }
  @media (min-width: 1600px) {
    font-size: 1.7rem;
  }
}
.app-container {
  min-height: 100vh;
  width: 100%;
  @media (min-width: 620px) {
    width: 680px;
  }
  @media (min-width: 1600px) {
    width: 900px;
  }
}

.button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  margin-bottom: 10px;
  display: inline-block;
  padding: 5px;
  background-image: linear-gradient(to right, #cc5a5a, #c26666);
  border-radius: 8px;

  color: #fff;
  font-size: 1.1em;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;

  &:hover {
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  }
  @media (min-width: 620px) {
    font-size: 1.3em;
    padding: 10px;
  }
  @media (min-width: 1600px) {
    margin: 15px;
    font-size: 1.4em;
    padding: 15px 25px 15px 25px;
  }
}
.shadow {
  box-shadow: 1px 1px 3px 1px rgb(94, 86, 86);
}
//transitions and animations

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 1s ease;
}
.close {
  align-self: flex-end;
  margin: 1px;
}
</style>
