<template>
  
  <v-app >
    
    <div v-show=this.$store.state.auth.isLoggedIn>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="header-backgroundcolor"
    >
    
      <div v-show=this.$store.state.auth.isLoggedIn>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </div>


      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->


      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main class="backgroundcolor">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>


    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->


    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'ホーム',
          to: '/timeLine',
        },
         {
          icon: 'mdi-airplane',
          title:'ニュース',
          to: '/newsPage'
        },
        //  {
        //   icon: 'mdi-weather-partly-cloudy',
        //   title:'天気',
        //   to: '/weather'
        // },
         {
          icon: 'mdi-pencil',
          title: '投稿',
          to: '/timeLine/myList',
        },
         {
          icon: 'mdi-magnify',
          title:'ニュース検索',
          to: '/search'
        },
        {
          icon: 'mdi-folder ',
          title:'メモリスト',
          to: '/memoList'
        },
         {
          icon: 'mdi-account',
          title: 'アカウント',
          to: '/myPage/account',
        },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'News Log'
    }
  }
}
</script>

<style>
.backgroundcolor{
    background: linear-gradient(to bottom right, rgb(198, 228, 246), white);
  }
.header-backgroundcolor{
  background: linear-gradient(to bottom right, gray,rgba(0, 0, 0, 0.695));
  /* background-color: blue; */
}
</style>