<template>
  <div class="main">
    <v-container color="#f2f2ff">
      <v-row dense align="center" justify="center">
        <!-- <h2>Download YouTube Videos And Thumbnail</h2> -->

        <v-col cols="12" xs="12" md="10" sm="10" style="margin-bottom:-15px">
          <!-- <v-card elevation="2">
            <v-text-field
              outlined
              rounded
              flat
              dense
              v-model="youtubeUrl"
              label="paste Url Here"
              hide-details="auto"
              prepend-inner-icon="search"
              @focus="allowAutoPaste"
              @mouseover="allowAutoPaste"
            ></v-text-field>
          </v-card>-->

          <v-text-field
            class="search-input"
            v-model="youtubeUrl"
            solo
            hide-details
            rounded
            elevation-12
            placeholder="paste Url Here"
            aria-label="Search"
            append-icon="search"
            @focus="allowAutoPaste"
            @click:append="getYoutubeData"
            @keyup.enter="searchOnkeyDown"
          />
          <!-- <v-switch v-model="people" label="Jo" value="John"></v-switch> -->

          <span
            style="font-size: 12px;color: red;margin-left: 5px;"
            :style="[isInvalidUrl ? {'visibility': ''} : {'visibility': 'hidden'}]"
          >We got invalid url</span>
        </v-col>
        <v-col class="d-sm-flex text-center" >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                @click="userSelectedOption('video')"
                :color="videoBtnColor"
              >mdi-video</v-icon>
            </template>
            <span>Video Doenload</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                @click="userSelectedOption('image')"
                :color="imageBtnColor"
              >mdi-file-image</v-icon>
            </template>
            <span>Thumbnail Download</span>
          </v-tooltip>
        </v-col>
      </v-row>

      <!-- SHOWING THE VIDEO LIST -->
      <v-row>
        <v-col cols="12" xs="12" md="6" sm="6" v-for="video of allFormateVideo" :key="video.name">
          <v-card class="mx-auto">
            <v-img class="white--text align-end" height="200px" :src="videoImage">
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>
            <v-card-subtitle
              class="pb-0 text-center"
              style="color: rgb(41, 37, 180);
    font-size: 25px;"
            >{{video.qualityLabel}}</v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="showVideoPreview(video)"
                class="ma-2"
                tile
                outlined
                color="primary"
              >Download</v-btn>
              <!-- <v-btn class="ma-2" tile outlined color="primary">Preview</v-btn> -->
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!--END SHOWING THE VIDEO LIST -->

      <!-- SHOWING THE THUMBNAIL LIST -->
      <v-row>
        <v-col cols="12" xs="12" md="6" sm="6" v-for="thumb of allFormateThumb" :key="thumb.name">
          <v-card class="mx-auto">
            <v-img class="white--text align-end" height="200px" :src="thumb.url">
              <v-card-title style="place-content:center">{{thumb.size}}</v-card-title>
            </v-img>
            <v-card-subtitle
              class="pb-0 text-center"
              style="color: rgb(41, 37, 180);
    font-size: 25px;"
            >{{thumb.size}}</v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :href="thumb.base64"
                :download="thumb.name"
                style=" text-decoration: none;"
                :disabled="thumb.base64.length ==''"
                class="ma-2"
                tile
                outlined
                color="primary"
              >Download</v-btn>
              <v-btn
                @click="previewThumbNail(thumb)"
                class="ma-2"
                tile
                outlined
                color="primary"
              >Preview</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!--END SHOWING THE Thumb LIST -->

      <!--VIDEO DOWNLOAD INSTRUCTION -->
      <v-col class="text-center">
        <h1
          style="color:#2925b4;font-family: cursive;margin-bottom: -10px;
    margin-top: 15px;"
        >How to download YouTube video (Instructions)</h1>
      </v-col>
      <v-row>
        <v-col cols="12" xs="12" md="3" sm="6" v-for="vi of videoInstruction" :key="vi.title">
          <v-card class="mx-auto" style="background-color:#2925b4;color:white;user-select:none">
            <v-card-title class="cardinfoTitle">{{vi.title}}</v-card-title>
            <v-card-text style="color:white">
              <div>{{vi.description}}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!--ThumbNail DOWNLOAD INSTRUCTION -->
      <v-col class="text-center">
        <h1
          style="color:#2925b4;font-family: cursive;margin-bottom: -10px;
    margin-top: 15px;"
        >How to download YouTube Thumbnail (Instructions)</h1>
      </v-col>
      <v-row>
        <v-col cols="12" xs="12" md="3" sm="6" v-for="vi of thumbnailInstruction" :key="vi.title">
          <v-card class="mx-auto" style="background-color:#2925b4;color:white;user-select:none">
            <v-card-title class="cardinfoTitle">{{vi.title}}</v-card-title>
            <v-card-text style="color:white">
              <div>{{vi.description}}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- THUMBNAIL PREVIEW -->
      <v-dialog v-model="imagePreviewDialog" width="500">
        <v-card>
          <v-card-title
            class="headline"
            style="place-content:center;background-color: #232476;
         color: white;"
          >IMAGE PREVIEW</v-card-title>

          <v-card-text>
            <v-img class="white--text align-end" height="200px" :src="currentPreviewImage"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="imagePreviewDialog = false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

       <!-- VIDEO PREVIEW -->
      <v-dialog v-model="videoPreviewDialog" width="500">
        <v-card>
  
         <v-toolbar dark color="#232476" dense>
             <v-spacer></v-spacer>
              <v-toolbar-title>VIDEO PREVIEW</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="videoPreviewDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
          <video width="100%" height="100%" controls>
            <source :src="selectedVideoPreview" type="video/mp4">
          </video>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span style="color: #232476;font-weight: bold;">Press On<v-icon small>more_vert</v-icon> then press on download to start</span>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" text @click="videoPreviewDialog = false">close</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-container>
    <v-dialog v-model="loadingdialog" hide-overlay persistent width="300">
      <v-card color="#232476" dark>
        <v-card-text>
          Loading...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "main",
  components: {},
  data: () => ({
    youtubeUrl: "",
    videoId: "",
    isInvalidUrl: false,
    videoPreviewDialog:false,
    selectedVideoPreview:'',
    videoInstruction: [
      {
        title: "Copy URL",
        description:
          "Open youtube in your browser, search video and copy your video URL from YouTube"
      },
      {
        title: "Focus in search field",
        description:
          "mouseEnter or focus into search field, auto Paste YouTube video URL in the search field "
      },
      {
        title: "Click on Search",
        description:
          "click on search icon or press enter from your keyboard to get list of videos with different quality"
      },
      {
        title: "Download Video",
        description:
          "You will get a list of video with quality  for download, for video. Click the Download button to start"
      }
    ],
    thumbnailInstruction: [
      {
        title: "Copy URL",
        description:
          "Open youtube in your browser, search video and copy your video URL from YouTube"
      },
      {
        title: "Focus in search field",
        description:
          "mouseEnter or focus into search field, auto Paste YouTube video URL in the search field "
      },
      {
        title: "Click on Search",
        description:
          "click on search icon or press enter from your keyboard to get list of thumbnail with different quality"
      },
      {
        title: "Download Video",
        description:
          "You will get a list of thumbnail with quality for download for video. Click the Download button to start"
      }
    ],
    allFormateVideo: [],
    allFormateThumb: [],
    selectedCategory: "video",
    imagePreviewDialog: false,
    currentPreviewImage: "",
    videoImage: "",
    videoBtnColor: "primary",
    imageBtnColor: "",
    loadingdialog: false
  }),
  methods: {
    getYoutubeData() {
      let isValid = this.validateYouTubeUrl(this.youtubeUrl);
      if (isValid) {
        let isValidUrl = this.youtubeUrl.includes("youtu.be");
        if (isValidUrl) {
          this.videoId = this.youtubeUrl.split("/")[3];
        } else {
          this.videoId = this.youtubeUrl.split("v=")[1];
        }
        if (this.videoId && this.videoId.length > 11) {
          this.videoId = this.videoId.substr(0, 11);
        }
        if (this.selectedCategory == "thumb") {
          this.showThumbNail();
        } else {
          this.getVideodetails();
          // this.allFormateVideo = [
          //   { name: "11" },
          //   { name: "22" },
          //   { name: "33" },
          //   { name: "44" }
          // ];
        }
      } else {
        this.isInvalidUrl = true;
        setTimeout(() => {
          this.isInvalidUrl = false;
        }, 4000);
      }
    },
    showThumbNail() {
      this.allFormateThumb = [
        {
          name: "maxresdefault",
          base64: "data",
          size: "HD 1920x1080",
          url: `https://i.ytimg.com/vi/${this.videoId}/maxresdefault.jpg`
        },
        {
          name: "sddefault",
          base64: "data",
          size: "SD 640x480",
          url: `https://i.ytimg.com/vi/${this.videoId}/sddefault.jpg`
        },
        {
          name: "hqdefault",
          base64: "data",
          size: "HQ 480x360",
          url: `https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`
        },
        {
          name: "mqdefault",
          base64: "data",
          size: "MQ 320x180",
          url: `https://i.ytimg.com/vi/${this.videoId}/mqdefault.jpg`
        }
      ];
      for (let i = 0; i < this.allFormateThumb.length; i++) {
        this.forceDownload(i);
      }
    },

    forceDownload(i) {
      let _this = this;
      _this.overlay = false;
      let cUrl = `https://i.ytimg.com/vi/${this.videoId}/${_this.allFormateThumb[i].name}.jpg`;
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var reader = new FileReader();
            reader.onloadend = function() {
              let base64 = reader.result;
              _this.allFormateThumb[i].base64 = base64;
            };
            reader.readAsDataURL(xhr.response);
          } else {
            _this.allFormateThumb[i].base64 = "";
            _this.showSnackbar = true;
            _this.snackbarText =
              _this.allFormateThumb[i].size + " Image Quality Not Found";
          }
        }
      };
      var proxyUrl = "https://youtubethumnnail.herokuapp.com/";
      xhr.open("GET", proxyUrl + cUrl);
      xhr.responseType = "blob";
      xhr.send();
    },
    validateYouTubeUrl(url) {
      var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(p)) {
        return url.match(p)[1];
      }
      return false;
    },
    previewThumbNail(thumb) {
      this.imagePreviewDialog = true;
      this.currentPreviewImage = thumb.url;
    },
    async allowAutoPaste() {
      if (!navigator.clipboard) {
        return;
      }
      try {
        this.youtubeUrl = await navigator.clipboard.readText();
      } catch (err) {
        console.log("Failed to copy!", err);
      }
      // this.getYoutubeData();
    },
    searchOnkeyDown() {
      this.getYoutubeData();
    },
    getVideodetails() {
      this.loadingdialog = true;
      let details = {
        url: this.videoId,
        client: "sdkjfhdskjfhjkdsby2vkjdbfdbsfdbjhbfds"
      };
      axios
        .post("https://y2vdownloader.herokuapp.com/api/download", details)
        .then(res => {
          this.loadingdialog = false;
          this.videoImage =
            "https://i.ytimg.com/vi/" + this.videoId + "/hqdefault.jpg";
          this.allFormateVideo = res.data.formats;
        })
        .catch(err => {
          console.log(err);
        });
    },
    userSelectedOption(option) {
      this.imageBtnColor = "";
      if (option == "video") {
        this.videoBtnColor = "primary";
        this.imageBtnColor = "";
        this.selectedCategory = "video";
        this.allFormateThumb = [];
      } else {
        this.videoBtnColor = "";
        this.imageBtnColor = "primary";
        this.allFormateVideo = [];
        this.selectedCategory = "thumb";
      }
      this.getYoutubeData();
    },
    showVideoPreview(video){
      this.selectedVideoPreview=video.url;
      this.videoPreviewDialog=true;
     console.log(video);
    }
  }
};
</script>
<style scoped>
.cardinfoTitle {
  font-family: cursive;
  place-content: center;
  font-weight: bold;
}
</style>