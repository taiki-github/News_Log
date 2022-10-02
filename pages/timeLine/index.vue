<template>
  <div>
    {{this.$store.state.auth.isLoggedIn}}
    <v-row>
       <v-col cols="8">
        <News />
      </v-col>
      <v-col cols="4" class="home-timeline">
        <v-card color="secondary" ><v-card-title>掲示板</v-card-title>
         </v-card>
        <div class="postArea">
          <v-card
            v-for="(task, index) in tasks"
            :key="index"
            class="timelineCard"
          >
            <div>
              <div><v-icon>mdi-account</v-icon>{{ task.userName }}<br /></div>
              <hr />
              <div class="timelineMemo">{{ task.memo }}</div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
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
      tasks: [],
      memo: "",
      user: this.$store.state.auth.email,
      dbNumber: 0,
      userName:""
    };
  },

  async created() {
    try {
      const db = getFirestore(this.$firebase);
      // const Name = await getDoc(doc(db, "Name:"+user, "userName"));
      // const userName=Name.data().userName;
      const querySnapshot = await getDocs(collection(db, "tasks"));
      querySnapshot.forEach((doc) => {
        this.tasks.push(doc.data());
      });
      // this.userName = userName;
      this.tasks.reverse();
      const Number = await getDoc(doc(db, "Number", "dbNumber"));
      this.dbNumber = Number.data().dbNumber;
      this.dbNumber = this.dbNumber + 1;
    } catch (e) {
      console.error("error:", e);
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style>
   .home-timeline{
    margin-top: 50px;
    /* background-color: #FBB; */
   }
   .postArea{
    height: 600px;
    overflow: scroll;
   }
</style>