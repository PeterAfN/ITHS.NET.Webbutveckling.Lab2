"use strict";

const tableShoppingCartContent = document.querySelector(
  "#shopping-cart-content"
);
const tableCoursesContent = document.querySelector("#table-courses-content");
const shoppingCartItemsCtr = document.querySelector(".items-cart-ctr");

const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");
const closeButton = document.querySelector("#close-button");
const openButton = document.querySelector("#open-button");

//-------------- methods for shopping cart --------------

function addEventListenerToNewItem() {
  const item = document.querySelectorAll(".modal .delete");
  const lastItem = item[item.length - 1];
  const id =
    lastItem.parentNode.parentNode.firstElementChild.firstChild.nodeValue;
    lastItem.addEventListener("click", () => {
    DeleteRow(id);
  });
}

function DeleteRow(trashcan) {
  let searcString = `.modal #row${trashcan}`;
  const selectedRow = document.querySelector(searcString);
  selectedRow.remove();
  updateShoppingCartBarCounter(false);
}

function addCourseToShoppingCart(courseId) {
  const index = courses.findIndex((course) => course.id == courseId);
  tableShoppingCartContent.insertAdjacentHTML(
    "beforeend",
    `
        <tr id="row${index + 1}">
          <td>${courses[index].id}</td>
          <td>${courses[index].title}</td>
          <td>${courses[index].price}</td>
          <td>0</td>
          <td><i class="far fa-trash-alt delete"></i></td>
        </tr>
      `
  );
}

//-------------- methods for closing and opening modal form --------------

closeButton.addEventListener("click", function () {
  ToggleModal();
});

openButton.addEventListener("click", function () {
  ToggleModal();
});

window.onclick = function (event) {
  if (event.target == modalOverlay) {
    ToggleModal();
  }
};

function ToggleModal() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}

//-------------- methods for courses table --------------

createAllTables();

function createAllTables() {
  getDataCourses();
}

function getDataCourses() {
  fetch("http://localhost:3000/kurser")
    .then((response) => response.json())
    .then((data) => createTableCourses(data));
}

var courses = [];

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

//-------------- methods for shopping cart bar--------------

let counter = 0;
function updateShoppingCartBarCounter(add) {
  if (add === true ) counter += 1;
  else counter -= 1;
  shoppingCartItemsCtr.innerHTML = "";
  shoppingCartItemsCtr.insertAdjacentHTML(
    "beforeend",
    `
      ${counter}
    `
  );
}
