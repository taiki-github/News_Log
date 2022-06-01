<template>
  <div>
      <v-card v-for="(news, index) in searchResults" :key="index" class="timelineCard" >
        <div > 
           <a :href="news.url" target="_blank">{{news.title}}</a>
            <br>
           <v-img :src="news.image" class="newsImage"></v-img>
        </div>
          </v-card>
  </div>
</template>

<script>
export default {
     data(){
        return {
          keyword:'',
          searchResults:[]
        }
      },
      async created(){
    this.searchResults = []
        // クエリーストリングを作成
        const baseUrl = 'https://newsapi.org/v2/top-headlines?country=jp&apiKey=3c7136debb3b4a758cc86fd27567de33'
         
       
        // fetchでJSON取得、JSONは文字列
        const response = await fetch(baseUrl )
        .then( response => response.json())
        console.log(response.articles)
        // fetchはhtppリクエスト的なことが出きる
        for(const news of response.articles){
          const title = news.title
          const url = news.url
          const image = news.urlToImage
          this.searchResults.push({
            title,
            url,
            image
          })
        }
        console.log(this.searchResults[0])
  },
    
      }
</script>

<style>
 .newsImage{
   width: 50%;
   height: 50%;
 }
</style>