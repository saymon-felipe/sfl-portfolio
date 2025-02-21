<template>
    <div class="modal" v-if="modalContent != null">
        <button type="button" v-on:click="closeModal()">
            <i class="far fa-times-circle"></i>
        </button>
        <img :src="modalContent.caminho">
        <div class="image-details">
            <h2 id="modal-title" speed="70" :datatext="modalContent.nome">{{ modalContent.nome }}</h2>
            <p id="modal-subtitle" speed="60" :datatext="modalContent.descricao">{{ modalContent.descricao }}</p>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import gsap from 'gsap';
import { globalMethods } from '@/js/globalMethods';

export default {
    name: "modalComponent",
    mixins: [globalMethods],
    props: ["modalContent"],
    watch: {
        modalContent: function () {
            this.$nextTick(() => {
                if (this.modalContent != null) {
                    this.showPageModal();
                }
            })
        }
    },
    methods: {
        showPageModal: function () {
            let modal = $(".modal");
            let modalImg = $(".modal img");
            let modalDetails = $(".modal .image-details");
            let modalButton = $(".modal button");

            gsap.to(modal, {
                width: "100vw",
                height: "100vh",
                opacity: 1,
                duration: 0.7
            });

            setTimeout(() => {
                gsap.to(modalButton, {
                    opacity: 1,
                    duration: 0.3
                });

                setTimeout(() => {
                    this.typeText("modal-title", false, "forwards").then(() => {
                        this.typeText("modal-subtitle", false, "forwards");
                    });

                    gsap.to(modalImg, {
                        opacity: 1,
                        duration: 0.3
                    });

                    setTimeout(() => {
                        gsap.to(modalDetails, {
                            opacity: 1,
                            duration: 0.3
                        });
                    }, 100)
                }, 100)
            }, 100)
        },
        closeModal: function () {
            let modal = $(".modal");
            let modalImg = $(".modal img");
            let modalDetails = $(".modal .image-details");
            let modalButton = $(".modal button");
            let self = this;

            gsap.to(modalButton, {
                opacity: 0,
                duration: 0.3
            });

            gsap.to(modalImg, {
                opacity: 0,
                duration: 0.3
            });

            gsap.to(modalDetails, {
                opacity: 0,
                duration: 0.3,
                onComplete: function () {
                    gsap.to(modal, {
                        width: "1px",
                        height: "1px",
                        opacity: 0,
                        duration: 0.7,
                        onComplete: function () {
                            self.$emit('closeModal');
                        }
                    });
                }
            });
        }
    }
}
</script>
<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 1px;
    height: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    z-index: 9999;
    border-radius: calc(10px + 1vw);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    opacity: 0;

    & img {
        object-fit: contain;
        width: fit-content;
        max-width: calc(100% - 2rem);
        max-height: calc(100% - 7rem);
        border-radius: 1vw;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
    }

    & .image-details {
        text-align: center;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;

        & p, & h2 {
            color: var(--white);
            filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.7));
        }
    }
}

button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--white);
    font-size: 4rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 6;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.7));
    backdrop-filter: blur(10px);
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    display: grid;
    place-items: center;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
}

.image-details {
    text-align: center;
    place-items: center;

    & h2, & p {
        opacity: 0;
    }
}
</style>