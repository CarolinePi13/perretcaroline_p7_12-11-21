<template>
  <div class="titre">
    <h1>Votre réseau social d'entreprise</h1>
    <img
      alt="logo groupomania"
      src="../assets/icon-left-font-monochrome-black.svg"
    />
  </div>
</template>

<script>
export default {
  name: "AppTitle",
};
</script>

<style scoped lang="scss">
img {
  height: 3em;
  margin: 1em 0 1.4em 0;
  @media (min-width: 620px) {
    height: 4em;
  }
  @media (min-width: 1600px) {
    height: 5em;
  }
}

h1 {
  font-size: 1.5rem;
  @media (min-width: 620px) {
    font-size: 2rem;
  }
  @media (min-width: 1600px) {
    font-size: 2.5rem;
  }
}
.titre {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
</style>
