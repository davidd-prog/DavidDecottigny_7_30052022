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
    <footer>
      <AppFooter />
    </footer>
  </body>
</template>

<script>
// // @ is an alias to /src
import PostForm from "@/components/PostForm.vue";
import IndividualPost from "@/components/IndividualPost.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

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
    AppFooter,
  },
};
</script>

<style>
#talkPage {
  width: 95%;
  margin: auto;
}
.infoHeaderTalkSection {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #4e51663b;
}
.actionHeaderBox {
  display: flex;
  flex-direction: row;
  justify-content: end;
}
.actionHeaderTalkSection {
  display: flex;
  flex-direction: column;
  border: 1px solid #4e51669c;
}
.actionHeaderTalkSection a {
  color: black;
  padding: 0.2em;
  margin: 0.2em;
}
#talkLogo {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5em;
}
header li {
  display: inline-block;
  position: relative;
}
.userFirstname {
  color: black;
}
#talkMenu {
  z-index: 2;
}
.talkUserMenu {
  margin-right: 1em;
}
header li a {
  display: block;
}
header li:hover .subTalkMenu {
  display: block;
}
.subTalkMenu {
  background: #4e5166;
  border-radius: 10px;
  box-shadow: 0px 3px 4px lightgray;
  display: none;
  padding: 0;
  position: absolute;
}
.subTalkMenu li {
  padding: 0.5em;
}
.subTalkMenu li a {
  color: white;
}
.avatarBox {
  display: flex;
  align-items: center;
}
.profileAvatar {
  border: 1px solid black;
  background: lightgray;
  padding: 0.75em;
  border-radius: 50%;
}
.fa-user {
  color: black;
  font-size: 1em;
}
.appliUser {
  margin-left: 1em;
}
.appliUser a {
  font-weight: bold;
  color: black;
}
#talkLogo img {
  width: 100%;
  height: 60px;
}
#allPosts {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5em;
  border-radius: 10px;
}

/* Responsive */
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
@media only screen and (min-width: 750px) {
  #tchatSection {
    width: 45%;
    margin: auto;
  }
  #postsBoard {
    width: 45%;
    margin: auto;
  }
}
@media only screen and (max-width: 315px) {
  #talkMenu {
    width: 185px;
  }
}
</style>
