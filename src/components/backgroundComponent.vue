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
        
        // Criando estrelas cintilantes com cores variadas
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 100;
        const positions = new Float32Array(starsCount * 3);
        const colors = new Float32Array(starsCount * 3);
        const opacities = new Float32Array(starsCount);  // Opacidades das estrelas
        
        for (let i = 0; i < starsCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
            
            // Cores variadas para as estrelas
            const color = new THREE.Color();
            color.setHSL(Math.random(), 1.0, 0.8);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Opacidade inicial aleatória
            opacities[i] = 0.2 + Math.random() * 0.5;
        }
        
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const starsMaterial = new THREE.PointsMaterial({
            vertexColors: true,
            size: 0.1,
            transparent: true,
            depthWrite: false,
            opacity: 1.0,
            map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/circle.png")
        });
        
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);
    
        const glowMaterial = new THREE.PointsMaterial({
            vertexColors: true,
            size: 0.2, // Tamanho maior para o brilho
            transparent: true,
            blending: THREE.AdditiveBlending, // Faz o brilho adicionar
            opacity: 1,
            map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/circle.png")
        });
        
        const glow = new THREE.Points(starsGeometry, glowMaterial);
        scene.add(glow);
        
        scene.background = new THREE.TextureLoader().load('../assets/img/background/cosmos-background.jpg');
        
        // Efeito de movimento com o mouse
        let mouseX = 0, mouseY = 0;
        $(window).on('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
        });
        
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            
            camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.1;
            camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.1;
            camera.lookAt(scene.position);
            
            // Movimentando as estrelas lentamente
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
  