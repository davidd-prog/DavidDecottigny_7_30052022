<template>
  <div id="postContainer">
    <div v-for="(post, index) in posts" :key="post.id" class="individualPost">
      <div class="postInfos">
        <div class="postUser">
          {{ post.user.firstname }} {{ post.user.lastname }}
        </div>
        <div class="postDate"></div>
      </div>
      <div class="postContent">
        <img
          v-if="post.image != null"
          class="postPhoto"
          :src="`${post.image}`"
          alt="Photo du musée du Louvre"
        />
        <div class="postSentence">{{ post.content }}</div>
      </div>
      <div class="postStats">
        <div class="postLikes">
          {{ post.likes }} <fa class="fa-thumbs-up" icon="thumbs-up" />
        </div>
        <div v-if="post.userId == userId || userIsAdmin == 1" class="postAdmin">
          <button class="postUpdate">Modifier</button>
          <button @click="deletion(index)" class="postDelete">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postsService } from "@/_services";
import { accountService } from "@/_services";

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
    this.getAllPosts();

    let importUserId = () => {
      this.userId = accountService.getUserId();
      // console.log(this.userId);
    };
    // return importUserId();

    let importUserIsAdmin = () => {
      this.userIsAdmin = accountService.getUserIsAdmin();
      // console.log(this.userIsAdmin);
    };

    return importUserId(), importUserIsAdmin();
  },

  methods: {
    getAllPosts() {
      postsService
        .getAllPosts()
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => console.log(err));
    },

    deletion(index) {
      if (
        window.confirm(
          "Veuillez confirmer vouloir supprimer définitivement ce post"
        )
      ) {
        postsService
          .deletePost(this.posts[index].id)
          .then(() => {
            alert("Votre post est définitivement supprimé !");
            this.getAllPosts();
            // this.postsService.getAllPosts();
            // this.$router.push("/");
            // Window.location.reload();
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
  font-size: 1.2em;
  font-weight: bold;
}
.postContent {
  display: flex;
  flex-direction: column;
}
.postPhoto {
  object-fit: cover;
  width: 100%;
  /* max-width: 400px; */
  height: 160px;
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
