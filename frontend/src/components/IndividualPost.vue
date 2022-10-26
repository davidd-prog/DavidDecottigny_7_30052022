<template>
  <div id="postContainer">
    <div v-for="post in posts" :key="post.id" class="individualPost">
      <div class="postInfos">
        <div class="postUser">Julie Dupont</div>
        <div class="postDate"></div>
      </div>
      <div class="postContent">
        <img
          class="postPhoto"
          src="../assets/Louvre_photo.jpg"
          alt="Photo du musée du Louvre"
        />
        <div class="postSentence">{{ post.content }}</div>
      </div>
      <div class="postStats">
        <div class="postAdmin">
          <button class="postUpdate">Modifier</button>
          <button class="postDelete">Supprimer</button>
        </div>
        <div class="postLikes">
          9 <fa class="fa-thumbs-up" icon="thumbs-up" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postsService } from "@/_services";
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
    };
  },

  mounted() {
    postsService
      .getAllPosts()
      .then((res) => {
        (this.posts = res.data), console.log(res);
      })
      .catch((err) => console.log(err));
  },

  methods: {},
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
.postStats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fa-thumbs-up {
  cursor: pointer;
  color: green;
}
</style>
