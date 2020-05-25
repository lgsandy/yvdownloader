<template>
  <div class="main">
    <v-container color="#f2f2ff">
      <v-row dense align="center" justify="center">
    
        <h2 style="color: white;padding: 10px;background: linear-gradient(to right, #181667 0%, #9e7fe4 100%);border-radius: 5px;">Best YouTube Videos & Thumbnail Downloader</h2> 
         
        <v-col cols="12" align="center" justify="center">
         <v-tooltip bottom>
           <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="userSelectedOption('video')" :color="videoBtnColor"><v-icon>mdi-youtube</v-icon></v-btn>
           </template>
           <span>youtube video</span>
          </v-tooltip>
         
         <v-tooltip bottom>
           <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="userSelectedOption('facebook')"
                :color="facebookBtnColor"><v-icon>mdi-facebook</v-icon></v-btn>
                 </template>
           <span>facebook video</span>
          </v-tooltip>
           <v-tooltip bottom>
           <template v-slot:activator="{ on }">
           <v-btn v-on="on" @click="userSelectedOption('thumb')"
                :color="imageBtnColor"><v-icon>mdi-file-image</v-icon></v-btn>
                      </template>
           <span>youtube thumbnail</span>
          </v-tooltip>
        </v-col>          
        <v-col cols="12" xs="12" md="10" sm="10" style="margin-bottom:-15px">
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

          <p
            style="font-size: 12px;color: red;margin-left: 5px;"
            :style="[isInvalidUrl ? {'visibility': ''} : {'visibility': 'hidden'}]"
          >We got invalid url</p>
          <span> Example Url :- https://youtu.be/ccIwKXBZ8WE</span>
        </v-col>
        <!-- <v-col class="d-sm-flex text-center" >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                @click="userSelectedOption('video')"
                :color="videoBtnColor"
              >mdi-video</v-icon>
            </template>
            <span>Video Download</span>
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
        </v-col> -->
      </v-row>

      <!-- SHOWING THE YOUTUBE VIDEO LIST -->
      <v-row style="place-content:center">
        <v-col cols="12" xs="12" md="6" sm="6" v-for="video of allFormateVideo" :key="video.name">
          <v-card class="mx-auto">
            <!-- <v-img class="white--text align-end" height="200px" :src="videoImage">
            </v-img> -->
            <video id="previewyVideo" width="100%" height="100%" controls style="outline:none">
              <source :src="video.url" type="video/mp4">
             </video>
               <v-card-actions>
            <v-spacer></v-spacer>
            <span style="color: #232476;font-weight: bold;">Press On<v-icon small>more_vert</v-icon> then press on download to start</span>
            <v-spacer></v-spacer>
                 <v-icon id="arrowAnimation" style="color:red">mdi-arrow-up-bold</v-icon>
          </v-card-actions>
            <v-card-subtitle class="pb-0 text-center" style="color: rgb(41, 37, 180);
            font-size: 25px;">{{video.qualityLabel}}</v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="showVideoPreview(video.url)" class="ma-2" tile outlined color="primary"
              >Preview</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!--END SHOWING THE VIDEO LIST -->
<!-- SHOWING THE Facebook VIDEO LIST -->
      <v-row style="place-content:center" v-if="allFormatefacebook && allFormatefacebook.download && allFormatefacebook.download.sd">
        <v-col cols="12" xs="12" md="6" sm="10">
          <v-card class="mx-auto">
            <!-- <v-img class="white--text align-end" height="200px" :src="videoImage">
            </v-img> -->
             <video id="previewfVideo" width="100%" height="100%" controls style="outline:none">
              <source :src="allFormatefacebook.download.sd" type="video/mp4">
             </video>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span style="color: #232476;font-weight: bold;">Press On<v-icon small>more_vert</v-icon> then press on download to start</span>
            <v-spacer></v-spacer>
                 <v-icon id="arrowAnimation"  style="color:red">mdi-arrow-up-bold</v-icon>
          </v-card-actions>
            <v-card-subtitle class="pb-0 text-center" style="color: rgb(41, 37, 180);
            font-size: 15px;">{{allFormatefacebook.title}}</v-card-subtitle>
               <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="showVideoPreview(allFormatefacebook.download.sd)" class="ma-2" tile outlined color="primary"
              >Preview</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!--END SHOWING THE Facebook VIDEO LIST -->

      
   <!-- SHOWING THE AUDIO LIST -->
          <h2 v-if="allFormateAudio.length" style="color: white;padding: 10px;background: linear-gradient(to right, #181667 0%, #9e7fe4 100%);border-radius: 5px;text-align:center">Audios</h2> 
      <v-row style="place-content:center">
        <v-col cols="12" xs="12" md="6" sm="6" v-for="audio of allFormateAudio" :key="audio.approxDurationMs">
          <v-card class="mx-auto text-center pt-2 pb-2">
           <audio controls style="outline:none;max-width:100%">
          <source :src="audio.url" type="audio/mp4">
           </audio>
            <v-card-subtitle v-if="audio.itag == 140" class="pb-0 text-center" style="color: rgb(41, 37, 180);
             font-size: 25px;"
            >audio/mp3</v-card-subtitle>

             <v-card-subtitle v-if="audio.itag != 140" class="pb-0 text-center" style="color: rgb(41, 37, 180);
             font-size: 25px;"
            >audio/webm</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <!--END SHOWING THE AUDIO LIST -->



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
      <v-dialog v-if="videoPreviewDialog" v-model="videoPreviewDialog" width="600">
        <v-card>
         <v-toolbar dark color="#232476" dense>
             <v-spacer></v-spacer>
              <v-toolbar-title>VIDEO PREVIEW</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="closevideoPreview">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
          <video id="previewVideo" width="100%" height="100%" controls>
            <source :src="selectedVideoPreview" type="video/mp4">
          </video>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span style="color: #232476;font-weight: bold;">Press On<v-icon small>more_vert</v-icon> then press on download to start</span>
            <v-spacer></v-spacer>
                 <v-icon id="arrowAnimation" style="color:red">mdi-arrow-up-bold</v-icon>
            <!-- <v-btn color="primary" text @click="videoPreviewDialog = false">close</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <v-dialog v-model="loadingdialog" hide-overlay persistent width="150">
         <v-img style="background-color: white;border-radius: 100px;" src="../../assets/loading.png"></v-img>
    </v-dialog>
 <v-footer color="primary" dark>
    <v-col
      class="text-center"
      cols="12"
    >
     Copyright &copy;  {{ new Date().getFullYear() }} All Right Reserved <strong>y2vdownloader.com</strong>
    </v-col>
  </v-footer>
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
    facebookBtnColor: "",
    loadingdialog: false,
    allFormateAudio:[],
    allFormatefacebook:[],
    storeinterval:'',
    storefbinterval:'',
    storeytinterval:'',
    video:''
  }),
   destroyed() {
     clearInterval(this.storeinterval);
     clearInterval(this.storefbinterval);
     clearInterval(this.storeytinterval);
     
     
   },
   watch: {
    videoPreviewDialog: function (val) {
     if(val==false){
        clearInterval(this.storeinterval);
     }
    },
  },
  methods: {
    getYoutubeData() {
       this.youtubeUrl=this.youtubeUrl.trim();
        clearInterval(this.storeinterval);
        clearInterval(this.storefbinterval);
         clearInterval(this.storeytinterval);
         if(this.selectedCategory == "video" || this.selectedCategory == "thumb"){
          this.checkYoutube(); 
        }else if(this.selectedCategory == "facebook"){
           if (this.validateYouTubeUrl(this.youtubeUrl)) {
             this.checkYoutube(); 
              this.userSelectedOption('video','fbvalid');
           }else{
            this.getFacebookVideo();  
           } 
      }

    },
    checkYoutube(){
     if (this.validateYouTubeUrl(this.youtubeUrl)) {
                if(this.youtubeUrl.includes("m.youtube.com")){
                   this.videoId=this.youtubeUrl.split("v=")[1];
                }
                else if (this.youtubeUrl.includes("youtu.be")) {
                    this.videoId = this.youtubeUrl.split("/")[3];
                  } 
                else if(this.youtubeUrl.includes("embed")){
                    this.videoId = this.youtubeUrl.split("/")[4]
                }
               else {
                  this.videoId = this.youtubeUrl.split("v=")[1];
                }
                if (this.videoId && this.videoId.length > 11) {
                  this.videoId = this.videoId.substr(0, 11);
                }
         
        if (this.selectedCategory == "thumb") {
          this.showThumbNail();
           this.updateAnalytics('thumbSearch');
        } else {
          this.allFormateVideo=[];
          this.getVideodetails();
          this.updateAnalytics('videoSearch');
        }
      } else {
        if(this.youtubeUrl.includes("facebook")){
           this.getFacebookVideo(); 
           this.userSelectedOption('facebook','fbvalid');
        }else{
        this.isInvalidUrl = true;
        setTimeout(() => {
          this.isInvalidUrl = false;
        }, 4000);
          this.updateAnalytics('urlInvalid');
        }
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
      this.updateAnalytics('thumbDownloadPreview');
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
    closevideoPreview(){
    this.videoPreviewDialog = false;
     clearInterval(this.storeinterval);
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
           if(res.data && res.data.streamingData && res.data.streamingData.formats){
             this.allFormateVideo = res.data.streamingData.formats;
              setTimeout(() => {
             let yvideo=document.getElementById('previewyVideo');
             yvideo.onplaying=()=> {
             this.storeytinterval=setInterval(()=>{ 
             this.updateAnalytics('youtubeplaying');
              }, 2000);
              };
            }, 100);
           }
           if(res.data && res.data.streamingData && res.data.streamingData.adaptiveFormats){
              let audios= res.data.streamingData.adaptiveFormats;
              this.allFormateAudio =audios.filter((o)=>{return o.audioQuality == 'AUDIO_QUALITY_MEDIUM'});
           }

           
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFacebookVideo(){
       this.allFormatefacebook=[];
      this.loadingdialog = true;
      let details = {
        url: this.youtubeUrl,
        client: "sdkjfhdskjfhjkdsby2vkjdbfdbsfdbjhbfds"
      };
      axios
        .post("https://y2vdownloader.herokuapp.com/api/download/fb", details)
        .then(res => {
          this.loadingdialog = false;
          if(res && res.data && res.data.download && res.data.download.sd){
            this.allFormatefacebook=res.data;
              setTimeout(() => {
             let fbvideo=document.getElementById('previewfVideo');
             fbvideo.onplaying=()=> {
             this.storefbinterval=setInterval(()=>{ 
             this.updateAnalytics('fbplaying');
              }, 2000);
              };
            }, 100);

          }else{
              this.isInvalidUrl = true;
        setTimeout(() => {
          this.isInvalidUrl = false;
        }, 4000);
          }
        })
        .catch(err => {
          console.log(err);
          this.isInvalidUrl = true;
        setTimeout(() => {
          this.isInvalidUrl = false;
        }, 4000);
        });
    },
    userSelectedOption(option,state) {
      this.imageBtnColor = "";
      if (option == "video") {
        this.videoBtnColor = "primary";
        this.imageBtnColor = "";
        this.facebookBtnColor='';
        this.selectedCategory = "video";
        this.allFormateThumb = [];
         this.allFormatefacebook=[];
      } else if(option == 'thumb') {
        this.videoBtnColor = "";
        this.facebookBtnColor='';
        this.imageBtnColor = "primary";
        this.allFormateVideo = [];
        this.allFormateAudio=[];
        this.allFormatefacebook=[];
        this.selectedCategory = "thumb";
      }else if(option == 'facebook'){
        this.facebookBtnColor='primary';
        this.videoBtnColor ='';
         this.imageBtnColor = "";
          this.allFormateVideo = [];
        this.allFormateAudio=[];
          this.allFormateThumb = [];
        this.selectedCategory = "facebook";
      }
     if(state == undefined){ 
     this.youtubeUrl='';
     }
    },
    showVideoPreview(video){
      this.selectedVideoPreview=video;
      this.videoPreviewDialog=true;
      setTimeout(() => {
         this.video=document.getElementById('previewVideo');
          this.video.onplaying=()=> {
           this.storeinterval=setInterval(()=>{ 
             this.updateAnalytics('playing');
              }, 2000);
          };
      }, 100);
     
      this.updateAnalytics('videoDownLoadPreview');
    },
    updateAnalytics(state){
         if(document && document['gtag']){     
              document['gtag']('config', 'UA-167146296-1',{
               'page_path':state
              });
         }
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
@keyframes fontbulger {
 0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-40px);
  }
  60% {
    transform: translateY(-15px);
  }
}

#arrowAnimation {
   animation: fontbulger 2s infinite;
}
</style>