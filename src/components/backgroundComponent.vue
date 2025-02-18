<template>
  <div id="canvasContainer" class="webgl"></div>
</template>

<script>
import * as THREE from 'three';
import $ from 'jquery';

export default {
  mounted() {
    $(document).ready(() => {
      this.initScene();
    });
  },
  methods: {
    initScene() {
      const container = $('#canvasContainer');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.append(renderer.domElement);

      // Criando estrelas cintilantes
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 300;
      const positions = new Float32Array(starsCount * 3);
      const colors = new Float32Array(starsCount * 3);

      for (let i = 0; i < starsCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        const color = new THREE.Color();
        color.setHSL(Math.random(), 1.0, 0.8);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const starsMaterial = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.1,
        transparent: true,
        depthWrite: false,
        opacity: 1.0,
        map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/circle.png"),
      });

      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      scene.background = new THREE.TextureLoader().load('../assets/img/background/cosmos-background.jpg');

      // Movimento do mouse
      let mouseX = 0, mouseY = 0;
      $(window).on('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      });

      // Movimento pelo giroscópio
      let gyroX = 0, gyroY = 0;

      if (window.DeviceOrientationEvent.isTrusted) {
        window.addEventListener('deviceorientation', (event) => {
          console.log(event)
          // Normalizar valores
          let beta = event.beta || 0;  // -90 (para baixo) a 90 (para cima)
          let gamma = event.gamma || 0; // -45 (esquerda) a 45 (direita)

          // Converte para valores entre -1 e 1
          gyroX = gamma / 45; // Esquerda/Direita
          gyroY = beta / 90;  // Cima/Baixo
        }, true);
      }

      let time = 0;

      function animate() {
        requestAnimationFrame(animate);

        // Movimento da câmera combinando mouse e giroscópio
        camera.position.x += (mouseX * 0.05 + gyroX * 0.1 - camera.position.x) * 0.1;
        camera.position.y += (-mouseY * 0.05 - gyroY * 0.1 - camera.position.y) * 0.1;
        camera.lookAt(scene.position);

        time += 0.001; // Incremento de tempo para criar movimento suave
        for (let i = 0; i < starsCount; i++) {
            positions[i * 3] += Math.sin(time + i) * 0.0005; // Movimento lento no eixo X
            positions[i * 3 + 1] += Math.cos(time + i) * 0.0005; // Movimento lento no eixo Y
            positions[i * 3 + 2] += Math.sin(time + i * 0.5) * 0.0005; // Movimento sutil no eixo Z
        }
        
        // Atualizando as posições das estrelas
        starsGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }
      animate();

      $(window).on('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
    }
  }
};
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
  background-image: url("../assets/img/background/cosmos-background.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  transform: scale(1.1);
  transition: transform 0.4s ease-in-out;
}
</style>
