// ✅ Task 6.1 – Create student Object with Method
// --------------------------------------------
// Task 6.1 - Student Object
// --------------------------------------------

const student = {
  name: "bhagya",
  age: 22,
  course: "BCA",

  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}, Course: ${this.course}`;
  }
};

console.log(student.getDetails());

/*
Explanation:
- The `student` object is created with three properties: `name`, `age`, and `course`.
- It includes a method `getDetails` (defined using the concise method syntax).
- Inside `getDetails`, `this` refers to the object itself, so it can access the properties.
- The method returns a formatted string containing the student's details.
*/

// ✅ Task 6.2 – Deep Clone Function (Handles Nested Objects)
// --------------------------------------------
// Task 6.2 - Deep Clone Function
// --------------------------------------------

function deepClone(obj) {

  // If not object or is null, return directly
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // Handle objects
  const clonedObj = {};

  for (let key in obj) {
    clonedObj[key] = deepClone(obj[key]);
  }

  return clonedObj;
}


// Example
const original = {
  name: "John",
  address: {
    city: "Hyderabad"
  }
};

const copied = deepClone(original);

copied.address.city = "Bangalore";

console.log(original.address.city); // Hyderabad
console.log(copied.address.city);   // Bangalore

/*
Explanation:
- The function creates a deep copy of an object, recursively cloning nested structures.
- It first checks if the input is `null` or not an object; if so, it returns the value directly (primitive values are copied by value).
- For arrays, it uses `map` with a recursive call to clone each element.
- For plain objects, it iterates over enumerable properties and recursively clones each property value into a new object.
- The example demonstrates that modifying a nested property in the copied object does not affect the original, confirming a deep clone.
*/

// ✅ Task 6.3 – Computed Property Names
// --------------------------------------------
// Task 6.3 - Computed Property Names
// --------------------------------------------

const dynamicKey = "email";

const user = {
  name: "bhagya",
  [dynamicKey]: "bhagya@example.com"
};

console.log(user);

/*
Explanation:
- Computed property names allow using the value of an expression as a property key.
- Here, `[dynamicKey]` evaluates to the string `"email"`, so the object gets a property named `"email"`.
- This is useful when property names are dynamic or come from variables.
*/

// ✅ Task 6.4 – Shallow Copy vs Deep Copy
// --------------------------------------------
// Task 6.4 - Shallow vs Deep Copy
// --------------------------------------------

const obj1 = {
  name: "Test",
  address: {
    city: "Delhi"
  }
};

// Shallow Copy
const shallowCopy = { ...obj1 };

// Deep Copy
const deepCopy = deepClone(obj1);

shallowCopy.address.city = "Mumbai";

console.log("Original:", obj1.address.city);   // Mumbai (affected)
console.log("Shallow:", shallowCopy.address.city); // Mumbai
console.log("Deep:", deepCopy.address.city);   // Delhi (not affected)

/*
Explanation:
- A shallow copy (using spread `{ ...obj1 }`) copies only the top‑level properties.
- Nested objects are still shared between the original and the copy.
- Changing `shallowCopy.address.city` modifies the same nested object that `obj1` references.
- A deep copy (using the previously defined `deepClone`) creates completely independent nested structures.
- The deep copy remains unaffected when the original or shallow copy is modified.
*/

// ✅ Task 6.5 – Object.keys(), values(), entries()
// --------------------------------------------
// Task 6.5 - Object Iteration Methods
// --------------------------------------------

const product = {
  id: 1,
  name: "Laptop",
  price: 50000
};

// Keys
Object.keys(product).forEach(key => {
  console.log("Key:", key);
});

// Values
Object.values(product).forEach(value => {
  console.log("Value:", value);
});

// Entries
Object.entries(product).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

/*
Explanation:
- `Object.keys()` returns an array of the object's own enumerable property names.
- `Object.values()` returns an array of the corresponding property values.
- `Object.entries()` returns an array of `[key, value]` pairs.
- These methods are commonly used to iterate over object properties.
- In the example, `forEach` is used to loop through each array and print the results.
*/ 