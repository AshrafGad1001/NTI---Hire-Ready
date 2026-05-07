console.log("---------8------------");
/*
   PROBLEM 8: Student Grade Report
   Given an array of student objects { name, grade }, 
   return a new array of objects { name, result } 
   where result is "Pass" if grade >= 60, else "Fail".
*/
// const students = [
//     { name: "Ahmed",  grade: 85 },
//     { name: "Sara",   grade: 55 },
//     { name: "Nour",   grade: 92 },
//     { name: "Hassan", grade: 40 },
//     { name: "Layla",  grade: 73 },
// ];

function studentGradeReport() {
    const students = [
        { name: "Ahmed", grade: 85 },
        { name: "Sara", grade: 55 },
        { name: "Nour", grade: 92 },
        { name: "Hassan", grade: 40 },
        { name: "Layla", grade: 73 },
    ];

    let result = [];

    for (let student of students) {
        result.push({
            name: student.name,
            result: student.grade >= 60 ? "Pass" : "Fail",
        });
    }

    return result;
}

console.log(studentGradeReport());

console.log("----------------HARD_9-------------------");
/*
   PROBLEM 9: Palindrome Check
   Write a function that returns true if a word reads the same 
   forwards and backwards. ("racecar" → true, "hello" → false)
*/

function isPalindrome(word) {
    let left = 0;
    let right = word.length - 1;

    while (left < right) {
        if (word[left] !== word[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));

console.log("----------------HARD_10-------------------");
/*
   PROBLEM 10: Flatten an Array
   Write a function that takes a nested array and flattens it by one level.
   [[1,2], [3,4], [5,6]] → [1, 2, 3, 4, 5, 6]
*/

function flatten(arr) {
    return arr.reduce((acc, curr) => {
        return acc.concat(curr);
    }, []);
}

console.log(
    flatten([
        [1, 2],
        [3, 4],
        [5, 6],
    ]),
);

console.log("----------------HARD_11-------------------");

/*
   PROBLEM 11: Find Duplicates
   Write a function that returns all duplicate values in an array.
*/

function findDuplicates(arr) {
    const duplNum = {};
    const result = [];

    for (const item of arr) {
        duplNum[item] = (duplNum[item] || 0) + 1;
    }

    for (const key in duplNum) {
        if (duplNum[key] > 1) {
            result.push(Number(key));
        }
    }

    return result;
}
console.log(findDuplicates([1, 2, 3, 2, 4, 5, 1, 1]));

console.log("----------------HARD_12-------------------");

/*
   PROBLEM 12: Group By (Advanced Objects + Arrays)
   Group an array of students by their pass/fail result.
   Input:  [{ name, grade }, ...]
   Output: { Pass: ["Ahmed", ...], Fail: ["Sara", ...] }
*/

function groupStudents(students) {
    let result = {
        Pass: [],
        Fail: [],
    };

    for (let i = 0; i < students.length; i++) {
        let student = students[i];

        if (student.grade >= 60) {
            result.Pass.push(student.name);
        } else {
            result.Fail.push(student.name);
        }
    }

    return result;
}

console.log("----------------HARD_13-------------------");

/*
   PROBLEM 13: Shopping Cart Total (reduce)
   Given an array of cart items { name, price, qty },
   use reduce() to calculate:
   - Total price of all items
   - Most expensive single item (by price * qty)
*/
const cart = [
    { name: "Laptop", price: 15000, qty: 1 },
    { name: "Mouse", price: 350, qty: 2 },
    { name: "Keyboard", price: 800, qty: 1 },
    { name: "Monitor", price: 5000, qty: 2 },
];

function ShoppingCart(cart) {
    const totalPrice = cart.reduce(
        (acc, product) => acc + product.price * product.qty,
        0,
    );

    const mostExpensive = cart.reduce((acc, product) => {
        const itemTotal = product.price * product.qty;

        if (!acc || itemTotal > acc.itemTotal) {
            return { ...product, itemTotal };
        }

        return acc;
    }, null);

    return { totalPrice, mostExpensive };
}
console.log(ShoppingCart(cart));

console.log("----------------HARD_14-------------------");

/*
   PROBLEM 14: Leaderboard (sort + map)
   Given an array of player objects { name, score },
   sort them by score descending and return a formatted
   leaderboard: ["1. Ahmed — 950", "2. Sara — 880", ...]
*/
const players = [
    { name: "Nour", score: 720 },
    { name: "Ahmed", score: 950 },
    { name: "Layla", score: 880 },
    { name: "Hassan", score: 650 },
    { name: "Sara", score: 815 },
];

function createLeaderboard(players) {
    return players
        .sort((a, b) => b.score - a.score)
        .map((player, index) => {
            return `${index + 1}. ${player.name} — ${player.score}`;
        });
}
console.log(createLeaderboard(players));    