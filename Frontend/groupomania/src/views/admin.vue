<!-- admin user control-->
<template>
  <userCard :user="user" v-for="user in users" :key="user.id" />
</template>
<script>
import axios from "axios";
import userCard from "../components/userCard.vue";
export default {
  name: "admin",
  components: {
    userCard,
  },
  data() {
    return {
      token: "",
      userId: "",
      users: "",
    };
  },

  methods: {
    getAllUsers() {
      let token = localStorage.getItem("token");
      this.token = token;

      let self = this;
      axios({
        method: "GET",
        url: `https://carolinep13-groupomania.herokuapp.com/api/user`,
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          //handle success
          self.users = response.data.users;
          console.log(response.data.users);
        })
        .catch(function (response) {
          //handle error

          console.log(response);
        });
    },
  },
  beforeMount() {
    this.getAllUsers();
  },
};
</script>
<style lang="scss"></style>
