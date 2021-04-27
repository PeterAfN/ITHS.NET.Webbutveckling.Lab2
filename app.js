"use strict";

const tableShoppingCartContent = document.querySelector(
  "#shopping-cart-content"
);
const tableCoursesContent = document.querySelector("#table-courses-content");
const shoppingCartItemsCtr = document.querySelector(".items-cart-ctr");

const modal = document.querySelector("#modal");
const modalBuy = document.querySelector(".modal-buy");
const modalOverlay = document.querySelector("#modal-overlay");
const modalOverlayBuy = document.querySelector(".modal-overlay-buy");
const closeButton = document.querySelector("#close-button");
const closeButtonBuy = document.querySelector("#close-button-buy");
const openButton = document.querySelector("#open-button");
const openPaymentButton = document.querySelector(".to-payment");

//#region -------------- Methods for showing buy confirmation modal





addEventListenerToBuyButton();

function addEventListenerToBuyButton() {
  let searcString = ".modal-buy .close-buy-confirmation";
  const button = document.querySelector(searcString);

  button.addEventListener("click", () => {
    closeModalBuyConfirmation();
  });
}

function closeModalBuyConfirmation() {
  ToggleModalBuy();
}

closeButtonBuy.addEventListener("click", function () {
  ToggleModalBuy();
});

function ToggleModalBuy() {
  modalBuy.classList.toggle("closed-buy");
  modalOverlayBuy.classList.toggle("close-overlay-buy");
}
//#endregion -------------- Methods for showing buy confirmation modal




//#region -------------- Methods for shopping cart

function updateTotalPrice(add, courseId) {
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

function addEventListenerToNewItem() {
  const item = document.querySelectorAll(".modal .delete");
  const lastItem = item[item.length - 1];
  const id =
    lastItem.parentNode.parentNode.firstElementChild.firstChild.nodeValue;
  lastItem.addEventListener("click", () => {
    DeleteRowFromHTML(id);
    DeleteAllOccurancesFromArray(id);
  });
}

function DeleteRowFromHTML(id) {
  let searcString = `.modal #row${id}`;
  const selectedRow = document.querySelector(searcString);
  if (selectedRow !== null) selectedRow.remove();
}

function DeleteAllOccurancesFromArray(id) {
  let item = shoppingCartItems.findIndex((item) => item.id == id);
  while (item != -1) {
    updateTotalPrice(false, id - 1);
    shoppingCartItems.splice(item, 1);
    item = shoppingCartItems.findIndex((item) => item.id == id);
    updateShoppingCartBarCounter(false);
  }
}

let shoppingCartItems = [];

function addCourseToShoppingCart(courseId) {
  const index = courses.findIndex((course) => course.id == courseId);
  let existAlready = shoppingCartItems.findIndex(
    (course) => course.id == courseId
  );

  if (existAlready !== -1) {
    let searcString = `.modal #row${index + 1}`;
    let amount = document.querySelector(searcString);
    let nr = amount.lastElementChild.previousElementSibling.textContent;
    amount.lastElementChild.previousElementSibling.textContent = Number(nr) + 1;
    // console.log(amount.lastElementChild.previousElementSibling.textContent);
  } else {
    tableShoppingCartContent.insertAdjacentHTML(
      "beforeend",
      `
          <tr id="row${index + 1}">
            <td>${courses[index].id}</td>
            <td>${courses[index].title}</td>
            <td>${courses[index].price}</td>
            <td>1</td>
            <td><i class="far fa-trash-alt delete"></i></td>
          </tr>
        `
    );
  }

  shoppingCartItems.push(courses[index]);
  updateTotalPrice(true, index);
}

//#endregion ----------- Methods for shopping cart
//#region -------------- Methods for closing and opening shopping cart modal

closeButton.addEventListener("click", function () {
  ToggleModal();
});

openButton.addEventListener("click", function () {
  ToggleModal();
});

openPaymentButton.addEventListener("click", function () {
  ToggleModal();
  ToggleModalBuy();
});

window.onclick = function (event) {
  if (event.target === modalOverlay) {
    ToggleModal();
  }
  else if (event.target === modalOverlayBuy) {
    ToggleModalBuy();
  }
};

function ToggleModal() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}

//#endregion ----------- Methods for closing and shopping cart modal
//#region -------------- Methods for courses table

createAllTables();

function createAllTables() {
  getDataCourses();
}

function getDataCourses() {
  fetch("http://localhost:3000/kurser")
    .then((response) => response.json())
    .then((data) => createTableCourses(data));
}

let courses = [];

function createTableCourses(data) {
  courses = data;
  for (let course of data) {
    AddCoursesToPage(course);
  }
  addEventListenersToTableButton();
}

function addEventListenersToTableButton() {
  const tableRows = document.querySelectorAll(".table-courses-container .add");

  tableRows.forEach((item) => {
    const courseId = item.parentNode.firstElementChild.firstChild.nodeValue;
    item.addEventListener("click", () => {
      updateShoppingCartBarCounter(true);
      addCourseToShoppingCart(courseId);
      addEventListenerToNewItem();
    });
  });
}

function AddCoursesToPage(course) {
  tableCoursesContent.insertAdjacentHTML(
    "beforeend",
    `
        <tr>
          <td>${course.id}</td>
          <td>${course.title}</td>
          <td>${course.description}</td>
          <td>${course.category}</td>
          <td>${course.length}</td>
          <td>${course.type}</td>
          <td>${course.price}</td>
          <td class="cart-btn-table add">Lägg i kundvagn</td>
        </tr>
      `
  );
}

//#endregion ----------- Methods for shopping cart bar
//#region -------------- Shopping cart bar

let counter = 0;
function updateShoppingCartBarCounter(add) {
  if (add === true) counter += 1;
  else counter -= 1;
  shoppingCartItemsCtr.innerHTML = "";
  shoppingCartItemsCtr.insertAdjacentHTML(
    "beforeend",
    `
      ${counter}
    `
  );
}

//#endregion -------------Shopping cart bar
