// Task 2.1
//  =============================================
// # Example 1: var Hoisting
//  =============================================

console.log(a); 
var a = 10;
console.log(a);

/*
Explanation:
- The variable declared with `var` is hoisted to the top of its scope.
- During the creation phase, `var a` is hoisted and automatically initialized with `undefined`.
- Therefore, accessing `a` before the assignment line logs `undefined`, not an error.
- After the assignment `a = 10`, logging `a` shows `10`.
- This demonstrates that `var` hoisting includes initialization with `undefined`.
*/


//  =============================================
// # Example 2: let and Temporal Dead Zone (TDZ)
//  =============================================

console.log(b);
let b = 20;

console.log(b);

/*
Explanation:
- Variables declared with `let` are also hoisted, but they are not initialized.
- They remain in a Temporal Dead Zone (TDZ) from the start of the block until the declaration is encountered.
- Any attempt to access the variable during the TDZ results in a `ReferenceError`.
- After the declaration line, the variable is initialized and can be used normally.
- In this example, the first `console.log(b)` throws an error, so the rest of the code does not execute.
*/


// ===========================================================================================


// Task 2.2
// --------------------------------------------
// # Demonstrating var vs let vs const in loops
// --------------------------------------------

function loopDemo() {
  console.log("Using var:");

  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log("var i:", i);
    }, 1000);
  }

  // ------------------------------------------

  console.log("Using let:");

  for (let j = 0; j < 3; j++) {
    setTimeout(() => {
      console.log("let j:", j);
    }, 1000);
  }

  // ------------------------------------------

  console.log("Using const:");

  // const cannot be used directly in a traditional for loop like this:
  // for (const k = 0; k < 3; k++)
  // Because const variables cannot be reassigned.

  for (let x = 0; x < 3; x++) {
    const k = x; // const inside block scope
    setTimeout(() => {
      console.log("const k:", k);
    }, 1000);
  }
}

loopDemo();

/* Expected Output (after 1 second)
    Using var:
    Using let:
    Using const:
    var i: 3
    var i: 3
    var i: 3
    let j: 0
    let j: 1
    let j: 2
    const k: 0
    const k: 1
    const k: 2 
 */

/*
Explanation:
- This example shows how `var`, `let`, and `const` behave differently inside loops with asynchronous code.
- With `var`: The variable `i` has function scope (or global scope). The loop completes and `i` becomes 3 before any `setTimeout` callback runs. All callbacks share the same `i` and log `3`.
- With `let`: `let` creates a new binding for each iteration. Each `setTimeout` callback captures the value of `j` at that specific iteration, so they log `0, 1, 2`.
- With `const`: A `const` variable cannot be reassigned, so it cannot be used as the loop counter. Instead, we use a `let` loop variable and create a new `const` inside each iteration. The `const` also has block scope, so each callback captures its own `k` value, producing `0, 1, 2`.
- The order of output: The three `console.log` statements inside `loopDemo` run synchronously first, printing the labels. After about 1 second, all timeout callbacks execute, showing the values.
*/

