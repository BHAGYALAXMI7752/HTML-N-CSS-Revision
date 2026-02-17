// ✅ Task 3.1 – Calculator Function
// --------------------------------------------
// Task 3.1 - Calculator Function
// --------------------------------------------


function calculator(num1 = 0, num2 = 0, operation = "add") {
  
  // Input validation - Check if inputs are numbers
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return "Error: Both inputs must be valid numbers.";
  }

  // Perform operation
  switch (operation.toLowerCase()) {
    
    case "add":
      return num1 + num2;

    case "subtract":
      return num1 - num2;

    case "multiply":
      return num1 * num2;

    case "divide":
      if (num2 === 0) {
        return "Error: Cannot divide by zero.";
      }
      return num1 / num2;

    default:
      return "Error: Invalid operation. Use add, subtract, multiply, or divide.";
  }
}

/*
Explanation:
- The function uses default parameters to handle missing arguments gracefully.
- It first validates that both inputs are numbers; otherwise returns an error message.
- A switch statement determines which arithmetic operation to perform.
- Division includes a check for division by zero.
- `operation.toLowerCase()` ensures case‑insensitivity.
*/

// --------------------------------------------
// Example Test Cases
// --------------------------------------------

console.log(calculator(10, 5, "add"));       // 15
console.log(calculator(10, 5, "subtract"));  // 5
console.log(calculator(10, 5, "multiply"));  // 50
console.log(calculator(10, 5, "divide"));    // 2
console.log(calculator(10, 0, "divide"));    // Error: Cannot divide by zero
console.log(calculator(10, 5, "mod"));       // Error: Invalid operation
console.log(calculator());                   // 0 (default parameters)

// =====================================================================================
// ✅ Task 3.2 – Arrow Function with Rest Parameters
// --------------------------------------------
// Task 3.2 - Arrow Function with Rest Parameters
// --------------------------------------------


const sumNumbers = (...numbers) => {

  // Edge Case 1: No arguments passed
  if (numbers.length === 0) {
    return "Error: Please provide at least one number.";
  }

  // Validate all inputs are numbers
  const areAllNumbers = numbers.every(num => typeof num === "number");

  if (!areAllNumbers) {
    return "Error: All inputs must be valid numbers.";
  }

  // Calculate sum using reduce()
  const total = numbers.reduce((acc, curr) => acc + curr, 0);

  return total;
};

/*
Explanation:
- The rest parameter `...numbers` collects all passed arguments into an array.
- The arrow function provides a concise syntax.
- It first checks if any arguments were given; if not, returns an error.
- Then it validates that every argument is a number using `every()`.
- Finally, it computes the sum with `reduce()`.
*/

// --------------------------------------------
// Example Test Cases
// --------------------------------------------

console.log(sumNumbers(1, 2, 3, 4));     // 10
console.log(sumNumbers(10, 20));         // 30
console.log(sumNumbers(5));              // 5
console.log(sumNumbers());               // Error: Please provide at least one number
console.log(sumNumbers(1, "2", 3));      // Error: All inputs must be valid numbers

// ======================================================================================
// ✅ Task 3.3 – IIFE with Private Variables (Closure Concept)
// --------------------------------------------
// Task 3.3 - IIFE with Private Variables
// --------------------------------------------


const counterModule = (function () {

  // Private variable
  let count = 0;

  // Returning public methods
  return {

    increment: function () {
      count++;
      return count;
    },

    decrement: function () {
      count--;
      return count;
    },

    getCount: function () {
      return count;
    }

  };

})(); // Immediately Invoked Function Expression

/*
Explanation:
- An IIFE (Immediately Invoked Function Expression) creates a new lexical scope that runs immediately.
- Inside, a variable `count` is declared with `let` – it is not accessible from the outside.
- The IIFE returns an object containing three methods that form a closure over `count`.
- These methods can access and modify `count`, but direct access (e.g., `counterModule.count`) is impossible.
*/

// --------------------------------------------
// Usage
// --------------------------------------------

console.log(counterModule.getCount());  // 0
console.log(counterModule.increment()); // 1
console.log(counterModule.increment()); // 2
console.log(counterModule.decrement()); // 1


// Trying to access private variable directly
console.log(counterModule.count); 
// undefined (because count is private)


// ======================================================================================
// ✅ Task 3.4 – Function Declaration vs Function Expression Hoisting
// --------------------------------------------
// Task 3.4 - Function Hoisting Demo
// --------------------------------------------


// 1. Function Declaration Hoisting

console.log("Calling function declaration before definition:");
greetDeclaration();  // Works

function greetDeclaration() {
  console.log("Hello from Function Declaration");
}

/*
Explanation:
Function declarations are fully hoisted.
During the creation phase, the entire function (name and body) is moved to the top of its scope.
Therefore, it can be called before its appearance in the code.
*/


// --------------------------------------------


// 2. Function Expression Hoisting

console.log("Calling function expression before definition:");

try {
  greetExpression(); // Error
} catch (error) {
  console.log("Error:", error.message);
}

var greetExpression = function () {
  console.log("Hello from Function Expression");
};

/*
Explanation:
Only the variable declaration (`var greetExpression`) is hoisted.
It is initialized with `undefined`. The function itself is assigned later.
Calling `greetExpression()` before the assignment tries to execute `undefined` as a function, resulting in a TypeError.
*/


// --------------------------------------------


// 3. Arrow Function Hoisting

console.log("Calling arrow function before definition:");

try {
  greetArrow(); // Error
} catch (error) {
  console.log("Error:", error.message);
}

const greetArrow = () => {
  console.log("Hello from Arrow Function");
};

/*
Explanation:
Arrow functions behave like function expressions: they are not hoisted.
Additionally, because `greetArrow` is declared with `const`, it is hoisted but remains in the Temporal Dead Zone (TDZ) from the start of the block until the declaration is evaluated.
Accessing it before that point throws a ReferenceError.
*/
