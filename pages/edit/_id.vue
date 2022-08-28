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
          ></v-textarea>
        </v-col>
        <v-col cols="4">
          <v-btn @click="saveNewsMemo()"> 保存 </v-btn>
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
      memo: "",
      memoId: 0,
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
        this.memoId = Id.data().number;
        await setDoc(doc(db, "memoNews", user + this.memoId), {
          memo: this.memo,
          user: this.user,
          memoId: this.memoId,
          title: this.$route.query.title,
          url: this.$route.query.url,
          image: this.$route.query.image,
        });
        this.$router.push("/memoList");
        this.memoId = this.memoId + 1;
        await setDoc(doc(db, "memoNumber", user), {
          number: this.memoId,
        });
      }
    },
  },
};
</script>

<style>
</style>