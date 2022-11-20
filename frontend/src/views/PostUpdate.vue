<template>
  <div id="modtchatBox">
    <div class="tchatBoxWrite">
      <h2 id="postCreate">Modifier ce post</h2>
      <p>Contenu actuel :</p>
      <p class="oldContent">{{ post.content }}</p>
      <div class="actualImageContainer">
        Image actuelle :
        <img
          v-if="post.image != null || undefined"
          class="postPhoto"
          :src="`${post.image}`"
        />
        <p v-else>Votre post ne contenait pas d'image.</p>
      </div>
      <form @submit.prevent="updatePost">
        <p class="postContainer">Nouveau contenu:</p>
        <textarea
          id="text"
          name="post"
          rows="5"
          cols="33"
          v-model="newPost.content"
        >
        </textarea>
        <div class="newImageToSend">
          <label for="image" aria-label="Image:"></label>
          <input
            name="image"
            type="file"
            class="addNewImage"
            accept="image/jpg, image/jpeg, image/png, image/gif, image.webp"
            @change="imageSelection"
          />
        </div>
        <div class="postValidate">
          <button type="submit" class="postSubmit">Soumettre</button>
          <button @click="cancel" class="postCancel">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Axios from "@/_services/caller.service";

export default {
  name: "PostUpdate",
  data() {
    return {
      newPost: {
        content: "",
        image: "",
      },
      post: {
        content: "",
        image: "",
      },
    };
  },
  // Récupération du post à modifier une fois la page affichée
  mounted() {
    Axios.get("/posts/" + this.$route.params.id)
      .then((res) => {
        this.post = res.data;
        console.log(res);
      })
      .catch((err) => console.log(err));
  },

  methods: {
    // Modes de récupération du fichier joint
    imageSelection: function (event) {
      console.log(event);
      this.newPost.image = event.target.files[0] || event.dataTransfer.files;
    },

    // Traitement des données du formulaire puis écrasement sur la bdd
    updatePost: function () {
      const formData = new FormData();
      formData.append("content", this.newPost.content);
      formData.append("image", this.newPost.image);

      if (this.newPost.image == "") {
        this.newPost.image = null;
      }

      formData.forEach((value, key) => {
        console.log(key + " " + value);
      });

      Axios.put("/posts/" + this.$route.params.id, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res);
          console.log(this.post.image, this.newPost.image);
          console.log("ça fonctionne");
          this.$router.push("/");
        })
        .catch((err) => console.log(err.message));
    },

    // Retour à la homePage si annulation de la modification
    cancel() {
      this.$router.push("/");
    },
  },
};
</script>
<style>
#modtchatBox {
  width: 45%;
  margin: auto;
  margin-top: 2em;
}

.oldContent {
  border: 1px solid grey;
  background: lightgrey;
  margin-right: 11em;
  padding-bottom: 3em;
  border-radius: 10px;
  box-shadow: 0px 3px 4px grey;
}

.oldImage {
  object-fit: cover;
  width: 100%;
  margin-top: 1em;
}
</style>
