<template>
  <div>Liste des utilisateurs</div>
</template>
<script>
import { usersService } from "@/_services";

export default {
  name: "UserIndex",
  mounted() {
    usersService
      .getAllUsers()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },
};
</script>
