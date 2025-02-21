<template>
  <div class="webgl1"></div>
</template>

<script>
import * as THREE from 'three';
import $ from 'jquery';

export default {
  mounted() {
    this.$nextTick(() => {
      this.initScene();
    });
  },
  methods: {
    initScene() {
      const container = $('.webgl1');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.append(renderer.domElement);

      // Função para criar texturas dinâmicas
      function createNumberTexture(number, color) {
        const size = 64; 
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgba(0,0,0,0)'; 
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = color;
        ctx.font = `${size * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(number, size / 2, size / 2);
        ctx.imageSmoothingEnabled = true;

        return new THREE.CanvasTexture(canvas);
      }

      const objects = [];
      const count = 200;

      for (let i = 0; i < count; i++) {
        const number = Math.random() > 0.5 ? '1' : '0';
        const colorValue = Math.random() * 255;
        const color = `rgb(${colorValue}, 255, ${colorValue}, 0.5)`;
        const texture = createNumberTexture(number, color);

        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        
        sprite.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
        sprite.scale.set(0.5, 0.5, 0.5); 

        scene.add(sprite);
        objects.push(sprite);
      }

      scene.background = new THREE.TextureLoader().load('../assets/img/background/development-background2.jpg');

      let mouseX = 0, mouseY = 0;
      $(window).on('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      });

      let gyroX = 0, gyroY = 0;
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
          let beta = event.beta || 0;
          let gamma = event.gamma || 0;
          gyroX = (gamma / 45) * 0.5;
          gyroY = (beta / 90) * 0.5;
        });
      }

      let time = 0;
      function animate() {
        requestAnimationFrame(animate);

        camera.position.x += (mouseX * 0.05 + gyroX * 0.2 - camera.position.x) * 0.5;
        camera.position.y += (-mouseY * 0.05 - gyroY * 0.2 - camera.position.y) * 0.5;
        camera.lookAt(scene.position);

        time += 0.001;
        objects.forEach((sprite, i) => {
          sprite.position.x += Math.sin(time + i) * 0.0005;
          sprite.position.y += Math.cos(time + i) * 0.0005;
          sprite.position.z += Math.sin(time + i * 0.5) * 0.0005;
        });

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
.webgl1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  background-color: var(--black);
  background-image: 
      radial-gradient(circle at 20% 30%, rgba(20, 20, 20, 0.4), transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(30, 30, 30, 0.5), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(0, 50, 0, 0.3), transparent 50%);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  transform: scale(1.1);
  backdrop-filter: blur(7px);
  transition: transform 0.7s ease-in-out;
}
</style>
