/* ─────────────────────────────────────────────────────────────
   🔴 HARD
   ───────────────────────────────────────────────────────────── */

/*
   PROBLEM 9: Palindrome Check
   Write a function that returns true if a word reads the same 
   forwards and backwards. ("racecar" → true, "hello" → false)
*/







/*
   PROBLEM 10: Flatten an Array
   Write a function that takes a nested array and flattens it by one level.
   [[1,2], [3,4], [5,6]] → [1, 2, 3, 4, 5, 6]
*/





/*
   PROBLEM 11: Find Duplicates
   Write a function that returns all duplicate values in an array.
*/











/*
   PROBLEM 12: Group By (Advanced Objects + Arrays)
   Group an array of students by their pass/fail result.
   Input:  [{ name, grade }, ...]
   Output: { Pass: ["Ahmed", ...], Fail: ["Sara", ...] }
*/









/* ─────────────────────────────────────────────────────────────
   🔴 HARD — NEW PROBLEMS (targeting recent topics)
   ───────────────────────────────────────────────────────────── */

/*
   PROBLEM 13: Shopping Cart Total (reduce)
   Given an array of cart items { name, price, qty },
   use reduce() to calculate:
   - Total price of all items
   - Most expensive single item (by price * qty)
*/
const cart = [
    { name: "Laptop",   price: 15000, qty: 1 },
    { name: "Mouse",    price:   350, qty: 2 },
    { name: "Keyboard", price:   800, qty: 1 },
    { name: "Monitor",  price:  5000, qty: 2 },
];









// result
// { total: 27300, mostExpensive: "Monitor" }


/*
   PROBLEM 14: Leaderboard (sort + map)
   Given an array of player objects { name, score },
   sort them by score descending and return a formatted
   leaderboard: ["1. Ahmed — 950", "2. Sara — 880", ...]
*/
const players = [
    { name: "Nour",   score: 720 },
    { name: "Ahmed",  score: 950 },
    { name: "Layla",  score: 880 },
    { name: "Hassan", score: 650 },
    { name: "Sara",   score: 815 },
];













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







/* 
   SHAPE 2: Right Triangle (Left-aligned)
   ★
   ★★
   ★★★
   ★★★★
*/










/* 
   SHAPE 3: Inverted Triangle
   ★★★★★
   ★★★★
   ★★★
   ★★
   ★
*/











/* 
   SHAPE 4: Pyramid ← THE CLASSIC!
      ★
     ★★★
    ★★★★★
   ★★★★★★★
*/














/* 
   SHAPE 5: Diamond ← Hardest Shape (2 pyramids!)
      ★
     ★★★
    ★★★★★
     ★★★
      ★
*/