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
                <!-- <label for="firstname"></label> -->
                <input
                  v-model="firstname"
                  @change="firstNameInputChecking"
                  class="firstnameField"
                  type="text"
                  placeholder="Prénom"
                  required
                />
                <small class="inputErrorMessage" v-if="firstnameErrorDisplay">
                  {{ firstNameErrorMessage }}
                </small>

                <!-- <label for="name"></label> -->
                <input
                  v-model="lastname"
                  @change="lastNameInputChecking"
                  class="lastnameField"
                  type="text"
                  placeholder="Nom"
                  required
                />
                <small class="inputErrorMessage" v-if="lastnameErrorDisplay">
                  {{ lastNameErrorMessage }}
                </small>
              </div>
              <div class="connectionBox">
                <!-- <label for="email"></label> -->
                <input
                  v-model="email"
                  @change="emailInputChecking"
                  class="emailField"
                  type="email"
                  placeholder="Email"
                  required
                />
                <small
                  class="inputErrorMessage"
                  v-if="emailErrorDisplay && signinSession"
                >
                  {{ emailErrorMessage }}
                </small>

                <!-- <label for="password"></label> -->
                <input
                  v-model="password"
                  @change="passwordInputChecking"
                  class="passwordField"
                  type="password"
                  placeholder="Mot de passe"
                  required
                />
                <small
                  class="inputErrorMessage"
                  v-if="passwordErrorDisplay && signinSession"
                >
                  {{ passwordErrorMessage }}
                </small>
                <!-- <label for="checkPassword"></label> -->
                <input
                  v-model="checkPassword"
                  @change="checkPasswordInputChecking"
                  class="checkPasswordField"
                  v-if="signinSession"
                  type="password"
                  placeholder="Vérifier mot de passe"
                  required
                />
                <small
                  class="inputErrorMessage"
                  v-if="checkPasswordErrorDisplay && signinSession"
                >
                  {{ checkPasswordErrorMessage }}
                </small>
              </div>
            </div>
            <div class="connect__order__form__submit">
              <p v-if="signinSession">
                <input
                  @click="isBoxChecked"
                  v-model="generalConditions"
                  type="checkbox"
                />J'ai lu et j'accepte les conditions générales d'utilisation.
              </p>
              <small
                class="inputErrorMessage"
                v-if="checkConditionsErrorDisplay && signinSession"
              >
                {{ conditionsErrorMessage }}
              </small>
              <button
                @click="registerAction"
                v-if="signinSession"
                type="submit"
                value="Signin"
                class="connectionButton"
              >
                <span v-if="status == 'loading'">Inscription en cours ...</span>
                <!-- <span v-else-if="status == 'created'">Vous êtes inscrit !</span> -->
                <span v-else>S'inscrire</span>
              </button>

              <button
                @click="connectAction"
                v-else
                type="submit"
                value="Login"
                class="connectionButton"
              >
                <span v-if="status == 'loading'">Connexion en cours ...</span>
                <span v-else-if="status == 'loggedin'"
                  >Vous êtes connectés !</span
                >
                <span v-else>Connexion</span>
              </button>
              <div
                class="loginFailure"
                v-if="signinSession == false && status == 'failLogin'"
              >
                Adresse mail ou mot de passe invalide
              </div>
              <div
                class="signinFailure"
                v-if="signinSession && status == 'failCreate'"
              >
                Connexion impossible !
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
    </div>
    <footer class="footer">
      <p>Groupomania</p>
    </footer>

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
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

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
      checkPassword: "",
      generalConditions: true,
      firstNameErrorMessage: "",
      firstnameErrorDisplay: true,
      lastNameErrorMessage: "",
      lastnameErrorDisplay: true,
      emailErrorMessage: "",
      emailErrorDisplay: true,
      passwordErrorMessage: "",
      passwordErrorDisplay: true,
      checkPasswordErrorMessage: "",
      checkPasswordErrorDisplay: true,
      conditionsErrorMessage: "",
      checkConditionsErrorDisplay: false,
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

    firstNameInputChecking: function () {
      const firstNameRegex = "^[a-zA-Zàâäéèêëïîôöùûüç' ,.'-]{3,15}$";
      if (this.firstname.match(firstNameRegex)) {
        this.firstnameErrorDisplay = false;
      } else {
        this.firstNameErrorMessage = "Veuillez saisir votre prénom";
        this.firstnameErrorDisplay = true;
      }
    },
    lastNameInputChecking: function () {
      const lastNameRegex = "^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]{1,25}$";
      if (this.lastname.match(lastNameRegex)) {
        this.lastnameErrorDisplay = false;
      } else {
        this.lastNameErrorMessage = "Veuillez saisir votre Nom";
        this.lastnameErrorDisplay = true;
      }
    },
    emailInputChecking: function () {
      const emailRegex =
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$";
      if (this.email.match(emailRegex)) {
        this.emailErrorDisplay = false;
      } else {
        this.emailErrorMessage = "Veuillez saisir votre email";
        this.emailErrorDisplay = true;
      }
    },
    passwordInputChecking: function () {
      const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){2,}(?=.{6,})";
      if (this.password.match(passwordRegex)) {
        this.passwordErrorDisplay = false;
      } else {
        this.passwordErrorMessage = "Veuillez saisir votre mot de passe";
        this.passwordErrorDisplay = true;
      }
    },
    checkPasswordInputChecking: function () {
      if (this.checkPassword === this.password) {
        // (this.checkPasswordErrorMessage = "Mot de passe confirmé"),
        this.checkPasswordErrorDisplay = false;
      } else {
        this.checkPasswordErrorMessage = "Le mot de passe est différent";
        this.checkPasswordErrorDisplay = true;
      }
    },
    isBoxChecked: function () {
      console.log(this.generalConditions);
      if (this.generalConditions == true) {
        this.checkConditionsErrorDisplay = true;
        this.generalConditions = false;
        this.conditionsErrorMessage =
          "Les conditions générales doivent être acceptées";
      } else {
        this.checkConditionsErrorDisplay = false;
        this.generalConditions = true;
      }
    },

    registerAction: function () {
      const $toast = useToast();

      this.firstNameInputChecking();
      this.lastNameInputChecking();
      this.emailInputChecking();
      this.passwordInputChecking();
      this.checkPasswordInputChecking();

      if (
        !this.firstnameErrorDisplay &&
        !this.lastnameErrorDisplay &&
        !this.emailErrorDisplay &&
        !this.passwordErrorDisplay &&
        !this.checkPasswordErrorDisplay &&
        !this.checkConditionsErrorDisplay
      ) {
        this.$store
          .dispatch("registerAction", {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            (response = response.ok), $toast.success("Vous êtes enregistré !");
            this.login(),
              (this.firstname = ""),
              (this.lastname = ""),
              (this.checkPassword = ""),
              (this.email = ""),
              (this.password = "");
          })
          .catch((error) => {
            alert(
              "Inscription impossible, veuillez vérifier les informations transmises ou réessayer ultérieurement"
            );
            console.log(error);
          });
      }
    },

    connectAction: function () {
      const $toast = useToast();
      // let instance = $toast.success("Vous êtes connecté !");

      this.$store
        .dispatch("connectAction", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("ça passe ici"),
            (response = response.ok),
            this.$router.push("/");
          $toast.success("Vous êtes connecté !");
        })
        .catch((error) => {
          console.log(error, "et là");
        });
    },
  },
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
