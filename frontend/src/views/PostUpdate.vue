<template>
  <div class="postUpdatePage">
    <header>
      <AppHeader />
    </header>
    <div id="modtchatBox">
      <div class="updateBoxWrite">
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
        <form class="postUpdateForm" @submit.prevent="updatePost">
          <p class="postContainer">Nouveau contenu:</p>
          <textarea
            id="newText"
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
  </div>
</template>
<script>
import Axios from "@/_services/caller.service";
import AppHeader from "@/components/AppHeader.vue";

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
        this.newPost.content = res.data.content;
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
  components: {
    AppHeader,
  },
};
</script>
<style>
.postUpdatePage {
  width: 95%;
  margin: auto;
}

#modtchatBox {
  width: 45%;
  /* display: flex; */
  margin: auto;
  /* margin-top: 2em; */
}
.updateBoxWrite {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(#fd2b019c, #ffd7d7);
  box-shadow: 0px 3px 4px lightgray;
}
.updateBoxWrite button {
  background: white;
}
.oldContent {
  /* margin: auto; */
  border: 1px solid grey;
  background: lightgrey;
  /* width: 80%; */
  padding-bottom: 3em;
  border-radius: 10px;
  box-shadow: 0px 3px 4px grey;
}

.oldImage {
  object-fit: cover;
  width: 100%;
  margin-top: 1em;
}
.postUpdateForm {
  display: flex;
  flex-direction: column;
}
@media only screen and (min-width: 750px) {
  .updateBoxWrite {
    width: 80%;
  }
  /* .postUpdateForm {
    width: 80%;
  } */
  /* .oldContent {
    width: 80%;
  } */
}
@media only screen and (max-width: 600px) {
  #modtchatBox {
    width: 60%;
  }
}
@media only screen and (max-width: 450px) {
  #modtchatBox {
    width: 100%;
  }
  /* .postUpdateForm {
    width: 80%;
  } */
  /* .oldContent {
    width: 80%;
  } */
}
</style>
