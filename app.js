"use strict";

let buy = new Buy();
let add = new Add();
let courses = new Courses();
let shoppingCart = new ShoppingCart();
let shoppingCartBar = new ShoppingCartBar(0);

let shoppingCartItems = [];
let data = [];

const baseUrl = "http://localhost:3000/kurser/";
const tableShoppingCart = document.querySelector("#shopping-cart-content");
const tableCoursesContent = document.querySelector("#table-courses-content");
const shoppingCartItemsCtr = document.querySelector(".items-cart-ctr");
const modal = document.querySelector("#modal");
const modalBuy = document.querySelector(".modal-buy");
const modalAdd = document.querySelector(".modal-add");
const modalOverlay = document.querySelector("#modal-overlay");
const modalOverlayBuy = document.querySelector(".modal-overlay-buy");
const modalOverlayAdd = document.querySelector(".modal-overlay-add");
const closeButton = document.querySelector("#close-button");
const closeButtonBuy = document.querySelector("#close-button-buy");
const closeButtonAdd = document.querySelector("#close-button-add");
const openButton = document.querySelector("#open-button");
const openPaymentButton = document.querySelector(".to-payment");
const addButton = document.querySelector("#add-button");
const saveButton = document.querySelector("#save");
const cancelButton = document.querySelector("#cancel");
const idInput = document.querySelector('#id');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category');
const lengthInput = document.querySelector('#length');
const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');

//----------------------------------------

closeButtonBuy.addEventListener("click", function () {
  buy.toggle();
});


//----------------------------------------



closeButton.addEventListener("click", function () {
  shoppingCart.toggle();
});

openButton.addEventListener("click", function () {
  shoppingCart.toggle();
});

openPaymentButton.addEventListener("click", function () {
  shoppingCart.toggle();
  buy.toggle();
});

window.onclick = function (event) {
  if (event.target === modalOverlay) {
    shoppingCart.toggle();
  } else if (event.target === modalOverlayBuy) {
    buy.toggle();
  } else if (event.target === modalOverlayAdd) {
    add.toggle();
  }
};

//----------------------------------------


addButton.addEventListener("click", function () {
  add.toggle();
});

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  add.save()
    .then()
    .catch((err) => console.log(err));
  add.toggle();
});

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  add.toggle();
});

closeButtonAdd.addEventListener("click", function () {
  add.toggle();
});




