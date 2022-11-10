<template>
  <div>
    <div class="pc">
      <v-row>
        <v-col cols="6">
          <div class="appDiscription">
            <h1>News Log</h1>
            <h4>
              このアプリケーションはニュースアプリです。
              ニュースの検索機能やメモ機能がついていて掲示板もあります。
            </h4>
          </div>
        </v-col>
        <v-col cols="6">
          <v-card class="loginCard">
            <h1 class="loginCardTitle">News Log</h1>

            <v-text-field v-model="email" label="メールアドレス" />
            <v-text-field v-model="password" label="パスワード" />
            <v-row>
              <v-col cols="3">
                <v-btn @click="signUp" color="primary">ユーザー登録する</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="mobile">
      <div class="appDiscription">
        <h1>News Log</h1>
        <h4>
          このアプリケーションはニュースアプリです。
          ニュースの検索機能やメモ機能がついていて掲示板もあります。
        </h4>
      </div>
      <v-card class="loginCard">
        <h1 class="loginCardTitle">News Log</h1>
        <v-text-field v-model="email" label="メールアドレス" />
        <v-text-field v-model="password" label="パスワード" />
        <v-row>
          <v-col cols="3">
            <v-btn @click="signUp" color="primary">ユーザー登録する</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
      email: "",
      password: "",
    };
  },

  methods: {
    async signUp() {
      try {
        const auth = getAuth(this.$firebase);
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        // このような処理は非同期通信をつかわないと上手くいかないことがある
        const db = getFirestore(this.$Firestore);

        //データベースの整理テスト
        setDoc(doc(db, "userName", this.email), {
          name: "未登録",
          email: this.email,
        });

        this.$router.push(`/auth/login`);
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style>
</style>