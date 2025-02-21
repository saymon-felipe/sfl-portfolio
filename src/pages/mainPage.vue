<template>
    <div class="portfolio-main-page">
        <backgroundDefaultComponent id="default-background" />
        <backgroundDevelopmentComponent id="development-background" />
        <principalComponent @changeView="handleChangeView" />
        <lottie-player id="select-animation" background="transparent" speed="10" autoplay></lottie-player>
        <developmentComponent v-show="false" id="development-component" />
        <supportModal v-if="showModal" :modaltitle="modalTitle" :modaltext="modalText" :modalicon="modalIcon" @saveModal="initiateFullScreen($event)" />
        <audioPlayer />
    </div>
</template>
<script>
import { globalMethods } from "../js/globalMethods.js";
import backgroundDefaultComponent from "@/components/backgroundDefaultComponent.vue";
import backgroundDevelopmentComponent from "@/components/backgroundDevelopmentComponent.vue";
import principalComponent from "@/components/principalComponent.vue";
import selectAnimationJson from "../assets/animations/select.json";
import developmentComponent from "@/components/developmentComponent.vue";
import supportModal from "@/components/supportModal.vue";
import audioPlayer from "@/components/audioPlayer.vue";
import $ from 'jquery';
import gsap from 'gsap';

export default {
    name: "mainPage",
    mixins: [globalMethods],
    data() {
        return {
            view: "default"
        }
    },
    watch: {
        view: function () {
            this.changeBackground(this.view);
        }
    },
    methods: {
        changeBackground: function (type) {
            let defaultbackground = $("#default-background");
            let developmentbackground = $("#development-background");

            if (type == "development") {
                defaultbackground.css("opacity", 0);
                developmentbackground.css("opacity", 1);

                return;
            }

            defaultbackground.css("opacity", 1);
            developmentbackground.css("opacity", 0);
        },
        handleChangeView: function (event) {
            $(".tooltip").remove();

            if (event == "development") {
                this.goToDevelopment();
                this.view = event;
            }
        },
        hideDevelopmentSection: function () {
            return new Promise((resolve) => {
                let developmentContent1 = $("#developmentContent1");
                let developmentContent2 = $("#developmentContent2");
                let developmentContent3 = $("#projects");

                gsap.to(developmentContent1, {
                    y: '100vh',
                    duration: 1,
                    ease: "cubic-bezier(0.25, 0.8, 0.25, 1)"
                });

                setTimeout(() => {
                    gsap.to(developmentContent3, {
                        y: '100vh',
                        duration: 1,
                        ease: "cubic-bezier(0.25, 0.8, 0.25, 1)"
                    });

                    setTimeout(() => {
                        gsap.to(developmentContent2, {
                            y: '100vh',
                            duration: 1,
                            ease: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                            onComplete: function () {
                                $("#development-component").hide();
                            }
                        });
                        
                        resolve();
                    }, 150)
                }, 150)
            })
        },
        showDevelopmentSection: function () {
            let developmentContent1 = $("#developmentContent1");
            let developmentContent2 = $("#developmentContent2");
            let developmentContent3 = $("#projects");

            gsap.to(developmentContent2, {
                y: 0,
                duration: 1,
                ease: "cubic-bezier(0.25, 0.8, 0.25, 1)"
            });

            setTimeout(() => {
                gsap.to(developmentContent3, {
                    y: 0,
                    duration: 1,
                    ease: "cubic-bezier(0.25, 0.8, 0.25, 1)"
                });

                setTimeout(() => {
                    gsap.to(developmentContent1, {
                        y: 0,
                        duration: 1,
                        ease: "cubic-bezier(0.25, 0.8, 0.25, 1)"
                    });
                }, 150)
            }, 150)
        },
        resetLayout: function () {
            let literature = $("#literature");
            let principal = $("#principal");
            let development = $("#development");

            this.hideDevelopmentSection().then(() => {
                development.find(".card-informations p").html("Development");
                this.view = "default";

                if (this.isMobileDevice()) {
                    development.find(".responsive-double-click").hide();
                    development.find(".double-click").show();
                    development.find(".card-informations").css("opacity", 1);
                    development.find("i").css("font-size", "4rem");
                }

                gsap.to(development, {
                    right: 0,
                    top: 0,
                    width: "15vw",
                    duration: 1,
                    ease: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                    onComplete: () => {
                        development.find(".card-informations p").html("Development");
                    }
                });

                setTimeout(() => {
                    let defaultbackground = $("#default-background");
                    let developmentbackground = $("#development-background");

                    defaultbackground.css("transform", "scale(1.1)");
                    developmentbackground.css("transform", "scale(1.1) translateX(0)");

                    gsap.to(literature, {
                        x: 0,
                        duration: 1,
                        ease: "cubic-bezier(0.25, 0.8, 0.25, 1)"
                    });

                    gsap.to(principal, {
                        x: 0,
                        duration: 1,
                        ease: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                        onComplete: () => {
                            literature.removeClass("no-animation");
                            principal.removeClass("no-animation");
                            development.removeClass("no-animation").removeClass("selected");
                        }
                    });
                }, 100)
            });
        },
        goToDevelopment: function () {
            let defaultbackground = $("#default-background");
            let developmentbackground = $("#development-background");

            let literature = $("#literature");
            let principal = $("#principal");
            let development = $("#development");

            if (development.hasClass("selected")) {
                this.resetLayout();
                return;
            }

            literature.addClass("no-animation");
            principal.addClass("no-animation");

            gsap.to(literature, {
                x: '100vw',
                duration: 1,
                ease: "cubic-bezier(0.25, 0.8, 0.25, 1)"
            });

            gsap.to(principal, {
                x: '100vw',
                duration: 1,
                ease: "cubic-bezier(0.25, 0.8, 0.25, 1)"
            });

            setTimeout(() => {
                development.addClass("no-animation").addClass("selected");
                let deslocamento = this.getCornerPosition(development);

                if (this.isMobileDevice()) {
                    development.find(".responsive-double-click").show();
                    development.find(".double-click").hide();
                    development.find(".card-informations").css("opacity", 0);
                    development.find("i").css("font-size", "2rem");
                }

                gsap.to(development, {
                    right: deslocamento.x,
                    top: deslocamento.y,
                    width: this.isMobileDevice() ? "70px" : "15vw",
                    duration: 1,
                    ease: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                    onComplete: () => {
                        development.find(".card-informations p").html("Return");
                    }
                });
            }, 100)

            defaultbackground.css("transform", "scale(1.1) translateX(2vw)");
            developmentbackground.css("transform", "scale(1.1) translateX(2vw)");
            $("#development-component").show();
            this.showDevelopmentSection();
        },
        getCornerPosition: function (element) {
            const rect = element[0].getBoundingClientRect();
  
            // Pega as dimensões da janela
            const janelaLargura = window.innerWidth;
            const janelaAltura = window.innerHeight;

            let differenceX = rect.width;
            let differencey = rect.height;

            if (this.isMobileDevice()) {
                differenceX = (rect.width - rect.width / 2);
                differencey = (rect.height - rect.height / 2);
            }

            // Calcula o deslocamento necessário para mover para o canto superior direito
            const deslocamentoX = janelaLargura - differenceX; // Largura da janela - Largura do elemento
            const deslocamentoY = janelaAltura - differencey;

            return {
                x: -(deslocamentoX - rect.left - 50),
                y: -(deslocamentoY - rect.top - 50)
            }
        }
    },
    mounted: function () {
        this.checkClickAndShowTooltip();
        this.changeBackground("default");

        const player = document.querySelector("#select-animation");

        if (player) {
            player.addEventListener("rendered", () => {
                player.load(
                    selectAnimationJson
                )
            })
        }

        let developmentContent1 = $("#developmentContent1");
        let developmentContent2 = $("#developmentContent2");
        let developmentContent3 = $("#projects");

        gsap.to(developmentContent1, {
            y: "100vh",
            duration: 0.1
        });

        gsap.to(developmentContent3, {
            y: "100vh",
            duration: 0.1
        });

        gsap.to(developmentContent2, {
            y: "100vh",
            duration: 0.1
        });

        this.initEventListeners();
    },
    components: {
        backgroundDefaultComponent,
        backgroundDevelopmentComponent,
        principalComponent,
        developmentComponent,
        supportModal,
        audioPlayer
    }
}
</script>
<style scoped>
lottie-player {
    position: fixed;
    width: 50px;
    height: 50px;
    display: none;
    z-index: 5;
}
.portfolio-main-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}

#default-background, #development-background {
    transition: all 0.7s ease-in-out;
}
</style>