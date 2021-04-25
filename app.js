"use strict";

const tableShoppingCartContent = document.querySelector("#shopping-cart-content");

const tableCoursesContent = document.querySelector("#table-courses-content");
// const tableView = document.querySelector("#tableView");
const shoppingCartItemsCtr = document.querySelector(".items-cart-ctr");
const shoppingCartButton = document.querySelector(".shopping-cart-btn");
const modalDialog = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
// ****************************************************
let bodyElement = document.getElementsByTagName('body')[0];

function addCourseToShoppingCart(courseId) {
  const index = courses.findIndex(course => course.id == courseId);
  tableShoppingCartContent.insertAdjacentHTML(
    "beforeend",
    `
        <tr>
          <td>${courses[index].id}</td>
          <td>${courses[index].title}</td>
          <td>0</td>
          <td>Pris</td>
          <td></td>
        </tr>
      `
  );
  //   // console.log(rows);
  // const index = courses.findIndex(course => course.id == courseId);
  // // console.log(rows[index]);
  // // const course = rows.find(course => course.id == '4');
  // // console.log(course.title);
  // console.log(courses[index]);
}

function addEventListenersToTableButton() {
  const tableRows = document.querySelectorAll(".table-courses-container .add");

  tableRows.forEach((item) => {
    const courseId = item.parentNode.firstElementChild.firstChild.nodeValue;
    item.addEventListener("click", () => {
      updateShoppingCartBarCounter(courseId);
      addCourseToShoppingCart(courseId);
    });
  });
}

let counter = 0;

function updateShoppingCartBarCounter(course) {
  counter += 1;
  shoppingCartItemsCtr.innerHTML = "";
  shoppingCartItemsCtr.insertAdjacentHTML(
    "beforeend",
    `
      ${counter} ${course}
    `
  );
}

function hideModal() {
  // document.body.style.overflow = 'visible'; //unlock scrolling
  // modal.style.display = "none";
  modalDialog.classList.add('hidden');
  overlay.classList.add('hidden');
}

function showModal() {
  // document.body.style.overflow = 'hidden'; //lock scrolling
  // modal.style.display = "block";
  overlay.classList.remove('hidden');
  modalDialog.classList.remove('hidden');
}

shoppingCartButton.addEventListener("click", () => {
  showModal();
});

closeModal.addEventListener("click", hideModal);

overlay.addEventListener('click', hideModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (!modalDialog.classList.contains('hidden')) {
      quitModal();
    }
  }
});

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
          <td>${course.typ}</td>
          <td>${course.courseNumber}</td>
          <td class="cart-btn-table add">Lägg i kundvagn</td>
        </tr>
      `
  );
}