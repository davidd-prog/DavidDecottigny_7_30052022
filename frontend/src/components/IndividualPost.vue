<template>
  <div id="postContainer">
    <div v-for="(post, index) in posts" :key="post.id" class="individualPost">
      <div class="postInfos">
        <div @click="userProfile(index)" class="postUser">
          {{ post.user.firstname }} {{ post.user.lastname }}
        </div>
        <div class="postDate">{{ dateFormat[index] }}</div>
      </div>
      <div class="postContent">
        <img
          v-if="post.image != null || undefined"
          class="postPhoto"
          :src="`${post.image}`"
          alt="Photo du musée du Louvre"
        />
        <div class="postSentence">{{ post.content }}</div>
      </div>
      <div class="postStats">
        <div @click="postLike(index)" class="postLikes">
          {{ post.likes }} <fa class="fa-thumbs-up" icon="thumbs-up" />
        </div>
        <div v-if="post.userId == userId || userIsAdmin == 1" class="postAdmin">
          <button @click="modPage(index)" class="postUpdate">Modifier</button>
          <button @click="deletion(index)" class="postDelete">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postsService } from "@/_services";
import { accountService } from "@/_services";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import moment from "moment";

export default {
  name: "IndividualPost",
  props: {},
  data() {
    return {
      post: {
        id: "",
        content: "",
        image: "",
        likes: "",
        userId: "",
        createdAt: "",
      },
      posts: [],
      userId: "",
      userIsAdmin: "",
    };
  },

  mounted() {
    // Récupération des data et affichage  des posts à configurer et des infos user connecté pour la gestion admin des posts
    this.getAllPosts();

    let importUserId = () => {
      this.userId = accountService.getUserId();
    };

    let importUserIsAdmin = () => {
      this.userIsAdmin = accountService.getUserIsAdmin();
    };

    return importUserId(), importUserIsAdmin();
  },

  computed: {
    // Formatage de la date de création de post
    dateFormat() {
      return this.posts.map((p) =>
        moment(p.createdAt).format("[le] DD MMMM YYYY [à] HH:mm")
      );
    },
  },

  methods: {
    // Appel à l'API pour requêter les posts enregistrés dans la bdd
    getAllPosts() {
      postsService
        .getAllPosts()
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => console.log(err.message));
    },
    // Fonction permettant d'accéder à la section de modification de post
    modPage(index) {
      this.$router.push("/postupdate/" + this.posts[index].id);
    },

    // Appel à l'API pour requêter la suppression de post
    deletion(index) {
      const $toast = useToast();
      if (
        window.confirm(
          "Veuillez confirmer vouloir supprimer définitivement ce post"
        )
      ) {
        postsService
          .deletePost(this.posts[index].id)
          .then(() => {
            $toast.info("Votre post est définitivement supprimé !");

            this.getAllPosts();
          })
          .catch(() =>
            alert(
              "Votre post n'a pu être supprimé, veuillez réessayer ultérieurement "
            )
          );
      } else {
        alert(
          "Votre requête n'a pas pu aboutir, veuillez réessayer ultérieurement"
        );
      }
    },
    // Requête à l'API pour liker ou unliker un post
    postLike(index) {
      postsService
        .likePost(this.posts[index].id)
        .then(() => {
          this.getAllPosts();
        })
        .catch((err) => console.log(err));
    },

    // Process d'accession au profil user en cliquant sur le nom de l'auteur du post
    userProfile(index) {
      console.log(this.userId, this.posts[index].user.id, this.userIsAdmin);
      if (this.userId == this.posts[index].user.id || this.userIsAdmin == 1) {
        this.$router.push("/user/" + this.posts[index].user.id);
      }
    },
  },
};
</script>

<style>
.individualPost {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  margin-bottom: 1em;
  /* border: 1px solid blue; */
  border-radius: 10px;
  box-shadow: 0px 3px 4px lightgray;
  background: linear-gradient(#ffd7d7, white);
}
.postInfos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.postUser {
  font-weight: bold;
  cursor: pointer;
}
.postContent {
  display: flex;
  flex-direction: column;
}
.postPhoto {
  object-fit: cover;
  width: 100%;
  margin-top: 1em;
}
.postSentence {
  margin: 1em;
  margin-right: 0;
  /* width: 50%; */
  color: black;
}
.postLikes {
  display: flex;
  align-items: center;
}
.fa-thumbs-up {
  margin-left: 0.5em;
  cursor: pointer;
  color: green;
}
</style>
