<template>
  <div id="tchatBox">
    <div class="tchatBoxWrite">
      <h2 id="postCreate" @click="open">Créer un post</h2>
      <form class="hiddenPostForm" v-show="success">
        <fa class="fa-window-close" icon="window-close" @click="close" />
        <div class="postWriting">
          <p class="postContainer">Contenu:</p>
          <textarea
            id="text"
            name="post"
            rows="5"
            cols="33"
            v-model="post.content"
          >
          </textarea>
        </div>
        <div class="imageToSend">
          <label for="image" aria-label="Image:"></label>
          <input
            name="image"
            type="file"
            class="addImage"
            accept="image/jpg, image/jpeg, image/png, image/gif, image.webp"
            @change="imageSelection"
          />
        </div>
        <div class="postValidate">
          <button type="submit" class="postSubmit" @click="createPost">
            Soumettre
          </button>
          <button class="postCancel">Annuler</button>
        </div>
      </form>
    </div>
    <div class="newPost" v-show="success">
      <h2 class="postView">Aperçu du post</h2>
      <div class="postInfos">
        <div class="postUser">David Decottigny</div>
        <div class="postDate">Aujourd'hui</div>
      </div>
      <div class="postContent">
        <div class="postSentence">
          {{ post.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postsService } from "@/_services";
// import router from "../router";
export default {
  name: "PostForm",
  data() {
    return {
      success: false,
      post: {
        content: "",
        image: "",
        likes: "",
      },
    };
  },
  methods: {
    close: function () {
      this.success = false;
    },
    open: function () {
      this.success = true;
    },

    imageSelection: function (event) {
      this.post.image = event.target.files[0] || event.dataTransfer.files;
    },
    createPost: function (event) {
      event.preventDefault();
      console.log(this.post);
      const formData = new FormData();
      formData.append("content", this.post.content);
      formData.append("image", this.post.image);

      if (this.post.image == "") {
        this.post.image = null;
      }
      if (this.post.content != "" || undefined) {
        postsService
          .createPost(this.post, formData)
          .then(() => {
            location.reload();
            // router.push("/");
          })
          // console.log(res))
          .catch((err) => console.log(err.message));
        // location.reload(false);
        // console.log("ça ne fonctionne pas");
      } else {
        alert("Votre publication ne peut pas être vide de contenu");
      }
    },
  },
};
</script>

<style>
.tchatBoxWrite {
  /* width: 100%; */
  /* margin: 1em; */
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  /* border: 1px solid green; */
  background: linear-gradient(#fd2b019c, #ffd7d7);
  box-shadow: 0px 3px 4px lightgray;
  position: relative;
  /* border-radius: 2.1em; */
}
.tchatBoxWrite button {
  background: white;
}
#postCreate {
  font-size: 1.25em;
  margin: auto;
  margin-bottom: 1em;
  cursor: pointer;
}
.fa-window-close {
  position: absolute;
  top: 20px;
  right: 5px;
  cursor: pointer;
}
.postWriting {
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;
}
.postContainer {
  margin-right: 10%;
}
.addImage {
  border-radius: 2.1em;
  margin-left: 15%;
}
.imageToSend {
  display: flex;
  flex-direction: row;
}
.postValidate {
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
}
.newPost {
  margin-top: 0.5em;
  background: linear-gradient(#4e5166a6, white);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1em;
  box-shadow: 0px 3px 4px lightgray;
}
.postView {
  font-size: 1.25em;
  margin: auto;
  margin-bottom: 1em;
  cursor: pointer;
}
</style>
