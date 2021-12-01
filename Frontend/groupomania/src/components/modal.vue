<template>
  <div class="alter_pop-up">
    <div class="alter_Btn alter_Btn--modify">Modifier</div>
    <div class="alter_Btn alter_Btn--delete">supprimer</div>
  </div>
  <div class="confirm" v-if="showConfirm">
    <p class="confirm_text">
      Etes vous sur de vouloir supprimer ce {{ type }} ?
    </p>
    <button class="confirm_btn--supp">supprimer</button>
    <button class="confirm_btn--cancel">annuler</button>
  </div>
</template>

<script>
export default {
  name: "SuppModModule",
  props: ["type"],
  data() {
    return {
      showConfirm: false,
    };
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
