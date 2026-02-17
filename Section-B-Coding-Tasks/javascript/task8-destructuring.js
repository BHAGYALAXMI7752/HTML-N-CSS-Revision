// ✅ Task 8.1 – Object Destructuring (Basics + Nested)
// --------------------------------------------
// Task 8.1 - Object Destructuring
// --------------------------------------------

const user = {
  id: 101,
  name: "bhagya",
  age: 24,
  address: {
    city: "Hyderabad",
    state: "Telangana"
  }
};

// >> Basic destructuring
const { id, name, age } = user;
console.log(id, name, age);

// >> Rename variables
const { name: userName } = user;
console.log("Renamed:", userName);

// >> Nested destructuring
const { address: { city, state } } = user;
console.log(city, state);

// >> Default value
const { country = "India" } = user;
console.log("Country:", country);

/*
Explanation:
- Destructuring extracts properties from objects into variables.
- Basic destructuring: `{ id, name, age }` creates variables with the same names as the properties.
- Renaming: `{ name: userName }` extracts `name` but assigns it to a variable named `userName`.
- Nested destructuring: `{ address: { city, state } }` drills into the nested `address` object and extracts `city` and `state`.
- Default values: if a property is missing (like `country`), the default value `"India"` is used.
*/

// ✅ Task 8.2 – Array Destructuring
// --------------------------------------------
// Task 8.2 - Array Destructuring
// --------------------------------------------

const numbers = [10, 20, 30, 40, 50];

// >> Basic
const [first, second] = numbers;
console.log(first, second);

// >> Skip values
const [ , , third] = numbers;
console.log("Third:", third);

// >> Rest operator
const [head, ...rest] = numbers;
console.log("Head:", head);
console.log("Rest:", rest);

/*
Explanation:
- Array destructuring unpacks values from an array into variables based on position.
- Basic: `[first, second]` assigns the first two elements.
- Skipping: commas skip elements; `[ , , third]` assigns the third element.
- Rest operator: `[head, ...rest]` assigns the first element to `head` and collects the remaining elements into a new array `rest`.
*/

// ✅ Task 8.3 – Function Parameter Destructuring
// --------------------------------------------
// Task 8.3 - Function Parameter Destructuring
// --------------------------------------------

function printUser({ name, age }) {
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
}

printUser({ name: "John", age: 30 });

/*
Explanation:
- Function parameters can use destructuring to directly extract properties from an object passed as an argument.
- Here `printUser` expects an object and destructures `name` and `age` from it.
- This eliminates the need to access properties via `user.name` inside the function.
*/

// ✅ Task 8.4 – Swapping Variables 
// --------------------------------------------
// Task 8.4 - Swap Variables
// --------------------------------------------

let a = 5;
let b = 10;

[a, b] = [b, a];

console.log("a:", a);
console.log("b:", b);

/*
Explanation:
- Destructuring assignment can be used to swap variables without a temporary variable.
- `[a, b] = [b, a]` creates an array `[b, a]` and then destructures it, assigning the first element to `a` and the second to `b`, effectively swapping their values.
*/

// ✅ Task 8.5 – Destructuring with REST in Objects
// --------------------------------------------
// Task 8.5 - Object Rest Operator
// --------------------------------------------

const student = {
  name: "Rahul",
  age: 22,
  marks: 80,
  grade: "A"
};

const { name: studentName, ...otherDetails } = student;

console.log("Name:", studentName);
console.log("Other Details:", otherDetails);

/*
Explanation:
- The rest operator (`...`) in object destructuring collects any remaining own enumerable property keys that were not explicitly destructured.
- Here `name` is extracted and renamed to `studentName`.
- All other properties (`age`, `marks`, `grade`) are gathered into the new object `otherDetails`.
- This is useful for separating specific properties from the rest of an object.
*/