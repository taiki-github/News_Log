<template>
   <div>
        <v-card color="secondary" ><v-card-title>掲示板</v-card-title>
         </v-card>
        <div class="postArea">
          <v-card
            v-for="(memo, index) in memos"
            :key="index"
            class="timelineCard"
          >
            <div>
              <div><v-icon>mdi-account</v-icon>{{ memo.title }}<br /></div>
              <hr />
              <div class="timelineMemo">{{ memo.user }}</div>
            </div>
          </v-card>
        </div>
  </div>
</template>

<script>
  import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
export default {
  data(){
    return {
      user: this.$store.state.auth.email,
      memos: [],
      memo: "",
    }
  },
  created(){
    try {
      const db = getFirestore(this.$firebase);
      const querySnapshot = getDocs(collection(db, "memoNews"));
      querySnapshot.forEach((doc) => {
        this.memos.push(doc.data());
      });
     
    } catch (e) {
      console.error("error:", e);
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>

