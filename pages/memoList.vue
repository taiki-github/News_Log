<template>
  <div>
      memoList
  </div>
</template>

<script>
export default {
  data(){
    return {
      user: this.$store.state.auth.email,
    }
  },
  created(){
    // const db = getFirestore(this.$firebase);
    //   const user = this.user;
    //   const querySnapshot = await getDocs(collection(db, user));
    //   const Name = await getDoc(doc(db, "Name:"+this.user, "userName"));
    //   const userName=Name.data().userName;
    //   querySnapshot.forEach((doc) => {
    //     this.tasks.push(doc.data());
    //   });
    //   this.userName = userName
    //   this.tasks.reverse();
    //   const Number = await getDoc(doc(db, "Number", "dbNumber"));
    //   this.dbNumber = Number.data().dbNumber;
    //   this.dbNumber = this.dbNumber + 1;
  },
  methods: {
    
  }
}
</script>

<style>

</style>

