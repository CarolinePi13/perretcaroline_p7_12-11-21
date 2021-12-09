<template>
  <div class="modal-bg">
    <div class="modal-text">
      <p>{{ modalText }}</p>
      <div class="ok-Btn" @click="closeModalConfim">ok</div>
    </div>
  </div>
</template>
<script>
export default {
  nom: "modalConnect",
  props: ["modalText"],
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(168, 140, 141, 0.404);
}
.modal-text {
  width: 250px;
  height: 90px;
  background-color: white;
  text-align: center;
}
.ok-Btn {
  cursor: pointer;
}
</style>
