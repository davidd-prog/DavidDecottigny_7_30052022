<template>
  <div class="usersNames">
    <h1>Liste des utilisateurs</h1>
    <h2>{{ usersNumber }}</h2>
    <div class="userContainer">
      <div class="identity" v-for="(user, index) in users" :key="user.id">
        <div class="lastName">{{ user.lastname }}</div>
        <div class="firstName">{{ user.firstname }}</div>
        <button type="submit" @click="del(index)">Supprimer</button>
      </div>
    </div>
  </div>
</template>
<script>
import { usersService } from "@/_services";
// import axios from "axios";

export default {
  name: "UsersList",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    usersService
      .getAllUsers()
      .then((res) => {
        console.log(res.data);
        this.users = res.data;
        console.log(this.users);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    del(index) {
      console.log(index);
      console.log(this.users[index].id);
      // if (this.users.useradmin == 1) {
      usersService
        .deleteUser(this.users[index].id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
  computed: {
    usersNumber() {
      if (this.users.length == 0) {
        return "Il n'y a aucun membre dans notre réseau social";
      } else {
        return `Notre réseau social compte ${this.users.length} membres`;
      }
    },
  },
};
</script>
<style>
.usersNames {
  font-size: 1.3em;
}
.userContainer {
  display: flex;
  flex-direction: column;
}
.identity {
  display: flex;
  flex-direction: row;
}
.lastName {
  margin: 0.5em;
}
.firstName {
  margin: 0.5em;
}
</style>
