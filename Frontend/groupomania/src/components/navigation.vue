<template>
  <header>
    <nav class="Mon-compte">
      <img src="../assets/user_account_icon_145918.png" />
      <p>Mon compte</p>
    </nav>

    <img src="../assets/log_out_icon_197724.png" />
  </header>
</template>

<script>
export default {
  name: "navigation",
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
