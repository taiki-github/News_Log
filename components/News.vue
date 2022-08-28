<template>
  <div>
    <v-card
      v-for="(news, index) in searchResults"
      :key="index"
      class="timelineCard"
    >
      <div>
        <v-row>
          <v-col cols="3">
            <div class="news-article">
              <v-img :src="news.image" class="newsImage"></v-img>
            </div>
          </v-col>
          <v-col cols="9">
            <a :href="news.url" target="_blank">{{ news.title }}</a>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      searchResults: [],
    };
  },
  async created() {
    this.searchResults = [];
    // クエリーストリングを作成
    const baseUrl =
      "https://newsapi.org/v2/top-headlines?country=jp&apiKey=3c7136debb3b4a758cc86fd27567de33";
    // const params = {
    //   q: `title:${keyword}`,
    //   maxResults: 30,
    // };
    // const queryParams = new URLSearchParams(params);
    // fetchでJSON取得、JSONは文字列
    const response = await fetch(baseUrl).then((response) => response.json());

    // fetchはhtppリクエスト的なことが出きる
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
  },
  methods: {
    
  },
};
</script>

<style>
.newsImage {
  width: 20%;
}

.news-plus-botton {
  background-color: rgb(0, 195, 255);
}

.news-article {
  display: flex;
}
</style>