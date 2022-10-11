<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="4">
          <v-img :src="this.$route.query.image"></v-img>
        </v-col>
        <v-col cols="8">
          <v-card-title>
            <a :href="this.$route.query.url" target="_blank">
              {{ this.$route.query.title }}</a
            >
          </v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-textarea
            v-model="memo"
            rows="4"
            counter="300"
            placeholder="ここにメモを入力"
            class="postTextArea"
            value="aaa"
          >aaa</v-textarea>
        </v-col>
        <v-col cols="4">
          <v-btn @click="saveNewsMemo()" color="primary"> 保存 </v-btn>
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
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
export default {
  data() {
    return {
      book: "",
      date: "",
      menu: false,
      news: [],
      user: this.$store.state.auth.email,
      memo: this.$route.query.memo,
      
    };
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase);
      const user = this.user;
      const querySnapshot = await getDocs(collection(db, "news:" + user));
      querySnapshot.forEach((doc) => {
        this.news.push(doc.data());
      });
    } catch (e) {
      console.error("error:", e);
    }
  },
  methods: {
    async saveNewsMemo() {
      if (this.memo) {

        const db = getFirestore(this.$Firestore);
        const user = this.user;
        const Id = await getDoc(doc(db, "memoNumber", user));
        // this.memoId = this.$router.query.memoId;
        await setDoc(doc(db, "memoNews", user + this.$route.query.memoId), {
          memo: this.memo,
          user: this.user,
          memoId:this.$route.query.memoId,
          title: this.$route.query.title,
          url: this.$route.query.url,
          image: this.$route.query.image,
        });
        console.log(this.$route.query.Id);
        this.$router.push("../news/memoList");
        
        // this.memoId = this.memoId + 1;
      }
    },
  },
};
</script>

<style>
</style>