<template>
  <div>
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/signup">Inscription</router-link> |
      <router-link to="/users">Liste des utilisateurs</router-link> |
      <router-link to="/users/:id">Profil Utilisateur</router-link> |
      <router-link to="/postupdate/:id">Modification de post</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script></script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");

body {
  margin: auto;
  width: 100%;
  max-width: 1024px;
  font-size: 1.1em;
  font-family: "lato", Arial, serif;
  font-weight: 400;
  padding-bottom: 3em;
}

textarea {
  border-radius: 10px;
  box-shadow: 0px 3px 4px grey;
}

a {
  text-decoration: none;
}

button {
  border-radius: 2.1em;
  padding: 0.5em 0.5em;
  margin: 0.4em;
  border: none;
  background: #ffd7d7;
  box-shadow: 0px 3px 4px lightgray;
  cursor: pointer;
}

h1 {
  font-size: 2em;
  display: block;
  text-align: center;
  font-family: "lato", Arial, serif;
  font-weight: 700;
}

h2 {
  display: block;
  text-align: center;
}

small {
  color: red;
}

footer {
  width: 100%;
  background: black;
  display: flex;
  justify-content: center;
  color: antiquewhite;
}
</style>
