<template>
  <div id="profileList">
    <h1>Profil utilisateur</h1>
    <h2>Vous avez ici la possibilité de modifier votre adresse email</h2>
    <form @submit.prevent="update" class="userUpdateForm">
      <div class="dataContainer">
        <label for="userEmail">email:</label>
        <input type="text" id="userEmail" v-model="user.email" />
      </div>
      <div class="updateButtonContainer">
        <button type="submit" class="updateSubmit">Modifier</button>
      </div>
    </form>
    <p class="newMail">Votre mail est désormais : {{ newMail }}</p>
    <div class="delAccountContainer">
      <h2>Vous pouvez ici décider de supprimer votre compte</h2>
      <button @click="delAccount" class="delAccount">
        Supprimer mon compte
      </button>
    </div>
  </div>
</template>
>

<script>
import Axios from "@/_services/caller.service";
import { accountService } from "@/_services";
import { usersService } from "@/_services";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {
        email: "",
      },
      newMail: "",
    };
  },
  mounted() {
    this.getOneUser();
  },
  methods: {
    getOneUser() {
      Axios.get("/auth/" + this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.user = res.data;
        })
        .catch((err) => console.log(err));
    },

    update() {
      // console.log(this.user);
      usersService
        .updateUser(this.user)
        .then((res) => {
          console.log(res);
          console.log(this.user.email);
          this.newMail = this.user.email;
          // console.log(newMail);
          alert(
            `Votre nouvelle adresse email ${this.newMail} est enregistrée !`
          );
        })
        .catch((err) => console.log(err));
    },

    delAccount() {
      console.log(this.user);
      usersService.deleteUser(this.user.id).then((res) => {
        console.log(res);
        alert("Votre compte vient d'être supprimé !");
        accountService.logOut();
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
.userUpdateForm {
  display: flex;
  align-items: center;
  justify-content: center;
}
#userEmail {
  margin: 1em;
}
.newMail {
  margin: 1em;
}
.delAccountContainer {
  display: flex;
  flex-direction: column;
}
.delAccount {
  background: red;
  color: white;
  justify-content: center;
  padding: 1em;
  margin: auto;
}
</style>
