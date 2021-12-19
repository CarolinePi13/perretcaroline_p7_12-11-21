<template>
  <div class="alter_pop-up">
    <div class="alter_Btn alter_Btn--modify" @click="triggerModify">
      Modifier
    </div>
    <div class="alter_Btn alter_Btn--delete" @click="Deletefct">supprimer</div>
  </div>
</template>

<script>
export default {
  name: "SuppModModule",
  emits: ["deleteOrConfirm", "updateThis"],
  components: {},
  data() {
    return {
      showConfirm: false,
    };
  },
  methods: {
    Deletefct() {
      this.$emit("deleteOrConfirm");
    },
    triggerModify() {
      this.$emit("updateThis");
    },
  },
};
</script>

<style lang="scss">
.alter_pop-up {
  position: absolute;
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  right: 40px;
  top: 10px;
  align-items: center;
}
.alter_Btn {
  width: 100%;
  height: 30%;
  margin-top: 8px;

  border-radius: 15px;
  background-color: rgba(15, 31, 65, 1);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: lighten(rgba(15, 31, 65, 1), 10%);
  }

  cursor: pointer;
}
</style>
