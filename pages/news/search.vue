<template>
  <div>
    <div>
      <v-text-field v-model="keyword" label="ここにキーワードを入力" />
      <v-btn @click="searchNews(keyword)" color="success" class="mb-5"> 検索 </v-btn>
    </div>
    <div>
      <v-row>
        <v-col
          v-for="(news, index) in searchResults"
          :key="index"
         
        >
          <!-- keyとitemsが思っているのと逆。keyは必須 -->
          <v-card class="mt-2">
            <v-row>
              <v-col cols="4">
                <v-img :src="news.image"></v-img>
              </v-col>
              <v-col cols="8">
                <a :href="news.url" target="_blank"><v-card-title>{{ news.title }}</v-card-title></a>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
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

          var url = new URL("https://newsapi.org/v2/top-headlines");
          url.searchParams.append("country", "jp");
          url.searchParams.append("apiKey", "3c7136debb3b4a758cc86fd27567de33");
          url.searchParams.append("q", keyword);
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
          this.keyword = "";
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