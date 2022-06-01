<template>

  <div>
    <div>{{$store.state.auth.email}}</div>
    
      <v-row>
        <v-col cols="6">
          <v-card v-for="(task, index) in tasks" :key="index" class="timelineCard">
              <div >
          <div > <v-icon>mdi-account</v-icon>{{task.user}}<br></div>
          <hr>
          <div class="timelineMemo">{{ task.memo}} </div>
          
        
              </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <News/>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs,doc,setDoc,deleteDoc,getDoc} from 'firebase/firestore'
export default {
  data(){         
    return {
      tasks: [],
      memo:"",
      user:this.$store.state.auth.email,
      dbNumber: 0
    }
  },

  async created(){
    try { 
      const db = getFirestore(this.$firebase)
      const querySnapshot = await getDocs(collection(db, "tasks"))
      querySnapshot.forEach( doc => {
        this.tasks.push(doc.data())
      })
      this.tasks.reverse()
      const Number=await getDoc(doc(db,'Number','dbNumber'))
      this.dbNumber= Number.data().dbNumber
       this.dbNumber = this.dbNumber + 1
    } catch(e){
      console.error('error:', e)
    }
  },


  methods:{
    logout(){
           this.$store.dispatch('auth/logout')
         }
   }
}
</script>

<style>
 

</style>