// ✅ Task 7.1 – Numbers Array Operations
// --------------------------------------------
// Task 7.1 - Basic Array Methods
// --------------------------------------------

const numbers = [1,2,3,4,5,6,7,8,9,10];

// ## Square each number
const squared = numbers.map(num => num * num);
console.log("Squared:", squared);

// ## Get even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Even:", evenNumbers);

// ## Sum of all numbers
const totalSum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Total Sum:", totalSum);

// ## Chain map + filter + reduce
const sumOfSquaresOfEven = numbers
  .filter(num => num % 2 === 0)
  .map(num => num * num)
  .reduce((acc, curr) => acc + curr, 0);

console.log("Sum of Squares of Even:", sumOfSquaresOfEven);

/*
Explanation:
- The code demonstrates three fundamental array methods: `map`, `filter`, and `reduce`.
- `map` transforms each element (here, squaring each number).
- `filter` selects elements that meet a condition (here, even numbers).
- `reduce` accumulates values into a single result (here, the total sum).
- Method chaining combines these operations: first filter evens, then square them, then sum the squares.
*/

// ✅ Task 7.2 – Users Array Operations
// --------------------------------------------
// Task 7.2 - Array of Objects
// --------------------------------------------

const users = [
  { name: "John", age: 25, salary: 50000 },
  { name: "Jane", age: 30, salary: 60000 },
  { name: "Bob", age: 35, salary: 55000 },
  { name: "Alice", age: 28, salary: 65000 }
];

// ## Extract names
const names = users.map(user => user.name);
console.log("Names:", names);

// ## Users with age > 28
const ageAbove28 = users.filter(user => user.age > 28);
console.log("Age > 28:", ageAbove28);

// ## Total salary
const totalSalary = users.reduce((acc, user) => acc + user.salary, 0);
console.log("Total Salary:", totalSalary);

// ## Group users by age
const groupedByAge = users.reduce((acc, user) => {
  if (!acc[user.age]) {
    acc[user.age] = [];
  }
  acc[user.age].push(user);
  return acc;
}, {});

console.log("Grouped By Age:", groupedByAge);

/*
Explanation:
- Working with an array of objects.
- `map` extracts a property (`name`) from each object.
- `filter` selects objects based on a condition (`age > 28`).
- `reduce` sums the `salary` property.
- A more complex `reduce` groups objects by a property (`age`), building an object where keys are ages and values are arrays of users with that age.
*/

// ✅ Task 7.3 – Polyfills for map, filter, reduce
// --------------------------------------------
// Task 7.3 - Polyfills
// --------------------------------------------

// ## map polyfill
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// ## filter polyfill
Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// ## reduce polyfill
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

/*
Explanation:
- Polyfills re‑implement built‑in methods to understand their inner workings.
- `myMap` creates a new array by applying the callback to each element.
- `myFilter` builds a new array with elements for which the callback returns true.
- `myReduce` handles both the presence and absence of an initial value.
- All polyfills preserve the index and array arguments in the callback.
*/

// ✅ Task 7.4 – Grace Marks + Filtering + Total (Method Chaining)
// --------------------------------------------
// Task 7.4 - Method Chaining
// --------------------------------------------

const students = [
  { name: "A", marks: 55 },
  { name: "B", marks: 65 },
  { name: "C", marks: 45 },
  { name: "D", marks: 75 }
];

const totalMarks = students
  .map(student => ({
    ...student,
    marks: student.marks < 60 ? student.marks + 20 : student.marks
  }))
  .filter(student => student.marks > 60)
  .reduce((acc, student) => acc + student.marks, 0);

console.log("Total Marks After Grace:", totalMarks);

/*
Explanation:
- This chain processes student marks.
- `map` adds grace marks (+20) to students who scored below 60.
- `filter` keeps only those whose (possibly increased) marks are above 60.
- `reduce` sums the marks of the filtered students.
- Method chaining makes the transformation pipeline clear and concise.
*/