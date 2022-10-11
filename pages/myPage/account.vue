<template>
  <div class="center">
    <div v-show="setUserNameTextField">
      <v-text-field
        v-model="newName"
        placeholder="ここに名前を入力"
      ></v-text-field>
      <v-btn class="setUserNameBotton" @click="setUserName()" color="primary">登録</v-btn>
    </div>
    <v-card class="accountCard ">
      <h1 class="cardTitle center">Account</h1>
      <div class="cardElement">ユーザー名：{{ $store.state.auth.userName }}</div>
      <p class="cardElement">メールアドレス：{{ $store.state.auth.email }}</p>
      <div>
        <v-btn class="setUserNameBotton" @click="textFieldShow()" color="primary">ユーザー名変更</v-btn>
      </div>
      <div>
        <v-btn @click="logout()" class="logoutBtn center" color="error">ログアウト</v-btn>
      </div>
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
      user: this.$store.state.auth.email,
      setUserNameTextField:false,
      newName:""
    };
  },
  async created() {
    try {
    } catch (e) {
      console.error("error:", e);
    }
  },

  methods: {
    setUserName(){
      if(this.newName){
          const db = getFirestore(this.$Firestore);
           setDoc(doc(db, "Name:"+this.user, "userName"), {
            userName: this.newName,
          });
      this.$store.commit("auth/setUserName", 
        this.newName,
        );
        this.newName = ""
        this.setUserNameTextField=false;
      }  
    },
    textFieldShow(){
        this.setUserNameTextField=true;
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style>
@media screen and (min-width: 481px) {
  .accountCard {
    width: 400px;
    height: 400px;
    margin: auto;
    margin-top: 150px;
  }
  .cardTitle {
    margin: 50px;
    font-family: serif;
  }
  .cardElement {
    margin: 20px;
    font-size: 20px;
  }
  .logoutBtn {
    margin-top: 30px;
  }
  .center {
    text-align: center;
  }
  .setUserNameBotton{
    margin-left: 20px;
    margin-top: 40px;
  }
  
}
@media screen and (max-width: 481px) {
  .accountCard {
    width: 350px;
    height: 320px;
    margin: auto;
   
  }
  .cardTitle {
    margin: 50px;
    font-family: serif;
  }
  .cardElement {
    margin: 20px;
    font-size: 20px;
  }
  .logoutBtn {
    margin-top: 20px;
  }
  .center {
    text-align: center;
  }
  .setUserNameBotton{
    margin-left: 20px;
  }
  
}
</style>