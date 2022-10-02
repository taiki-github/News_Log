<template>
  <div>
    <div style="display: flex">
      <v-btn
        plain
        class="selectedNewsCategory selectBotton"
        @click="selectNewsCategory('general', 0)"
      >
        トップ
      </v-btn>
      <v-btn
        plain
        @click="selectNewsCategory('business', 1)"
        class="selectBotton"
      >
        経済
      </v-btn>
      <v-btn
        plain
        @click="selectNewsCategory('science', 2)"
        class="selectBotton"
      >
        科学
      </v-btn>
      <v-btn
        plain
        @click="selectNewsCategory('health', 3)"
        class="selectBotton"
      >
        健康
      </v-btn>
      <v-btn
        plain
        @click="selectNewsCategory('entertainment', 4)"
        class="selectBotton"
        >エンタメ</v-btn
      >
      <v-btn
        plain
        @click="selectNewsCategory('technology', 5)"
        class="selectBotton"
      >
        テクノロジー
      </v-btn>
      <v-btn
        plain
        @click="selectNewsCategory('sports', 6)"
        class="selectBotton"
      >
        スポーツ
      </v-btn>
    </div>
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
              <v-card-title>
                <a :href="news.url" target="_blank">{{ news.title }}</a>
              </v-card-title>
              <v-btn
                class="news-plus-botton"
                @click="newsMemo(index)"
                color="success"
              >
                メモ
              </v-btn>
              <v-btn class="news-plus-botton" color="warning"> 共有 </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import News from "../components/News.vue";
// import SelectBotton from "../components/SelectBotton.vue";
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
  // components: { News, SelectBotton },
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
    this.searchResults = [];
    // クエリーストリングを作成
    const baseUrl =
      "https://newsapi.org/v2/top-headlines?country=jp&apiKey=3c7136debb3b4a758cc86fd27567de33";
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
    async newsMemo(index) {
      const user = this.user;
      const db = getFirestore(this.$firebase);
      const Id = await getDoc(doc(db, "memoNumber", user));
      this.memoId = Id.data().number;

      this.$router.push({
        path: `edit/` + this.memoId,
        query: {
          title: this.searchResults[index].title,
          url: this.searchResults[index].url,
          image: this.searchResults[index].image,
          memoId:this.memoId,
          memo:this.memo
        },
        
      });
      await setDoc(doc(db, "memoNumber", user), {
          number: this.memoId+1,
        });
    },
    async selectNewsCategory(keyword, id) {
      try {
        const selectBotton = document.getElementsByClassName("selectBotton");
        this.searchResults = [];
        var url = new URL("https://newsapi.org/v2/top-headlines");
        url.searchParams.append("country", "jp");
        url.searchParams.append("apiKey", "3c7136debb3b4a758cc86fd27567de33");
        url.searchParams.append("category", keyword);
        for (let i = 0; i < selectBotton.length; i++) {
          selectBotton[i].classList.remove("selectedNewsCategory");
        }
        selectBotton[id].classList.add("selectedNewsCategory");

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
      } catch {
        this.isFound = false;
      }
    },
  },
};
</script>

<style>
.selectedNewsCategory {
  background-color: whitesmoke;
}
</style>