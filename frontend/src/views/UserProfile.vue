<template>
  <div id="profileList">
    <div class="profileListContainer">
      <header>
        <AppHeader />
      </header>
      <h1>Profil utilisateur</h1>
      <h2>Vous avez ici la possibilité de modifier votre adresse email</h2>
      <form @submit.prevent="update" class="userUpdateForm">
        <div class="dataContainer">
          <label for="userEmail">email:</label>
          <input type="text" id="userEmail" v-model="user.email" />
        </div>
        <div class="updateButtonContainer">
          <button type="submit" class="updateSubmit">Modifier</button>
          <button @click="cancel" class="postCancel">Annuler</button>
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
  </div>
</template>
>

<script>
import Axios from "@/_services/caller.service";
import { accountService } from "@/_services";
import { usersService } from "@/_services";
import AppHeader from "@/components/AppHeader.vue";

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
    // Récupération du profil user corespondant à l'id contenu dans les params de l'url
    getOneUser() {
      Axios.get("/auth/" + this.$route.params.id)
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => console.log(err));
    },

    // Process de modification du user, ici de l'adrese email
    update() {
      usersService
        .updateUser(this.user)
        .then(() => {
          this.newMail = this.user.email;
          alert(
            `Votre nouvelle adresse email ${this.newMail} est enregistrée !`
          );
        })
        .catch((err) => console.log(err));
    },

    // Retour à la homePage si annulation de la modification
    cancel() {
      this.$router.push("/");
    },

    // Process de suppression de compte user
    delAccount() {
      if (
        window.confirm(
          "Etes-vous sûr de vouloir supprimer ce compte ? Toutes les publications associées seront également supprimées"
        )
      ) {
        usersService.deleteUser(this.user.id).then(() => {
          alert("Votre compte vient d'être supprimé !");
          accountService.logOut();
          this.$router.push("/login");
        });
      }
    },
  },
  components: {
    AppHeader,
  },
};
</script>

<style>
.profileListContainer {
  width: 95%;
  margin: auto;
}
.userUpdateForm {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.dataContainer {
  display: flex;
  align-items: center;
}
#userEmail {
  margin: 1em;
  border: 1px solid black;
}
.newMail {
  width: 90%;
  margin: auto;
}
.delAccountContainer {
  display: flex;
  flex-direction: column;
}
.delAccount {
  background: red;
  color: black;
  justify-content: center;
  padding: 1em;
  margin: auto;
}
</style>
