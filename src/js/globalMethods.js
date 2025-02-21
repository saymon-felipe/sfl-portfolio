import $ from 'jquery';

export const globalMethods = {
    methods: {
        typeText: function (elementId, invert = false, type = "") {
            return new Promise((resolve) => {
                const $element = $(`#${elementId}`);
                $element.css("opacity", 1);

                const speed = $element.attr("speed") || 150;

                if ($element.length == 0 || !$element.is(":visible")) return;

                let animationInterval = parseInt($element.attr("interval"));
                let textToType = $element.attr("datatext");

                let index = 0;

                $element.css("width", "fit-content");

                if (invert) {
                    index = textToType.length;
                } else {
                    $element.html("&nbsp;");
                }
                
                const intervalId = setInterval(() => {
                    let newElement = $(`#${elementId}`);

                    if (newElement.length == 0 || !newElement.is(":visible")) {
                        clearInterval(intervalId);
                        return;
                    }

                    let typedText = textToType.slice(0, index);

                    if (typedText.trim() != "" || invert) {
                        $element.text(typedText.trim()); // Atualiza o texto no elemento jQuery
                    }
                    
                    if (!invert && index > textToType.length) {
                        clearInterval(intervalId);

                        if (type != "forwards") {
                            setTimeout(() => {
                                this.typeText(elementId, true);
                            }, animationInterval * 1000);
                        }

                        resolve();
                    }

                    if (invert && index == 0) {
                        $element.html("&nbsp;");
                        $element.css("width", 0);
                        clearInterval(intervalId);
                        
                        if (type != "forwards") {
                            setTimeout(() => {
                                this.typeText(elementId, true);
                            }, animationInterval * 1000);
                        }

                        resolve();
                    }

                    if (invert) {
                        index--;
                    } else {
                        index++;
                    }
                }, speed);
            })
        },
        checkClickAndShowTooltip: function () {
            let timeout;
            
            $("section.photo").on("click", (e) => {
                $(".tooltip").remove();
                let target = $(e.delegateTarget);

                if (target.attr("title") !== undefined && target.attr("subtitle") !== undefined) {
                    let tooltip = `
                        <div class="tooltip">
                            <h2 id="tooltip-title" speed="30" interval="5" datatext="${target.attr("title")}">${target.attr("title")}</h2>
                            <hr />
                            <p id="tooltip-subtitle" speed="40" interval="5" datatext="${target.attr("subtitle")}">${target.attr("subtitle")}<p>
                        </div>
                    `

                    clearTimeout(timeout);

                    tooltip = $(tooltip);
                    tooltip.css({
                        position: 'absolute',
                        top: e.clientY + 'px',
                        left: e.clientX + 'px'
                    });

                    let selectAnimation = $("#select-animation");
                    selectAnimation.css({
                        top: (e.clientY - 25) + 'px',
                        left: (e.clientX - 25) + 'px'
                    })

                    selectAnimation.show();
                    selectAnimation[0].seek(0);
                    selectAnimation[0].play();

                    $('body').append(tooltip);

                    this.typeText("tooltip-title", false, "forwards");
                    this.typeText("tooltip-subtitle", false, "forwards");

                    
                    timeout = setTimeout(() => {
                        let lastTimeout = timeout;

                        this.typeText("tooltip-title", true, "forwards");
                        this.typeText("tooltip-subtitle", true, "forwards").then(() => {

                            if (lastTimeout == timeout) {
                                $(".tooltip").remove();
                            }
                        });
                    }, 5000);
                }
            })
        },
        //Funções nativas android
        checkIfDeviceIsInPortraitMode: function() {
            if (window.matchMedia("(orientation: landscape)").matches) {
                return false;
            } else {
                return true;
            }
        },
        isMobileDevice: function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        initiateFullScreen: function (event) {
            if (event) {
                let element = document.documentElement;

                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) { /* Firefox */
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) { /* Chrome, Safari e Opera */
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) { /* IE/Edge */
                    element.msRequestFullscreen();
                }
            }
        },
        requestFullScreen: function () {
            this.fillModalVariables("Full screen", "This page works better in full screen.", "fas fa-expand-arrows-alt");
        },
        checkIfIsFullScreen: function () {
            let isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

            if (this.isMobileDevice() && isFullScreen) {
                return true;
            }
            return false;
        },
        handleFullscreenChange: function () {
            if (!this.isMobileDevice()) return;

            if (!this.checkIfIsFullScreen()) {
                this.requestFullScreen();
            } else {
                if (this.checkIfDeviceIsInPortraitMode()) {
                    this.fillModalVariables("Turn the device", "Please rotate your phone to landscape mode.");
                } else {
                    this.hideModal();
                }
            }
        },
        //Funções de controle de orientação
        handleOrientationChange: function () {
            setTimeout(() => {
                if (this.checkIfDeviceIsInPortraitMode()) {
                    this.fillModalVariables("Turn the device", "Please rotate your phone to landscape mode.");
                } else {
                    this.handleFullscreenChange();
                }
            }, 10)
        },
        initEventListeners: function () {
            this.handleFullscreenChange();

            window.addEventListener("orientationchange", () => {
                this.handleOrientationChange();
            });
    
            document.addEventListener("fullscreenchange", () => {
                this.handleFullscreenChange();
            });
            document.addEventListener("mozfullscreenchange", () => {
                this.handleFullscreenChange();
            });
            document.addEventListener("webkitfullscreenchange", () => {
                this.handleFullscreenChange();
            });
            document.addEventListener("msfullscreenchange", () => {
                this.handleFullscreenChange();
            });
        },
        fillModalVariables: function (main_text, complementary_text, modal_icon) {
            this.hideModal().then(() => {
                this.showModal = true;
                this.modalTitle = main_text;
                this.modalText = complementary_text;
                this.modalIcon = modal_icon;
            });
        },
        hideModal: function () {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.showModal = false;
                    this.modalTitle = "";
                    this.modalText = "";
                    this.modalIcon = "";

                    resolve();
                }, 100)
            })
        }
    },
    watch: {
        showModal: function () {
            setTimeout(() => {
                if (this.showModal) {
                    let modal = $(".modal");
                    let modalPosition = modal.position();

                    let calculatedX = modalPosition.left;
                    let calculatedY = modalPosition.top;
                    
                    modal.css("transform", `translate(-${calculatedX}px, -${calculatedY}px)`);
                }
            }, 1)
        }
    },
    data() {
        return {
            modalData: null,
            showModal: false,
            modalTitle: "",
            modalText: "",
            modalIcon: ""
        }
    }
}