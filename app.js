"use strict";

const coursesTableContent = document.querySelector("#courses-table-content");
const tableView = document.querySelector("#tableView");
const shoppingCartItemsCtr = document.querySelector(".items-cart-ctr");

CreateAllTables(); 

function CreateAllTables() {
  getDataCourses();
}

function getDataCourses() {
  fetch("http://localhost:3000/kurser")
    .then((response) => response.json())
    .then((data) => createTableCourses(data));
}

function createTableCourses(courses) {
  for (let course of courses) {
    createRowCourses(course);
  }
  addEventListenersToCartButton();
}

function createRowCourses(course) {
  coursesTableContent.insertAdjacentHTML(
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

// *************************new*******************************************


function addEventListenersToCartButton() {
  const tableRows = document.querySelectorAll('.table-container .add');

  tableRows.forEach(item => {
    const courseId = item.parentNode.firstElementChild.firstChild.nodeValue;
    item.addEventListener('click', () => {
      addCourseToShoppingCart(courseId);
    });
  });
}

let counter = 0;

function addCourseToShoppingCart(course) {
  counter += 1;
  shoppingCartItemsCtr.innerHTML = '';
  shoppingCartItemsCtr.insertAdjacentHTML(
    "beforeend",
    `
      ${counter} ${course}
    `
  );
}