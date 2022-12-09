<template>
  <div class="headerTalkSection">
    <div class="infoHeaderTalkSection">
      <div id="talkLogo">
        <a class="logoTalkCliquable" href="index.html">
          <img
            class="firmLogo"
            src="../assets/icon-left-font-definitive.webp"
            alt="Logo de la société"
          />
        </a>
      </div>
      <nav id="talkMenu">
        <ul>
          <li class="talkUserMenu">
            <a
              class="profileAvatar"
              aria-label="lien vers profil de l'utilisateur"
              href="profile.html"
            >
              <fa icon="user" />
            </a>
            <ul class="subTalkMenu">
              <li>
                <a @click="userProfile(userId)" class="profileLink"
                  >Mon profil</a
                >
              </li>
              <li>
                <a @click="logout" class="logOutLink" href="index.html"
                  >Deconnexion</a
                >
              </li>
              <li>
                <a
                  @click="admin"
                  v-if="userIsAdmin == 1"
                  class="allUsersLink"
                  href="users.html"
                  >Listing utilisateurs</a
                >
              </li>
            </ul>
          </li>
          <li>
            <a
              @click="userProfile(userId)"
              class="userFirstname"
              title="Utilisateur"
              >{{ userFirstname }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import { accountService } from "@/_services";

export default {
  name: "AppHeader",
  data() {
    return {
      userFirstname: "",
      userIsAdmin: "",
      userId: "",
    };
  },

  mounted() {
    // Récupération et affichage des données user connectées afin de personnaliser le header et le menu déroulant
    let importUserFirstname = () => {
      this.userFirstname = accountService.getUserFirstname();
      // console.log(this.userFirstname, this.userId);
    };

    let importUserIsAdmin = () => {
      this.userIsAdmin = accountService.getUserIsAdmin();
      console.log(this.userIsAdmin);
    };

    let importUserId = () => {
      this.userId = accountService.getUserId();
      console.log(this.userId);
    };

    return importUserFirstname(), importUserIsAdmin(), importUserId();
  },

  methods: {
    // Process de déconnexion user
    logout() {
      accountService.logOut();
      this.$router.push("/login");
    },
    // Accès à la liste des membres inscrits pour l'administrateur
    admin(event) {
      event.preventDefault();
      this.$router.push("/users");
    },
    // Accès à son propre profil pour le user connecté
    userProfile(userId) {
      console.log(userId);
      this.$router.push("/user/" + userId);
    },
  },
};
</script>
<style>
.headerTalkSection {
  width: 90%;
  margin: auto;
}
.infoHeaderTalkSection {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #4e51663b;
}
.actionHeaderBox {
  display: flex;
  flex-direction: row;
  justify-content: end;
}
.actionHeaderTalkSection {
  display: flex;
  flex-direction: column;
  border: 1px solid #4e51669c;
}
.actionHeaderTalkSection a {
  color: black;
  padding: 0.2em;
  margin: 0.2em;
}
#talkLogo {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5em;
}
header li {
  display: inline-block;
  position: relative;
}
.userFirstname {
  color: black;
}
#talkMenu {
  z-index: 2;
}
.talkUserMenu {
  margin-right: 1em;
}
header li a {
  display: block;
}
header li:hover .subTalkMenu {
  display: block;
}
.subTalkMenu {
  background: #4e5166;
  border-radius: 10px;
  box-shadow: 0px 3px 4px lightgray;
  display: none;
  padding: 0;
  position: absolute;
}
.subTalkMenu li {
  padding: 0.5em;
}
.subTalkMenu li a {
  color: white;
}
.avatarBox {
  display: flex;
  align-items: center;
}
.profileAvatar {
  border: 1px solid black;
  background: lightgray;
  padding: 0.75em;
  border-radius: 50%;
}
.fa-user {
  color: black;
  font-size: 1em;
}
.appliUser {
  margin-left: 1em;
}
.appliUser a {
  font-weight: bold;
  color: black;
}
#talkLogo img {
  width: 100%;
  height: 60px;
}
.userFirstname {
  cursor: pointer;
}
.profileLink {
  cursor: pointer;
}
.allUsersLink {
  cursor: pointer;
}
@media only screen and (max-width: 340px) {
  #talkMenu {
    width: 185px;
  }
}
@media only screen and (max-width: 300px) {
  .headerTalkSection {
    width: 100%;
  }
}
</style>
