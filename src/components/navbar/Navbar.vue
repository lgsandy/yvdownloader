<template>
  <nav>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link tag="span" to="/" :style="{ cursor: 'pointer' }">
        <v-img class="mx-2" src="../../assets/yvd.png" max-height="70" max-width="70" contain></v-img>
      </router-link>

      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">y2v</span>
        <span>downloader</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon left>expand_more</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
            active-class="border"
            link
          >
            <v-list-item-action>
              <v-icon :color="link.color">{{link.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>-->
      <router-link to="/" tag="span">
        <v-btn text class="hidden-sm-and-down">
          <span>Home</span>
          <v-icon right color="teal">home</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/aboutus" tag="span">
        <v-btn text class="hidden-sm-and-down">
          <span>About Us</span>
          <v-icon right color="orange">description</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      dark
      app
      class="pink darken-3"
      :mini-variant.sync="mini"
      absolute
      temporary
    >
      <v-list flat>
        <v-list-item class="px-2" link>
          <v-list-item-title>Menus</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          active-class="border"
        >
          <v-list-item-action>
            <v-icon :color="link.color">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    links: [
      { icon: "home", text: "Home", color: "teal", route: "/" },
      {
        icon: "description",
        text: "About Us",
        color: "yellow accent-2",
        route: "/aboutus"
      }
    ],
    mini: false
  }),
  components: {
    // Popup
  }
};
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>
