// ✅ Task 9.1 – Spread with Arrays
// --------------------------------------------
// Task 9.1 - Spread with Arrays
// --------------------------------------------

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// >> Merge arrays
const merged = [...arr1, ...arr2];
console.log("Merged:", merged);

// >> Add elements
const updated = [...arr1, 100];
console.log("Add Element:", updated);

// >> Copy array (Shallow copy)
const copy = [...arr1];
console.log("Copy:", copy);

/*
Explanation:
- The spread operator (`...`) expands an array into its individual elements.
- Merging arrays: `[...arr1, ...arr2]` creates a new array containing all elements of `arr1` followed by all elements of `arr2`.
- Adding elements: `[...arr1, 100]` inserts `100` at the end of the new array.
- Shallow copy: `[...arr1]` creates a new array with the same elements; nested objects are still shared.
*/

// ✅ Task 9.2 – Spread with Objects
// --------------------------------------------
// Task 9.2 - Spread with Objects
// --------------------------------------------

const user = {
  name: "bhagya",
  age: 24
};

// >> Copy object
const userCopy = { ...user };
console.log("Copy:", userCopy);

// >> Update property
const updatedUser = { ...user, age: 25 };
console.log("Updated:", updatedUser);

// >> Add property
const extendedUser = { ...user, role: "Developer" };
console.log("Extended:", extendedUser);

/*
Explanation:
- Spread on objects copies enumerable properties from the source object into a new object.
- Copy: `{ ...user }` creates a shallow clone of `user`.
- Update: `{ ...user, age: 25 }` copies all properties and then overrides `age` with the new value.
- Add: `{ ...user, role: "Developer" }` adds a new property `role` while keeping existing ones.
*/

// ✅ Task 9.3 – Rest Parameters in Function
// --------------------------------------------
// Task 9.3 - Rest Parameters
// --------------------------------------------

function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3));
console.log(sum(10, 20, 30, 40));

/*
Explanation:
- Rest parameters (`...numbers`) collect all remaining arguments passed to a function into an array.
- Here, `sum` can accept any number of arguments; they are gathered into the `numbers` array.
- The function then uses `reduce` to compute the total.
*/

// ✅ Task 9.4 – Difference Between Spread and Rest
// Spread → Expands
const numbers = [1, 2, 3];
console.log(...numbers); // 1 2 3

// Rest → Collects
function show(...args) {
  console.log(args);
}
show(1, 2, 3); // [1,2,3]

/*
Explanation:
- Spread and rest use the same `...` syntax but serve opposite purposes.
- Spread **expands** an iterable (like an array) into individual elements (used in array/object literals or function calls).
- Rest **collects** individual elements into an array (used in function parameters or destructuring).
- In `console.log(...numbers)`, spread expands the array so the three values are logged separately.
- In `function show(...args)`, rest gathers the arguments `1,2,3` into the array `args`.
*/

// ✅ Task 9.5 – Real Interview Scenario (React-style Update)
// --------------------------------------------
// Task 9.5 - Immutable Update
// --------------------------------------------

const state = {
  name: "bhagya",
  skills: ["HTML", "CSS"]
};

// Add skill without mutating original
const newState = {
  ...state,
  skills: [...state.skills, "React"]
};

console.log("Old State:", state);
console.log("New State:", newState);

/*
Explanation:
- This demonstrates an immutable update pattern common in React/Redux.
- `...state` copies all existing properties.
- The `skills` property is overwritten with a new array created by spreading the old `skills` and adding `"React"`.
- The original `state` object remains unchanged, and `newState` is a separate object with the updated `skills` array.
*/

// ✅ Task 9.6 – Combining Destructuring + Rest
// --------------------------------------------
// Task 9.6 - Destructuring + Rest
// --------------------------------------------

const student = {
  name: "Ram",
  age: 22,
  marks: 80,
  city: "Delhi"
};

const { name, ...remaining } = student;

console.log("Name:", name);
console.log("Remaining:", remaining);

/*
Explanation:
- Destructuring combined with rest allows extracting specific properties while collecting the rest into a new object.
- `{ name, ...remaining } = student` extracts the `name` property into a variable `name`, and all other properties (`age`, `marks`, `city`) are gathered into the `remaining` object.
- This is useful for separating a known key from the rest of the data.
*/