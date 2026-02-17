// ✅ Task 4.1 – repeat(n, action)
// --------------------------------------------
// Task 4.1 - repeat(n, action)
// --------------------------------------------

function repeat(n, action) {

  if (typeof n !== "number" || n < 0) {
    return "Error: n must be a non-negative number.";
  }

  if (typeof action !== "function") {
    return "Error: action must be a function.";
  }

  for (let i = 0; i < n; i++) {
    action(i);
  }
}

/*
Explanation:
- The function takes a number `n` and a function `action`.
- It first validates that `n` is a non‑negative number and that `action` is a function.
- Then it runs a loop `n` times, calling `action` with the current index `i` on each iteration.
- This demonstrates a higher‑order function that accepts a callback.
*/

// Example
repeat(3, (index) => {
  console.log("Iteration:", index);
});


// ✅ Task 4.2 – filterArray(arr, condition)
// --------------------------------------------
// Task 4.2 - Custom Filter
// --------------------------------------------

function filterArray(arr, condition) {

  if (!Array.isArray(arr)) {
    return "Error: First argument must be an array.";
  }

  if (typeof condition !== "function") {
    return "Error: Condition must be a function.";
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (condition(arr[i], i)) {
      result.push(arr[i]);
    }
  }

  return result;
}

/*
Explanation:
- This function mimics the built‑in `Array.filter()` method.
- It checks that the first argument is an array and the second is a function.
- It iterates over the array, applying the `condition` function to each element (passing the element and its index).
- If `condition` returns a truthy value, the element is added to the `result` array.
- Finally, the new filtered array is returned.
*/

// Example
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = filterArray(numbers, (num) => num % 2 === 0);

console.log(evenNumbers); // [2, 4]


// ✅ Task 4.3 – multiplyBy(factor)
// --------------------------------------------
// Task 4.3 - Function Returning Function
// --------------------------------------------

function multiplyBy(factor) {

  if (typeof factor !== "number") {
    return "Error: Factor must be a number.";
  }

  return function (number) {
    if (typeof number !== "number") {
      return "Error: Input must be a number.";
    }
    return number * factor;
  };
}

/*
Explanation:
- This is a function that returns another function – a common pattern for creating customized functions.
- It first validates that the provided `factor` is a number.
- The returned function expects a `number` argument, validates it, and returns the product of that number and the original `factor`.
- This demonstrates closures: the inner function retains access to the `factor` variable even after `multiplyBy` has finished executing.
*/

// Example
const double = multiplyBy(2);
console.log(double(5)); // 10


// ✅ Task 4.4 – operate(a, b, operation)
// --------------------------------------------
// Task 4.4 - operate()
// --------------------------------------------

function operate(a, b, operation) {

  if (typeof operation !== "function") {
    return "Error: Operation must be a function.";
  }

  return operation(a, b);
}

/*
Explanation:
- This function accepts two values `a` and `b` and a function `operation`.
- It validates that `operation` is a function.
- It then calls `operation` with `a` and `b` as arguments and returns the result.
- This is a simple example of passing a function as an argument to control behavior.
*/

// Example
const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(operate(5, 3, add));       // 8
console.log(operate(5, 3, multiply));  // 15

// ✅ Task 4.5 – Custom forEach
// --------------------------------------------
// Task 4.5 - Custom forEach
// --------------------------------------------

function customForEach(arr, callback) {

  if (!Array.isArray(arr)) {
    return "Error: First argument must be an array.";
  }

  if (typeof callback !== "function") {
    return "Error: Callback must be a function.";
  }

  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

/*
Explanation:
- This function reimplements the basic behaviour of `Array.prototype.forEach`.
- It checks that the first argument is an array and the second is a function.
- It then loops through the array, calling the `callback` for each element and passing the element, its index, and the original array.
- The function does not return anything; it simply executes the callback for its side effects.
*/

// Example
customForEach([10, 20, 30], (value, index) => {
  console.log(`Index: ${index}, Value: ${value}`);
});