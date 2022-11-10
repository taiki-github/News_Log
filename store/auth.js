import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    getDoc,
  } from "firebase/firestore";
  

export const state = () => ({
    isLoggedIn: false,
    userUid: '',
    email: '',
    userName:'未登録'
})

export const mutations = {
    setLoginState(state, loggedIn,) {
        state.isLoggedIn = loggedIn
    },
    setEmail(state,email){
       state.email = email
    },
    setUserUid( state, userUid ){
        state.userUid = userUid
      },
    setUserName(state,userName){
        if(userName){
       state.userName = userName
        }else{
       state.userName = "未登録"
        }
    }
    
}

export const actions = {
    async login({ commit }, payload) {
        try {
            // vuexの引数には注意する
            const auth = getAuth(this.$firebase)
            const db = getFirestore(this.$firebase);
            // const Name = await getDoc(doc(db, "Name:"+payload.email, "userName"));
            
            // この二つを経由しないとエラーになる
                
            await signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then(userCredential=>{
                commit('setLoginState', true )
            commit('setEmail',payload.email)
            commit('setUserUid', userCredential.user.uid)
            commit('setUserName',userName)
        })
        const Name =  await getDoc(doc(db, "userName", payload.email));
        const userName=Name.data().name;
        this.$router.push('/timeLine')
            
        } catch (e) {
            alert(e.message)
        }
    },
    async logout({ commit }) {
        const auth = getAuth(this.$firebase)
        await signOut(auth)
                commit('setLoginState', false)
                commit('setUserUid', '')
                this.$router.push('/auth/login')
    },
    addUserInfo({commit},payload){
        commit('setLoginState', true )
        commit('setUserUid', payload.uid)
        commit('setEmail',payload.email)
    }
}
export const getters = {
    // getLoggedIn(state){
    //   return !!state.isLoggedIn
    // }
    getLoggedIn: state => !!state.isLoggedIn,
    getUserUid: state => state.userUid,
    getEmail: state => state.email
  }

