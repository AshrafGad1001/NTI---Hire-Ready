/*
   PROBLEM 1: Even or Odd
   Write a function that takes a number and returns "Even" or "Odd".
*/

function isEvenOrOdd(num) {
    if (num % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}

console.log(isEvenOrOdd(4));
console.log(isEvenOrOdd(5));
console.log(isEvenOrOdd(6));
console.log(isEvenOrOdd(7));
console.log(isEvenOrOdd(8));

console.log("----------------------------End Of Task 1 ");

/*
   PROBLEM 2: Celsius to Fahrenheit
   Write a function that converts Celsius to Fahrenheit.
   Formula: F = (C × 9/5) + 32
*/

// eq : (c * 1.8) + 32

function celsiusToFahrenheit(c) {
    return c * 1.8 + 32;
}

console.log(celsiusToFahrenheit(10));
console.log(celsiusToFahrenheit(15));
console.log(celsiusToFahrenheit(20));
console.log(celsiusToFahrenheit(25));

console.log("----------------------------End Of Task 2 ");

/*
   PROBLEM 3: Sum of Array
   Write a function that takes an array of numbers and returns their sum.
*/

let myArr = [1, 2, 3, 4, 5, 8, 79, 57, 1];
let myArr2 = [1, 2, 3, 1, 17];

function sumArray(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}

console.log("Sum Of Arr 1 :  " + sumArray(myArr));
console.log("Sum Of Arr 2 :  " + sumArray(myArr2));

console.log("----------------------------End Of Task 3 ");

/*
   PROBLEM 4: Find Maximum Number
   Write a function that takes an array and returns the largest number.
*/
function findMaxNumber(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

console.log("Max Number in Arr 1 :  " + findMaxNumber(myArr));
console.log("Max Number in Arr 1 :  " + findMaxNumber(myArr2));

console.log("----------------------------End Of Task 4 ");

/* ─────────────────────────────────────────────────────────────
   🟡 MEDIUM
   ───────────────────────────────────────────────────────────── */

/*
   PROBLEM 5: Count Vowels
   Write a function that counts how many vowels are in a string.
*/

let myStr = "AshrafAlaaGad";
let myStr2 = "Ahmed Mahmoud Mohamed Sallam";

function countVowels(str) {
    const vowels = "aeiouAEIOU";
    let count = 0;

    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }

    return count;
}

console.log("Number of Vowels in Str1 :  " + countVowels(myStr));
console.log("Number of Vowels in Str2 :  " + countVowels(myStr2));

console.log("----------------------------End Of Task 5 ");

/*
   PROBLEM 6: Reverse a String
   Write a function that reverses a string without using .reverse().
*/

function reverseString(str) {
    let reversed = "";

    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }

    return reversed;
}

console.log("reverseString 1 :  " + reverseString(myStr));
console.log("reverseString 2 :  " + reverseString(myStr2));

console.log("----------------------------End Of Task 6 ");

/*
   PROBLEM 8: Student Grade Report
   Given an array of student objects { name, grade }, 
   return a new array of objects { name, result } 
   where result is "Pass" if grade >= 60, else "Fail".
*/
const students = [
    { name: "Ahmed", grade: 85 },
    { name: "Sara", grade: 55 },
    { name: "Nour", grade: 92 },
    { name: "Hassan", grade: 40 },
    { name: "Layla", grade: 73 },
];

function gradeReport(students) {
    return students.map(function (student) {
        return {
            name: student.name,
            result: student.grade >= 60 ? "Pass" : "Fail",
        };
    });
}

console.log(gradeReport(students));

console.log("----------------------------End Of Task 8 ");

/* ─────────────────────────────────────────────────────────────
   ⭐ BONUS: SHAPE CHALLENGES (Nested Loops!)

   These are PERFECT for understanding nested for loops.
   The outer loop controls ROWS, the inner loop controls COLUMNS.
   ───────────────────────────────────────────────────────────── */

/* 
   SHAPE 1: Square (Easiest — single concept)
   ★★★★
   ★★★★
   ★★★★
   ★★★★
*/

function square(n) {
    let output = "";

    for (let row = 1; row <= n; row++) {
        for (let col = 1; col <= n; col++) {
            output += "* ";
        }
        output += "\n";
    }
    return output;
}
// console.log(square(3));
// console.log("................................");
// console.log(square(4));
// console.log("................................");
console.log(square(5));
console.log("................................");

console.log("----------------------------End Of Bouns Task 1 ");

/* 
   SHAPE 2: Right Triangle (Left-aligned)
   ★
   ★★
   ★★★
   ★★★★
*/

function triangle(n) {
    let output = "";

    for (let row = 1; row <= n; row++) {
        for (let col = 1; col <= row; col++) {
            output += "* ";
        }
        output += "\n";
    }
    return output;
}

// console.log(triangle(3));
// console.log("................................");
// console.log(triangle(4));
// console.log("................................");
console.log(triangle(5));
console.log("................................");

console.log("----------------------------End Of Bouns Task 2 ");
/* 
   SHAPE 3: Inverted Triangle
   ★★★★★
   ★★★★
   ★★★
   ★★
   ★
*/

function invertedTriangle(n) {
    let output = "";

    for (let row = n; row >= 1; row--) {
        for (let col = 1; col <= row; col++) {
            output += "* ";
        }
        output += "\n";
    }

    return output;
}

// console.log(invertedTriangle(3));
// console.log("................................");
// console.log(invertedTriangle(4));
// console.log("................................");
console.log(invertedTriangle(5));
console.log("................................");

console.log("----------------------------End Of Bouns Task 3 ");





/* 
   SHAPE 4: Pyramid ← THE CLASSIC!
      ★
     ★★★
    ★★★★★
   ★★★★★★★
*/



function pyramid(n) {
    let output = "";

    for (let row = 1; row <= n; row++) {
        for (let space = 1; space <= n - row; space++) {
            output += " ";
        }
        for (let star = 1; star <= (row * 2 - 1); star++) {
            output += "*";
        }
        output += "\n";
    }

    return output;
}

console.log(pyramid(5));
console.log("................................");


console.log("----------------------------End Of Bouns Task 4 ");

/* 
   SHAPE 5: Diamond ← Hardest Shape (2 pyramids!)
      ★
     ★★★
    ★★★★★
     ★★★
      ★


*/
function diamond(n) {
    let output = "";

    for (let row = 1; row <= n; row++) {
        for (let s = 1; s <= n - row; s++)
            output += " ";
        for (let c = 1; c <= row * 2 - 1; c++)
            output += "*";
        output += "\n";
    }

    for (let row = n - 1; row >= 1; row--) {
        for (let s = 1; s <= n - row; s++)
            output += " ";
        for (let c = 1; c <= row * 2 - 1; c++)
            output += "*";
        output += "\n";
    }

    return output;
}

console.log(diamond(5));
console.log("................................");



console.log("----------------------------End Of Bouns Task 5");