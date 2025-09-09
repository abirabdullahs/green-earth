# Green Earth 🌍

This document explains some of the most important ES6 concepts in JavaScript with simple explanations and examples.  

---

## 1. Difference between `var`, `let`, and `const`

- **`var`**
  - Function-scoped (or globally scoped if declared outside a function).
  - Can be re-declared and updated.
  - Hoisted (moved to the top of the scope) but initialized as `undefined`.
  - Often leads to bugs because of its weird scoping.

- **`let`**
  - Block-scoped (only lives inside `{ }`).
  - Can be updated, but **cannot** be re-declared in the same scope.
  - Not hoisted in the same way as `var`, so safer.

- **`const`**
  - Block-scoped, just like `let`.
  - Cannot be re-assigned (but if it’s an object/array, its contents can still change).
  - Used when the value should stay constant.

---

## 2. Difference between `map()`, `forEach()`, and `filter()`

- **`forEach()`**
  - Loops through an array and runs a function for each element.
  - Does **not** return a new array.
  - Mostly used for side effects (like logging, updating DOM, etc.).

- **`map()`**
  - Loops through an array and applies a function to each element.
  - Returns a **new array** with transformed values.
  - Perfect for when you want to "transform" data.

- **`filter()`**
  - Loops through an array and applies a condition.
  - Returns a **new array** with only the elements that passed the condition.
  - Great for selecting a subset of data.

---

## 3. Arrow Functions in ES6

Arrow functions, introduced in ES6, are a shorter and cleaner way to write functions in JavaScript. Unlike regular functions, they use the `=>` syntax, which reduces the need for the `function` keyword and allows for more concise code. A key feature is that they don’t create their own `this` context but instead inherit it from the surrounding scope, making them especially useful in callbacks and asynchronous operations. Arrow functions also support implicit return when the function body contains a single expression, eliminating the need for the `return` keyword. However, they cannot be used as constructors and are not suitable when you need the function to have its own `this` (such as in object methods). Overall, arrow functions are best for short, simple functions, array operations, and cases where maintaining the lexical `this` is important.  



// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

console.log(add(5, 3));       // 8
console.log(addArrow(5, 3));  // 8


## 4. Destructuring Assignment in ES6
Destructuring assignment in ES6 allows to directly extract values from arrays or objects into variables, making code cleaner and more readable. It is especially useful when working with API responses, because instead of repeatedly accessing nested properties, you can unpack them in a single line.

Example with API 

// Fetching data from API and using destructuring
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(({ name, email, address: { city, zipcode } }) => {
    console.log(name);     // e.g., "Leanne Graham"
    console.log(email);    // e.g., "Sincere@april.biz"
    console.log(city);     // e.g., "Gwenborough"
    console.log(zipcode);  // e.g., "92998-3874"
  });

## 5. Template Literals in ES6
Template literals, introduced in ES6, are a modern way to handle strings in JavaScript using backticks ("`") instead of single or double quotes. They make string creation easier, cleaner, and more readable by supporting variable interpolation, expressions, and multi-line text without extra syntax.

The most powerful feature is the ${...} placeholder, which allows you to directly embed variables or even execute expressions inside a string.

Example
const name = "Abir";
const age = 18;
console.log(`My name is ${name} and I am ${age} years old.`);


They also support multi-line strings naturally:
const message = `This is line one
and this is line two.`;
console.log(message);
To highlight the difference:

Using concatenation
const user = "Abir";
const msg = "Hello, " + user + "! Welcome.";


Using template literals
const user = "Abir";
const msg = `Hello, ${user}! Welcome.`;

Real Example with API Response
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(({ name, email, address: { city } }) => {
    console.log(`User ${name} lives in ${city} and can be reached at ${email}.`);
  });


