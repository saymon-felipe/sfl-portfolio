<template>
    <div class="modal">
        <h2 id="modal-title" :datatext="modaltitle" interval="7">{{ modaltitle }}</h2>
        <p id="modal-text" :datatext="modaltext" interval="5" speed="50">{{ modaltext }}</p>
        <i id="fullscreen-icon" class="animate__animated animate__pulse animate__infinite infinite" :class="modalicon" v-on:click="submitModal()"></i>
        <div class="animation-container" v-if="!modalicon">
            <lottie-player id="rotate-phone" background="transparent" speed="1" loop autoplay></lottie-player>
        </div>
    </div>
</template>
<script>
import { globalMethods } from "../js/globalMethods.js";
import rotatePhoneJson from "../assets/animations/rotate-phone.json";

export default {
    name: "supportModal",
    mixins: [globalMethods],
    props: ["modaltitle", "modaltext", "modalicon"],
    methods: {
        submitModal: function () {
            this.$emit("saveModal", true);
        }
    },
    mounted: function () {
        this.typeText("modal-title", false, "forwards");
        this.typeText("modal-text", false, "forwards");

        const player = document.querySelector("#rotate-phone");

        if (player) {
            player.addEventListener("rendered", () => {
                player.load(
                    rotatePhoneJson
                );
            });
        }
    }
}
</script>
<style scoped>
.modal {
    background: rgba(0, 0, 0);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    padding: 2em;
    display: flex;
    flex-direction: column;

    & h2, & p {
        color: var(--gray-high);
    }
}

#fullscreen-icon, .animation-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    color: var(--gray-high);
    width: 100vw;
    text-align: center;
    font-size: 5em;
    cursor: pointer;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
}

    .modal lottie-player {
        width: 10rem;
        height: fit-content;
    }
</style>