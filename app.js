"use strict";

const tableShoppingCartContent = document.querySelector(
  "#shopping-cart-content"
);
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

//#region -------------- Add course Modal - Opening and Closing

addButton.addEventListener("click", function () {
  ToggleModalAdd();
});

saveButton.addEventListener("click", function () {
  ToggleModalAdd();
});

cancelButton.addEventListener("click", function () {
  ToggleModalAdd();
});

closeButtonAdd.addEventListener("click", function () {
  ToggleModalAdd();
});

function ToggleModalAdd() {
  modalAdd.classList.toggle("closed-add");
  modalOverlayAdd.classList.toggle("close-overlay-add");
}

//#endregion -------------- Add course Modal - Opening and Closing

//#region -------------- Add course Modal

// async function AddVehicle() {
//   const vehicle = {
//     registrationNumber: regNoInput.value,
//     make: makeInput.value,
//     model: modelInput.value,
//     modelYear: modelYearInput.value,
//     mileage: mileageInput.value,
//     value: valueInput.value,
//   };

//   const response = await fetch(`${baseUrl}`, {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(vehicle)
//   });

//   if(!response.ok) throw new Error(response.statusText);

//   return response.json();
// };


// addNewButton.addEventListener('click', (e) => {
//   e.preventDefault();

//   addVehicleView.classList.remove('hidden');
//   overlay.classList.remove('hidden');
//   modalDialog.classList.remove('hidden');
// });

// saveButton.addEventListener('click', (e) => {
//   e.preventDefault();
//   AddVehicle()
//     .then(data => {

//       //TODO: Flytta till en egen funktion...
//       addVehicleView.classList.add('hidden');
//       tableView.classList.remove('hidden');
//       modalDialog.classList.add('hidden');
//       overlay.classList.add('hidden');
//       regNoInput.value = '';
//       makeInput.value = '';
//       modelInput.value = '';
//       modelYearInput.value = '';
//       mileageInput.value = '';
//       valueInput.value = '';
//       loadVehicles()
//       // .then(data => createTable(data));
//     })
//     .catch(err => console.log(err));
// });

//#endregion -------------- Add course Modal

//#region -------------- Buy confirmation Modal

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
//#endregion -------------- Buy confirmation Modal

//#region -------------- Shopping Cart Modal

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

//#endregion ----------- Shopping Cart Modal

//#region -------------- Shopping Cart Modal - Opening and Closing

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
  } else if (event.target === modalOverlayBuy) {
    ToggleModalBuy();
  } else if (event.target === modalOverlayAdd) {
    ToggleModalAdd();
  }
};

function ToggleModal() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}

//#endregion ----------- Shopping Cart Modal - Opening and Closing

//#region -------------- Courses

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

//#endregion ----------- Courses

//#region -------------- Shopping Cart bar

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

//#endregion ------------- Shopping Cart bar
