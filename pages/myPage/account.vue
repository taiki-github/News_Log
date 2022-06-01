<template>
  <v-card class="accountCard center">
      <h1 class="cardTitle">アカウント</h1>
      <p class="cardElement">ユーザーネーム</p>
      <p class="cardElement">{{$store.state.auth.email}}</p>
      <v-btn @click="logout()" class="logoutBtn">ログアウト</v-btn>
  </v-card>
</template>

<script>
export default {

   methods:{
    logout(){
           this.$store.dispatch('auth/logout')
         }
   }

}
</script>

<style>
 @media screen and (min-width: 481px){
  .accountCard{
      width: 400px;
      height: 400px;
     
  }
  .cardTitle{
      margin: 50px;
  }
  .cardElement{
    margin: 20px;
    font-size: 20px;
  }
  .logoutBtn{
    margin-top: 40px;
  }
  .center{
    margin: 100px  auto ;
    text-align: center;
  }
 }
</style>