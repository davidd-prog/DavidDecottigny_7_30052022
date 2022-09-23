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
            <h1 v-if="signinSession">S'inscrire</h1>
            <h1 v-else>Se connecter</h1>
            <div class="connect__section__form__items">
              <div class="namesBox" v-if="signinSession">
                <label for="firstname"></label>
                <input
                  v-model="firstname"
                  class="firstnameField"
                  type="text"
                  placeholder="Prénom"
                  required
                />
                <p class="firstnameErrorMessage"></p>

                <label for="name"></label>
                <input
                  v-model="lastname"
                  class="lastnameField"
                  type="text"
                  placeholder="Nom"
                  required
                />
                <p class="lastnameErrorMessage"></p>
              </div>
              <div class="connectionBox">
                <label for="email"></label>
                <input
                  v-model="email"
                  class="emailField"
                  type="email"
                  placeholder="Email"
                  required
                />
                <p class="emailErrorMessage"></p>
                <label for="password"></label>
                <input
                  v-model="password"
                  class="passwordField"
                  type="password"
                  placeholder="Mot de passe"
                  required
                />
                <p class="passwordErrorMessage"></p>
                <label for="checkPassword"></label>
                <input
                  class="checkPasswordField"
                  v-if="signinSession"
                  type="password"
                  placeholder="Vérifier mot de passe"
                  required
                />
                <p class="checkPasswordErrorMessage"></p>
              </div>
            </div>
            <div class="connect__order__form__submit">
              <p v-if="signinSession">
                <input type="checkbox" />J'ai lu et j'accepte les conditions
                générales d'utilisation.
              </p>
              <button
                @click="registerAction"
                v-if="signinSession"
                type="submit"
                value="Signin"
                id="connectionButton"
              >
                S'incrire
              </button>

              <button
                @click="connectAction"
                v-else
                type="submit"
                value="Login"
                id="connectionButton"
              >
                <span v-if="status == 'loading'">Connexion en cours ...</span>
                <span v-else-if="status == 'loggedin'"
                  >Vous êtes connectés !</span
                >
                <span v-else>Connexion</span>
              </button>
              <div class="loginFailure" v-if="status == 'failLogin'">
                Adresse mail ou mot de passe invalide
              </div>
            </div>
            <div class="userStatus" v-if="signinSession"></div>
            <p v-if="signinSession" class="inscription">
              J'ai déjà un compte,
              <span @click="login" class="signinLink">je me connecte !</span>
            </p>
            <p v-else class="inscription">
              Je n'ai pas de compte,
              <span @click="signin" class="signinLink">je m'inscris !</span>
            </p>
          </form>
        </div>
      </section>

      <footer class="footer">
        <p>Groupomania</p>
      </footer>
    </div>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="js/index.js"></script>
    <script
      src="https://kit.fontawesome.com/c6de47250a.js"
      crossorigin="anonymous"
    ></script> -->
  </body>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      link: "/homeview",
      signinSession: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  },
  computed: mapState([
    // map this.count to store.state.count
    "status",
  ]),
  methods: {
    login: function () {
      this.signinSession = false;
    },
    signin: function () {
      this.signinSession = true;
    },

    registerAction: function () {
      this.$store
        .dispatch("registerAction", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    connectAction: function () {
      this.$store
        .dispatch("connectAction", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          (response = response.ok), this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
textarea {
  border-radius: 10px;
  box-shadow: 0px 3px 4px grey;
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

.loginFailure {
  color: red;
}

.signinLink {
  text-decoration: underline;
  cursor: pointer;
  color: blue;
}

#connectionButton {
  padding: 0.9em 2em;
  background: white;
}

.footer {
  background: black;
  display: flex;
  justify-content: center;
  color: antiquewhite;
}
</style>
