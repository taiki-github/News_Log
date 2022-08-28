
 import { getAuth, onAuthStateChanged } from 'firebase/auth'

 export default function({
   $firebase,
   store,
   route,
   redirect
 }){
  const auth = getAuth($firebase)

    onAuthStateChanged(auth, (user) => {
      if(!auth&&!route.path.match(/\/auth\//)){
        redirect('/auth/login')   
      }else{ 
       store.dispatch('auth/addUserInfo', user)
      }
  })
  
}

