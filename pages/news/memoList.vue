<template>
  <div>

    <v-card v-for="(memo, index) in memos" :key="index" class="mt-5">
      <v-row>
        <v-col cols="3">
          <v-img :src="memo.image"></v-img>
        </v-col>
        <v-col cols="9">
          <v-card-title><a :href="memo.url" target="_blank">{{ memo.title }}</a></v-card-title>
          <v-row class="mt-3 mb-3">
            <div>
              <v-btn color="success" @click="viewNewsMemo(index)"> メモ</v-btn>
            </div>
            
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
export default {
  data() {
    return {
      user: this.$store.state.auth.email,
      memos: [],
      memo: "",
    };
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase);
      const memoNews = await query(
        collection(db, "memoNews"),
        where("user", "==", this.user)
      );
      const querySnapshot = await getDocs(memoNews);

      querySnapshot.forEach((doc) => {
        this.memos.push(doc.data());
      });
    } catch (e) {
      console.error("error:", e);
    }
  },
  methods: {
    async viewNewsMemo(index) {
      this.$router.push({
        path: `../edit/` + this.memos[index].memoId,
        query: {
          title: this.memos[index].title,
          url: this.memos[index].url,
          image: this.memos[index].image,
          memoId:this.memos[index].memoId,
          memo:this.memos[index].memo
        },
      });
    },
    
  },
};
</script>

<style>
</style>
