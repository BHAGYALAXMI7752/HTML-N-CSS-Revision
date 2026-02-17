### Section A.3: JavaScript Introduction & V8 Engine

## 🧠 JavaScript: Single‑Threaded & Interpreted

- **Single‑threaded** – JavaScript has one call stack and executes one command at a time (in the main thread).
- **Interpreted** – Originally, JS was purely interpreted, but modern engines use **Just‑In‑Time (JIT) compilation** for performance.
- The combination of a single thread and asynchronous handling (via the event loop) allows non‑blocking I/O.

---

## ⚙️ V8 Engine Architecture

V8 is Google’s open‑source JavaScript engine (used in Chrome, Node.js, etc.). It compiles JS to machine code.

### Pipeline Overview
```
Source Code → Parser → AST → Ignition (Interpreter) → Bytecode → TurboFan (Optimizing Compiler) → Optimized Machine Code
```

- **Parser** – Reads the source code and checks for syntax errors. Produces an **Abstract Syntax Tree (AST)**.
- **AST** – A tree representation of the code’s structure. Used by the interpreter and compiler.
- **Ignition (Interpreter)** – Generates bytecode from the AST and executes it. Bytecode is platform‑independent and faster to generate than full machine code.
- **TurboFan (Optimizing Compiler)** – While the code runs, V8 profiles it (collects type feedback). Hot functions are re‑compiled by TurboFan into highly optimized machine code.
- If assumptions (like types) change, TurboFan can **deoptimize** and fall back to Ignition bytecode.

---

## 🔄 Just‑In‑Time (JIT) Compilation

JIT compilation combines interpretation and compilation to get both fast startup and good performance.

1. **Start fast** – Ignition quickly generates and runs bytecode.
2. **Profile** – While running, V8 tracks which functions are used often and what types flow through them.
3. **Optimize hot code** – TurboFan compiles frequently executed (“hot”) functions to machine code, using type feedback for aggressive optimizations.
4. **Deoptimize if needed** – If an assumption (e.g., a variable always being a number) breaks, the engine falls back to bytecode and may re‑optimize later.

This approach makes JavaScript much faster than pure interpretation.

---

## 🗃️ Memory Heap and Call Stack

### Call Stack
- **What it is** – A data structure that records where in the program we are (function calls).
- **How it works** – When a function is called, a new frame is pushed onto the stack. When it returns, the frame is popped.
- **Single‑threaded** – Only one stack, so only one thing happens at a time.
- **Stack overflow** – Happens when too many frames are pushed (e.g., infinite recursion).

Example:
```js
function first() { second(); }
function second() { third(); }
function third() { console.trace(); }
first(); // Stack: first → second → third
```

### Memory Heap
- **What it is** – A large (mostly unstructured) region of memory where objects, arrays, and functions are allocated.
- **Garbage Collection** – The engine automatically frees memory that is no longer reachable (using algorithms like mark‑and‑sweep).

---

## 🔁 Event Loop and Asynchronous Execution

JavaScript’s concurrency model is based on an **event loop**, which enables non‑blocking asynchronous operations despite being single‑threaded.

### Key Components
- **Call Stack** – Executes synchronous code.
- **Web APIs / C++ APIs** – Provided by the browser (or Node.js) for async tasks (e.g., `setTimeout`, `fetch`, DOM events).
- **Callback Queue (Task Queue)** – Holds callbacks from async operations that are ready to be executed.
- **Microtask Queue** – A separate queue for promises (`then/catch/finally`) and `queueMicrotask`. Microtasks have higher priority than regular tasks.
- **Event Loop** – Constantly checks if the call stack is empty. If empty, it first processes all microtasks, then takes the next task from the callback queue and pushes it onto the stack.

### Visual Flow
```
   ┌─────────────────────────┐
   │      Call Stack         │
   └──────────▲──────────────┘
              │ empty?
   ┌──────────┴──────────────┐
   │       Event Loop         │
   └──────────┬──────────────┘
   ┌──────────▼──────────────┐
   │   Microtask Queue       │ (Promises, etc.)
   └──────────┬──────────────┘
   ┌──────────▼──────────────┐
   │   Callback Queue        │ (setTimeout, I/O, etc.)
   └─────────────────────────┘
```

### Example: `setTimeout`
```js
console.log('Start');

setTimeout(() => {
    console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise');
});

console.log('End');
```
Output order:
```
Start
End
Promise   (microtask runs before the task)
Timeout   (task from callback queue)
```

**Why?**  
1. Synchronous code runs (stack: `console.log('Start')`, `console.log('End')`).  
2. `setTimeout` callback goes to Web API, then to callback queue.  
3. Promise `.then` goes to microtask queue.  
4. When stack is empty, event loop processes all microtasks first (`Promise`), then takes the next task from callback queue (`Timeout`).

---

## Quick Revision Questions:


**1. Explain the V8 engine architecture and how it executes JavaScript code.**

- **Quick Note:** V8 is Google's open-source JavaScript engine that compiles JS to native machine code. It uses a parser, an interpreter (Ignition), and an optimizing compiler (TurboFan) to execute code efficiently.

- **Well-Explained Answer:**
    "V8 is the JavaScript engine developed by Google, used in Chrome and Node.js. Its architecture is designed for high performance. Here's the simplified execution flow:
    1.  **Parsing:** The engine starts by downloading the source code. The **parser** performs lexical analysis to break the code into tokens and then syntactic analysis to build an **Abstract Syntax Tree (AST)** , which is a tree-like representation of the code's structure.
    2.  **Ignition (Interpreter):** V8's interpreter, **Ignition**, takes the AST and generates **bytecode**. Bytecode is an intermediate, platform-independent representation of your code, which is more efficient to execute than processing the AST directly. The code starts executing in this interpreted phase.
    3.  **TurboFan (Optimizing Compiler):** While the code runs, V8 collects profiling data about it—for example, which functions are called frequently ('hot'), and what types of arguments are passed to them. This hot bytecode is sent to the **TurboFan** compiler. TurboFan uses this type feedback to generate highly-optimized **machine code** that is specific to your CPU architecture.
    4.  **Deoptimization:** JavaScript is dynamic. If, later on, a function receives a different type of argument than it was optimized for (e.g., a number instead of a string), TurboFan can **deoptimize** the code, throwing away the optimized machine code and falling back to the more reliable bytecode. This is the 'Just-In-Time' nature of compilation."

**2. What is the role of Ignition and TurboFan in V8?**

- **Quick Note:** Ignition is the interpreter that quickly starts executing bytecode. TurboFan is the optimizing compiler that turns frequently used ('hot') bytecode into super-fast machine code.

- **Well-Explained Answer:**
    "Ignition and TurboFan work together as a two-tiered execution pipeline.
    - **Ignition's Role:** Its primary role is to get the code up and running as fast as possible. Instead of compiling everything to machine code upfront (which would slow down startup), V8 uses Ignition to generate and execute bytecode. Bytecode is compact and faster to generate than machine code, which means web pages start executing sooner. It also collects runtime feedback (like variable types) that will be crucial for the next step.
    - **TurboFan's Role:** TurboFan is the optimizing compiler. Its role is to take the 'hot' functions identified by Ignition and compile them into extremely efficient native machine code. It uses the type feedback collected during execution to make assumptions and generate code that is orders of magnitude faster than interpreted bytecode. If its assumptions break, it can revert to Ignition. This balance of a fast-start interpreter and a powerful optimizing compiler is what makes modern JavaScript so performant."

**3. How does JIT compilation improve performance?**

- **Quick Note:** JIT (Just-In-Time) compilation improves performance by compiling frequently executed parts of the code ('hot paths') into optimized native machine code during runtime, rather than interpreting all code all the time.

- **Well-Explained Answer:**
    "JIT compilation is a hybrid approach that combines the best of interpreters and compilers.
    - **Interpreters** are quick to start but slow to execute because they process and run code line-by-line.
    - **Traditional compilers** are slow to start (because they compile everything first) but produce very fast executable code.
    A JIT compiler, like the one in V8, tries to get the best of both worlds. It starts by interpreting the code quickly, so execution begins almost immediately. While interpreting, it profiles the code to find 'hot' functions—sections that are running many times. It then *just-in-time* compiles only these hot functions into optimized machine code. The next time that function is called, it runs the super-fast machine code instead of the slower interpreted bytecode. This means the overall performance is high because the code that runs most often is compiled, while the performance of start-up time isn't sacrificed by compiling everything prematurely."

**4. What is the difference between Call Stack and Memory Heap?**

- **Quick Note:** The Call Stack is for managing function execution (keeping track of where we are in the code), while the Memory Heap is an unstructured pool of memory for storing all our data (objects, functions, arrays).

- **Well-Explained Answer:**
    "The Call Stack and Memory Heap are the two main areas of memory used by the JavaScript engine.
    - **Call Stack:** This is a simple, ordered data structure (like a stack of plates) that records where we are in the program. When we call a function, it's pushed onto the top of the stack. When the function returns, it's popped off. It manages the execution context, including local variables and the place to return to. If the stack gets too full (e.g., from infinite recursion), we get a 'stack overflow' error. It operates synchronously.
    - **Memory Heap:** This is a large, mostly unstructured region of memory where all the application's data is stored. All objects, functions, arrays, and closures are allocated here. The engine's garbage collector is responsible for freeing up memory in the heap when objects are no longer needed. Unlike the stack's strict LIFO order, memory in the heap can be allocated and deallocated in any order."


### Section A.2: Variables (var, let, const)

## 📦 Variable Declarations: `var`, `let`, `const`

### `var` – The Old Way
- **Function‑scoped** – A variable declared with `var` is available anywhere inside the function it was declared in (including nested blocks). If declared outside any function, it becomes a global variable.
- **Hoisted with `undefined`** – The declaration is moved to the top of its scope during compilation, and it is initialized with `undefined`. You can access it before the line it appears (but it will be `undefined`).
- **Can be redeclared** – You can declare the same `var` variable multiple times in the same scope without error.
- **No block scope** – `var` ignores block boundaries like `if`, `for`, `{}` (except inside functions).

```javascript
console.log(myVar); // undefined (hoisted, but value not yet assigned)
var myVar = 10;
console.log(myVar); // 10

if (true) {
    var myVar = 20; // same variable, function‑scoped
}
console.log(myVar); // 20 (changed inside block)

function test() {
    var inside = 'function scope';
}
console.log(inside); // ReferenceError: inside is not defined
```

---

### `let` – The Modern Block‑Scoped Variable
- **Block‑scoped** – `let` is only accessible within the nearest enclosing block `{ ... }` (e.g., inside `if`, `for`, `while`, or just a standalone block).
- **Hoisted but in Temporal Dead Zone (TDZ)** – The declaration is hoisted, but the variable is not initialized. Accessing it before the declaration line throws a `ReferenceError`. The time between entering the scope and the declaration is the TDZ.
- **Cannot be redeclared in the same scope** – Repeating `let` with the same name in the same block causes a syntax error.
- **Can be reassigned** – Its value can be changed after declaration.

```javascript
// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 5;
console.log(myLet); // 5

if (true) {
    let myLet = 10; // separate variable, block‑scoped
    console.log(myLet); // 10
}
console.log(myLet); // 5 (outer variable unchanged)

// let myLet = 20; // SyntaxError: Identifier 'myLet' has already been declared
```

---

### `const` – Block‑Scoped Constant
- **Block‑scoped** – Same as `let`, only available inside the block where defined.
- **Hoisted but in TDZ** – Like `let`, it is hoisted but cannot be accessed before declaration.
- **Must be initialized at declaration** – You cannot declare `const` without a value.
- **Cannot be reassigned** – The binding is constant; you cannot assign a new value to the variable. However, if the value is an object or array, its properties or elements can be mutated.

```javascript
// const PI; // SyntaxError: Missing initializer in const declaration
const PI = 3.14159;
// PI = 3.14; // TypeError: Assignment to constant variable.

const person = { name: 'Alice' };
person.name = 'Bob'; // Allowed – object properties are mutable
// person = { name: 'Charlie' }; // TypeError – reassigning the variable is not allowed
```

---

## 🔗 Scope Chain and Lexical Scoping

### Lexical Scoping (Static Scope)
- JavaScript uses **lexical scoping**: the scope of a variable is determined by its location in the source code (where it is written), not by the call stack (how it is called). Inner functions have access to variables defined in outer scopes because of the scope chain.

### Scope Chain
- When a variable is referenced, JavaScript looks for its declaration in the **current scope**. If not found, it goes up one level to the outer scope, then continues until it reaches the global scope. This chain of nested scopes is called the **scope chain**.
- The scope chain is fixed at the time the function is **defined** (lexical scoping), not at the time it is called.

#### Example
```javascript
let globalVar = 'global';

function outer() {
    let outerVar = 'outer';

    function inner() {
        let innerVar = 'inner';
        console.log(innerVar); // 'inner' – found in current scope
        console.log(outerVar); // 'outer' – found in outer() scope
        console.log(globalVar); // 'global' – found in global scope
    }

    inner();
}

outer();
```

#### Nested Scopes and Shadowing
- If a variable is declared in an inner scope with the same name as one in an outer scope, it **shadows** (overrides) the outer one inside that inner scope.

```javascript
let name = 'Alice';

function greet() {
    let name = 'Bob'; // shadows the global 'name'
    console.log('Hello, ' + name); // Hello, Bob
}

greet();
console.log(name); // Alice (global unchanged)
```

### Why It Matters
- Lexical scoping allows closures: inner functions can “remember” the scope of outer functions even after the outer function has returned.
- Understanding the scope chain helps avoid bugs like accidental globals and unintended variable sharing.

---

## 📋 Summary Table

| Feature               | `var`                          | `let`                          | `const`                        |
|-----------------------|--------------------------------|--------------------------------|--------------------------------|
| Scope                 | Function‑scoped                | Block‑scoped                   | Block‑scoped                   |
| Hoisting              | Hoisted, initialized `undefined` | Hoisted, not initialized (TDZ) | Hoisted, not initialized (TDZ) |
| Redeclaration         | Allowed in same scope          | Not allowed in same scope      | Not allowed in same scope      |
| Reassignment          | Allowed                        | Allowed                        | Not allowed (binding constant) |
| Must initialize       | No                             | No                             | Yes                            |

- **Best practice**: Prefer `const` by default, use `let` when you need to reassign, and avoid `var` in modern code (use it only when supporting very old environments).

## Quick Revision Questions:

**1. Compare var, let, and const with examples.**

- **Quick Note:** `var` is function-scoped, can be redeclared, and is hoisted with `undefined`. `let` and `const` are block-scoped, cannot be redeclared in the same scope, and are hoisted but not initialized (Temporal Dead Zone). `const` also cannot be reassigned.

- **Well-Explained Answer:**
    "These three keywords are used for variable declaration in JavaScript, but they have significant differences.
    - **`var` (old way):**
        - **Scope:** Function-scoped. If declared inside a function, it's only available there. If declared outside, it's global. It is **not** block-scoped, meaning a `var` inside an `if` block is accessible outside that block.
        - **Redeclaration:** Can be redeclared multiple times in the same scope without error.
        - **Hoisting:** Hoisted to the top of its scope and initialized with `undefined`.
        ```javascript
        console.log(myVar); // undefined (hoisted)
        var myVar = 5;
        var myVar = 10; // no error
        ```
    - **`let` (modern, reassignable):**
        - **Scope:** Block-scoped. Only accessible within the nearest enclosing `{ }` block.
        - **Redeclaration:** Cannot be redeclared in the same scope.
        - **Hoisting:** Hoisted but not initialized. Accessing it before declaration throws a `ReferenceError` (Temporal Dead Zone).
        ```javascript
        // console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
        let myLet = 5;
        myLet = 10; // reassignment is fine
        // let myLet = 20; // SyntaxError: Identifier 'myLet' has already been declared
        ```
    - **`const` (modern, constant reference):**
        - **Scope:** Same as `let` – block-scoped.
        - **Redeclaration & Reassignment:** Cannot be redeclared **or** reassigned. The variable identifier is constant. However, if the value is an object or array, its properties or elements can still be modified.
        - **Hoisting:** Same as `let` – hoisted in TDZ, must be initialized at declaration.
        ```javascript
        const myConst = { name: 'John' };
        // myConst = { name: 'Jane' }; // TypeError: Assignment to constant variable
        myConst.name = 'Jane'; // allowed – object property changed
        ```
    **In summary:** Use `const` by default for values that shouldn't be reassigned, `let` when reassignment is needed, and avoid `var` in modern code."

**2. What is Temporal Dead Zone (TDZ)?**

- **Quick Note:** The TDZ is the period between entering a block (where a `let` or `const` variable is hoisted) and the actual declaration, during which accessing the variable throws a `ReferenceError`.

- **Well-Explained Answer:**
    "The Temporal Dead Zone (TDZ) is a behavior specific to `let` and `const` variables. Although these variables are hoisted (i.e., JavaScript is aware of them at the start of their scope), they are not initialized. They exist in a 'dead zone' from the start of the block until the line where they are declared. During this period, any attempt to read or write to them results in a `ReferenceError`. This is different from `var`, which is initialized with `undefined` at hoisting. The TDZ helps catch errors where you might accidentally use a variable before it's ready, encouraging better coding practices."

**3. What happens when you try to access a let variable before declaration?**

- **Quick Note:** It throws a `ReferenceError: Cannot access 'variable' before initialization` because of the Temporal Dead Zone.

- **Well-Explained Answer:**
    "If you try to access a `let` variable before its declaration line within the same block, JavaScript will throw a `ReferenceError`. For example:
    ```javascript
    {
        console.log(myLet); // ReferenceError
        let myLet = 10;
    }
    ```
    This happens because `myLet` is hoisted to the top of the block but remains uninitialized. The engine knows the variable exists, but it hasn't been given a value yet, so it prevents access to avoid unexpected `undefined` behavior. This is the Temporal Dead Zone in action."

**4. Can you reassign a const object's properties?**

- **Quick Note:** Yes, you can modify the properties of an object declared with `const`. The `const` only prevents reassigning the variable itself, not mutating its contents.

- **Well-Explained Answer:**
    "Yes, absolutely. `const` in JavaScript does not mean the value is immutable; it means the variable identifier cannot be reassigned. If the value is an object or array, its properties or elements can still be changed. For example:
    ```javascript
    const person = { name: 'Alice', age: 30 };
    person.age = 31;          // allowed – property mutated
    person.city = 'New York'; // allowed – new property added
    delete person.name;       // allowed – property removed
    // person = {};           // TypeError – reassigning the variable is not allowed
    ```
    If you want to make an object truly immutable (shallow), you can use `Object.freeze()`."

---

### Section A.3: Hoisting

## 🚩 Hoisting – What Is It?

**Hoisting** is JavaScript’s default behavior of moving **declarations** to the top of their containing scope during the compilation phase, before the code is executed. This means you can use variables and functions before they appear in the code – but the way they are initialized depends on how they are declared.

**Important:** Only the declarations are hoisted, not initializations (assignments).

---

## 📦 Variable Hoisting

### `var` – Hoisted with `undefined`
- Variables declared with `var` are hoisted to the top of their function or global scope.
- They are automatically initialized with `undefined`.
- You can access them before the declaration line, but their value will be `undefined` until the assignment is reached.

```javascript
console.log(myVar); // undefined (not an error!)
var myVar = 5;
console.log(myVar); // 5
```
What happens behind the scenes (hoisting):
```javascript
var myVar;           // declaration hoisted, initialized with undefined
console.log(myVar);  // undefined
myVar = 5;           // assignment stays in place
console.log(myVar);  // 5
```

---

### `let` and `const` – Hoisted but in Temporal Dead Zone (TDZ)
- Declarations with `let` and `const` are **also hoisted** to the top of their block.
- However, they are **not initialized**. They remain in a "temporal dead zone" from the start of the block until the declaration line is encountered.
- Accessing them before the declaration throws a `ReferenceError`.

```javascript
console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 10;
```

Why? Because they are hoisted but uninitialized. The time between entering the scope and the declaration is the **TDZ**.

```javascript
{
    // TDZ starts for myLet
    // console.log(myLet); // would throw ReferenceError
    let myLet = 20;       // TDZ ends
    console.log(myLet);   // 20
}
```

- `const` also follows the same TDZ rules, but additionally **must be initialized** at declaration.

---

## 🧩 Function Hoisting

### Function Declarations – Fully Hoisted
- Function declarations (using the `function` keyword) are hoisted completely – both the name and the body.
- You can call a function before its declaration in the same scope.

```javascript
sayHello(); // "Hello, world!" – works

function sayHello() {
    console.log("Hello, world!");
}
```

Behind the scenes, the entire function definition is moved to the top.

### Function Expressions – Not Hoisted (or only the variable is hoisted)
- A function expression (assigning a function to a variable) follows the hoisting rules of the variable declaration.
- If `var` is used, the variable is hoisted with `undefined`, so calling it before the assignment results in a `TypeError` (because `undefined` is not a function).
- If `let` or `const` is used, the variable is hoisted but in TDZ, so accessing it before the declaration gives a `ReferenceError`.

```javascript
// With var
console.log(sayHi); // undefined
sayHi();            // TypeError: sayHi is not a function
var sayHi = function() {
    console.log("Hi!");
};

// With let/const
sayHey();           // ReferenceError: Cannot access 'sayHey' before initialization
let sayHey = function() {
    console.log("Hey!");
};
```

---

## 📊 Summary of Hoisting Behavior

| Declaration Type     | Hoisted? | Initialized?                 | Accessible Before Declaration?               |
|----------------------|----------|------------------------------|-----------------------------------------------|
| `var`                | Yes      | `undefined`                  | Yes (value = `undefined`)                     |
| `let` / `const`      | Yes      | No (TDZ)                     | No – throws `ReferenceError`                  |
| Function Declaration | Yes      | Yes (entire function)        | Yes – can call the function                   |
| Function Expression (`var`) | Variable hoisted with `undefined` | No (assignment not hoisted) | Variable accessible as `undefined`; calling it throws `TypeError` |
| Function Expression (`let`/`const`) | Variable hoisted, but TDZ | No (assignment not hoisted) | No – throws `ReferenceError` before declaration |

---

## 🔑 Key Takeaways
- **Declarations are hoisted, assignments are not.**
- `var` is hoisted and initialized with `undefined` – can lead to subtle bugs.
- `let` and `const` are hoisted but remain uninitialized (TDZ) – accessing them early throws an error, which helps catch mistakes.
- **Function declarations** are fully hoisted – you can use them anywhere in the scope.
- **Function expressions** behave like their variable counterparts – use with care.


### Quick Revision Questions:

**1. Explain hoisting with var, let, and const.**

- **Quick Note:** Hoisting moves declarations to the top of their scope. `var` is hoisted and initialized with `undefined`. `let` and `const` are hoisted but remain uninitialized (TDZ). Function declarations are fully hoisted (definition included).

- **Well-Explained Answer:**
    "Hoisting is JavaScript's default behavior of moving all declarations to the top of their containing scope before code execution. However, how they are treated differs:
    - **`var`:** The declaration is hoisted, and it is automatically initialized with `undefined`. So you can reference the variable before its line, but it will be `undefined` until the assignment.
    - **`let` and `const`:** The declarations are hoisted, but they are **not initialized**. They enter a Temporal Dead Zone from the start of the block until the declaration is encountered. Accessing them before that throws a `ReferenceError`.
    - **Function declarations:** The entire function definition (both name and body) is hoisted. So you can call a function before its declaration in the code.
    - **Function expressions:** If you use `var`, `let`, or `const` with a function expression, the hoisting rules of the variable apply (e.g., `var` hoisted as `undefined`, `let` in TDZ)."

**2. What is the difference between function declaration and function expression hoisting?**

- **Quick Note:** Function declarations are fully hoisted, meaning you can call them before they appear. Function expressions (with `var`, `let`, `const`) follow the variable hoisting rules.

- **Well-Explained Answer:**
    "The key difference is in what gets hoisted.
    - **Function Declaration:** The entire function is hoisted, including its body. So you can invoke it before the line where it's defined:
        ```javascript
        sayHello(); // "Hello!"
        function sayHello() {
            console.log("Hello!");
        }
        ```
    - **Function Expression (using `var`):** The variable declaration is hoisted, but its value (`undefined`) is hoisted, not the function definition. So you cannot call it before the assignment:
        ```javascript
        // sayHi(); // TypeError: sayHi is not a function
        var sayHi = function() {
            console.log("Hi!");
        };
        sayHi(); // Works here
        ```
        With `let` or `const`, the variable is hoisted but in TDZ, so trying to call before declaration results in a `ReferenceError`."

**3. Predict the output of hoisting scenarios.**

*(We can give a couple of examples with explanation)*

- **Quick Note:** Practice with examples clarifies hoisting behavior.

- **Well-Explained Answer:**
    "Let's look at a few scenarios:
    **Scenario 1:**
    ```javascript
    console.log(a);
    var a = 5;
    console.log(a);
    ```
    **Output:** `undefined`, then `5`. Because `var a` is hoisted and initialized with `undefined`. The first log sees that `undefined`, then after assignment, the second log sees `5`.

    **Scenario 2:**
    ```javascript
    console.log(b);
    let b = 10;
    ```
    **Output:** `ReferenceError: Cannot access 'b' before initialization`. `let` is hoisted but not initialized, so accessing before declaration causes TDZ error.

    **Scenario 3:**
    ```javascript
    foo(); // ?
    bar(); // ?
    function foo() { console.log("foo"); }
    var bar = function() { console.log("bar"); };
    ```
    **Output:** `foo` executes fine, but `bar()` throws `TypeError: bar is not a function`. Because `foo` is a function declaration fully hoisted; `bar` is a variable (`var`) hoisted as `undefined`, so calling `undefined` as a function fails.

    **Scenario 4:**
    ```javascript
    var x = 1;
    function x() {}
    console.log(x);
    ```
    **Output:** `1`. Function declarations are hoisted above variable declarations, but the variable assignment (`x = 1`) overrides the function value. This is a tricky edge case."

**4. What is the creation phase and execution phase in JavaScript?**

- **Quick Note:** In the execution context lifecycle, the creation phase sets up the scope, hoists declarations, and determines the value of `this`. The execution phase runs the code line by line.

- **Well-Explained Answer:**
    "When JavaScript code runs inside an execution context (global or function), it goes through two phases:
    - **Creation Phase:**
        - The JavaScript engine creates the **Variable Object** (VO) or Activation Object, which stores variables and function declarations.
        - It sets up the **scope chain**.
        - It determines the value of `this`.
        - During this phase, memory is allocated for variables and functions. **Hoisting** occurs here: function declarations are stored in memory in their entirety, and variables (`var`) are stored with a placeholder `undefined`.
    - **Execution Phase:**
        - The code is executed line by line, assignments are made, functions are called, and expressions are evaluated.
        - For `let` and `const`, the actual initialization happens when the execution reaches their line, which is why they are in TDZ before that.
    This two-phase process ensures that the engine knows about all identifiers before executing, enabling closures and lexical scoping."


### Section A.5: Functions

## 🧩 Function Declaration vs Function Expression vs Arrow Functions

### 1. Function Declaration
- Uses the `function` keyword followed by a name.
- **Hoisted** – can be called before the declaration.
- Has its own `this` binding.
- Must have a name (anonymous function declarations are not allowed).

```javascript
sayHello(); // "Hello" – works because of hoisting

function sayHello() {
    console.log("Hello");
}
```

### 2. Function Expression
- A function assigned to a variable.
- The function can be named or anonymous.
- **Not hoisted** – only the variable is hoisted (with `var`) or in TDZ (with `let`/`const`), so cannot be called before the assignment.
- Has its own `this` binding.

```javascript
// Anonymous function expression
const greet = function() {
    console.log("Hi");
};

// Named function expression (name is only visible inside the function)
const farewell = function bye() {
    console.log("Goodbye");
};
```

### 3. Arrow Functions
- Introduced in ES6, a shorter syntax: `(param) => expression`.
- **No own `this`** – inherits `this` from the enclosing scope (lexical `this`).
- **No `arguments` object** (use rest parameters instead).
- Cannot be used as constructors (no `new`).
- Cannot have a name (always anonymous, but can be assigned to a variable).
- If the body is a single expression, it implicitly returns that expression (no need for `return`). For multiple statements, use curly braces and explicit `return`.

```javascript
// Single expression – implicit return
const add = (a, b) => a + b;

// Multiple statements – need braces and return
const greet = (name) => {
    const msg = `Hello, ${name}`;
    console.log(msg);
};

// No own this example
function Person() {
    this.age = 0;
    setInterval(() => {
        this.age++; // `this` refers to Person instance
    }, 1000);
}
```

---

## 🔢 Parameters vs Arguments

- **Parameters** – variables listed in the function definition.
- **Arguments** – actual values passed to the function when called.

```javascript
function sum(a, b) {   // a and b are parameters
    return a + b;
}

sum(5, 3);             // 5 and 3 are arguments
```

---

## 🎯 Default Parameters

- Allow parameters to have default values if no argument or `undefined` is passed.
- Introduced in ES6.

```javascript
function multiply(x, y = 1) {
    return x * y;
}
multiply(5);    // 5 (y defaults to 1)
multiply(5, 2); // 10
```

- Default parameters are evaluated at call time, and you can use previous parameters in the default expression.

```javascript
function greet(name, greeting = `Hello ${name}`) {
    console.log(greeting);
}
greet("Alice"); // "Hello Alice"
```

---

## 🧩 Rest Parameters and Spread Operator

### Rest Parameters (`...`)
- Collects remaining arguments into an array.
- Must be the last parameter.
- Replaces the old `arguments` object (which is array‑like but not a real array).

```javascript
function sum(...numbers) {
    return numbers.reduce((acc, cur) => acc + cur, 0);
}
sum(1, 2, 3); // 6
```

### Spread Operator (`...`)
- Expands an iterable (array, string, object) into individual elements.
- Used in function calls, array literals, object literals.

```javascript
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3

const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2 }
```

---

## ↩️ Return Statement

- A function returns `undefined` if no `return` statement is present.
- `return` ends function execution and specifies the value to send back.
- Arrow functions with a single expression can implicitly return (without braces).

```javascript
function noReturn() {}
console.log(noReturn()); // undefined

function withReturn() {
    return 42;
}
console.log(withReturn()); // 42

// Arrow implicit return
const double = x => x * 2;
```

---

## 🌐 Function Scope vs Block Scope

- **Function scope** – Variables declared with `var` inside a function are accessible anywhere inside that function (including nested blocks), but not outside.
- **Block scope** – Variables declared with `let` and `const` are only accessible within the nearest enclosing `{ }` block.

```javascript
function test() {
    if (true) {
        var x = 10;   // function‑scoped
        let y = 20;   // block‑scoped
    }
    console.log(x); // 10 (accessible)
    console.log(y); // ReferenceError: y is not defined
}
test();
```

- Functions themselves are block‑scoped in strict mode (if declared inside a block, they are not hoisted to the outer scope).

---

## 🔄 IIFE (Immediately Invoked Function Expression)

- A function that runs as soon as it is defined.
- Useful for creating a new scope to avoid polluting the global namespace (especially before ES6 modules).
- Often used with an anonymous function expression wrapped in parentheses, followed by `()`.

```javascript
(function() {
    var privateVar = "I'm local";
    console.log("IIFE executed");
})(); // logs "IIFE executed"

// With arrow function
(() => {
    console.log("Arrow IIFE");
})();

// Can also pass arguments
(function(name) {
    console.log(`Hello, ${name}`);
})("Alice");
```

- **Why parentheses?** – Without them, the `function` keyword at the start of a line is treated as a function declaration, which requires a name. Wrapping forces it to be treated as an expression.

---

## 🥇 First‑Class Functions in JavaScript

- JavaScript treats functions as **first‑class citizens**, meaning:
  1. Functions can be assigned to variables.
  2. Functions can be passed as arguments to other functions.
  3. Functions can be returned from other functions.
  4. Functions can be stored in data structures (arrays, objects).

This enables **higher‑order functions** (functions that operate on other functions) and functional programming patterns.

```javascript
// 1. Assign to variable
const greet = function() { console.log("Hi"); };

// 2. Pass as argument
function run(fn) {
    fn();
}
run(greet); // "Hi"

// 3. Return from function
function createMultiplier(multiplier) {
    return function(value) {
        return value * multiplier;
    };
}
const double = createMultiplier(2);
console.log(double(5)); // 10

// 4. Store in array
const funcs = [greet, () => console.log("Hey")];
funcs[0](); // "Hi"
```

---

## 📋 Summary Table: Function Declaration vs Expression vs Arrow

| Feature                | Function Declaration | Function Expression | Arrow Function |
|------------------------|----------------------|----------------------|----------------|
| Hoisting               | Yes (fully)          | No (variable hoisting only) | No (variable hoisting only) |
| Own `this`             | Yes                  | Yes                  | No (lexical)   |
| `arguments` object     | Yes                  | Yes                  | No             |
| Can be constructor (`new`) | Yes              | Yes                  | No             |
| Syntax                 | `function name() {}` | `const f = function() {}` | `() => {}` |
| Implicit return        | No                   | No                   | Yes (if single expression) |

- **Best practice**: Use function declarations for named standalone functions (hoisting can be convenient). Use arrow functions for callbacks and when you need lexical `this`. Use function expressions when you need a dynamic function or a method that needs its own `this`.


## Quick Revision Questions:

**1. Difference between function declaration, expression, and arrow function.**

- **Quick Note:** Function declarations are hoisted, have their own `this`, and are named. Function expressions are not hoisted, can be anonymous or named. Arrow functions are concise, do not have their own `this`, and are not hoisted.

- **Well-Explained Answer:**
    "These three ways of defining functions have distinct characteristics:
    - **Function Declaration:**
        - Syntax: `function name(params) { ... }`
        - Hoisted: Yes, fully.
        - `this` binding: Own `this` (dynamic, depends on invocation).
        - Can be used as constructors with `new`.
        - Must have a name.
    - **Function Expression:**
        - Syntax: `const name = function(params) { ... };` (or anonymous)
        - Hoisted: No, only variable hoisting applies (if `var`, `undefined` initially).
        - `this` binding: Own `this` (dynamic).
        - Can be anonymous or named.
        - Can be used as constructors if not arrow.
    - **Arrow Function:**
        - Syntax: `const name = (params) => { ... };`
        - Hoisted: No, same as `let`/`const` hoisting (TDZ if `let`/`const`).
        - `this` binding: Lexical `this` (inherits from enclosing scope).
        - Cannot be used as constructors (no `new`).
        - No `arguments` object.
        - Shorter syntax, implicit return if body is a single expression without `{}`.
    **When to use:** Declarations for traditional functions, expressions for callbacks or when you need to assign functions dynamically, arrow functions for preserving `this` context (e.g., in event handlers or inside methods that need the outer `this`)."

**2. What are default parameters and rest parameters?**

- **Quick Note:** Default parameters allow setting default values for function arguments. Rest parameters collect remaining arguments into an array.

- **Well-Explained Answer:**
    - **Default Parameters:** Introduced in ES6, they allow you to initialize formal parameters with default values if no value or `undefined` is passed. For example:
        ```javascript
        function greet(name = 'Guest') {
            console.log(`Hello, ${name}!`);
        }
        greet('Alice'); // Hello, Alice!
        greet();        // Hello, Guest!
        ```
        They are evaluated at call time, so you can even use previous parameters in the default expression.
    - **Rest Parameters:** Also ES6, denoted by `...` before the last parameter, it gathers any remaining arguments into an array. For example:
        ```javascript
        function sum(...numbers) {
            return numbers.reduce((total, num) => total + num, 0);
        }
        sum(1, 2, 3, 4); // returns 10
        ```
        Rest parameters replace the older `arguments` object but are a true array, making array methods easier."

**3. Explain IIFE and its use cases.**

- **Quick Note:** IIFE (Immediately Invoked Function Expression) is a function that runs as soon as it is defined. It creates a new scope to avoid polluting the global namespace.

- **Well-Explained Answer:**
    "IIFE stands for Immediately Invoked Function Expression. It's a JavaScript pattern where a function is defined and immediately executed. Syntax:
    ```javascript
    (function() {
        // code here
    })();
    // or with arrow
    (() => {
        // code
    })();
    ```
    The parentheses around the function turn it into an expression, and the trailing `()` invokes it.
    **Use cases:**
    1. **Avoid polluting global scope:** Variables declared inside an IIFE are not accessible globally, preventing naming conflicts.
    2. **Creating private variables and closures:** Data hiding – variables inside IIFE can be accessed via returned functions (module pattern).
    3. **Executing async code in loops (pre-`let`):** Before block-scoped variables, IIFE was used to capture loop index values correctly.
    4. **Initialization code that runs once:** For setting up configuration, event listeners, etc., without leaving trace.
    Modern JavaScript with `let`/`const` and modules reduces the need for IIFEs, but they're still useful in certain contexts."

**4. How do arrow functions differ from regular functions?**

- **Quick Note:** Arrow functions have shorter syntax, lexical `this`, no `arguments` object, cannot be used as constructors, and cannot be used as methods if you need dynamic `this`.

- **Well-Explained Answer:**
    "Arrow functions, introduced in ES6, have several key differences from regular functions:
    1. **`this` binding:** Arrow functions do not have their own `this`. They inherit `this` from the enclosing lexical scope. Regular functions have their own `this` determined by how they are called.
    2. **`arguments` object:** Arrow functions do not have an `arguments` object. If you need it, use rest parameters.
    3. **Constructor:** Arrow functions cannot be used with `new`; they throw a TypeError.
    4. **`super`:** Arrow functions do not have their own `super`, they inherit from enclosing scope.
    5. **Syntax:** Arrow functions offer a concise syntax, especially for single expressions (implicit return).
    6. **Methods:** Arrow functions are not suitable for object methods if they need to access the object's properties via `this`, because `this` will be the outer context (e.g., window). Use regular functions for methods.
    **Example:**
    ```javascript
    const obj = {
        name: 'My Object',
        regularFunc: function() { console.log(this.name); },
        arrowFunc: () => { console.log(this.name); }
    };
    obj.regularFunc(); // 'My Object'
    obj.arrowFunc();   // undefined (this refers to outer scope, probably window)
    ```"

**5. What does it mean that functions are first-class citizens in JavaScript?**

- **Quick Note:** It means functions are treated like any other value: they can be assigned to variables, passed as arguments, returned from other functions, and stored in data structures.

- **Well-Explained Answer:**
    "In JavaScript, functions are first-class citizens, meaning they are treated as regular values. This implies:
    - **Assign to variables:** You can store a function in a variable, e.g., `const sayHi = function() { ... };`.
    - **Pass as arguments:** Functions can be passed as arguments to other functions (callbacks, higher-order functions).
    - **Return from functions:** Functions can return other functions (closures, factory functions).
    - **Store in data structures:** Functions can be stored in arrays, objects, etc.
    This capability is fundamental to functional programming patterns in JavaScript, enabling features like callbacks, higher-order functions, and closures. It's what allows us to write expressive and flexible code."

---

### Section A.6: Higher-Order Functions

## 🔁 Higher-Order Functions – Definition

A **higher-order function** is a function that does at least one of the following:

1. **Takes one or more functions as arguments** (callbacks).
2. **Returns a function as its result**.

This is possible because JavaScript treats functions as **first‑class citizens** – they can be assigned to variables, passed around, and returned just like any other value.

---

## 🥇 Functions as First‑Class Citizens

- In JavaScript, functions are objects (they can have properties and methods).
- They can be stored in variables, arrays, or objects.
- They can be passed as arguments to other functions.
- They can be returned from other functions.

This flexibility is what makes higher‑order functions possible.

```javascript
// Assigning a function to a variable
const greet = function(name) {
    return `Hello, ${name}`;
};

// Passing a function as an argument
function sayHello(greetingFunction, name) {
    console.log(greetingFunction(name));
}
sayHello(greet, 'Alice'); // "Hello, Alice"

// Returning a function
function createMultiplier(multiplier) {
    return function(value) {
        return value * multiplier;
    };
}
const double = createMultiplier(2);
console.log(double(5)); // 10
```

---

## 📚 Common Built‑in Higher‑Order Functions (Array Methods)

JavaScript arrays come with several powerful higher‑order methods.

### `forEach()`
- Executes a provided function once for each array element.
- Returns `undefined` (used for side effects).

```javascript
const numbers = [1, 2, 3];
numbers.forEach(num => console.log(num * 2)); // 2, 4, 6
```

### `map()`
- Creates a **new array** populated with the results of calling a provided function on every element.
- Ideal for transforming data.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2); // [2, 4, 6]
```

### `filter()`
- Creates a **new array** with all elements that pass the test implemented by the provided function.
- Ideal for selecting a subset.

```javascript
const numbers = [1, 2, 3, 4];
const evens = numbers.filter(num => num % 2 === 0); // [2, 4]
```

### `reduce()`
- Executes a reducer function on each element, resulting in a **single output value**.
- Often used for summing, accumulating, or building complex structures.

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0); // 10
```

---

## 🛠️ Creating Custom Higher‑Order Functions

You can write your own functions that accept or return functions.

### Example: Function That Accepts a Callback
```javascript
function processUserInput(name, callback) {
    const message = `Hello, ${name}`;
    callback(message);
}

processUserInput('Bob', console.log); // "Hello, Bob"
```

### Example: Function That Returns a Function (Function Factory)
```javascript
function multiplyBy(factor) {
    return function(number) {
        return number * factor;
    };
}

const triple = multiplyBy(3);
console.log(triple(10)); // 30
```

### Example: Function That Accepts Multiple Functions
```javascript
function combineOperations(x, y, operation1, operation2) {
    return operation2(operation1(x, y));
}

function add(a, b) { return a + b; }
function square(n) { return n * n; }

const result = combineOperations(3, 4, add, square); // (3+4)^2 = 49
console.log(result);
```

---

## 🧩 Function Composition and Abstraction

Higher‑order functions enable **function composition** – combining simple functions to build more complex ones. This leads to cleaner, more modular, and reusable code.

### Composition Example
```javascript
const toUpperCase = str => str.toUpperCase();
const exclaim = str => `${str}!`;
const shout = str => exclaim(toUpperCase(str));

console.log(shout('hello')); // "HELLO!"
```

With higher‑order functions like `map`, you can compose operations on arrays:
```javascript
const numbers = [1, 2, 3, 4];
const result = numbers
    .filter(n => n % 2 === 0)   // [2, 4]
    .map(n => n * 3)            // [6, 12]
    .reduce((sum, n) => sum + n, 0); // 18
```

**Abstraction** – Higher‑order functions allow you to hide implementation details and focus on *what* you want to do, not *how*.

---

## 💡 Use Cases

### 1. Array Manipulation
- `map`, `filter`, `reduce` are the workhorses of data transformation in modern JavaScript (and in libraries like Lodash).

### 2. Event Handlers
- In the browser, event listeners often take callback functions – a classic example of higher‑order functions in action.

```javascript
button.addEventListener('click', () => {
    console.log('Button clicked');
});
```

### 3. Asynchronous Operations
- Callbacks, Promises, and `async/await` all rely on passing functions to handle results or errors.

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())  // .then takes a function
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### 4. Function Factories
- Creating specialized functions on the fly (e.g., configuration functions, middleware in Express).

### 5. Decorators / Higher‑Order Components (React)
- In React, higher‑order components are functions that take a component and return an enhanced component.

---

## ✅ Key Takeaways

- Higher‑order functions are functions that operate on other functions.
- They are a cornerstone of **functional programming** in JavaScript.
- Built‑in array methods (`map`, `filter`, `reduce`, `forEach`) are everyday examples.
- They promote **reusability**, **abstraction**, and **composition**.
- They are widely used in event handling, async code, and data processing.

---

## Quick Revision Questions:

**1. What is a higher-order function? Give 3 examples.**

- **Quick Note:** A higher-order function is a function that either takes one or more functions as arguments, or returns a function (or both).

- **Well-Explained Answer:**
    "A higher-order function is a function that operates on other functions, either by taking them as arguments or by returning them. This is possible because functions are first-class citizens.
    **Three common examples:**
    1. **`Array.prototype.map()`:** Takes a callback function and applies it to each element, returning a new array.
    2. **`Array.prototype.filter()`:** Takes a predicate function and returns a new array with elements that pass the test.
    3. **`Array.prototype.reduce()`:** Takes a reducer function and accumulates values.
    Additionally, custom higher-order functions can be created for code reuse, like a `withLogging` function that wraps another function to add logging."

**2. How is map() a higher-order function?**

- **Quick Note:** `map()` accepts a callback function as its argument, making it a higher-order function.

- **Well-Explained Answer:**
    "`map()` is a higher-order function because it takes another function (a callback) as an argument. The callback is invoked for each element in the array, and `map()` uses it to transform the array. For instance:
    ```javascript
    const numbers = [1, 2, 3];
    const doubled = numbers.map(num => num * 2); // (num => num * 2) is the callback
    ```
    Here, `map` receives the arrow function and applies it. Because it accepts a function as input, it meets the definition of a higher-order function."

**3. Create a custom higher-order function that takes a function as argument.**

- **Quick Note:** For example, a function that repeats an operation multiple times.

- **Well-Explained Answer:**
    "Here's a simple custom higher-order function called `repeat`, which takes a function `fn` and a number `n`, and executes `fn` `n` times:
    ```javascript
    function repeat(fn, n) {
        for (let i = 0; i < n; i++) {
            fn(i);
        }
    }
    // Usage:
    repeat(console.log, 3); // logs 0, 1, 2 (if fn uses index)
    ```
    Another example: a function `withTimer` that wraps any function and logs how long it took:
    ```javascript
    function withTimer(fn) {
        return function(...args) {
            console.time('Execution time');
            const result = fn(...args);
            console.timeEnd('Execution time');
            return result;
        };
    }
    const slowFunction = (num) => { for(let i=0; i<1e7; i++) {} return num*2; };
    const timedSlow = withTimer(slowFunction);
    timedSlow(5); // logs execution time and returns 10
    ```"

**4. Why are higher-order functions important in JavaScript?**

- **Quick Note:** They enable abstraction, code reuse, composition, and functional programming patterns, making code more declarative and modular.

- **Well-Explained Answer:**
    "Higher-order functions are crucial for several reasons:
    1. **Abstraction:** They allow you to abstract away common patterns (e.g., iteration, filtering) so you can focus on the specific logic (the callback). This leads to cleaner, more readable code.
    2. **Code Reusability:** You can create generic utility functions that accept custom behavior, reducing duplication.
    3. **Functional Composition:** They enable composing small, focused functions into larger operations (e.g., chaining `map`, `filter`, `reduce`).
    4. **Asynchronous Programming:** They are fundamental to handling async operations (e.g., `setTimeout`, promises, event handlers) where callbacks are passed.
    5. **Declarative Style:** Using higher-order functions like `map` instead of `for` loops makes code more declarative, expressing *what* you want to do rather than *how*.
    In essence, higher-order functions make JavaScript a flexible and expressive language."

---

### Section A.7: Callback Functions

## 📞 Callbacks – Definition

A **callback function** is a function passed as an argument to another function, which is then invoked (called back) inside the outer function to complete some action.

This is possible because JavaScript treats functions as **first-class citizens** – they can be passed around like any other value.

```javascript
function outerFunction(callback) {
    // Do something...
    callback(); // Invoke the callback
}
```

---

## ⏱️ Synchronous Callbacks

Synchronous callbacks are executed **immediately** during the execution of the outer function. They run in the same call stack, before the outer function completes.

### Common Examples

**`forEach()`**
```javascript
const numbers = [1, 2, 3];
numbers.forEach(function(num) {      // Callback runs synchronously
    console.log(num * 2);
});
console.log('After forEach');        // Runs after all callbacks finish
```

**`map()`**
```javascript
const doubled = numbers.map(num => num * 2); // Callback runs for each element
```

**`filter()`**
```javascript
const evens = numbers.filter(num => num % 2 === 0);
```

**`sort()`**
```javascript
const fruits = ['banana', 'apple', 'cherry'];
fruits.sort((a, b) => a.localeCompare(b)); // Comparison callback
```

**Characteristics:**
- Blocking – the outer function waits for the callback to complete.
- Executed in the order they are called.
- No special handling needed – they just run like normal functions.

---

## ⚡ Asynchronous Callbacks

Asynchronous callbacks are executed **later**, after the current operation completes and the call stack is empty. They are handled by the event loop.

### Common Examples

**`setTimeout()`**
```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout callback'); // Runs after at least 1000ms
}, 1000);

console.log('End');

// Output: Start, End, Timeout callback
```

**Event Listeners**
```javascript
button.addEventListener('click', () => {
    console.log('Button clicked'); // Runs when user clicks, not immediately
});
```

**API Calls (`fetch`)**
```javascript
fetch('https://api.example.com/data')
    .then(response => response.json()) // .then callbacks run asynchronously
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

**File I/O (Node.js)**
```javascript
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data); // Runs after file is read
});
```

**Characteristics:**
- Non-blocking – the outer function continues executing.
- Queued in the task queue (or microtask queue for promises).
- Executed when the call stack is empty.

---

## 🔄 Callback Execution Flow

### Synchronous Flow
```
Call Stack:
1. outerFunction() called
2. callback() invoked immediately
3. callback() runs to completion
4. outerFunction continues (if any code after callback)
5. outerFunction returns
```

### Asynchronous Flow (with Event Loop)
```
1. outerFunction() called (e.g., setTimeout)
2. Web API / C++ API handles the async operation
3. outerFunction continues and returns (call stack empty)
4. When async operation completes, callback moves to task queue
5. Event loop checks if call stack is empty
6. Callback pushed to stack and executed
```

**Visual:**
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Call Stack  │ ←── │  Event Loop │ ←── │ Task Queue  │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 🎯 Passing Arguments to Callbacks

### Method 1: Using Parameters in the Callback Definition
```javascript
function processUser(id, callback) {
    const user = { id, name: 'Alice' };
    callback(user, 'Success'); // Pass arguments to callback
}

processUser(5, (user, status) => {
    console.log(user, status);
});
```

### Method 2: Wrapping in an Anonymous Function
```javascript
function greet(name) {
    console.log(`Hello, ${name}`);
}

setTimeout(() => greet('Alice'), 1000); // Wrapping to pass argument
```

### Method 3: Using `bind()`
```javascript
setTimeout(greet.bind(null, 'Alice'), 1000);
```

### Method 4: For Array Methods
```javascript
numbers.map((num, index, array) => num * index); // Callback receives standard arguments
```

---

## 🏷️ Anonymous vs Named Callbacks

### Anonymous Callbacks
- Defined inline, without a name.
- Common for short, one-off functions.

```javascript
setTimeout(() => {
    console.log('Anonymous callback');
}, 1000);

numbers.map(num => num * 2);
```

**Pros:** Concise, keeps related code together.  
**Cons:** Harder to debug (shows as anonymous in stack traces), cannot reuse.

### Named Callbacks
- Defined separately with a name.
- Useful for reusable logic or complex callbacks.

```javascript
function handleClick(event) {
    console.log('Button clicked', event);
}
button.addEventListener('click', handleClick);

function double(num) {
    return num * 2;
}
numbers.map(double);
```

**Pros:** Better stack traces, reusable, self-documenting.  
**Cons:** Slightly more verbose, callback definition may be far from usage.

---

## ✅ Advantages of Callbacks

### 1. Code Reusability
- Write a function once and use it as a callback in multiple places.

```javascript
function logToConsole(item) {
    console.log(item);
}

[1, 2, 3].forEach(logToConsole);
['a', 'b'].forEach(logToConsole);
```

### 2. Asynchronous Handling
- Essential for non-blocking operations (I/O, timers, events).

```javascript
fs.readFile('data.txt', 'utf8', (err, data) => {
    // Handle file data without blocking the main thread
});
```

### 3. Separation of Concerns
- Outer function handles the "what" (iterating, processing), callback handles the "how" (specific action).

```javascript
function processArray(arr, action) {
    for (let i = 0; i < arr.length; i++) {
        action(arr[i], i);
    }
}

processArray([1, 2, 3], console.log);
processArray([1, 2, 3], (num, idx) => console.log(num * 2));
```

### 4. Customization / Strategy Pattern
- Change behavior without modifying core functions.

```javascript
function sortData(data, compareFunction) {
    return data.sort(compareFunction);
}

sortData([5, 2, 8], (a, b) => a - b);        // Ascending
sortData([5, 2, 8], (a, b) => b - a);        // Descending
```

### 5. Event-Driven Programming
- React to user actions, system events, or messages.

```javascript
document.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key);
});
```

### 6. Functional Programming
- Enables patterns like composition, currying, and partial application.

---

## ⚠️ Callback Hell (Pyramid of Doom)

A downside of callbacks is nesting multiple asynchronous operations, leading to unreadable code:

```javascript
getData(function(a) {
    getMoreData(a, function(b) {
        getEvenMoreData(b, function(c) {
            console.log(c);
        });
    });
});
```

**Solutions:**
- Promises
- Async/await
- Modularization (named functions)

---

## 📋 Summary Table

| Aspect                | Synchronous Callbacks                  | Asynchronous Callbacks               |
|-----------------------|----------------------------------------|--------------------------------------|
| **Execution timing**  | Immediate, within outer function       | Later, after outer function returns  |
| **Blocking**          | Yes (blocks the outer function)        | No (non-blocking)                    |
| **Call stack**        | Same stack frame                       | New stack frame later                |
| **Examples**          | `map()`, `filter()`, `forEach()`       | `setTimeout()`, event listeners, `fetch` |
| **Error handling**    | Try/catch works normally                | Usually via error-first pattern or `.catch` |


## Quick Revision Questions:

**1. What is a callback function and why is it used?**

- **Quick Note:** A callback is a function passed into another function as an argument, to be executed later. It's used for asynchronous operations, event handling, and higher-order functions.

- **Well-Explained Answer:**
    "A callback function is a function that is passed as an argument to another function and is intended to be executed after some operation has been completed or at a specific time. The function that receives the callback is often called a higher-order function.
    **Why used:**
    - **Asynchronous programming:** Callbacks allow code to continue running while waiting for an async task (like an API call or file read) to finish, without blocking.
    - **Event handling:** When a user clicks a button, the provided callback runs.
    - **Customizing behavior:** Higher-order functions like `map` use callbacks to let you define the transformation logic.
    - **Modularity and reusability:** They help separate generic logic from specific behavior."

**2. Difference between synchronous and asynchronous callbacks.**

- **Quick Note:** Synchronous callbacks are executed immediately within the higher-order function (e.g., `map`, `filter`). Asynchronous callbacks are executed later, after an asynchronous operation completes (e.g., `setTimeout`, event listeners).

- **Well-Explained Answer:**
    "The main difference is **when** the callback is executed relative to the surrounding code.
    - **Synchronous callbacks:** They are executed immediately, during the execution of the outer function. The outer function does not finish until the callback has run for every element. Examples: `array.map(callback)`, `array.forEach(callback)`, `sort(compareFunction)`. These callbacks block further code until they complete.
    - **Asynchronous callbacks:** They are executed later, after the current call stack is empty, typically in response to an event or completion of an async task. The outer function initiates the operation and returns immediately, allowing subsequent code to run. The callback is placed in a task queue and executed when the event loop gets to it. Examples: `setTimeout(callback, 1000)`, `button.addEventListener('click', callback)`, `fs.readFile('file', callback)` in Node.js.
    Understanding this difference is key to managing asynchronous flow and avoiding issues like callback hell."

**3. How do you pass arguments to a callback function?**

- **Quick Note:** You can pass arguments by wrapping the callback in an anonymous function or using `bind`.

- **Well-Explained Answer:**
    "When you pass a callback, you typically don't invoke it immediately; you pass the function reference. To pass specific arguments to the callback, you have a few options:
    1. **Wrap in an anonymous function:** This is the most common approach.
        ```javascript
        function myCallback(message) {
            console.log(message);
        }
        setTimeout(function() {
            myCallback('Hello after 1 second');
        }, 1000);
        ```
    2. **Use `bind`:** You can create a new function with pre-specified arguments.
        ```javascript
        setTimeout(myCallback.bind(null, 'Hello after 1 second'), 1000);
        ```
    3. **If the higher-order function supports additional parameters** (like `forEach` passes element, index, array), you can use them directly.
    Note: Do not invoke the callback when passing it (i.e., not `setTimeout(myCallback('arg'), 1000)`) because that would execute it immediately and pass its return value."

**4. Give 3 real-world examples of callbacks in JavaScript.**

- **Quick Note:** Event listeners, `setTimeout`, and array methods.

- **Well-Explained Answer:**
    "Three common real-world examples:
    1. **Event Listeners:**
        ```javascript
        document.getElementById('myButton').addEventListener('click', function() {
            alert('Button clicked!');
        });
        ```
        The anonymous function is a callback that runs when the click event occurs.
    2. **Timers (`setTimeout` / `setInterval`):**
        ```javascript
        setTimeout(() => {
            console.log('This runs after 2 seconds');
        }, 2000);
        ```
        The arrow function is a callback executed asynchronously after the delay.
    3. **Array Methods (like `map`):**
        ```javascript
        const numbers = [1, 2, 3];
        const doubled = numbers.map(n => n * 2);
        ```
        The arrow function is a synchronous callback applied to each element.
    These examples illustrate how callbacks are integral to both synchronous and asynchronous programming."

---

### Section A.8: Objects

## 🧱 Object Creation Methods

### 1. Object Literal `{}`
- Simplest and most common way to create an object.
- Properties are defined directly inside curly braces.

```javascript
const person = {
    name: 'Alice',
    age: 30,
    greet() {
        console.log('Hello!');
    }
};
```

### 2. Constructor Functions
- Use a function with the `new` keyword to create multiple similar objects.
- The function acts as a constructor – `this` refers to the newly created object.

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        console.log(`Hello, I'm ${this.name}`);
    };
}

const alice = new Person('Alice', 30);
const bob = new Person('Bob', 25);
```

### 3. `Object.create()`
- Creates a new object with the specified prototype object.
- Useful for setting the prototype explicitly.

```javascript
const animal = {
    speak() {
        console.log(`${this.name} makes a sound.`);
    }
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.speak(); // "Rex makes a sound."
```

### 4. ES6 Classes (Syntactic Sugar)
- Modern syntax for constructor functions and prototypes.

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
}
```

---

## 🔑 Accessing Properties

### Dot Notation
- Used when property name is a valid identifier (no spaces, not starting with a number, not a reserved word).
- Static – you must know the property name at write time.

```javascript
person.name; // "Alice"
```

### Bracket Notation
- Allows dynamic property names (variables) and property names that are not valid identifiers.
- The key is a string (or symbol) inside brackets.

```javascript
const key = 'age';
person[key]; // 30
person['favorite color'] = 'blue'; // property with space
```

**When to use:** Use dot notation for readability; use bracket notation when property names are dynamic or contain special characters.

---

## ✏️ Adding, Modifying, and Deleting Properties

- **Add/Modify:** Simply assign a value to a property. If it exists, it updates; if not, it creates.

```javascript
person.city = 'New York';       // add
person.age = 31;                // modify
```

- **Delete:** Use the `delete` operator. It removes the property entirely.

```javascript
delete person.city;             // true if successful
console.log(person.city);       // undefined
```

**Note:** `delete` only works on own properties, not inherited ones. It returns `true` even if the property didn't exist.

---

## 🧰 Object Methods

- Methods are functions stored as object properties.
- ES6 allows shorthand syntax.

```javascript
const calculator = {
    value: 0,
    add(n) {                // method shorthand
        this.value += n;
    },
    subtract: function(n) { // traditional method
        this.value -= n;
    }
};
calculator.add(5);
console.log(calculator.value); // 5
```

---

## ❤️ `this` Keyword in Objects

- Inside a method, `this` refers to the object that the method is called on.
- The value of `this` is determined by **how the function is called** (invocation context).

```javascript
const user = {
    name: 'Alice',
    greet() {
        console.log(`Hello, ${this.name}`);
    }
};
user.greet(); // "Hello, Alice" – `this` is user

const greetFunc = user.greet;
greetFunc();   // "Hello, undefined" – `this` is global (or undefined in strict mode)
```

- **Arrow functions** do not have their own `this`; they inherit `this` from the enclosing scope (lexical `this`).

```javascript
const obj = {
    name: 'Bob',
    greet: () => {
        console.log(`Hello, ${this.name}`); // `this` is not obj!
    }
};
obj.greet(); // "Hello, undefined" (in browser, `this` is window)
```

To preserve `this` in callbacks, use arrow functions, `bind()`, or store a reference (`const self = this`).

---

## 📦 Object Destructuring

- Extracts properties into variables with a concise syntax.
- Can set default values and rename variables.

```javascript
const person = { name: 'Alice', age: 30, city: 'Paris' };

// Basic destructuring
const { name, age } = person;
console.log(name, age); // Alice 30

// Renaming
const { name: fullName, city: residence } = person;
console.log(fullName, residence); // Alice Paris

// Default values
const { country = 'Unknown' } = person;
console.log(country); // Unknown

// Nested destructuring
const user = { id: 1, profile: { email: 'a@b.com' } };
const { profile: { email } } = user;
console.log(email); // a@b.com
```

---

## 🔍 `Object.keys()`, `Object.values()`, `Object.entries()`

- Static methods that return arrays of an object's own enumerable property names, values, or key-value pairs.

```javascript
const car = { brand: 'Tesla', model: 'Model 3', year: 2022 };

Object.keys(car);   // ['brand', 'model', 'year']
Object.values(car); // ['Tesla', 'Model 3', 2022]
Object.entries(car); // [['brand', 'Tesla'], ['model', 'Model 3'], ['year', 2022]]
```

These are useful for iteration:

```javascript
Object.entries(car).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
```

---

## 🔄 Shallow Copy vs Deep Copy

### Shallow Copy
- Copies the top-level properties, but nested objects are still referenced (shared).
- Methods: `Object.assign()`, spread operator `{...obj}`.

```javascript
const original = { name: 'Alice', address: { city: 'Paris' } };
const shallowCopy = { ...original };

shallowCopy.name = 'Bob';           // original.name unchanged
shallowCopy.address.city = 'London'; // original.address.city also changes!
console.log(original.address.city); // "London"
```

### Deep Copy
- Creates a completely independent clone, including all nested objects.
- Methods:
  - `JSON.parse(JSON.stringify(obj))` – simple but has limitations (no functions, `undefined`, `Symbol`, circular references).
  - `structuredClone()` – modern browser/Node API (handles more types).
  - Libraries like Lodash's `_.cloneDeep()`.

```javascript
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = 'Berlin';
console.log(original.address.city); // "Paris" – unchanged
```

**Note:** For objects with methods, circular references, or special types, `structuredClone()` or a library is safer.

```javascript
const deepCopy = structuredClone(original);
```

---

## 📋 Summary Table

| Topic | Key Points |
|-------|------------|
| **Creation** | Literal `{}`, constructor `new`, `Object.create()`, class |
| **Property Access** | Dot (static, valid identifiers), Bracket (dynamic, special chars) |
| **Add/Modify/Delete** | Assign to add/modify; `delete` operator to remove |
| **Methods** | Functions as properties; method shorthand; `this` refers to calling object |
| **`this`** | Depends on invocation; arrow functions inherit lexical `this` |
| **Destructuring** | `{ prop } = obj`; default values, renaming, nesting |
| **Static Methods** | `Object.keys()`, `values()`, `entries()` for iteration |
| **Copying** | Shallow: `{...obj}`, `Object.assign()`; Deep: `JSON.parse(JSON.stringify())`, `structuredClone()` |


## Quick Revision Questions:

**1. Different ways to create objects in JavaScript.**

- **Quick Note:** Object literal, constructor function, `Object.create()`, class syntax (ES6).

- **Well-Explained Answer:**
    "JavaScript offers multiple ways to create objects:
    1. **Object Literal (most common):** `const obj = { key: 'value' };` – simple and direct.
    2. **Constructor Function:** Define a function and use `new`.
        ```javascript
        function Person(name) {
            this.name = name;
        }
        const person = new Person('Alice');
        ```
    3. **`Object.create()`:** Creates a new object with the specified prototype.
        ```javascript
        const proto = { greet() { console.log('Hi'); } };
        const obj = Object.create(proto);
        obj.name = 'Bob';
        ```
    4. **Class Syntax (ES6):** Syntactic sugar over constructor functions.
        ```javascript
        class Animal {
            constructor(type) {
                this.type = type;
            }
        }
        const dog = new Animal('dog');
        ```
    5. **Factory Function:** A function that returns an object.
        ```javascript
        function createCar(model) {
            return { model, drive() { console.log('vroom'); } };
        }
        ```
    Each method has its use cases, with object literals being most common for simple data, and classes for more structured OOP."

**2. How does the delete operator work with objects?**

- **Quick Note:** `delete` removes a property from an object. It returns `true` if successful, `false` if the property is non-configurable. It does not affect the prototype chain.

- **Well-Explained Answer:**
    "The `delete` operator removes a property from an object. It returns `true` in most cases, except when the property is non-configurable (e.g., some built-in objects or properties defined with `Object.defineProperty` with `configurable: false`), in which case it returns `false` in strict mode or throws an error in non-strict? Actually, in non-strict it returns `false`. For example:
    ```javascript
    const obj = { a: 1, b: 2 };
    delete obj.a;        // true
    console.log(obj);    // { b: 2 }
    delete obj.toString; // true (but doesn't affect prototype)
    ```
    Important notes:
    - `delete` only removes the property from the object itself, not from its prototype chain. If the property is inherited, it's still accessible via the prototype.
    - It does not free memory; that's the garbage collector's job.
    - It cannot delete variables declared with `var`, `let`, or `const`, or functions.
    - In strict mode, attempting to delete a non-configurable property throws an error."

**3. Explain this keyword in object methods.**

- **Quick Note:** In a method, `this` refers to the object that the method is called on (the receiver), except for arrow functions where `this` is lexically inherited.

- **Well-Explained Answer:**
    "When a function is called as a method of an object (i.e., using dot or bracket notation), the `this` keyword inside that function refers to the object that the method was called on. This is dynamic binding. Example:
    ```javascript
    const user = {
        name: 'Alice',
        greet() {
            console.log(`Hello, I'm ${this.name}`);
        }
    };
    user.greet(); // 'Hello, I'm Alice' – `this` is `user`
    ```
    However, if you extract the method into a variable and call it, `this` may be lost (becomes global or `undefined` in strict mode). That's why we often need to bind methods or use arrow functions in certain contexts.
    **Arrow functions in methods:** Arrow functions do not have their own `this`; they capture `this` from the enclosing lexical context. So if you define a method using an arrow function, `this` will not refer to the object but to the outer scope (e.g., window). Therefore, arrow functions are generally not suitable for object methods unless you specifically need lexical `this`."

**4. What is the difference between shallow and deep copy?**

- **Quick Note:** Shallow copy copies the object's top-level properties; nested objects are still referenced. Deep copy recursively copies all nested objects, creating fully independent clones.

- **Well-Explained Answer:**
    "When copying objects, we distinguish between shallow and deep copy:
    - **Shallow Copy:** Creates a new object, but if the original has properties that are objects (reference types), the copy will share references to the same nested objects. Changing a nested object in the copy will affect the original. Methods: `Object.assign({}, source)`, spread operator `{ ...source }`, `Array.slice()` for arrays.
    - **Deep Copy:** Creates a new object and recursively copies all nested objects, so the copy is completely independent. Modifications in the deep copy do not affect the original. Methods: `JSON.parse(JSON.stringify(obj))` (has limitations: cannot copy functions, `undefined`, `Symbol`, circular references), or using libraries like Lodash's `cloneDeep`, or `structuredClone` (modern built-in).
    **Example:**
    ```javascript
    const original = { a: 1, b: { c: 2 } };
    const shallow = { ...original };
    shallow.b.c = 99; // original.b.c also becomes 99
    const deep = JSON.parse(JSON.stringify(original));
    deep.b.c = 100; // original.b.c remains 99
    ```
    Choosing the right copy method depends on whether you need independence of nested structures."

---

### Section A.9: Arrays & Array Methods

## 🧱 Array Creation and Initialization

### 1. Array Literal `[]` (Recommended)
```javascript
const fruits = ['apple', 'banana', 'orange'];
const empty = [];
const mixed = [1, 'hello', true, null];
```

### 2. `Array` Constructor
```javascript
const arr = new Array(5);        // creates an array with length 5 (empty slots)
const colors = new Array('red', 'green', 'blue'); // ['red', 'green', 'blue']
```
**Note:** `new Array(5)` creates a sparse array with `length` 5 but no actual elements. Avoid unless needed.

### 3. `Array.of()`
Creates an array from its arguments (unlike constructor, it handles single number correctly).
```javascript
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
```

### 4. `Array.from()`
Creates a new array from an array‑like or iterable object.
```javascript
Array.from('hello');        // ['h','e','l','l','o']
Array.from([1, 2, 3], x => x * 2); // [2, 4, 6] (mapping function)
```

### 5. Filling / Initializing Values
- `fill()`: fills with a static value.
```javascript
const zeros = new Array(5).fill(0); // [0,0,0,0,0]
```
- Spread + `map`:
```javascript
const squares = [...Array(5)].map((_, i) => i * i); // [0,1,4,9,16]
```

---

## 🔄 Array Methods: `map()`, `filter()`, `reduce()`

These three methods are the cornerstone of functional programming with arrays. They **do not mutate** the original array; they return new arrays or a single value.

---

### `map()` – Transform Each Element

- Creates a **new array** of the **same length**.
- Callback is applied to every element.
- Returns a new array with transformed values.

**Syntax:**
```javascript
const newArray = arr.map((element, index, array) => {
    // return transformed element
});
```

**Example:**
```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8]
```

**Use case:** Converting data types, extracting properties, applying calculations.

---

### `filter()` – Keep Elements That Pass a Test

- Creates a **new array** with elements that satisfy the condition.
- Callback returns `true` (keep) or `false` (discard).
- Length can be smaller than original.

**Syntax:**
```javascript
const filtered = arr.filter((element, index, array) => {
    // return boolean
});
```

**Example:**
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0); // [2, 4, 6]
```

**Use case:** Removing unwanted items, searching, validation.

---

### `reduce()` – Reduce Array to a Single Value

- Executes a reducer function on each element, accumulating a result.
- Returns a single value (number, string, object, array, etc.).
- Requires an **initial value** for the accumulator (optional but recommended).

**Syntax:**
```javascript
const result = arr.reduce((accumulator, current, index, array) => {
    // return new accumulator
}, initialValue);
```

**Examples:**

Sum of numbers:
```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, cur) => acc + cur, 0); // 10
```

Flatten an array of arrays:
```javascript
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, cur) => acc.concat(cur), []); // [1,2,3,4,5]
```

Count occurrences:
```javascript
const fruits = ['apple', 'banana', 'apple', 'orange'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {}); // { apple: 2, banana: 1, orange: 1 }
```

---

## ⛓️ Chaining Array Methods

Because `map()`, `filter()`, and `reduce()` return new arrays (or values), you can chain them together for clean, readable data transformations.

**Example:** Take numbers, keep only evens, double them, then sum.
```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers
    .filter(n => n % 2 === 0)   // [2,4,6]
    .map(n => n * 2)            // [4,8,12]
    .reduce((sum, n) => sum + n, 0); // 24

console.log(result); // 24
```

**Benefits:**
- Declarative: describes *what* to do, not *how*.
- Easy to modify steps.
- Avoids temporary variables.

---

## ⚖️ `forEach()` vs `map()`

Both iterate over arrays, but they serve different purposes.

| Feature          | `forEach()`                                | `map()`                                    |
|------------------|--------------------------------------------|--------------------------------------------|
| **Return value** | `undefined`                                | **New array** with transformed elements    |
| **Purpose**      | Perform side effects (logging, modifying external variables, DOM updates) | Transform data (create a new array)        |
| **Chaining**     | Cannot chain after (returns `undefined`)   | Can chain other array methods               |
| **Mutation**     | Usually used to mutate something (but not the original array unless you do) | Does not mutate original; returns new array |
| **Performance**  | Slightly faster if you don't need a new array | May have overhead of creating a new array   |

### When to use each?
- Use **`forEach()`** when you want to do something with each element but don't need a new array (e.g., logging, pushing to an external array, updating DOM).
- Use **`map()`** when you want to transform the array and use the result.

**Example:**
```javascript
// forEach – side effect (logging)
[1, 2, 3].forEach(num => console.log(num));

// map – transformation
const doubled = [1, 2, 3].map(num => num * 2);
```

---

## 📝 Key Takeaways

- `map()`, `filter()`, and `reduce()` are **immutable** – they return new arrays/values.
- **Chaining** them leads to clean, functional code.
- `forEach()` is for side effects; `map()` is for transformation.
- Always provide an initial value to `reduce()` to avoid errors with empty arrays.
- Use `Array.from()` or spread when you need to create arrays from array‑like objects.


## Quick Revision Questions:

**1. Explain map(), filter(), and reduce() with examples.**

- **Quick Note:** `map` transforms each element, returns new array. `filter` selects elements based on condition, returns new array. `reduce` accumulates values into a single result.

- **Well-Explained Answer:**
    "These three methods are fundamental for array manipulation:
    - **`map()`:** Creates a new array by applying a function to every element.
        ```javascript
        const numbers = [1, 2, 3];
        const squares = numbers.map(n => n * n); // [1, 4, 9]
        ```
    - **`filter()`:** Creates a new array with elements that pass a test.
        ```javascript
        const numbers = [1, 2, 3, 4];
        const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
        ```
    - **`reduce()`:** Executes a reducer function on each element, resulting in a single output value.
        ```javascript
        const numbers = [1, 2, 3, 4];
        const sum = numbers.reduce((accumulator, current) => accumulator + current, 0); // 10
        ```
        The accumulator is the running result; the initial value (0) is optional. If omitted, the first element is used as initial accumulator, and iteration starts from the second element.
    These methods are immutable (do not modify the original array) and are often chained for complex data transformations."

**2. What is the difference between map() and forEach()?**

- **Quick Note:** `map()` returns a new array, `forEach()` returns `undefined` and is used for side effects.

- **Well-Explained Answer:**
    "While both iterate over array elements, they serve different purposes:
    - **`map()`:** Creates and returns a new array populated with the results of calling the provided function on every element. It is used for transforming data.
    - **`forEach()`:** Executes a provided function once for each array element. It returns `undefined` and is primarily used for performing side effects (e.g., logging, modifying external variables) rather than producing a new array.
    **Example:**
    ```javascript
    const arr = [1, 2, 3];
    const mapped = arr.map(x => x * 2); // mapped = [2, 4, 6], arr unchanged
    arr.forEach(x => console.log(x));   // logs 1,2,3, returns undefined
    ```
    Because `forEach` doesn't return a value, it cannot be chained with other array methods in a functional pipeline. Use `map` when you need a transformed array, `forEach` when you just need to perform an action."

**3. How to chain map(), filter(), and reduce()?**

- **Quick Note:** Chaining is possible because each method returns a new array (except `reduce` which returns a single value). You can chain `filter` and `map` before `reduce`.

- **Well-Explained Answer:**
    "Chaining is a powerful pattern where you apply multiple array methods sequentially. For example, suppose we have an array of numbers and we want to filter out odd numbers, then square the evens, then sum them:
    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const result = numbers
        .filter(n => n % 2 === 0)   // [2, 4]
        .map(n => n * n)            // [4, 16]
        .reduce((sum, n) => sum + n, 0); // 20
    console.log(result); // 20
    ```
    Each method returns a new array (except `reduce` which produces a final value), allowing the next method to operate on the transformed array. This leads to clean, readable data processing pipelines."

**4. What does reduce() return and how does accumulator work?**

- **Quick Note:** `reduce()` returns a single accumulated value (which could be a number, string, object, array, etc.). The accumulator is the value returned from the previous iteration, starting with the initial value.

- **Well-Explained Answer:**
    "The `reduce()` method executes a reducer function on each element of the array, resulting in a single output value. The reducer function receives two main arguments: **accumulator** and **currentValue**. The accumulator is the accumulated result from the previous iteration. On the first iteration, the accumulator is set to the `initialValue` if provided, otherwise it's the first element of the array.
    The reducer returns the new accumulator value, which is then used in the next iteration. After the last element, the final accumulator value is returned by `reduce()`.
    Example with explicit accumulator:
    ```javascript
    const numbers = [1, 2, 3, 4];
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    // Iteration 1: acc = 0, curr = 1 → returns 1
    // Iteration 2: acc = 1, curr = 2 → returns 3
    // Iteration 3: acc = 3, curr = 3 → returns 6
    // Iteration 4: acc = 6, curr = 4 → returns 10
    // final return: 10
    ```
    The accumulator can be any type, making `reduce` extremely flexible—it can build objects, arrays, or any other structure."


### Section A.10: Destructuring

## 📦 Destructuring – What Is It?

Destructuring is a convenient way to **extract values** from arrays or properties from objects and assign them to variables in a single statement. It makes code cleaner and more readable.

---

## 🧩 Array Destructuring

Extract values from an array based on their position (index).

### Basic Syntax
```javascript
const [variable1, variable2, ...rest] = array;
```

### Examples
```javascript
const colors = ['red', 'green', 'blue'];

// Basic unpacking
const [first, second] = colors;
console.log(first);  // 'red'
console.log(second); // 'green'

// Skipping elements
const [, , third] = colors;
console.log(third);  // 'blue'

// With rest operator (collect remaining)
const [primary, ...others] = colors;
console.log(primary); // 'red'
console.log(others);  // ['green', 'blue']
```

### Use Cases
- Swapping variables without a temporary variable:
  ```javascript
  let a = 1, b = 2;
  [a, b] = [b, a]; // a=2, b=1
  ```
- Parsing returned arrays from functions:
  ```javascript
  function getCoordinates() {
      return [10, 20];
  }
  const [x, y] = getCoordinates();
  ```

---

## 🧱 Object Destructuring

Extract properties from an object by matching property names.

### Basic Syntax
```javascript
const { prop1, prop2 } = object;
```

### Examples
```javascript
const person = { name: 'Alice', age: 30, city: 'Paris' };

// Extract properties
const { name, age } = person;
console.log(name); // 'Alice'
console.log(age);  // 30

// Extracting a property that doesn't exist yields undefined
const { country } = person; // undefined
```

---

## 🎯 Default Values

You can assign a **default value** if the extracted value is `undefined`. Works for both array and object destructuring.

### Array with Defaults
```javascript
const numbers = [1];
const [a, b = 10] = numbers;
console.log(a); // 1
console.log(b); // 10 (default used)
```

### Object with Defaults
```javascript
const user = { username: 'jsmith' };
const { username, role = 'user' } = user;
console.log(username); // 'jsmith'
console.log(role);     // 'user' (default)
```

Default values can also be more complex expressions or function calls.

---

## 🔁 Rest Operator (`...`) in Destructuring

The rest operator collects the **remaining** elements (array) or properties (object) into a new array or object.

### Array Rest
```javascript
const scores = [90, 85, 88, 92];
const [firstScore, ...otherScores] = scores;
console.log(firstScore);   // 90
console.log(otherScores);  // [85, 88, 92]
```

### Object Rest
```javascript
const person = { name: 'Bob', age: 25, city: 'London', job: 'dev' };
const { name, ...details } = person;
console.log(name);    // 'Bob'
console.log(details); // { age: 25, city: 'London', job: 'dev' }
```

**Note:** The rest operator must be the last element in the destructuring pattern.

---

## 🪆 Nested Destructuring

Destructure deeply nested arrays or objects by mirroring their structure.

### Nested Arrays
```javascript
const matrix = [[1, 2], [3, 4]];
const [[a, b], [c, d]] = matrix;
console.log(a, b, c, d); // 1 2 3 4
```

### Nested Objects
```javascript
const user = {
    id: 101,
    profile: {
        firstName: 'John',
        lastName: 'Doe',
        address: {
            city: 'New York',
            zip: 10001
        }
    }
};

const { profile: { firstName, lastName, address: { city } } } = user;
console.log(firstName); // 'John'
console.log(city);      // 'New York'
```

You can combine array and object destructuring as needed.

---

## 🏷️ Renaming Variables During Destructuring

Sometimes you want to assign a property to a variable with a **different name**. Use `:` to specify the new variable name.

### Object Renaming
```javascript
const person = { name: 'Alice', age: 30 };
const { name: fullName, age: years } = person;
console.log(fullName); // 'Alice'
console.log(years);    // 30
```

You can also provide defaults while renaming:
```javascript
const { name: fullName, role: position = 'employee' } = person;
```

### Array Renaming
Arrays don't have named properties, but you can assign to any variable name – the position determines the value.
```javascript
const colors = ['red', 'green'];
const [primary, secondary] = colors; // names are free
// No "renaming" needed – you pick the variable names.
```

---

## 💡 Practical Examples

### Function Parameters Destructuring
Instead of accessing `options` object properties inside a function, destructure them right in the parameter list.

```javascript
function displayUser({ name, age, city = 'Unknown' }) {
    console.log(`${name} (${age}) from ${city}`);
}

const user = { name: 'Emma', age: 28 };
displayUser(user); // "Emma (28) from Unknown"
```

### Looping with Destructuring
```javascript
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

for (const { id, name } of users) {
    console.log(`User ${id}: ${name}`);
}
```

### Swapping and Returning Multiple Values
```javascript
function getMinMax(numbers) {
    return [Math.min(...numbers), Math.max(...numbers)];
}
const [min, max] = getMinMax([5, 2, 8, 1, 9]);
console.log(min, max); // 1 9
```

---

## ✅ Summary Table

| Feature               | Array Destructuring                          | Object Destructuring                         |
|-----------------------|-----------------------------------------------|----------------------------------------------|
| **Syntax**            | `const [a, b] = arr`                          | `const {prop, prop2} = obj`                  |
| **Order**             | By position (index)                           | By property name (key)                        |
| **Skipping items**    | `const [,, third] = arr`                      | Not applicable (must use correct property name) |
| **Default values**    | `const [a = 10] = arr`                        | `const {prop = 10} = obj`                     |
| **Rest operator**     | `const [first, ...rest] = arr`                | `const {a, ...rest} = obj`                    |
| **Nested**            | `const [[inner]] = nestedArr`                 | `const {outer: {inner}} = nestedObj`          |
| **Renaming**          | Not needed (variable names are free)          | `const {prop: newName} = obj`                 |



## Quick Revision Questions:

**1. Difference between array and object destructuring.**

- **Quick Note:** Array destructuring uses position to match variables; object destructuring uses property names.

- **Well-Explained Answer:**
    "Destructuring allows unpacking values from arrays or properties from objects into distinct variables.
    - **Array destructuring:** Values are extracted based on their position (index). You can use any variable names.
        ```javascript
        const [a, b] = [10, 20]; // a=10, b=20
        const [first, , third] = [1,2,3]; // first=1, third=3
        ```
    - **Object destructuring:** Values are extracted by matching property names. Variable names usually match the property names, but you can rename them.
        ```javascript
        const { name, age } = { name: 'Alice', age: 30 }; // name='Alice', age=30
        const { name: userName } = { name: 'Bob' }; // userName='Bob'
        ```
    Both can use default values and rest patterns."

**2. How to assign default values in destructuring?**

- **Quick Note:** Use `=` to assign a default value if the unpacked value is `undefined`.

- **Well-Explained Answer:**
    "Default values can be provided in destructuring assignments. They are used when the value extracted from the array/object is `undefined`.
    **Array example:**
    ```javascript
    const [x = 5, y = 10] = [7]; // x=7, y=10 (default)
    ```
    **Object example:**
    ```javascript
    const { a = 1, b = 2 } = { a: 3 }; // a=3, b=2
    ```
    This is helpful when dealing with incomplete data or optional properties."

**3. How to rename variables during object destructuring?**

- **Quick Note:** Use `{ originalName: newName }` syntax.

- **Well-Explained Answer:**
    "To rename a variable while destructuring an object, you write `propertyName: newVariableName`. For instance:
    ```javascript
    const user = { id: 1, fullName: 'John Doe' };
    const { id: userId, fullName: name } = user;
    console.log(userId); // 1
    console.log(name);   // 'John Doe'
    ```
    This is useful when you want to avoid naming conflicts or use more descriptive names."

**4. Explain nested destructuring.**

- **Quick Note:** Destructuring can be applied to nested arrays/objects by following the structure.

- **Well-Explained Answer:**
    "Nested destructuring allows you to extract values from objects or arrays within objects/arrays. You mirror the structure of the data.
    **Example with nested object:**
    ```javascript
    const data = {
        user: {
            address: {
                city: 'New York',
                zip: 10001
            }
        }
    };
    const { user: { address: { city } } } = data;
    console.log(city); // 'New York'
    ```
    **Example with nested array:**
    ```javascript
    const matrix = [[1, 2], [3, 4]];
    const [[a, b], [c, d]] = matrix; // a=1, b=2, c=3, d=4
    ```
    It can also combine array and object destructuring. This is powerful for extracting deeply nested data concisely."

### Section A.11: Data Types & Data Comparison

## 🧱 JavaScript Data Types

JavaScript has two categories of data types: **Primitive** and **Reference** (also called Objects).

### 🔹 Primitive Types
Primitives are immutable and stored directly in the variable (by value).

| Type      | Description                                                                 | Example                  |
|-----------|-----------------------------------------------------------------------------|--------------------------|
| **String**  | Textual data. Can be in single, double, or backticks (template literals).   | `'hello'`, `"world"`, `` `hi` `` |
| **Number**  | Integers and floating-point numbers. Also `Infinity`, `-Infinity`, `NaN`.   | `42`, `3.14`, `-10`      |
| **Boolean** | Logical entity: `true` or `false`.                                           | `true`, `false`          |
| **Null**    | Represents **intentional absence** of any object value.                     | `null`                   |
| **Undefined**| Variable declared but not assigned a value.                                 | `let x;` → `undefined`   |
| **Symbol**  | Unique and immutable primitive, often used as object property keys. (ES6)   | `Symbol('id')`           |
| **BigInt**  | For integers larger than 2⁵³-1. (ES2020)                                    | `9007199254740991n`      |

**Note:** `typeof null` returns `"object"` – a historical bug in JavaScript that cannot be fixed because it would break existing code.

### 🔸 Reference Types
Reference types are stored as references (pointers) to memory locations. They are mutable and can have properties/methods.

| Type       | Description                                                                 | Example                          |
|------------|-----------------------------------------------------------------------------|----------------------------------|
| **Object** | Collection of key-value pairs.                                               | `{ name: 'Alice', age: 30 }`    |
| **Array**  | Ordered list of values (zero-indexed).                                      | `[1, 2, 3]`                     |
| **Function**| Callable object that can be executed.                                      | `function() {}` or `() => {}`   |
| **Date**   | For dates and times.                                                         | `new Date()`                    |
| **RegExp** | For regular expressions.                                                     | `/pattern/`                     |
| **Map/Set**| ES6 collections.                                                             | `new Map()`, `new Set()`        |

**Key difference:** Primitives are compared by value, references by reference (identity).

---

## 🔍 `typeof` Operator

`typeof` returns a string indicating the type of the operand.

```javascript
typeof "hello"          // "string"
typeof 42               // "number"
typeof true             // "boolean"
typeof undefined        // "undefined"
typeof Symbol()         // "symbol"
typeof 10n              // "bigint"
typeof null             // "object"  (historical quirk)
typeof { a: 1 }         // "object"
typeof [1,2]            // "object" (arrays are objects)
typeof function(){}     // "function"
typeof NaN              // "number" (NaN is a number, despite its name)
```

**Note:** `typeof` is not reliable for differentiating between object types (e.g., array vs plain object). Use `Array.isArray()` or `instanceof` for that.

---

## 🔄 Type Coercion

JavaScript automatically converts types when needed (**implicit coercion**). You can also explicitly convert (**explicit coercion**).

### Implicit Coercion
Happens in contexts like arithmetic, comparison, or string concatenation.

```javascript
// String concatenation
'5' + 3      // '53' (number coerced to string)

// Numeric operations
'5' - 3      // 2 (string coerced to number)
'5' * '2'    // 10 (both coerced to numbers)

// Boolean coercion
if ('hello') { }  // 'hello' is truthy → block executes
```

### Explicit Coercion (Type Casting)
Using functions or operators to convert manually.

```javascript
// To String
String(123)      // '123'
(123).toString() // '123'

// To Number
Number('123')    // 123
parseInt('123')  // 123
+'123'           // 123 (unary plus)

// To Boolean
Boolean(0)       // false
!!'hello'        // true
```

---

## ⚖️ `==` vs `===`

### Loose Equality (`==`)
- Compares values **after type coercion** (if types differ, it tries to convert them).
- Can lead to unexpected results.

```javascript
5 == '5'        // true (string '5' becomes number 5)
0 == false      // true (false becomes 0)
null == undefined // true
[] == false     // true (both become 0 after coercion)
```

### Strict Equality (`===`)
- Compares values **without type coercion** – returns `true` only if both value and type are identical.
- Always preferred to avoid surprises.

```javascript
5 === '5'       // false
0 === false     // false
null === undefined // false
[] === false    // false
```

**Rule of thumb:** Use `===` almost always. Use `==` only when you intentionally want type coercion (rare).

---

## ✅ Truthy and Falsy Values

In boolean contexts (like `if` conditions), values are coerced to `true` or `false`.

### Falsy Values (evaluate to `false`)
- `false`
- `0` (zero)
- `-0`
- `0n` (BigInt zero)
- `''` (empty string)
- `null`
- `undefined`
- `NaN`

Everything else is **truthy**, including:
- `'0'` (string containing zero)
- `'false'` (string)
- `[]` (empty array)
- `{}` (empty object)
- `function(){}` (any function)
- `Infinity`

```javascript
if ('')      // false
if ('hello') // true
if ([])      // true (empty array is truthy!)
```

---

## ❓ NaN and `isNaN()`

**NaN** stands for "Not a Number". It is the result of invalid or undefined mathematical operations.

```javascript
0 / 0             // NaN
parseInt('abc')   // NaN
```

### Quirks of `NaN`
- `typeof NaN` is `"number"` (yes, it's a number type representing an invalid number).
- `NaN` is **not equal to itself**:
  ```javascript
  NaN === NaN  // false
  NaN == NaN   // false
  ```
- To check if a value is `NaN`, use `Number.isNaN()` (ES6) or the global `isNaN()` (with caution).

### `isNaN()` vs `Number.isNaN()`
- **Global `isNaN()`** – first coerces the value to a number, then checks if it's `NaN`.
  ```javascript
  isNaN('hello')   // true, because Number('hello') → NaN
  isNaN('123')     // false
  isNaN(undefined) // true (Number(undefined) → NaN)
  ```
- **`Number.isNaN()`** (ES6) – does **not** coerce; returns `true` only if the value is strictly `NaN`.
  ```javascript
  Number.isNaN('hello')   // false
  Number.isNaN(NaN)       // true
  Number.isNaN(undefined) // false
  ```

**Best practice:** Use `Number.isNaN()` for reliable NaN checking.

---

## 📋 Summary Table

| Concept               | Key Points |
|-----------------------|------------|
| **Primitive types**   | String, Number, Boolean, Null, Undefined, Symbol, BigInt – stored by value, immutable. |
| **Reference types**   | Object, Array, Function – stored by reference, mutable. |
| **`typeof`**          | Returns type string. `typeof null` → `"object"` (bug). |
| **Type coercion**     | Implicit (automatic) and explicit (manual) conversion. |
| **`==` vs `===`**     | `==` allows coercion, `===` does not. Prefer `===`. |
| **Truthy/Falsy**      | Falsy: `false, 0, -0, 0n, '', null, undefined, NaN`. All else truthy. |
| **`NaN`**             | Not a Number, but `typeof NaN` is `"number"`. Use `Number.isNaN()` to check. |


## Quick Revision Questions:


**1. List all primitive and reference data types.**

- **Quick Note:** Primitives: String, Number, Boolean, Undefined, Null, Symbol, BigInt. Reference: Object (including Array, Function, Date, RegExp, etc.)

- **Well-Explained Answer:**
    "JavaScript has two categories of data types:
    - **Primitive types** (immutable, stored by value):
        - `string`
        - `number`
        - `boolean`
        - `undefined`
        - `null`
        - `symbol` (ES6)
        - `bigint` (ES2020)
    - **Reference types** (mutable, stored by reference):
        - `object` (plain objects, arrays, functions, dates, regexps, etc.)
    Functions are a special kind of object, but they are callable. Arrays are also objects with special behavior. The key distinction is how they are stored and compared: primitives are compared by value, objects by reference."

**2. Difference between == and ===.**

- **Quick Note:** `==` performs type coercion before comparison; `===` compares both value and type without coercion.

- **Well-Explained Answer:**
    "The equality operators differ in how they handle types:
    - **`==` (abstract equality):** Compares two values after converting them to a common type (type coercion). For example, `5 == '5'` returns `true` because the string `'5'` is coerced to number `5`. This can lead to unexpected results (e.g., `0 == false` is `true`).
    - **`===` (strict equality):** Compares both value and type without any coercion. It returns `true` only if both are of the same type and same value. `5 === '5'` is `false` because one is number and the other string.
    **Best practice:** Always prefer `===` to avoid bugs from implicit coercion. Use `==` only when you explicitly intend to allow coercion (rare)."

**3. What are truthy and falsy values?**

- **Quick Note:** Falsy values: `false`, `0`, `''` (empty string), `null`, `undefined`, `NaN`. Everything else is truthy.

- **Well-Explained Answer:**
    "In JavaScript, when a value is used in a boolean context (like an `if` condition), it is coerced to either `true` or `false`. Values that coerce to `false` are called **falsy**. There are exactly 8 falsy values (in modern JS):
    - `false`
    - `0` (and `-0`)
    - `0n` (BigInt zero)
    - `''` (empty string)
    - `null`
    - `undefined`
    - `NaN`
    - `document.all` (historical, rarely used)
    All other values are **truthy**, including `'0'`, `'false'`, `[]` (empty array), `{}` (empty object), and functions. This is important for conditional checks."

**4. Explain type coercion with examples.**

- **Quick Note:** Type coercion is the automatic or implicit conversion of values from one data type to another (e.g., string to number, number to boolean).

- **Well-Explained Answer:**
    "Type coercion happens when operators or functions automatically convert values to the expected type. It can be implicit (automatic) or explicit (when you use `Number()`, `String()`, etc.).
    **Examples of implicit coercion:**
    1. **String coercion:** When using `+` with a string and another type.
        ```javascript
        console.log('5' + 3);   // '53' (number 3 coerced to string)
        console.log(5 + '3');   // '53'
        ```
    2. **Numeric coercion:** With other arithmetic operators (`-`, `*`, `/`, `%`).
        ```javascript
        console.log('10' - 5);   // 5 (string '10' coerced to number)
        console.log('10' * '2'); // 20 (both strings coerced to numbers)
        ```
    3. **Boolean coercion:** In logical contexts (`if`, `&&`, `||`).
        ```javascript
        if ('hello') { console.log('truthy'); } // runs because 'hello' is truthy
        console.log(5 || 0); // 5 (5 is truthy, returns first truthy)
        ```
    4. **Equality coercion (`==`):**
        ```javascript
        console.log(5 == '5');   // true (string coerced to number)
        console.log(null == undefined); // true (special rule)
        ```
    Understanding coercion helps avoid unexpected behavior. It's often safer to use explicit coercion (e.g., `Number(value)`, `String(value)`) for clarity."
