<template>
  <v-app>
    <Navbar />
    <v-content class="ma-3">
      <Share />
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/navbar/Navbar";
import Share from "./components/socialshare/share";
export default {
  name: "App",

  components: {
    Navbar,
    Share
  },

  data: () => ({})
};
</script>
