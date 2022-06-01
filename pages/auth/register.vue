<template>
  <div>ユーザー登録
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="email"
          label="メールアドレス"
        />
        <v-text-field
          v-model="password"
          label="パスワード"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn
          @click="signUp"
        >ユーザー登録する</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
export default {

  data(){
    return {
      email: '',
      password: ''
    }
  },

  methods:{
     async signUp(){
          try {
   const auth = getAuth(this.$firebase)
    await  createUserWithEmailAndPassword(auth, this.email, this.password)
    // このような処理は非同期通信をつかわないと上手くいかないことがある
     this.$router.push(`/auth/login`)
} catch (error) {
  alert(error);
  
 }

      }
    }
}
</script>

<style>

</style>