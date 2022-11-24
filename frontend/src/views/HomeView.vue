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
    <AppFooter />
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

  mounted() {
    let importUserId = () => {
      this.userId = accountService.getUserId();
      // console.log(this.userId);
    };
    // return importUserId();

    let importUserFirstname = () => {
      this.userFirstname = accountService.getUserFirstname();
      // console.log(this.userFirstname, this.userId);
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
  /* background: #4e5166; */
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
  /* padding: 0.5em; */
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
  /* width: 100%; */
  padding: 1.5em;
  /* border: 1px solid #fd2d01; */
  border-radius: 10px;
}
/* postLikes {
  display: flex;
  align-items: center;
  justify-content: center;
} */
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
