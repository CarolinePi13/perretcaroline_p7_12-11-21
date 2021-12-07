<template>
  <div class="modal-bg">
    <div class="create-success">
      <p>Compte créé vous pouvez vous connecter</p>
      <div class="ok-Btn" @click="closeModalConfim">ok</div>
    </div>
  </div>
</template>
<script>
export default {
  nom: "modalConnect",
  data() {
    return {};
  },
  methods: {
    closeModalConfim() {
      this.$emit("removeModal");
    },
  },
};
</script>

<style lang="scss">
.modal-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
}
.create-success {
  width: 250px;
  height: 90px;
  background-color: white;
  text-align: center;
}
.ok-Btn {
  cursor: pointer;
}
</style>
