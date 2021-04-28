class ShoppingCart {

    constructor() {
        // this.data = [];
    }

    // get data() {
    //     return this.data;
    // }

    // set data(value) {
    //     this.data = value;
    // }

    addEventListenerToDelete() {
        const item = document.querySelectorAll(".modal .delete");
        const lastItem = item[item.length - 1];
        const id =
            lastItem.parentNode.parentNode.firstElementChild.firstChild.nodeValue;
        lastItem.addEventListener("click", () => {
            this.DeleteRowFromHTML(id);
            this.DeleteRowFromArray(id);
        });
    }

    DeleteRowFromHTML(id) {
        let searcString = `.modal #row${id}`;
        const selectedRow = document.querySelector(searcString);
        if (selectedRow !== null) selectedRow.remove();
    }

    DeleteRowFromArray(id) {
        let item = shoppingCartItems.findIndex((item) => item.id == id);
        while (item != -1) {
            shoppingCart.updateTotalPrice(false, id - 1);
            shoppingCartItems.splice(item, 1);
            item = shoppingCartItems.findIndex((item) => item.id == id);
            shoppingCartBar.updateCounter(false);
        }
    }

    addCourse(courseId) {
        const index = data.findIndex((course) => course.id == courseId);
        let existAlready = shoppingCartItems.findIndex(
            (course) => course.id == courseId
        );

        if (existAlready !== -1) {
            let searcString = `.modal #row${index + 1}`;
            let amount = document.querySelector(searcString);
            let nr = amount.lastElementChild.previousElementSibling.textContent;
            amount.lastElementChild.previousElementSibling.textContent = Number(nr) + 1;
        } else {
            tableShoppingCart.insertAdjacentHTML(
                "beforeend",
                `
                    <tr id="row${index + 1}">
                        <td>${data[index].id}</td>
                        <td>${data[index].title}</td>
                        <td>${data[index].price}</td>
                        <td>1</td>
                        <td><i class="far fa-trash-alt delete"></i></td>
                    </tr>
                `
            );
        }

        shoppingCartItems.push(data[index]);
        shoppingCart.updateTotalPrice(true, index);
    }

    updateTotalPrice(add, courseId) {
        let searcString = ".modal .price-total";
        const element = document.querySelector(searcString);
        let priceTotalCurrent = element.textContent;

        let indexNewItem = shoppingCartItems.findIndex(
            (item) => item.id === courseId + 1
        );
        let priceNewItem = shoppingCartItems[indexNewItem].price;

        if (add === true) {
            element.textContent = Number(priceTotalCurrent) + Number(priceNewItem);
        } else {
            element.textContent = Number(priceTotalCurrent) - Number(priceNewItem);
        }
    }

    toggle() {
        modal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
    }
}