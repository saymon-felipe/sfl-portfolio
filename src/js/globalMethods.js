import $ from 'jquery';

export const globalMethods = {
    methods: {
        typeText: function (elementId, invert = false, type = "") {
            return new Promise((resolve) => {
                const $element = $(`#${elementId}`);
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
                console.log(e)
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
        }
    },
    watch: {
    },
    data() {
        return {
            modalData: null
        }
    }
}