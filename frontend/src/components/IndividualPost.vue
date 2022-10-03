<template>
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
      <div class="postLikes">
        9 <fa class="fa-thumbs-up" icon="thumbs-up" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IndividualPost",
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
