<template>
  <div class="confirm">
    <p class="confirm_text">
      Etes vous sur de vouloir supprimer ce {{ type }} ?
    </p>
    <button class="confirm_btn--supp" @click="deleteUser">supprimer</button>
    <button class="confirm_btn--cancel" @click="cancelDeleteUser">
      annuler
    </button>
  </div>
</template>
<script>
export default {
  props: ["type", "showConfirm"],
  data() {
    return {};
  },
  methods: {
    deleteUser() {},
    cancelDeleteUser() {},
  },
};
</script>
<style lang=""></style>
