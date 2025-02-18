<template>
  <div id="app">
    <div class="loading">
      <loadingComponent />
    </div>
    <div class="content">
      <mainPage />
    </div>
  </div>
</template>

<script>
import mainPage from './pages/mainPage.vue';
import loadingComponent from './components/loadingComponent.vue';
import "./css/global.css";
import './assets/fontawesome/css/all.css';
import './assets/fontawesome/css/fontawesome.css';
import 'animate.css';
import $ from 'jquery';
import '@lottiefiles/lottie-player';
import { globalMethods } from "./js/globalMethods.js";

export default {
  name: 'App',
  mixins: [globalMethods],
  data() {
    return {
      loading: true,
      modalData: null
    }
  },
  watch: {
    loading: function () {
      if (!this.loading) {
        this.initApp();
      }
    }
  },
  methods: {
    initApp: function () {
      let loading = $(".loading");
      let content = $(".content");

      loading.css("opacity", 0);

      setTimeout(() => {
        loading.hide();
        content.show();

        setTimeout(() => {
          content.css("opacity", 1);
        }, 1)
      }, 400)
    }
  },
  mounted: function () {
    let self = this;
    let allImages = $('img');
    console.log(allImages)
    let loadedImagesCount = 0;

    if (allImages.length === 0) {
      self.loading = false;
    }

    allImages.each(function() {
      let img = new Image();
      img.src = $(this).attr('src');

      img.onload = function () {
        loadedImagesCount++;

        if (loadedImagesCount === allImages.length) {
          self.loading = false;
        }
      }
    });
  },
  components: {
    mainPage,
    loadingComponent
  }
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}

.loading {
  transition: opacity 0.4s;
}

.content {
  display: none;
  opacity: 0;
  transition: opacity 2s;
}
</style>
