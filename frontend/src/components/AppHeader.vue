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

    userProfile(userId) {
      console.log(userId);
      this.$router.push("/user/" + userId);
    },
  },
};
</script>
<style>
.userFirstname {
  cursor: pointer;
}
.profileLink {
  cursor: pointer;
}
.allUsersLink {
  cursor: pointer;
}
</style>
