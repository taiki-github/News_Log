
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function({
  $firebase,
  store,
  route,
  redirect

}){
 //const auth = getAuth(store.state.auth.userUid)
 const auth = getAuth($firebase)
//  console.log(store.state.auth.isLoggedIn);
 if(store.state.auth.isLoggedIn==false){
  //  onAuthStateChanged(auth, user =>{
    auth.onAuthStateChanged((user) => {
    console.log(user);
     if(user){
       store.dispatch('auth/addUserInfo', user)
     } else if(!route.path.match(/\/auth\//)){
      redirect('/auth/login')    
     }
   })
 }
}