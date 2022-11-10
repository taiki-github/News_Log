<template>
  <div>
    <div class="postPage">
      <v-card class="postTextCard">
        <v-textarea
          v-model="memo"
          rows="4"
          counter="300"
          placeholder="ここに投稿を入力"
          class="postTextArea"
        ></v-textarea>
        <v-btn @click="addData()" class="postButton" color="primary"> 投稿 </v-btn>
      </v-card>
      <v-row>
        <v-col cols="6">
          <v-card color="secondary" class="titleCard"><v-card-title>過去の投稿一覧</v-card-title>
      </v-card>
            <v-card
              v-for="(post, index) in tasks"
              :key="index"
              class="mt-4"
            >
                <div><v-icon>mdi-account</v-icon>{{ post.userName }}<br /></div>
                <hr />
                <div class="timelineMemo">{{ post.memo }}</div>
                <v-row>
                  <v-col cols="9">
                  </v-col>
                  <v-col cols="1">
                    <v-btn @click="deleteData(post.dbNumber)" color="error" class="deleteBtn">削除</v-btn>
                  </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col cols="6">
          <News />
        </v-col>
      </v-row>
    </div>
    <div class="postPageMobile">
      <v-card class="postTextCard mt-2">
        <v-textarea
          v-model="memo"
          rows="4"
          counter="300"
          placeholder="ここに投稿を入力"
          class="postTextArea"
        ></v-textarea>
        <v-btn @click="addData()" class="postButton" color="primary"> 投稿 </v-btn>
      </v-card>
      
      <v-card color="secondary" class="titleCard"><v-card-title>過去の投稿一覧</v-card-title>
      </v-card>
            <v-card
              v-for="(post, index) in tasks"
              :key="index"
              class="timelineCard lastPostCard"
            >
                <div><v-icon>mdi-account</v-icon>{{ post.userName }}<br /></div>
                <hr />
                <div class="timelineMemo">{{ post.memo }}</div>
                    <v-btn @click="deleteData(post.dbNumber)" color="error" class="deleteBtn">削除</v-btn>    
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
  where,
  query,
} from "firebase/firestore";
export default {
  data() {
    return {
      tasks: [],
      memo: "",
      user: this.$store.state.auth.email,
      dbNumber: 10000,
      userName:"",
      userName2:""
    };
  },

  async created() {
    try {
      const db = getFirestore(this.$firebase);
      const user = this.user;
      const querySnapshot = await getDocs(collection(db, user));
      const Name = await getDoc(doc(db, "userName", this.user));
      const userName=Name.data().name;
       

      querySnapshot.forEach((doc) => {
        this.tasks.push(doc.data());
      });

      this.userName = userName
      this.tasks.reverse();
      const Number = await getDoc(doc(db, "Number", "dbNumber"));
      this.dbNumber = Number.data().dbNumber;
      this.dbNumber = this.dbNumber + 1;
      
    } catch (e) {
      console.error("error:", e);
    }
  },

  methods: {
    async addData() {
      try {
        if (this.memo) {
          const db = getFirestore(this.$Firestore);
          const user = this.user;
          const dbNumber = this.dbNumber;
          const text = "";
          //    ここで変数を宣言しないとpushやsetDocのときにつかえない

          //  ここでfirestore(データベース)全体を取得
          await setDoc(doc(db, user, user + dbNumber), {
            // tasksは任意の名前をつけているだけ
            memo: this.memo,
            user: this.user,
            dbNumber: this.dbNumber,
            userName: this.userName
          });

          await setDoc(doc(db, "tasks", text + dbNumber), {
            // tasksは任意の名前をつけているだけ
            memo: this.memo,
            user: this.user,
            dbNumber: this.dbNumber,
            userName: this.userName
          });

          setDoc(doc(db, "Number", "dbNumber"), {
            dbNumber: this.dbNumber,
          });

          this.tasks.push({
            user: this.user,
            memo: this.memo,
            dbNumber: this.dbNumber,
          });
          this.memo = "";
          this.dbNumber = this.dbNumber + 1;
        }
      } catch (e) {
        console.error("error", e);
      }
    },

    async deleteData(dbNumber) {
      try {
        const db = getFirestore(this.$Firestore);
        const user = this.user;
        const text = "";
        await deleteDoc(doc(db, user, user + dbNumber));
        await deleteDoc(doc(db, "tasks", text + dbNumber));
        this.saveData();
      } catch (e) {
        console.error("error", e);
      }
    },
    async saveData() {
      const db = getFirestore(this.$firebase);
      const user = this.user;
      const dataLength = this.tasks.length;
      const querySnapshot = await getDocs(collection(db, user));
      this.tasks.splice(0, dataLength);
      querySnapshot.forEach((doc) => {
        this.tasks.push(doc.data());
      });
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style>
  @media screen and (min-width: 481px) {
.postTextCard {
  margin-bottom: 30px;
  margin-top: 40px;
}
.postTextArea {
  width: 60%;
  margin-left: 40px;
  padding-top: 20px;
}
.postButton {
  margin-bottom: 20px;
  margin-left: 50px;
}
.deleteBtn{
  margin-top: 20px;
}
.postPageMobile{
  display: none;
}
.lastPostCard{
  margin-top: 5px;
}
  }
  @media screen and (max-width: 481px) {
.postPage{
  display: none;
}
.deleteBtn{
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 300px;
}
.postTextArea {
  width: 80%;
  margin-left: 40px;
  padding-top: 20px;
}
.postTextCard {
  margin-bottom: 30px;
}
.postButton {
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 30px;
}
  }
</style>