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
            <a class="profileAvatar" href="profile.html">
              <fa icon="user" />
            </a>
            <ul class="subTalkMenu">
              <li>
                <a class="profileLink" href="profile.html">Mon profil</a>
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
            <a class="userFirstname" href="profile.html" title="Utilisateur">{{
              userFirstname
            }}</a>
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
    };
  },

  mounted() {
    let importUserFirstname = () => {
      this.userFirstname = accountService.getUserFirstname();
      // console.log(this.userFirstname, this.userId);
    };

    let importUserIsAdmin = () => {
      this.userIsAdmin = accountService.getUserIsAdmin();
      console.log(this.userIsAdmin);
    };

    return importUserFirstname(), importUserIsAdmin();
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("firstname");
      localStorage.removeItem("userid");
      localStorage.removeItem("userAdmin");
      this.$router.push("/login");
    },

    admin(event) {
      event.preventDefault();
      this.$router.push("/users");
    },
  },
};
</script>
<style></style>
