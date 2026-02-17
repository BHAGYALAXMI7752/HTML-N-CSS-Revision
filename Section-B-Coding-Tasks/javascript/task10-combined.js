// ✅ Task 10.1 – Bank Account (Closures + Private Balance)
// --------------------------------------------
// Task 10.1 - Bank Account using Closures
// --------------------------------------------

function createBankAccount(accountNumber, accountHolder, initialBalance = 0) {

  // Private variable (Closure)
  let balance = initialBalance;

  return {
    accountNumber,
    accountHolder,

    deposit(amount) {
      if (amount <= 0) {
        return "Deposit amount must be positive";
      }
      balance += amount;
      return `Deposited ₹${amount}`;
    },

    withdraw(amount) {
      if (amount <= 0) {
        return "Withdrawal amount must be positive";
      }

      if (amount > balance) {
        return "Insufficient balance";
      }

      balance -= amount;
      return `Withdrawn ₹${amount}`;
    },

    getBalance() {
      return `Current Balance: ₹${balance}`;
    },

    getStatement() {
      return `
        Account Number: ${this.accountNumber}
        Account Holder: ${this.accountHolder}
        Balance: ₹${balance}
      `;
    }
  };
}

// >> Usage
const account = createBankAccount("12345", "bhagya", 5000);

console.log(account.deposit(1000));
console.log(account.withdraw(2000));
console.log(account.getBalance());
console.log(account.getStatement());

/*
Explanation:
- The function `createBankAccount` uses closures to create private data.
- `balance` is declared inside the function and is not directly accessible from outside; it is captured by the returned methods.
- The returned object exposes public methods (`deposit`, `withdraw`, `getBalance`, `getStatement`) that operate on the private `balance`.
- Each account instance has its own closure, so multiple accounts have independent balances.
- Methods include input validation (positive amounts, sufficient balance) and return descriptive messages.
*/

// ✅ Task 10.2 – Product Array Operations
// --------------------------------------------
// Task 10.2 - Product Operations
// --------------------------------------------

const products = [
  { id: 1, name: "Laptop", price: 80000, category: "Electronics" },
  { id: 2, name: "Phone", price: 50000, category: "Electronics" },
  { id: 3, name: "Shirt", price: 2000, category: "Clothing" },
  { id: 4, name: "Shoes", price: 4000, category: "Clothing" }
];

// >> Filter by category
function filterByCategory(category) {
  return products.filter(product => product.category === category);
}

// >> Find products within price range
function filterByPriceRange(min, max) {
  return products.filter(
    product => product.price >= min && product.price <= max
  );
}

// >> Total value of all products
function calculateTotalValue() {
  return products.reduce((acc, product) => acc + product.price, 0);
}

// >> Most expensive product
function getMostExpensiveProduct() {
  return products.reduce((max, product) =>
    product.price > max.price ? product : max
  );
}

// Usage
console.log(filterByCategory("Electronics"));
console.log(filterByPriceRange(1000, 60000));
console.log("Total Value:", calculateTotalValue());
console.log("Most Expensive:", getMostExpensiveProduct());

/*
Explanation:
- The `products` array holds objects with product details.
- `filterByCategory` uses `filter` to return all products matching a given category.
- `filterByPriceRange` filters products whose price falls between `min` and `max`.
- `calculateTotalValue` uses `reduce` to sum all product prices.
- `getMostExpensiveProduct` uses `reduce` to find the product with the highest price.
- All functions operate on the same dataset and demonstrate common array methods.
*/

// ✅ Task 10.3 – Student Management System
// --------------------------------------------
// Task 10.3 - Student Management
// --------------------------------------------

const students = [
  { id: 1, name: "Rahul", marks: [80, 85, 90] },
  { id: 2, name: "Anita", marks: [70, 75, 72] },
  { id: 3, name: "Karan", marks: [95, 92, 98] }
];

// >> Calculate average for each student
const studentsWithAverage = students.map(student => {
  const total = student.marks.reduce((acc, mark) => acc + mark, 0);
  const average = total / student.marks.length;

  return { ...student, average };
});

console.log("With Average:", studentsWithAverage);

// >> Filter students with avg > 75
const topStudents = studentsWithAverage.filter(
  student => student.average > 75
);

console.log("Above 75:", topStudents);

// >> Find topper
const topper = studentsWithAverage.reduce((top, student) =>
  student.average > top.average ? student : top
);

console.log("Topper:", topper);

// >> Generate Report Card
function generateReportCard() {
  return studentsWithAverage.map(student => `
    ID: ${student.id}
    Name: ${student.name}
    Average: ${student.average.toFixed(2)}
    Status: ${student.average >= 40 ? "Pass" : "Fail"}
  `);
}

console.log(generateReportCard());

/*
Explanation:
- `students` is an array where each student has an array of marks.
- `studentsWithAverage` uses `map` to compute the average for each student and adds a new `average` property, without mutating the original objects.
- `topStudents` filters those with an average above 75.
- `topper` uses `reduce` to find the student with the highest average.
- `generateReportCard` creates formatted strings for each student, including a pass/fail status based on average.
- The code demonstrates chaining and transformation of array data.
*/