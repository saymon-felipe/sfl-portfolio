<template>
    <div class="audio-visualizer">
        <div class="cover" :class="expanded ? '' : 'closed'" v-on:click="expanded = !expanded">
            <i class="fas fa-angle-left expand-button"></i>
            <img :src="selectedAudio.cover" alt="">
            <i class="fas fa-music playing-button" :class="isPlaying ? 'playing' : ''"></i>
        </div>
        <div class="player-container">
            <i class="fas play-button" :class="isPlaying ? 'fa-pause' : 'fa-play'" @click="togglePlay"></i>
            <div class="visualizer-container">
                <div class="visualizer-text">
                    <h2 :title="selectedAudio.name">{{ selectedAudio.name }}</h2>
                    <p>{{ selectedAudio.artist }}</p>
                </div>
                <canvas ref="canvas" class="visualizer"></canvas>
            </div>
            <div class="volume">
                <i class="fas volume-button" :class="volume == 0 ? 'fa-volume-off' : 'fa-volume-up'" v-on:click="controlVolume =! controlVolume"></i>
                <div class="volume-container" v-if="controlVolume">
                    <input type="range" min="0" class="personalized-input-range" max="1" step="0.01" v-model="volume" @input="setVolume" />
                </div>
            </div>
            <div class="control-volume-wrapper" v-if="controlVolume" v-on:click="controlVolume = false"></div>
            <audio ref="audio" :src="selectedAudio.audio" preload="auto" @play="onPlay" @pause="onPause" @ended="onEnd"></audio>
        </div>
    </div>
  </template>
  
  <script>
  import onMyWay from "../assets/audio/alan-walker-on-my-way.mp3";
  import onMyWayCover from "../assets/img/musics-thumbs/on-my-way-cover.jpg";
  import $ from 'jquery';
    import gsap from 'gsap';

  export default {
    data() {
      return {
        isPlaying: false,  // Estado de reprodução
        volume: 0.5,         // Volume inicial (100%)
        audiosData: [
            {
                name: "On My Way (feat. Sabrina Carpenter & Farruko)",
                artist: "Alan Walker",
                audio: onMyWay,
                cover: onMyWayCover
            }
        ],
        controlVolume: false,
        audioContext: null, // Instância do AudioContext
        analyser: null,     // Instância do AnalyserNode
        bufferLength: 0,    // Comprimento do buffer de dados
        dataArray: [],      // Array para armazenar os dados de áudio
        init: true,
        expanded: false
      };
    },
    watch: {
        expanded: function () {
            if (this.expanded) {
                this.expandPlayer();
            } else {
                this.contractPlayer(true);
            }
        }
    },
    computed: {
        selectedAudio: function () {
            return this.audiosData[0];
        }
    },
    mounted: function () {
        this.contractPlayer(true);
    },
    methods: {
        expandPlayer: function () {
            let player = $(".player-container");

            gsap.to(player, {
                width: "477px",
                duration: 1,
                onComplete: () => {
                    gsap.to(player, {
                        overflow: "initial",
                        duration: 0.1
                    });
                }
            });

        },
        contractPlayer: function (instant = false) {
            let player = $(".player-container");

            gsap.to(player, {
                width: "0",
                overflow: "hidden",
                duration: instant ? 0.1 : 1
            });
        },
      // Inicializa o contexto de áudio e o visualizador
      initAudioContext() {
        // Cria o contexto de áudio
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Cria o nó de análise
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256; // Tamanho da FFT (quantidade de barras)
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
  
        // Conecta o áudio à Web Audio API
        const source = this.audioContext.createMediaElementSource(this.$refs.audio);
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        
        // Começa o visualizador de áudio
        this.drawVisualizer();
      },
  
      // Controla o play/pause
      togglePlay() {
        if (this.init) {
            this.initAudioContext();
            this.init = false;
        }

        this.$nextTick(() => {
            if (this.isPlaying) {
                this.$refs.audio.pause();
            } else {
                this.$refs.audio.play();
            }

            this.isPlaying = !this.isPlaying;
        })
      },
  
      // Ajusta o volume do áudio
      setVolume() {
        this.$refs.audio.volume = this.volume;
      },
  
      // Inicia o áudio
      onPlay() {
        this.isPlaying = true;
      },
      replay: function () {
        this.$refs.audio.pause();
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      },
  
      // Pausa o áudio
      onPause() {
        this.isPlaying = false;
      },
  
      // Quando o áudio terminar
      onEnd() {
        this.isPlaying = false;
        this.replay();
      },
  
      // Função para desenhar o visualizador de áudio
      drawVisualizer() {
        const canvas = this.$refs.canvas;
        const canvasContext = canvas.getContext('2d');
        
        // Define o tamanho do canvas
        canvas.width = window.innerWidth;
        canvas.height = 200;
  
        // Função que desenha as barras do visualizador
        const draw = () => {
          requestAnimationFrame(draw); // Faz o desenho repetir a cada frame
          this.analyser.getByteFrequencyData(this.dataArray); // Captura os dados de áudio
  
          // Limpa o canvas antes de desenhar
          canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  
          // Define a largura das barras
          const barWidth = (canvas.width / this.bufferLength) * 2.5;
          let x = 0;
  
          // Desenha as barras
          for (let i = 0; i < this.bufferLength; i++) {
            const barHeight = this.dataArray[i];
  
            canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',255 ,0)';
            canvasContext.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
  
            x += barWidth + 1; // Move para a próxima barra
          }
        };
  
        draw(); // Inicia o processo de desenho
      }
    }
  };
  </script>
  
  <style scoped>
  .player-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .audio-visualizer {
    display: flex;
    align-items: center;
    height: fit-content;
    position: fixed;
    bottom: 2vh;
    left: 2vw;
    width: fit-content;
    max-width: 95vw;
    border: 5px solid rgba(201, 201, 201, 0.7); /* Borda cinza */
    box-shadow: 7px 7px 0 rgba(0, 0, 0, 0.8);
    border-radius: calc(10px + 1vw);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 1rem;
    z-index: 9998;

    & img {
        height: 140px;
        aspect-ratio: 1/1;
        border-radius: 1rem;
    }

    & h2, & p {
        color: var(--green-low);
    }

    & .visualizer-container {
        background: var(--black);
        padding: 1rem;
        border-radius: 1rem;
        gap: 1rem;
        display: grid;
    }

    & .visualizer-text {
        width: 300px;
        overflow: hidden;        /* Oculta o texto que ultrapassa a largura */
        position: relative;      /* Necessário para posicionar o texto dentro */

        & h2 {
            font-size: 1rem;
            margin-bottom: 5px;
            white-space: nowrap;         /* Impede o texto de quebrar linha */
            animation: scroll-text 14s linear infinite; /* Animação de rolagem */
            animation-delay: 5s;
            display: inline-block;
        }

        & p {
            font-size: .9rem;
        }
    }
  }

@keyframes scroll-text {
  0% {
    transform: translateX(0%); /* Começa a animação no início */
    opacity: 1;
  }
  50% {
    transform: translateX(-100%); /* Vai para a esquerda, fora da tela */
    opacity: 1;
  }
  51% {
    transform: translateX(-100%); /* Vai para a esquerda, fora da tela */
    opacity: 0;
  }
  52% {
    transform: translateX(70%); /* Vai para a esquerda, fora da tela */
    opacity: 0;
  }
  53% {
    transform: translateX(70%); /* Vai para a esquerda, fora da tela */
    opacity: 1;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

.play-button {
    margin-left: 1rem;
}

.play-button, .volume i {
    font-size: 1rem;
    cursor: pointer;
    color: var(--black);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    padding: 14px;
    width: 45px;
    height: 45px;
    display: flex;
    place-items:center;
    box-shadow: inset 3px -3px 7px rgba(255, 255, 255, 0.3), 3px -3px 7px rgba(0, 0, 0, 0.3);
}
  
  .visualizer {
    width: 300px;
    height: 50px;
    background-color: var(--black);
    border-bottom: 1px solid var(--green-low);
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  button {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  input[type="range"] {
    width: 100%;
    margin-bottom: 10px;
  }

  .volume {
    position: relative;
  }

  .volume-container {
    position: absolute;
    bottom: 110%;
    height: 132px;
    width: 35px;
    border-radius: calc(10px + 1vw);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    display: grid;
    place-items: center;
    padding: .5rem;
    z-index: 9999;
    left: 5px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);

    & input {
        transform: rotate(-90deg);
        width: 90px !important;
        margin: 0;
        margin-left: -35px;

    }
  }

  .control-volume-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9998;
  }

  .cover {
    position: relative;
    width: fit-content;
    height: fit-content;
    cursor: pointer;

    &.closed .expand-button {
        transform: rotate(180deg);
    }

    & .expand-button {
        transform: rotate(0deg);
        position: absolute;
        color: var(--white);
        font-size: 1.3rem;
        background: rgba(0, 0, 0, 0.3);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: 10px;
        right: 10px;
        z-index: 2;
    }

    & .playing-button {
        color: var(--white);
        font-size: 0.8rem;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.9);
        border-radius: 50%;
        place-items: center;
        position: absolute;
        bottom: 10px;
        left: 10px;
        display: grid;
    }

    & .playing-button.playing {
        animation: rotate 5s linear infinite;
    }
  }

  @keyframes rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
  }
  </style>
  