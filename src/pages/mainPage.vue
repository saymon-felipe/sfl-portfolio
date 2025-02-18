<template>
    <div class="portfolio-main-page">
        <backgroundComponent />
        <principalComponent @changeView="handleChangeView" />
        <lottie-player id="select-animation" background="transparent" speed="10" autoplay></lottie-player>
        <developmentComponent v-show="false" id="development-component" />
    </div>
</template>
<script>
import { globalMethods } from "../js/globalMethods.js";
import backgroundComponent from "@/components/backgroundComponent.vue";
import principalComponent from "@/components/principalComponent.vue";
import selectAnimationJson from "../assets/animations/select.json";
import developmentComponent from "@/components/developmentComponent.vue";
import $ from 'jquery';
import gsap from 'gsap';

export default {
    name: "mainPage",
    mixins: [globalMethods],
    data() {
        return {
        }
    },
    watch: {
    },
    methods: {
        handleChangeView: function (event) {
            $(".tooltip").remove();

            if (event == "development") {
                this.goToDevelopment();
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
            const webgl = $(".webgl");
            let literature = $("#literature");
            let principal = $("#principal");
            let development = $("#development");

            this.hideDevelopmentSection().then(() => {
                development.find(".card-informations p").html("Development");

                gsap.to(development, {
                    right: 0,
                    top: 0,
                    duration: 1,
                    ease: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                    onComplete: () => {
                        development.find(".card-informations p").html("Development");
                    }
                });

                setTimeout(() => {
                    webgl.css("transform", "scale(1.1)");

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
            const webgl = $(".webgl");
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

                gsap.to(development, {
                    right: deslocamento.x,
                    top: deslocamento.y,
                    duration: 1,
                    ease: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                    onComplete: () => {
                        development.find(".card-informations p").html("Return");
                    }
                });
            }, 100)

            webgl.css("transform", "scale(1.1) translateX(2vw)");
            $("#development-component").show();
            this.showDevelopmentSection();
        },
        getCornerPosition: function (element) {
            const rect = element[0].getBoundingClientRect();
  
            // Pega as dimensões da janela
            const janelaLargura = window.innerWidth;
            const janelaAltura = window.innerHeight;

            // Calcula o deslocamento necessário para mover para o canto superior direito
            const deslocamentoX = janelaLargura - rect.width; // Largura da janela - Largura do elemento
            const deslocamentoY = janelaAltura - rect.height;

            return {
                x: -(deslocamentoX - rect.left - 50),
                y: -(deslocamentoY - rect.top - 50)
            }
        }
    },
    mounted: function () {
        this.checkClickAndShowTooltip();

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
    },
    components: {
        backgroundComponent,
        principalComponent,
        developmentComponent
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
</style>