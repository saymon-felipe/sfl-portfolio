<template>
    <div id="canvasContainer2" class="webgl"></div>
</template>
<script>
export default {
    name: "backgroundDevelopmentComponent"
}
</script>
<style scoped>
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  background-image: url("../assets/img/background/development-background.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  transform: scale(1.1) translateX(2vw);
  transition: transform 0.7s ease-in-out;
}
</style>