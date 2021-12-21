<template>
  <div class="modal-bg">
    <div class="modal-text">
      <p>{{ modalText }}</p>
      <div class="ok-Btn button" @click="closeModalConfim">ok</div>
    </div>
  </div>
</template>
<script>
export default {
  nom: "modalConnect",
  props: ["modalText"],
  emits: ["removeModal"],
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
  width: 80%;
  height: fit-content;
  background-color: white;
  text-align: center;
  border-radius: 8px;
  font-size: 1.1em;
}
.ok-Btn {
  cursor: pointer;
  width: 50px;
}
</style>
