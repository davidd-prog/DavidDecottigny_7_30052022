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
              <!-- <i class="fas fa-user"></i> -->
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
                <a class="allUsersLink" href="users.html"
                  >Profils utilisateurs</a
                >
              </li>
            </ul>
          </li>
          <li>
            <a class="userFirstname" href="profile.html" title="Utilisateur"
              >David</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppHeader",
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("firstname");
      localStorage.removeItem("userid");
      localStorage.removeItem("userAdmin");
      this.$router.push("/login");
    },
  },
};
</script>
<style></style>
