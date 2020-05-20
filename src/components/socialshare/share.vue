<template>
  <div class="share">
    <v-card id="create">
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="click"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="#2925b4" dark fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>share</v-icon>
          </v-btn>
        </template>
        <ShareNetwork
          network="whatsapp"
          url="http://y2vdownloader.com/"
          title="youtube video , thumbnail downloader"
          description="y2vdownloader is for downloading different formate of youtube video and thumbnail"
          quote="This is best and fast youtube video and thumbnail downloader"
          hashtags="youtube video Downloader"
        >
          <v-btn fab dark small color="green">
            <v-icon>mdi-whatsapp</v-icon>
          </v-btn>
        </ShareNetwork>
        <ShareNetwork
          network="facebook"
          url="http://y2vdownloader.com/"
          title="youtube video , thumbnail downloader"
          description="y2vdownloader is for downloading different formate of youtube video and thumbnail"
          quote="This is best and fast youtube video and thumbnail downloader"
          hashtags="youtube video Downloader"
        >
          <v-btn fab dark small color="indigo">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </ShareNetwork>
        <ShareNetwork
          network="linkedin"
          url="http://y2vdownloader.com"
          title="youtube video , thumbnail downloader"
          description="y2vdownloader is for downloading different formate of youtube video and thumbnail"
          quote="This is best and fast youtube video and thumbnail downloader"
          hashtags="youtube video Downloader"
        >
          <v-btn fab dark small color="#0073B0">
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
        </ShareNetwork>
      </v-speed-dial>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "share",
  components: {},
  data: () => ({
    direction: "top",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: false,
    right: false,
    bottom: true,
    left: true,
    transition: "slide-y-reverse-transition"
  }),
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  }
};
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: fixed;
}

#create .v-btn--floating {
  position: relative;
}
</style>