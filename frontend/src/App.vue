<template>
  <div>
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/login">connexion</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script></script>

<style>
/* @font-face {
  font-family: "lato-regular";
  src: local(lato-regular),
    url("./fonts/lato-regular-webfont.woff2") format("web open font format");
}

@font-face {
  font-family: "lato-bold";
  src: local(lato-bold),
    url("./fonts/lato-bold-webfont.woff2") format("web open font format");
} */

body {
  margin: auto;
  width: 95%;
  max-width: 1024px;
  font-size: 1em;
  font-family: "lato-regular", Arial, serif;
  font-weight: 400;
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
  font-family: "lato-bold", Arial, serif;
  font-weight: 700;
}

h2 {
  display: block;
  text-align: center;
}
</style>
