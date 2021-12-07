<template>
  <div class="alter_pop-up">
    <div class="alter_Btn alter_Btn--modify">Modifier</div>
    <div class="alter_Btn alter_Btn--delete" @click="Deletefct">supprimer</div>
  </div>
  <div v-if="showConfirm">
    <confirmDelete />
  </div>
</template>

<script>
export default {
  name: "SuppModModule",

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
  right: 20px;
  top: 8px;
  align-items: center;
}
.alter_Btn {
  width: 100%;
  height: 30%;
  margin-top: 3px;
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
