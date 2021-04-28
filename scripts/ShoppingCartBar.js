class ShoppingCartBar {

  constructor(counter) {
    this.counter = counter;
  }


  updateCounter(add) {
    if (add === true) this.counter += 1;
    else this.counter -= 1;
    shoppingCartItemsCtr.innerHTML = "";
    shoppingCartItemsCtr.insertAdjacentHTML(
      "beforeend",
      `
        ${this.counter}
      `
    );
  }
}

/*

class MyClass {
    // class methods
    constructor() { ... }
    method1() { ... }
    method2() { ... }
    method3() { ... }
    ...
  }

  */

//-------------------------------------

/*
  class User {

    constructor(name) {
      this.name = name;
    }

    sayHi() {
      alert(this.name);
    }

  }

  // Usage:
  let user = new User("John");
  user.sayHi();
*/

//-------------------------------------

/*
  class User {

    constructor(name) {
      // invokes the setter
      this.name = name;
    }

    get name() {
      return this._name;
    }

    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }

  }

  let user = new User("John");
  alert(user.name); // John

  user = new User(""); // Name is too short.
  */

//-------------------------------------

/*

    class User {
  name = "John";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!

*/

//-------------------------------------

/*

class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined

*/

//-------------------------------------

/*

class Button {
  constructor(value) {
    this.value = value;
    }
  click = () => {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello

*/

//-------------------------------------

/*

class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}

*/

//-------------------------------------

/*

class Car {
    constructor(name, year) {
      this.name = name;
      this.year = year;
    }
  }

  myCar = new Car("Ford", 2014);
  document.getElementById("demo").innerHTML =
  myCar.name + " " + myCar.year;

  */

//-------------------------------------

/*

class Car {
constructor(name, year) {
  this.name = name;
  this.year = year;
}
age() {
  let date = new Date();
  return date.getFullYear() - this.year;
}
}

let myCar = new Car("Ford", 2014);
document.getElementById("demo").innerHTML =
"My car is " + myCar.age() + " years old.";

*/

//-------------------------------------

/*

class Car {
constructor(name, year) {
  this.name = name;
  this.year = year;
}
age(x) {
  return x - this.year;
}
}

let date = new Date();
let year = date.getFullYear();

let myCar = new Car("Ford", 2014);
document.getElementById("demo").innerHTML=
"My car is " + myCar.age(year) + " years old.";

*/

//-------------------------------------

/*

class Car {
constructor(name, year) {
  this.name = name;
  this.year = year;
}
age() {
  // date = new Date();  // This will not work
  let date = new Date(); // This will work
  return date.getFullYear() - this.year;
}
}

*/

//-------------------------------------

/*

class Car {
constructor(brand) {
  this.carname = brand;
}
present() {
  return 'I have a ' + this.carname;
}
}

class Model extends Car {
constructor(brand, mod) {
  super(brand);
  this.model = mod;
}
show() {
  return this.present() + ', it is a ' + this.model;
}
}

let myCar = new Model("Ford", "Mustang");
document.getElementById("demo").innerHTML = myCar.show();

*/

//-------------------------------------

/*

class Car {
constructor(brand) {
  this._carname = brand;
}
get carname() {
  return this._carname;
}
set carname(x) {
  this._carname = x;
}
}

let myCar = new Car("Ford");

document.getElementById("demo").innerHTML = myCar.carname;

*/

//-------------------------------------

/*

constructor(brand) {
  this._carname = brand;
}
get carname() {
  return this._carname;
}
set carname(x) {
  this._carname = x;
}
}

let myCar = new Car("Ford");
myCar.carname = "Volvo";
document.getElementById("demo").innerHTML = myCar.carname;

*/

//-------------------------------------

/*

//You cannot use the class yet.
//myCar = new Car("Ford")
//This would raise an error.

class Car {
constructor(brand) {
  this.carname = brand;
}
}

//Now you can use the class:
let myCar = new Car("Ford")

*/

//-------------------------------------

/*

class Car {
constructor(name) {
  this.name = name;
}
static hello() {
  return "Hello!!";
}
}

let myCar = new Car("Ford");

// You can calll 'hello()' on the Car Class:
document.getElementById("demo").innerHTML = Car.hello();

// But NOT on a Car Object:
// document.getElementById("demo").innerHTML = myCar.hello();
// this will raise an error.

*/

//-------------------------------------

/*

class Car {
constructor(name) {
  this.name = name;
}
static hello(x) {
  return "Hello " + x.name;
}
}
let myCar = new Car("Ford");
document.getElementById("demo").innerHTML = Car.hello(myCar);

*/

//-------------------------------------

/*

// unnamed
let Rectangle = class {
constructor(height, width) {
  this.height = height;
  this.width = width;
}
};
console.log(Rectangle.name);
// output: "Rectangle"

// named
let Rectangle = class Rectangle2 {
constructor(height, width) {
  this.height = height;
  this.width = width;
}
};
console.log(Rectangle.name);
// output: "Rectangle2"

*/

//-------------------------------------

/*

class Rectangle {
constructor(height, width) {
  this.height = height;
  this.width = width;
}
// Getter
get area() {
  return this.calcArea();
}
// Method
calcArea() {
  return this.height * this.width;
}
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100

*/

//-------------------------------------

/*

class Rectangle {
constructor(height, width) {
  this.height = height;
  this.width = width;
}
// Getter
get area() {
  return this.calcArea();
}
// Method
calcArea() {
  return this.height * this.width;
}
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100

  */

//-------------------------------------

/*

class Animal {
speak() {
  return this;
}
static eat() {
  return this;
}
}

let obj = new Animal();
obj.speak(); // the Animal object
let speak = obj.speak;
speak(); // undefined

Animal.eat() // class Animal
let eat = Animal.eat;
eat(); // undefined

  */

//-------------------------------------

/*

class Cat {
constructor(name) {
  this.name = name;
}

speak() {
  console.log(`${this.name} makes a noise.`);
}
}

class Lion extends Cat {
speak() {
  super.speak();
  console.log(`${this.name} roars.`);
}
}

let l = new Lion('Fuzzy');
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.

  */

//-------------------------------------
