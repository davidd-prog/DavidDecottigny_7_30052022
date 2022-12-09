<template>
  <body>
    <div id="talkPage">
      <header>
        <AppHeader />
      </header>
      <section id="tchatSection">
        <h1>Bienvenue {{ userFirstname }} !</h1>
        <PostForm />
      </section>
      <section id="postsBoard">
        <h2 class="posts">Fil d'actualité</h2>

        <IndividualPost />
      </section>
    </div>
  </body>
</template>

<script>
// @ est un alias à /src
import PostForm from "@/components/PostForm.vue";
import IndividualPost from "@/components/IndividualPost.vue";
import AppHeader from "@/components/AppHeader.vue";

import { accountService } from "@/_services";
export default {
  name: "HomeView",
  data() {
    return {
      userId: "",
      userFirstname: "",
      userIsAdmin: "",
    };
  },
  // Récupération des données user connecté
  mounted() {
    let importUserId = () => {
      this.userId = accountService.getUserId();
    };

    let importUserFirstname = () => {
      this.userFirstname = accountService.getUserFirstname();
    };

    let importUserIsAdmin = () => {
      this.userIsAdmin = accountService.getUserIsAdmin();
      console.log(this.userIsAdmin);
    };

    return importUserId(), importUserFirstname(), importUserIsAdmin();
  },

  methods: {},
  components: {
    PostForm,
    IndividualPost,
    AppHeader,
  },
};
</script>

<style>
#talkPage {
  width: 95%;
  margin: auto;
}
.posts {
  margin-top: 2em;
}
#allPosts {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5em;
  border-radius: 10px;
}

/* Responsive */
@media only screen and (min-width: 360px) {
  #tchatSection {
    width: 70%;
    margin: auto;
  }
  #postsBoard {
    width: 70%;
    margin: auto;
  }
}
@media only screen and (min-width: 540px) {
  #tchatSection {
    width: 60%;
    margin: auto;
  }
  #postsBoard {
    width: 60%;
    margin: auto;
  }
}
@media only screen and (min-width: 650px) {
  #tchatSection {
    width: 45%;
    margin: auto;
  }
  #postsBoard {
    width: 45%;
    margin: auto;
  }
}
</style>
