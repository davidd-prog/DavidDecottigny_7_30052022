<template>
  <div id="tchatBox">
    <div class="tchatBoxWrite">
      <h2 id="postCreate" @click="open">Créer un post</h2>
      <div class="hiddenPostForm" v-show="success">
        <!-- <i class="far fa-window-close" @click="close"></i> -->
        <fa class="fa-window-close" icon="window-close" @click="close" />
        <div class="postWriting">
          <p class="postContainer">Contenu:</p>
          <textarea id="text" name="post" rows="5" cols="33" v-model="message">
          </textarea>
        </div>
        <div class="imageToSend">
          <p>Image:</p>
          <button class="addImage">Ajouter une image</button>
        </div>
        <div class="postValidate">
          <button class="postSubmit">Soumettre</button>
          <button class="postCancel">Annuler</button>
        </div>
      </div>
    </div>
    <div class="newPost" v-show="success">
      <h2 class="postView">Aperçu du post</h2>
      <div class="postInfos">
        <div class="postUser">David Decottigny</div>
        <div class="postDate">Aujourd'hui</div>
      </div>
      <div class="postContent">
        <!-- <img
                class="postPhoto"
                src="/Groupomania_Logos_(update_2022)/running.jpg"
                alt="Photo d'un joggeur"
              /> -->
        <div class="postSentence">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      success: false,
      message: "",
    };
  },
  methods: {
    close: function () {
      this.success = false;
    },
    open: function () {
      this.success = true;
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
