// ✅ Task 5.1 – processArray(arr, callback)
// --------------------------------------------
// Task 5.1 - processArray
// --------------------------------------------

function processArray(arr, callback) {

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
- The function iterates over an array and invokes a callback for each element.
- It first validates that the first argument is an array and the second is a function.
- For each element, the callback receives the current value, its index, and the original array.
- This is similar to the native `forEach` method, allowing custom processing of array items.
*/

// Example
processArray([1, 2, 3], (value) => {
  console.log("Processed:", value * 2);
});

// ✅ Task 5.2 – Calculator with Operation Callback
// --------------------------------------------
// Task 5.2 - Calculator with Callback
// --------------------------------------------

function calculator(a, b, operationCallback) {

  if (typeof operationCallback !== "function") {
    return "Error: Operation must be a function.";
  }

  return operationCallback(a, b);
}

/*
Explanation:
- This function accepts two numbers and a callback that defines an operation.
- It validates that the callback is a function.
- The callback is invoked with `a` and `b`, and its return value is passed back.
- This demonstrates passing behavior (addition, division, etc.) as a function argument.
*/

// Example
const add = (x, y) => x + y;
const divide = (x, y) => y === 0 ? "Cannot divide by zero" : x / y;

console.log(calculator(10, 5, add));     // 15
console.log(calculator(10, 0, divide));  // Cannot divide by zero

// ✅ Task 5.3 – Simulate Async fetchData
// --------------------------------------------
// Task 5.3 - Simulating Async API Call
// --------------------------------------------

function fetchData(callback) {

  if (typeof callback !== "function") {
    return "Error: Callback must be a function.";
  }

  console.log("Fetching data...");

  setTimeout(() => {
    const data = { id: 1, name: "bhagya" };
    callback(data);
  }, 2000);
}

/*
Explanation:
- This function simulates an asynchronous API request using `setTimeout`.
- It first checks that the provided callback is a function.
- After a 2‑second delay, it creates a data object and passes it to the callback.
- This pattern is common in older JavaScript code to handle asynchronous results.
*/

// Example
fetchData((data) => {
  console.log("Data received:", data);
});

// ✅ Task 5.4 – downloadFile (Success / Error Callback)
// --------------------------------------------
// Task 5.4 - downloadFile Simulation
// --------------------------------------------

function downloadFile(filename, onSuccess, onError) {

  if (typeof onSuccess !== "function" || typeof onError !== "function") {
    return "Error: Success and Error handlers must be functions.";
  }

  console.log(`Downloading ${filename}...`);

  setTimeout(() => {

    const isSuccessful = Math.random() > 0.5;

    if (isSuccessful) {
      onSuccess(`File "${filename}" downloaded successfully.`);
    } else {
      onError(`Failed to download "${filename}".`);
    }

  }, 1500);
}

/*
Explanation:
- This function simulates a file download with a random outcome.
- It accepts a filename, a success callback, and an error callback.
- After validating that both callbacks are functions, it logs a download message.
- After a 1.5‑second delay, it randomly decides success or failure and calls the corresponding callback.
- This illustrates the error‑first callback pattern often used in Node.js.
*/

// Example
downloadFile(
  "report.pdf",
  (message) => console.log("Success:", message),
  (error) => console.log("Error:", error)
);

// ✅ Task 5.5 – Custom sort with Comparison Callback
// --------------------------------------------
// Task 5.5 - Custom Sort Function
// --------------------------------------------

function customSort(arr, compareFn) {

  if (!Array.isArray(arr)) {
    return "Error: First argument must be an array.";
  }

  if (typeof compareFn !== "function") {
    return "Error: Comparison function required.";
  }

  // Simple Bubble Sort for demonstration
  const newArr = [...arr];

  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr.length - 1; j++) {
      if (compareFn(newArr[j], newArr[j + 1]) > 0) {
        [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
      }
    }
  }

  return newArr;
}

/*
Explanation:
- This function implements a custom sorting algorithm (bubble sort) that uses a comparison callback.
- It validates that the first argument is an array and the second is a function.
- A shallow copy of the array is created to avoid mutating the original.
- The nested loops perform a bubble sort, using the compare function to determine order.
- The compare function should return a positive number if the first argument should come after the second, similar to the native `sort` method.
*/

// Example
const numbers = [5, 2, 8, 1];

const ascending = customSort(numbers, (a, b) => a - b);
const descending = customSort(numbers, (a, b) => b - a);

console.log("Ascending:", ascending);
console.log("Descending:", descending);