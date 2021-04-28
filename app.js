"use strict";

let buy = new Buy();
let add = new Add("http://localhost:3000/kurser/");
let courses = new Courses();
let shoppingCart = new ShoppingCart();
let shoppingCartBar = new ShoppingCartBar(0);

let shoppingCartItems = [];
let data = [];

const tableShoppingCart = document.querySelector("#shopping-cart-content");
const tableCoursesContent = document.querySelector("#table-courses-content");
const shoppingCartItemsCtr = document.querySelector(".items-cart-ctr");
const modal = document.querySelector("#modal");
const modalBuy = document.querySelector(".modal-buy");
const modalAdd = document.querySelector(".modal-add");
const modalOverlay = document.querySelector("#modal-overlay");
const modalOverlayBuy = document.querySelector(".modal-overlay-buy");
const modalOverlayAdd = document.querySelector(".modal-overlay-add");



//shopping cart bar
const openButton = document.querySelector("#open-button");

//shopping cart
const openPaymentButton = document.querySelector(".to-payment");



//shopping cart bar
openButton.addEventListener("click", function () {
  shoppingCart.toggle();
});



//shopping cart
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

