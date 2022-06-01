<template>

  <div>
    <div>{{$store.state.auth.email}}</div>
      <v-btn @click="addData()">
          追加
      </v-btn>
      <v-text-field v-model="memo"></v-text-field>
      <v-row>
        <v-col cols="6">
          <v-card v-for="(task, index) in tasks" :key="index" class="timelineCard">
              <div >
          <div > <v-icon>mdi-account</v-icon>{{task.user}}<br></div>
          <hr>
          <div class="timelineMemo">{{ task.memo}} </div>
          <v-btn @click="deleteData(task.dbNumber)">削除</v-btn>
          
        
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
      const user = this.user
      const querySnapshot = await getDocs(collection(db, user))
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
  async addData(){
       try{
           if(this.memo){

           const db = getFirestore(this.$Firestore)
           const user = this.user 
           const dbNumber = this.dbNumber
           const text = ""
        //    ここで変数を宣言しないとpushやsetDocのときにつかえない
            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
           //  ここでfirestore(データベース)全体を取得  
         await setDoc(doc(db,user,user+dbNumber),
         {// tasksは任意の名前をつけているだけ
              memo:this.memo,
             user:this.user,
              dbNumber:this.dbNumber,
           })

         await setDoc(doc(db,'tasks',text+dbNumber),
         {// tasksは任意の名前をつけているだけ
              memo:this.memo,
              user:this.user,
               dbNumber:this.dbNumber
           })


        setDoc(doc(db,'Number','dbNumber'),{
          dbNumber: this.dbNumber
        }
         )
           
           
            this.tasks.push({
              user:this.user,
              memo:this.memo,
              dbNumber:this.dbNumber
              })
            this.memo=""
            this.dbNumber = this.dbNumber + 1

           }
       }catch(e){
          console.error("error",e)
       }
   },
   
async deleteData(dbNumber){
  try{
   const db = getFirestore(this.$Firestore)
   const user = this.user 
   const text = ""
   await deleteDoc(doc(db,user,user+dbNumber))
   await deleteDoc(doc(db,'tasks',text+dbNumber))
   this.saveData()
  }catch(e){
    console.error("error",e)
  }
},
async saveData(){
     const db = getFirestore(this.$firebase)
     const user = this.user
     const dataLength = this.tasks.length
      const querySnapshot = await getDocs(collection(db, user))
      this.tasks.splice(0,dataLength)
      querySnapshot.forEach( doc => {
        this.tasks.push(doc.data())
      })
},
 logout(){
        this.$store.dispatch('auth/logout')
          
      }
  
   }
}
</script>

<style>

</style>