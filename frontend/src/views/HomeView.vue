<template>
  <body>
    <div id="talkPage">
      <header>
        <div class="headerTalkSection">
          <div class="infoHeaderTalkSection">
            <div id="talkLogo">
              <a class="logoTalkCliquable" href="index.html">
                <img
                  class="firmLogo"
                  src="../assets/icon-left-font-definitive.webp"
                  alt="Logo de la société"
                />
              </a>
            </div>
            <nav id="talkMenu">
              <ul>
                <li class="talkUserMenu">
                  <a class="profileAvatar" href="profile.html">
                    <i class="fas fa-user"></i>
                  </a>
                  <ul class="subTalkMenu">
                    <li>
                      <a class="profileLink" href="profile.html">Mon profil</a>
                    </li>
                    <li>
                      <a class="logOutLink" href="index.html">Deconnexion</a>
                    </li>
                    <li>
                      <a class="allUsersLink" href="users.html"
                        >Profils utilisateurs</a
                      >
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    class="userFirstname"
                    href="profile.html"
                    title="Utilisateur"
                    >David</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- <a class="backLink" @click="backHome">
          <i class="fas fa-angle-left"></i>
          back
        </a> -->
      </header>
      <section id="tchatSection">
        <h1>Bienvenue David !</h1>
        <!-- <div class="hiddenWrite">
          <button class="hidePosting" >Cacher le champ</button
          ><button class="showPosting" @click="open">Montrer le champ</button>
        </div> -->

        <div id="tchatBox">
          <div class="tchatBoxWrite">
            <h2 id="postCreate" @click="open">Créer un post</h2>
            <div class="hiddenPostForm" v-show="success">
              <i class="far fa-window-close" @click="close"></i>
              <div class="postWriting">
                <p class="postContainer">Contenu:</p>
                <textarea id="text" name="post" rows="5" cols="33"> </textarea>
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
      </section>
      <section id="postsBoard">
        <h2 class="posts">Fil d'actualité</h2>
        <div class="individualPost">
          <div class="postInfos">
            <div class="postUser">Julie Dupont</div>
            <div class="postDate">Le 29 Août 2022</div>
          </div>
          <div class="postContent">
            <img
              class="postPhoto"
              src="../assets/Louvre_photo.jpg"
              alt="Photo du musée du Louvre"
            />
            <div class="postSentence">Petite balade au Louvre en nocturne</div>
          </div>
          <div class="postStats">
            <div class="postAdmin">
              <button class="postUpdate">Modifier</button>
              <button class="postDelete">Supprimer</button>
            </div>
            <div class="postLikes">9 <i class="fas fa-thumbs-up"></i></div>
          </div>
        </div>
        <div class="individualPost">
          <div class="postInfos">
            <div class="postUser">Aurélien Trouvet</div>
            <div class="postDate">Le 25 Août 2022</div>
          </div>
          <div class="postContent">
            <img
              class="postPhoto"
              src="../assets/running.jpg"
              alt="Photo d'un joggeur"
            />
            <div class="postSentence">
              Jogging matinal au milieu des couleurs de l'Automne
            </div>
          </div>
          <div class="postStats">
            <div class="postAdmin">
              <button class="postUpdate">Modifier</button>
              <button class="postDelete">Supprimer</button>
            </div>
            <div class="postLikes">7 <i class="fas fa-thumbs-up"></i></div>
          </div>
        </div>
      </section>
    </div>
  </body>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

// export default {
//   name: "HomeView",
//   components: {
//     HelloWorld,
//   },
// };
</script>

<style>
#talkPage {
  width: 100%;
  /* max-width: 1300px; */
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

.fa-angle-up {
  margin-left: 1em;
  margin-right: 1em;
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
