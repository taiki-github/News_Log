<template>
  <div>
        <h1> 
     SNS</h1>
       <h2 class="card-title"> 
           SNSにログイン
     </h2>
          
              <div class="mx">
                  <v-text-field v-model="email" label="メールアドレス" />
                  <v-text-field v-model="password" label="パスワード"  />
              </div>
        
          <div class="center">
              <v-btn  @click="signUp">ログイン</v-btn>
          </div>
        <div class="center">
              <v-btn  to="/auth/register">アカウント新規作成</v-btn>
          </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    signUp() {
      try {
        this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })

      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>

<style>
@media screen and (min-width: 481px){
  
  .loginCard {
    width: 500px;
  height: 400px;
  margin-left: 250px;
  margin-top: 200px;
}

.center{
  text-align: center;
}
  }

</style>