<template>
  <div>
    <div>
      <v-text-field v-model="keyword" label="ここにキーワードを入力" />
      <v-btn @click="searchNews(keyword)" color="success"> 検索 </v-btn>
    </div>
    <div>
      <v-row>
          <v-col
            v-for="(news, index) in searchResults"
            :key="index"
            cols="12"
            md="6"
          >
            <!-- keyとitemsが思っているのと逆。keyは必須 -->
            <v-card class="mt-5">
              <v-row>
                <v-col cols="4">
                  <v-img :src="news.image"></v-img>
                </v-col>
                <v-col cols="8">
                  <v-card-title>{{ news.title }}</v-card-title>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
    </div>
  </div>

</template>

<script>
import News from "../components/News.vue";
export default {
  components: { News },
  data() {
    return {
      keyword: "",
      searchResults: [],
      isFound: true,
    };
  },
  methods: {
    async searchNews(keyword) {
      if (keyword) {
        try {
          console.log(keyword);
          this.isFound = true;
          this.searchResults = [];
          // クエリーストリングを作成
          // const baseUrl = "https://newsapi.org/v2/top-headlines?country=jp&apiKey=3c7136debb3b4a758cc86fd27567de33";
          // const params = {
          //   q: `title:${keyword}`,
          //   maxResults: 20,
          // }
          // const queryParams = new URLSearchParams(params);
          //   console.log(queryParams);

            

           var url = new URL("https://newsapi.org/v2/top-headlines")
  url.searchParams.append("country", "jp");
  url.searchParams.append("apiKey", "3c7136debb3b4a758cc86fd27567de33");
  url.searchParams.append("q", keyword);
  console.log(url.href)




          const response = await fetch(url.href).then((response) =>
            response.json()
          );

          for (const news of response.articles) {
            const title = news.title;
            const url = news.url;
            const image = news.urlToImage;
            this.searchResults.push({
              title,
              url,
              image,
            });
          }
          this.keyword = ""
        } catch {
          this.isFound = false;
        }
      }
    },
  },
};
</script>

<style>
</style>