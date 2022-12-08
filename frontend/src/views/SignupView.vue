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
            <h1>S'inscrire</h1>
            <div class="connect__section__form__items">
              <div class="namesBox">
                <input
                  v-model="user.firstname"
                  @change="firstNameInputChecking"
                  id="prenom"
                  type="text"
                  aria-label="prénom"
                  placeholder="Prénom"
                  required
                />
                <small class="inputErrorMessage" v-if="firstnameErrorDisplay">
                  {{ firstNameErrorMessage }}
                </small>

                <input
                  v-model="user.lastname"
                  @change="lastNameInputChecking"
                  id="nom"
                  type="text"
                  aria-label="nom"
                  placeholder="Nom"
                  required
                />
                <small class="inputErrorMessage" v-if="lastnameErrorDisplay">
                  {{ lastNameErrorMessage }}
                </small>
              </div>
              <div class="connectionBox">
                <input
                  v-model="user.email"
                  @change="emailInputChecking"
                  id="email"
                  type="email"
                  aria-label="email"
                  placeholder="Email"
                  required
                />
                <small class="inputErrorMessage" v-if="emailErrorDisplay">
                  {{ emailErrorMessage }}
                </small>
                <input
                  v-model="user.password"
                  @change="passwordInputChecking"
                  id="mot-de-passe"
                  type="password"
                  aria-label="mot de passe"
                  placeholder="Mot de passe"
                  required
                />
                <small class="inputErrorMessage" v-if="passwordErrorDisplay">
                  {{ passwordErrorMessage }}
                </small>
                <input
                  v-model="checkPassword"
                  @change="checkPasswordInputChecking"
                  id="confirmation-mot-de-passe"
                  type="password"
                  aria-label="vérification du mot de passe"
                  placeholder="Vérifier mot de passe"
                  required
                />
                <small
                  class="inputErrorMessage"
                  v-if="checkPasswordErrorDisplay"
                >
                  {{ checkPasswordErrorMessage }}
                </small>
              </div>
            </div>
            <div class="connect__order__form__submit">
              <p>
                <input
                  @click="isBoxChecked"
                  v-model="generalConditions"
                  type="checkbox"
                  aria-label="conditions d'utilisation"
                  id="conditions-generales"
                />J'ai lu et j'accepte les conditions générales d'utilisation.
              </p>
              <small
                class="inputErrorMessage"
                v-if="checkConditionsErrorDisplay"
              >
                {{ conditionsErrorMessage }}
              </small>
              <button
                @click="registerAction"
                type="submit"
                aria-label="bouton de soumission du formulaire"
                value="Signin"
                id="soumission-formulaire"
              >
                <span>S'inscrire</span>
              </button>
              <small class="inputErrorMessage" v-if="signupErrorDisplay">
                {{ signupErrorMessage }}
              </small>
            </div>
            <p class="inscription">
              J'ai déjà un compte,
              <router-link class="signinLink" to="/login"
                >je me connecte !</router-link
              >
            </p>
          </form>
        </div>
      </section>
    </div>
  </body>
</template>

<script>
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { accountService } from "@/_services";

export default {
  name: "SignupView",
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },

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
      signupErrorDisplay: false,
      signupErrorMessage: "",
    };
  },
  methods: {
    // Vérification des data transmises par les regex
    firstNameInputChecking: function () {
      const firstNameRegex = "^[a-zA-Zàâäéèêëïîôöùûüç' ,.'-]{2,20}$";
      if (this.user.firstname.match(firstNameRegex)) {
        this.firstnameErrorDisplay = false;
      } else {
        this.firstNameErrorMessage = "Veuillez saisir un prénom valide";
        this.firstnameErrorDisplay = true;
      }
    },
    lastNameInputChecking: function () {
      const lastNameRegex = "^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]{1,25}$";
      if (this.user.lastname.match(lastNameRegex)) {
        this.lastnameErrorDisplay = false;
      } else {
        this.lastNameErrorMessage = "Veuillez saisir un nom valide";
        this.lastnameErrorDisplay = true;
      }
    },
    emailInputChecking: function () {
      const emailRegex =
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$";
      if (this.user.email.match(emailRegex)) {
        this.emailErrorDisplay = false;
      } else {
        this.emailErrorMessage =
          "Veuillez saisir le format email standard. ex: john@domain.com";
        this.emailErrorDisplay = true;
      }
    },
    passwordInputChecking: function () {
      const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){2,}(?=.{6,})";
      if (this.user.password.match(passwordRegex)) {
        this.passwordErrorDisplay = false;
      } else {
        this.passwordErrorMessage =
          "Veuillez saisir un mot de passe de 6 caratères minimum avec au moins 1 majuscule et 1 chiffre";
        this.passwordErrorDisplay = true;
      }
    },
    checkPasswordInputChecking: function () {
      if (this.checkPassword === this.user.password) {
        this.checkPasswordErrorDisplay = false;
      } else {
        this.checkPasswordErrorMessage = "Le mot de passe est différent";
        this.checkPasswordErrorDisplay = true;
      }
    },
    isBoxChecked: function () {
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

    // Appel à l'API pour requête d'enregistremant de l'utilisateur dans la bdd
    registerAction: function (event) {
      event.preventDefault();
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
        accountService
          .registerAction(this.user)
          .then((res) => {
            this.user = res;
            $toast.success("Vous êtes enregistré !");
            this.$router.push("/login");
          })
          .catch((err) => {
            if (err.response.status == 400) {
              this.signupErrorDisplay = true;
              this.signupErrorMessage = "Email déjà utilisé";
            } else {
              console.log(err);
              this.signupErrorDisplay = true;
              this.signupErrorMessage =
                "Inscription impossible, veuillez reessayer ultérieurement";
            }
          });
      }
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
/* #connectionBloc {
  margin-top: 2em;
} */
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
.connect__order__form__submit {
  display: flex;
  flex-direction: column;
}
.namesBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.connectionBox {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.signinLink {
  text-decoration: underline;
  cursor: pointer;
  color: blue;
}
#soumission-formulaire {
  padding: 0.9em 2em;
  background: white;
  margin: auto;
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
