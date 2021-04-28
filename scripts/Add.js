class Add {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.addEventListeners();
    }

    addEventListeners() {
        const closeButton = document.querySelector("#close-button");
        const addButton = document.querySelector("#add-button");
        const saveButton = document.querySelector("#save");
        const cancelButton = document.querySelector("#cancel");
        const closeButtonAdd = document.querySelector("#close-button-add");

        closeButton.addEventListener("click", () => {
            shoppingCart.toggle();
        });
        addButton.addEventListener("click", () => {
            this.toggle();
        });
        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.save()
                .then()
                .catch((err) => console.log(err));
            this.toggle();
        });
        cancelButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.toggle();
        });
        closeButtonAdd.addEventListener("click", () => {
            this.toggle();
        });
    }

    async save() {
        const idInput = document.querySelector('#id');
        const titleInput = document.querySelector('#title');
        const descriptionInput = document.querySelector('#description');
        const categoryInput = document.querySelector('#category');
        const lengthInput = document.querySelector('#length');
        const typeInput = document.querySelector('#type');
        const priceInput = document.querySelector('#price');

        const course = {
            id: idInput.value,
            title: titleInput.value,
            description: descriptionInput.value,
            category: categoryInput.value,
            length: lengthInput.value,
            type: typeInput.value,
            price: priceInput.value,
        };

        const response = await fetch(`${this.baseUrl}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
        });

        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    }

    toggle() {
        modalAdd.classList.toggle("closed-add");
        modalOverlayAdd.classList.toggle("close-overlay-add");
    }
}