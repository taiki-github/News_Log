<template>
  <div>
    <div class="pc">
      <v-row>
        <v-col cols="7">
          <News />
        </v-col>
        <v-col cols="5" class="home-timeline">
          <v-card color="secondary"
            ><v-card-title>掲示板</v-card-title>
          </v-card>
          <div class="postArea">
            <v-card
              v-for="(post, index) in tasks"
              :key="index"
              class="mt-3"
            >
              <div>
                <div><v-icon>mdi-account</v-icon>{{ post.userName }}<br /></div>
                <hr />
                <div class="timelineMemo">{{ post.memo }}</div>
              </div>
            </v-card>
          </div>
          <div class="currentWeatherCard">
            <v-card>
              <v-card-title>現在地の天気</v-card-title>
              <v-row>
                <v-col cols="6">
                  <div v-if="weather == 'Rain'">
                    <img
                      class="rainImg"
                      src="../../assets/rainMobile.png"
                      alt="rain"
                    />
                  </div>
                  <div v-else-if="this.weather == 'Clouds'">
                    <img
                      class="cloudyImg"
                      src="../../assets/cloudMobile.png"
                      alt="Cloudy"
                    />
                  </div>
                  <div v-else-if="weather == 'Clear'">
                    <img
                      class="sunnyImg"
                      src="../../assets/sunnyMobile.png"
                      alt="Sunny"
                    />
                  </div>
                </v-col>
                <v-col cols="6">
                  <h3>気温：{{ this.currentTemp }}</h3>
                  <v-btn color="success" class="weatherBtn" @click="gotoWeatherPage()">詳しい予報</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="mobile">
      <v-card color="secondary" class="titleCard"
        ><v-card-title>掲示板</v-card-title>
      </v-card>
      <div class="postArea">
        <v-card
          v-for="(post, index) in tasks"
          :key="index"
          class="timelineCard"
        >
          <div>
            <div><v-icon>mdi-account</v-icon>{{ post.userName }}<br /></div>
            <hr />
            <div class="timelineMemo">{{ post.memo }}</div>
          </div>
        </v-card>
      </div>
      <v-card color="secondary" class="titleCard"
        ><v-card-title>トップニュース</v-card-title></v-card
      >
      <News />
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
export default {
  data() {
    return {
      tasks: [],
      memo: "",
      user: this.$store.state.auth.email,
      dbNumber: 0,
      userName: "",
      latitude: null,
      longitude: null,
      currentTemp: null,
      weather: null,
      weatherIcon: null,
    };
  },

  async created() {
    try {
      await this.getCurrentWeather ()
      console.log(this.latitude);
      const db = getFirestore(this.$firebase);
      // const Name = await getDoc(doc(db, "Name:"+user, "userName"));
      // const userName=Name.data().userName;
      const querySnapshot = await getDocs(collection(db, "tasks"));
      querySnapshot.forEach((doc) => {
        this.tasks.push(doc.data());
      });
      // this.userName = userName;
      this.tasks.reverse();
      const Number = await getDoc(doc(db, "Number", "dbNumber"));
      this.dbNumber = Number.data().dbNumber;
      this.dbNumber = this.dbNumber + 1;

      //現在の天気の情報を取得
      
    } catch (e) {
      console.error("error:", e);
    }
  },

  methods: {
    gotoWeatherPage(){
      this.$router.push('/news/weather')
    },
    getCurrentWeather () {
     if (process.client) {
       if (!navigator.geolocation) {
         alert('現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。')
         return
       }

       const options = {
         enableHighAccuracy: false,
        //  timeout: 5000,
         maximumAge: 0
       }
       navigator.geolocation.getCurrentPosition(this.success, this.error, options)
     }
   },

   async success (position) {
     this.latitude = position.coords.latitude
     this.longitude = position.coords.longitude
     const API_KEY = "c519cd4787429a3e5c36f67856ae49ca";
      let url = new URL(`https://api.openweathermap.org/data/2.5/weather`);
      url.searchParams.append("lat", this.latitude);
      url.searchParams.append("lon", this.longitude);
      url.searchParams.append("units", "metric");
      url.searchParams.append("appid", "c519cd4787429a3e5c36f67856ae49ca");
      const response = await fetch(url).then((response) => response.json());
      this.currentTemp = response.main.temp;
      this.weather = response.weather[0].main;
      this.weatherIcon = response.weather[0].icon;
   },

   error (error) {
     switch (error.code) {
       case 1: //PERMISSION_DENIED
         alert('位置情報の利用が許可されていません')
         break
       case 2: //POSITION_UNAVAILABLE
         alert('現在位置が取得できませんでした')
         break
       case 3: //TIMEOUT
         alert('タイムアウトになりました')
         break
       default:
         alert('現在位置が取得できませんでした')
         break
     }
   },
 
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style>
@media screen and (min-width: 481px) {
  .home-timeline {
    margin-top: 30px;
  }
  .postArea {
    height: 400px;
    overflow: scroll;
  }
  .topPageMobile {
    display: none;
  }
  .currentWeatherCard {
    margin-top: 20px;
  }
  .cloudyImg {
    width: 90%;
    margin-left: 20px;
  }
  .sunnyImg{
    width: 90%;
    margin-left: 20px;
  }
  .rainImg{
    width: 90%;
    margin-left: 20px;
  }
  .weatherBtn{
    margin-top: 30px;
  }
}
@media screen and (max-width: 481px) {
  .topPage {
    display: none;
  }
  .postArea {
    height: 350px;
    margin-bottom: 30px;
    overflow: scroll;
  }

}
</style>
