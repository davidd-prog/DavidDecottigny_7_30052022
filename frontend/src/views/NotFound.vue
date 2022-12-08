<template>
  <div class="content">
    <h1 class="notFoundHeader">Erreur 404 Ressource introuvable !</h1>
    <p class="backHomeView">
      <router-link class="backHomeLink" to="/"
        >Retourner sur la page d'accueil</router-link
      >
    </p>
  </div>
</template>
<script>
export default {
  name: "NotFound",
};
</script>
<style>
.content {
  margin-top: 30vh;
  color: #fd2b019c;
}
.backHomeView {
  text-align: center;
}
.backHomeLink {
  text-decoration: underline;
  color: #4e5166;
}
</style>
