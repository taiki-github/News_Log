import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

export const state = () => ({
    isLoggedIn: false,
    email: '',
    userName:''
})

export const mutations = {
    setLoginState(state, loggedIn,) {
        state.isLoggedIn = loggedIn
    },
    setEmail(state,email){
       state.email = email
    },
    
}

export const actions = {
    async login({ commit }, payload) {
        try {
            // vuexの引数には注意する
            const auth = getAuth(this.$firebase)
            await signInWithEmailAndPassword(auth, payload.email, payload.password)
            commit('setLoginState', true , )
            commit('setEmail',payload.email)
            this.$router.push('/timeLine')
        } catch (e) {
            alert(e.message)
        }
    },
    async logout({ commit }) {
        const auth = getAuth(this.$firebase)
        await signOut(auth)
                commit('setLoginState', false)
                this.$router.push('/auth/login')
    },
}

