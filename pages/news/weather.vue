<template>
  <div>
    <div class="weatherArea">
        <h2>現在地の3時間ごとの予報</h2>
        <table border="1" >
          <tr>
            <th>/</th>
            <th v-for="(forecast, index) in searchResults" :key="index">
              {{ forecast.time }}
            </th>
          </tr>
          <tr>
            <th>天気</th>
            <td v-for="(forecast, index) in searchResults" :key="index">
              <div>{{ forecast.weatherText }}</div>
              <div v-if="forecast.weatherText == 'Rain'">
                <img class="rainImg" src="../../assets/rainy.png" alt="rain" />
              </div>
              <div v-else-if="forecast.weatherText == 'Clouds'">
                <img
                  class="cloudyImg"
                  src="../../assets/-cloudy.png"
                  alt="Cloudy"
                />
              </div>
              <div v-else-if="forecast.weatherText == 'Clear'">
                <img class="sunnyImg" src="../../assets/sunny.png" alt="Sunny" />
              </div>
            </td>
          </tr>
          <tr>
            <th>気温</th>
            <td v-for="(forecast, index) in searchResults" :key="index">
              {{ forecast.temp }}℃
            </td>
          </tr>
          <tr>
            <th>湿度</th>
            <td v-for="(forecast, index) in searchResults" :key="index">
              {{ forecast.humidity }}%
            </td>
          </tr>
        </table>
    </div>
    <div class="weatherArea">
        <h2>現在地の数日間の予報</h2>
        <table border="1">
          <tr>
            <th>/</th>
            <th v-for="(forecast, index) in middayWeather" :key="index" >
              <div v-if="forecast.time == '今日'"></div>
              <div v-else>{{ forecast.time }}</div>
            </th>
          </tr>
          <tr>
            <th>天気</th>
            <td v-for="(forecast, index) in middayWeather" :key="index">
                <div v-if="forecast.time == '今日'"></div>
              <div v-else>
              <div>{{ forecast.weatherText }}</div>
              <div v-if="forecast.weatherText == 'Rain'">
                <img
                  class="middayRainImg"
                  src="../../assets/rainy.png"
                  alt="rain"
                />
              </div>
              <div v-else-if="forecast.weatherText == 'Clouds'">
                <img
                  class="middayCloudyImg"
                  src="../../assets/-cloudy.png"
                  alt="Cloudy"
                />
              </div>
              <div v-else-if="forecast.weatherText == 'Clear'">
                <img
                  class="middaySunnyImg"
                  src="../../assets/sunny.png"
                  alt="Sunny"
                />
              </div>
            </div>
            </td>
          </tr>
          <tr>
            <th>最高気温</th>
            <td v-for="(forecast, index) in middayWeather" :key="index">
              <div v-if="forecast.time == '今日'"></div>
              <div v-else>{{ forecast.maxTemp }}℃</div>
            </td>
          </tr>
          <tr>
            <th>最低気温</th>
            <td v-for="(forecast, index) in middayWeather" :key="index">
              <div v-if="forecast.time == '今日'"></div>
              <div v-else>{{ forecast.minTemp }}℃</div>
            </td>
          </tr>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchResults: [],
      middayWeather: [],
      latitude: null,
      longitude: null,
      maxTemp: -100,
      minTemp: 100,
      time: null,
    };
  },
  async created() {
    await this.getCurrentWeather();
  },
  methods: {
    async getCurrentWeather() {
      if (process.client) {
        if (!navigator.geolocation) {
          alert(
            "現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。"
          );
          return;
        }

        const options = {
          enableHighAccuracy: false,
          //  timeout: 5000,
          maximumAge: 0,
        };
        await navigator.geolocation.getCurrentPosition(
          this.success,
          this.error,
          options
        );
      }
    },

    async success(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      const API_KEY = "c519cd4787429a3e5c36f67856ae49ca";
      let url = new URL(`https://api.openweathermap.org/data/2.5/forecast`);
      url.searchParams.append("lat", this.latitude);
      url.searchParams.append("lon", this.longitude);
      url.searchParams.append("units", "metric");
      url.searchParams.append("appid", "c519cd4787429a3e5c36f67856ae49ca");
      const response = await fetch(url).then((response) => response.json());
      console.log(response);
      console.log(response.city.name);

      for (let i = 3; i < 11; i++) {
        console.log(response.list[i].weather[0].main);
        console.log(response.list[i].main.temp);
        const weatherText = response.list[i].weather[0].main;
        const temp = response.list[i].main.temp;
        const time = response.list[i].dt_txt;
        const humidity = response.list[i].main.humidity;
        this.searchResults.push({
          weatherText,
          temp,
          time,
          humidity,
        });
      }
      for (const weather of response.list) {
        const weatherText = weather.weather[0].main;
        const temp = weather.main.temp;
        const maxTemp = null;
        const minTemp = null;
        const time = weather.dt_txt;
        this.weatherText = weatherText;
        if (temp > this.maxTemp) {
          this.maxTemp = temp;
        }
        if (temp < this.minTemp) {
          this.minTemp = temp;
        }
        if (time.match("12:00:00")) {
          this.time = time.replace("12:00:00", " ");
          this.weatherText = weatherText;
        }
        if (this.time == null) {
          this.time = "今日";
        }
        if (time.match("21:00:00")) {
          weatherText = this.weatherText;
          time = this.time;
          maxTemp = this.maxTemp;
          minTemp = this.minTemp;
          this.middayWeather.push({
            weatherText,
            maxTemp,
            minTemp,
            time,
          });
          this.maxTemp = -100;
          this.minTemp = 100;
        }
      }
    },

    error(error) {
      switch (error.code) {
        case 1: //PERMISSION_DENIED
          alert("位置情報の利用が許可されていません");
          break;
        case 2: //POSITION_UNAVAILABLE
          alert("現在位置が取得できませんでした");
          break;
        case 3: //TIMEOUT
          alert("タイムアウトになりました");
          break;
        default:
          alert("現在位置が取得できませんでした");
          break;
      }
    },
  },
};
</script>

<style>
/* @media screen and (min-width: 481px) { */
  .cloudyImg {
    width: 70%;
    margin-left: 20px;
  }
  .middayCloudyImg {
    width: 60%;
    margin-left: 20px;
  }
  .sunnyImg {
    width: 90%;
    margin-left: 20px;
  }
  .middaySunnyImg {
    width: 60%;
    margin-left: 20px;
  }
  .rainImg {
    width: 50%;
    margin-left: 20px;
  }
  .middayRainImg {
    width: 60%;
    margin-left: 20px;
  }
  th {
    background-color: beige;
  }
  h2 {
    margin-top: 70px;
  }
/* } */
@media screen and (max-width: 481px) {

.weatherArea {
    width: 350px;
    overflow: scroll;
  }
}
</style>