<template>
  <v-container>
    <div class="aboutus">
      <v-card elevation="2">
        <v-tabs v-model="tab" centered grow height>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#overview">Overview</v-tab>
          <v-tab href="#youtube_thumbnails">Youtube Thumbnails</v-tab>
          <v-tab href="#youtube_audio">Youtube Audio (Mp3)</v-tab>
          <v-tab href="#youtube_videos">Youtube Videos</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="1" value="overview">
            <Overview />
          </v-tab-item>
          <v-tab-item :key="2" value="youtube_thumbnails">
            <YoutubeThumbnails />
          </v-tab-item>
          <v-tab-item :key="3" value="youtube_audio">
            <YoutubeAudio />
          </v-tab-item>
          <v-tab-item :key="4" value="youtube_videos">
            <YoutubeVideos />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import Overview from "../aboutus/overview";
import YoutubeThumbnails from "../aboutus/youtube_thumbnails";
import YoutubeAudio from "../aboutus/youtube_audio";
import YoutubeVideos from "../aboutus/youtube_videos";

export default {
  name: "aboutus",
  components: { Overview, YoutubeThumbnails, YoutubeAudio, YoutubeVideos },
  data: () => ({
    tab: null
  })
};
</script>
