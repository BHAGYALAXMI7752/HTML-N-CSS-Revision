
// Task 2.3
// ======================================
// Demonstrating Temporal Dead Zone (TDZ)
// ======================================

function demonstrateTDZ() {

  // TDZ with let
  try {
    console.log(a);
    // ReferenceError
    // 'a' is hoisted but NOT initialized.
    // It exists in memory but is inside the Temporal Dead Zone.
  } catch (error) {
    console.log("Error with let:", error.message);
  }

  let a = 10;

  console.log("Value of a after declaration:", a);
  // Works fine because now it is initialized


  // --------------------------------------------

  // TDZ with const
  try {
    console.log(b);
    // ReferenceError
    // 'b' is also hoisted but not initialized.
    // Accessing before declaration throws error.
  } catch (error) {
    console.log("Error with const:", error.message);
  }

  const b = 20;

  console.log("Value of b after declaration:", b);
  // Works fine after initialization
}

demonstrateTDZ();

/* Expected Output
    Error with let: Cannot access 'a' before initialization
    Value of a after declaration: 10
    Error with const: Cannot access 'b' before initialization
    Value of b after declaration: 20
*/

/*
Explanation:
- This function illustrates the Temporal Dead Zone (TDZ) for both `let` and `const`.
- For `let a`: The variable is hoisted but uninitialized. Trying to log `a` before its declaration throws a `ReferenceError`, which is caught and logged.
- After `let a = 10;`, the TDZ ends and `a` can be accessed normally.
- The same happens with `const b`: accessing it before the declaration results in a `ReferenceError`.
- After the `const` declaration, `b` is initialized and can be used.
- The TDZ ensures that variables are not accessed before their declaration, preventing bugs caused by undefined values.
*/