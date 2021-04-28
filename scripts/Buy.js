class Buy {

    constructor() {
        this.addEventListenerToButtons();
    }

    addEventListenerToButtons() {
        let searcString = ".modal-buy .ok-buy-confirmation";
        const okbutton = document.querySelector(searcString);
        const closeButtonBuy = document.querySelector("#close-button-buy");

        okbutton.addEventListener("click", () => {
            this.close();
        });

        closeButtonBuy.addEventListener("click", () => {
            this.toggle();
        });
    }

    close() {
        this.toggle();
    }

    toggle() {
        modalBuy.classList.toggle("closed-buy");
        modalOverlayBuy.classList.toggle("close-overlay-buy");
    }

}