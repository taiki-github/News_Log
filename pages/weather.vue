<template>
  <div>
    <div>天気予報です</div>
    <div class="city-wrap">
    <h2 id="city-name" class="city-name"></h2>
    <div id="weather-discription" class="weather-discription"></div>
    <div id="weather-temp" class="weather-temp big"></div>
    <div id="weather-date" class="weather-date"></div>
    <div class="detail-list">
        <div class="detail-item">
            <div class="text">最高気温</div>
            <div id="tempMax" class="value tempMin"></div>
        </div>
        <div class="detail-item">
            <div class="text">最低気温</div>
            <div id="tempMin" class="value tempMax"></div>
        </div>
        <div class="detail-item">
            <div class="text">体感気温</div>
            <div id="feelsLike" class="value feelsLike"></div>
        </div>
        <div class="detail-item">
            <div class="text">湿度</div>
            <div id="humidity" class="value humidity"></div>
        </div>
        <div class="detail-item">
            <div class="text">日の出</div>
            <div id="sunrise" class="value sunrise"></div>
        </div>
        <div class="detail-item">
            <div class="text">日の入</div>
            <div id="sunset" class="value sunset"></div>
        </div>
        <div class="detail-item">
            <div class="text">風速</div>
            <div id="windSpeedUnit" class="value windSpeedUnit"></div>
        </div>
        <div class="detail-item">
            <div class="text">気圧</div>
            <div id="pressure" class="value pressure"></div>
        </div>
    </div>
    <div class="weather-reportWrap">
        <div id="weather-report" class="weather-report"></div>
    </div>
</div>
  </div>
</template>

<script>
export default {
  components: { News, SelectBotton },
  data() {
    return {
      keyword: "",
      searchResults: [],
      user: this.$store.state.auth.email,
      memoId: 10000,
      userName: "",
      memoNews: [],
    };
  },
  async created() {
    // this.searchResults = [];
    // // クエリーストリングを作成
    // const baseUrl =
    //   "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=temperature_2m&timezone=Asia%2FTokyo";
    // const response = await fetch(baseUrl).then((response) => response.json());
    // // fetchはhtppリクエスト的なことが出きる
    // for (const news of response.articles) {
    //   const title = news.title;
    //   const url = news.url;
    //   const image = news.urlToImage;
    //   this.searchResults.push({
    //     title,
    //     url,
    //     image,
    //   });
    // }
  },
  methods: {
    
  },
};

</script>

<style>

</style>