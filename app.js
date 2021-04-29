"use strict";

let buy = new Buy();
let add = new Add("http://localhost:3000/kurser/");
let courses = new Courses();
let shoppingCart = new ShoppingCart();
let shoppingCartBar = new ShoppingCartBar(0);

let shoppingCartItems = [];
let data = [];

const modalOverlayShoppingCart = document.querySelector("#modal-overlay");
const modalOverlayBuy = document.querySelector(".modal-overlay-buy");
const modalOverlayAdd = document.querySelector(".modal-overlay-add");

document.addEventListener("click", (e) => {
  CloseCorrectOverlay(e);
});

function CloseCorrectOverlay (event) {
  if (event.target === modalOverlayShoppingCart) {
    shoppingCart.toggle();
  } else if (event.target === modalOverlayBuy) {
    buy.toggle();
  } else if (event.target === modalOverlayAdd) {
    add.toggle();
  }
}
