<template>
  <div class="usersNames">
    <div class="adminContainer">
      <header>
        <AppHeader />
      </header>
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
  </div>
</template>
<script>
import { usersService } from "@/_services";
import { accountService } from "@/_services";
import AppHeader from "@/components/AppHeader.vue";
// import axios from "axios";

export default {
  name: "UsersList",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    // Récupération des membres pour affichage au chargement de la page
    this.getAllUsers();

    // Récupération du statut admin permettant la gestion des membres
    let importUserIsAdmin = () => {
      this.userIsAdmin = accountService.getUserIsAdmin();
      console.log(this.userIsAdmin);
    };

    return importUserIsAdmin();
  },
  methods: {
    // Appel à l'API pour requêter tous les membres enregistrés dans la bdd
    getAllUsers() {
      usersService
        .getAllUsers()
        .then((res) => {
          console.log(res.data);
          this.users = res.data;
          console.log(this.users);
        })
        .catch((err) => console.log(err));
    },
    // Appel à l'API requêtant la suppression d'un user
    del(index) {
      // console.log(index);
      // console.log(this.users[index].id);
      if (this.userIsAdmin == 1) {
        if (
          window.confirm(
            "Etes-vous sûr de vouloir supprimer ce compte ? Toutes les publications associées seront également supprimées"
          )
        ) {
          usersService
            .deleteUser(this.users[index].id)
            .then(() => {
              this.getAllUsers();
            })

            .catch((err) => console.log(err));
        }
      } else {
        alert("Vous n'êtes pas autorisé à effectuer cette action !");
      }

      // this.users.splice(index);
    },
  },
  components: {
    AppHeader,
  },
  computed: {
    // Affichage en temps réel du nombres de membres inscrits
    usersNumber() {
      if (this.users.length == 0) {
        return "Il n'y a aucun membre dans notre réseau social";
      } else if (this.users.length == 1) {
        return `Notre réseau social compte ${this.users.length} membre.`;
      } else {
        return `Notre réseau social compte ${this.users.length} membres`;
      }
    },
  },
};
</script>
<style>
.adminContainer {
  width: 95%;
  margin: auto;
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
