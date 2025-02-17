<template>
    <div class="loading">
        <div class="loading-moon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <circle class="circle" cx="50" cy="50" r="40"/>
                <circle class="circle-half" cx="50" cy="50" r="40"/>
            </svg>
            <div class="circle-content">
                <div class="inner-circle">
                    <p>Loading<span id="loading-text" datatext="...">...</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { globalMethods } from "../js/globalMethods.js";

export default {
    name: "loadingComponent",
    mixins: [globalMethods],
    mounted: function () {
        this.typeText("loading-text");
    }
}
</script>
<style scoped>

.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading-moon-container  {
    width: fit-content;
    height: fit-content;
    border-radius: 50%;
    object-fit: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.circle-content {
    position: absolute;
}

.loading-moon-container  {
    position: relative;
    width: calc(8rem + 22vw);
    height: calc(8rem + 22vw);
    display: flex;
    align-items: center;
    justify-content: center;
}

    .loading-moon-container svg {
        position: absolute;
    }

.circle {
    z-index: 2;
    animation: rotate 5s infinite linear;
    transform: rotate(360deg);
}

@keyframes rotate {
    0% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(0);
    }
}

.circle-half {
    stroke-dasharray: 400 1000; /* Define o traçado inicial como zero e o comprimento total do círculo como 1000 */
}

.circle, .circle-half {
    position: relative;
    fill: transparent;
    stroke: #404040; /* Cinza escuro para a borda do círculo */
    stroke-width: 0.3;
    transform-origin: center;
}

.circle-half {
    stroke: var(--white);
    stroke-width: 0.4;
    stroke-dasharray: 10 1000; /* Define o traçado inicial como zero e o comprimento total do círculo como 1000 */
    stroke-linecap: round;
    z-index: 3;
    animation: loadingCircleLine 4s ease-in-out infinite;
    transform: rotate(-35deg);
}

@keyframes loadingCircleLine {
    0%, 100% {
        stroke-dasharray: 10 1000;
    }

    50% {
        stroke-dasharray: 200 1000;
    }
}

.inner-circle {
    width: calc(4rem + 9vw);
    height: calc(4rem + 9vw);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: all 0.4s;
}

    .inner-circle:hover {
        width: calc(4.4rem + 9vw);
        height: calc(4.4rem + 9vw);
    }

    .pagination-disabled .inner-circle:hover {
        width: calc(4rem + 9vw) !important;
        height: calc(4rem + 9vw) !important;
        cursor: default !important;
    }

    .inner-circle img {
        width: 95%;
        pointer-events: none;
        user-select: none;
        border: 7px solid transparent;
        outline: 5px solid var(--white);
        border-radius: 50%;
    }

@media (max-width: 1050px) {
    .loading-moon-container  {
        width: calc(6rem + 15vw);
        height: calc(6rem + 15vw);
    }

    .inner-circle {
        width: calc(3rem + 8vw);
        height: calc(3rem + 8vw);
    }

        .inner-circle:hover {
            width: calc(3.4rem + 8vw);
            height: calc(3.4rem + 8vw);
        }

        .pagination-disabled .inner-circle:hover {
            width: calc(4rem + 9vw) !important;
            height: calc(4rem + 9vw) !important;
            cursor: default !important;
        }
}
</style>