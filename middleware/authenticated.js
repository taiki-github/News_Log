
 import { getAuth, onAuthStateChanged } from 'firebase/auth'

 export default function({
   $firebase,
   store,
   route,
   redirect
 }){
  // &&!route.path.match(/\/auth\//)
   const auth = getAuth($firebase)
  // const auth =this.$store.state.auth.email
    // onAuthStateChanged(auth, (user) => {
      if(!auth){
        console.log("ログインしてません");
        redirect('/auth/login')   
      }
      console.log("gagag");
      // else{ 
      //  store.dispatch('auth/addUserInfo', user)
      // }
  // })
  
}

