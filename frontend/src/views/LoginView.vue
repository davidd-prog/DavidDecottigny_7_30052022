<template>
  <body>
    <div id="page">
      <!--Entête du site avec le logo et le menu-->
      <header>
        <div class="headerSection">
          <div id="logo">
            <a class="logoCliquable" href="index.html">
              <img
                class="firmLogo"
                src="../assets/icon-left-font-monochrome-black.webp"
                alt="Logo de la société"
              />
            </a>
          </div>
        </div>
      </header>

      <section id="connectionBloc">
        <!--Formulaire d'inscription ou de connexion-->
        <div id="connect__section">
          <form method="get" class="connect__section__form">
            <h1>Se connecter</h1>
            <div class="connect__section__form__items">
              <div class="connectionBox">
                <input
                  v-model="user.email"
                  @change="emailInputChecking"
                  class="emailField"
                  type="email"
                  placeholder="Email"
                  required
                />
                <small class="inputErrorMessage" v-if="emailErrorDisplay">
                  {{ emailErrorMessage }}
                </small>

                <!-- <label for="password"></label> -->
                <input
                  v-model="user.password"
                  @change="passwordInputChecking"
                  class="passwordField"
                  type="password"
                  placeholder="Mot de passe"
                  required
                />
                <small class="inputErrorMessage" v-if="passwordErrorDisplay">
                  {{ passwordErrorMessage }}
                </small>
                <!-- <label for="checkPassword"></label> -->
              </div>
            </div>
            <div class="connect__order__form__submit">
              <button
                @click="connectAction"
                type="submit"
                value="Login"
                class="connectionButton"
              >
                <span>Connexion</span>
              </button>
            </div>

            <p class="inscription">
              Je n'ai pas de compte,
              <router-link class="signinLink" to="/signup"
                >je m'inscris !</router-link
              >
            </p>
          </form>
        </div>
      </section>
    </div>
    <AppFooter />
  </body>
</template>

<script>
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import AppFooter from "@/components/AppFooter.vue";
import { accountService } from "@/_services";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      emailErrorMessage: "",
      emailErrorDisplay: true,
      passwordErrorMessage: "",
      passwordErrorDisplay: true,
    };
  },

  methods: {
    connectAction: function () {
      const $toast = useToast();
      // let instance = $toast.success("Vous êtes connecté !");

      accountService
        .connectAction(this.user)
        .then((res) => {
          // console.log(res.data);
          $toast.success("Vous êtes connecté !");
          accountService.saveToken(res.data.token);
          accountService.saveUserId(res.data.userId);
          accountService.saveUserFirstname(res.data.firstname);
          accountService.saveUserIsAdmin(res.data.userAdmin);

          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
  components: { AppFooter },
};
</script>

<style>
#page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin: auto;
}

.headerSection {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
}
#logo {
  display: flex;
  justify-content: center;
}
#logo img {
  width: 310px;
  object-fit: cover;
}

#connectionBloc {
  margin-top: 2em;
}

#connect__section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.connect__section__form {
  padding: 3% 6%;
  margin: 3em 0.5em;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #ffd7d7;
  color: black;
  border-radius: 2.1em;
}
.connect__section__form__items {
  display: flex;
  flex-direction: column;
}

.connect__section__form__items input[type="email"],
input[type="password"],
input[type="text"] {
  width: 80%;
  padding: 0.9em;
  border-radius: 10px;
  border: none;
  outline: none;
  margin: 1em;
}

.signinFailure {
  color: red;
}

.loginFailure {
  color: red;
}

.signinLink {
  text-decoration: underline;
  cursor: pointer;
  color: blue;
}

.connectionButton {
  padding: 0.9em 2em;
  background: white;
}

@media only screen and (max-width: 315px) {
  #page {
    width: 90%;
  }
  #logo img {
    width: 260px;
    object-fit: cover;
  }
}
</style>
