// ══════════════════════════════════════════
//  SEARCHING & FINDING
// ══════════════════════════════════════════

let text = "Hello Ahmed, Hello Sara";

// indexOf
text.indexOf("Hello");       // 0
text.indexOf("Hello", 5);    // 13
text.indexOf("Omar");        // -1

// lastIndexOf
text.lastIndexOf("Hello");   // 13
text.lastIndexOf("Hello", 5);// 0
text.lastIndexOf("Omar");    // -1

// includes
text.includes("Ahmed");      // true
text.includes("Omar");       // false

// startsWith
text.startsWith("Hello");    // true
text.startsWith("Ahmed");    // false

// endsWith
text.endsWith("Sara");       // true
text.endsWith("Hello");      // false

// search
text.search(/Ahmed/);        // 6
text.search(/\d+/);          // -1

// match
"hello 123 world 456".match(/\d+/g);   // ["123", "456"]
"hello".match(/\d+/);                  // null

// matchAll
let matches = [..."a1b2c3".matchAll(/\d/g)];
matches[0][0];  // "1"
matches[1][0];  // "2"


// ══════════════════════════════════════════
//  EXTRACTING
// ══════════════════════════════════════════

let lang = "JavaScript";

// slice
lang.slice(0, 4);    // "Java"
lang.slice(4);       // "Script"
lang.slice(-6);      // "Script"
lang.slice(-6, -2);  // "Scri"

// substring
lang.substring(0, 4);  // "Java"
lang.substring(4);     // "Script"
lang.substring(-3);    // "JavaScript" — negative = 0

// substr — DEPRECATED
lang.substr(0, 4);   // "Java"
lang.substr(4, 6);   // "Script"

// charAt
lang.charAt(0);      // "J"
lang.charAt(4);      // "S"
lang.charAt(99);     // ""

// charCodeAt
lang.charCodeAt(0);  // 74
lang.charCodeAt(99); // NaN

// at — ES2022
lang.at(0);          // "J"
lang.at(-1);         // "t"
lang.at(-2);         // "p"


// ══════════════════════════════════════════
//  TRANSFORMING
// ══════════════════════════════════════════

let name = "ahmed";

// toUpperCase
name.toUpperCase();   // "AHMED"

// toLowerCase
"AHMED".toLowerCase();// "ahmed"

// trim
"  ahmed  ".trim();      // "ahmed"
"  ahmed  ".trimStart(); // "ahmed  "
"  ahmed  ".trimEnd();   // "  ahmed"

// replace
let str = "cat and cat and cat";
str.replace("cat", "dog");      // "dog and cat and cat"
str.replace(/cat/g, "dog");     // "dog and dog and dog"
str.replace(/CAT/i, "dog");     // "dog and cat and cat"

// replaceAll — ES2021
str.replaceAll("cat", "dog");   // "dog and dog and dog"

// split
"Ahmed,Sara,Omar".split(",");       // ["Ahmed", "Sara", "Omar"]
"Ahmed,Sara,Omar".split(",", 2);    // ["Ahmed", "Sara"]
"Ahmed".split("");                  // ["A","h","m","e","d"]
"Ahmed".split();                    // ["Ahmed"]

// concat
"Hello".concat(" ", "Ahmed");       // "Hello Ahmed"
"Hello".concat(" ", "Ahmed", "!");  // "Hello Ahmed!"

// repeat
"ab".repeat(3);   // "ababab"
"ab".repeat(0);   // ""

// normalize
"\u00e9".normalize("NFC");  // "é"


// ══════════════════════════════════════════
//  PADDING & FORMATTING
// ══════════════════════════════════════════

// padStart
"5".padStart(3, "0");    // "005"
"5".padStart(5, "0");    // "00005"
"5".padStart(3);         // "  5"  — default pad is space

// padEnd
"5".padEnd(3, "0");      // "500"
"Ahmed".padEnd(10, "."); // "Ahmed....."
"Ahmed".padEnd(10);      // "Ahmed     "

// toString — called on Number
(255).toString();        // "255"
(255).toString(2);       // "11111111"  binary
(255).toString(8);       // "377"       octal
(255).toString(16);      // "ff"        hex

// String.fromCharCode — static method
String.fromCharCode(65); // "A"
String.fromCharCode(97); // "a"
String.fromCharCode(65, 66, 67); // "ABC"


// ══════════════════════════════════════════
//  INFO
// ══════════════════════════════════════════

"Ahmed".length;   // 5
"".length;        // 0
"  ".length;      // 2


// ══════════════════════════════════════════
//  DEPRECATED — avoid in new code
// ══════════════════════════════════════════

"hello".bold();    // "<b>hello</b>"
"hello".italics(); // "<i>hello</i>"


// ══════════════════════════════════════════
//  GOLDEN RULES
// ══════════════════════════════════════════

// 1 — strings are immutable — save the result
let s = "  ahmed  ";
s = s.trim();            // ✅
console.log(s);          // "ahmed"

// 2 — indexOf returns -1 not false
if (s.indexOf("hm") !== -1) { console.log("found"); }

// 3 — match returns null not []
let m = "hello".match(/\d/g);
if (m) { console.log(m.length); } // ✅ safe

// 4 — replace = first match only
"a a a".replace("a", "b");    // "b a a"
"a a a".replaceAll("a", "b"); // "b b b" ✅

// 5 — all search methods are case sensitive
"Hello".includes("hello");              // false
"Hello".toLowerCase().includes("hello");// true ✅

// 6 — matchAll needs /g flag
[..."a1b2".matchAll(/\d/g)]; // ✅

// 7 — length is a property not a method
"ahmed".length;   // 5  ✅
// "ahmed".length() → TypeError ❌












// -----------------------------------
// -----------------------------------
// -----------------------------------
// -----------------------------------
// -----------------------------------

// ==============================
// JavaScript Array Methods Guide
// ==============================

// Sample array
let arr = [1, 2, 3, 4];

// =====================================
// 1. ADD / REMOVE ELEMENTS (Mutating)
// =====================================

// push() → add element to END
// Best use: adding new data (e.g. adding item to cart)
arr.push(5); // [1,2,3,4,5]

// pop() → remove last element
// Best use: removing last item
arr.pop(); // [1,2,3,4]

// unshift() → add to START
// Best use: adding priority items at beginning
arr.unshift(0); // [0,1,2,3,4]

// shift() → remove first element
// Best use: queue system (FIFO)
arr.shift(); // [1,2,3,4]

// =====================================
// 2. SPLICE (Most Powerful Mutating)
// =====================================

let numbers = [10, 20, 30, 40];

// splice(start, deleteCount, newItems)
// Best use: insert, delete, or replace elements

numbers.splice(1, 1); 
// remove 1 element at index 1 → [10,30,40]

numbers.splice(1, 0, 99); 
// add without deleting → [10,99,30,40]

numbers.splice(1, 1, 50); 
// replace → [10,50,30,40]

// =====================================
// 3. NON-MUTATING (Return New Array)
// =====================================

// map() → transform each element
// Best use: modifying data (e.g. prices, names)
let doubled = [1,2,3].map(x => x * 2); 
// [2,4,6]

// filter() → return elements that match condition
// Best use: searching / filtering lists
let filtered = [1,2,3,4].filter(x => x > 2); 
// [3,4]

// slice() → copy part of array
// Best use: cloning or extracting part
let sliced = [1,2,3,4].slice(1,3); 
// [2,3]

// =====================================
// 4. SEARCH METHODS
// =====================================

// includes() → check existence
// Best use: simple validation
[1,2,3].includes(2); // true

// indexOf() → find index
// Best use: when you need position
[10,20,30].indexOf(20); // 1

// find() → return first match
// Best use: find object in array
let users = [{id:1}, {id:2}];
let user = users.find(u => u.id === 2);
// {id:2}

// findIndex() → return index of match
let index = users.findIndex(u => u.id === 2);
// 1

// =====================================
// 5. LOOPING
// =====================================

// forEach() → loop through array
// Best use: performing action (no return)
[1,2,3].forEach(x => console.log(x));

// =====================================
// 6. MERGE / COMBINE
// =====================================

// concat() → merge arrays
// Best use: combine lists
let a = [1,2];
let b = [3,4];
let merged = a.concat(b); 
// [1,2,3,4]

// Spread operator (modern way)
let merged2 = [...a, ...b];

// =====================================
// 7. SORTING / REVERSING
// =====================================

// sort() → sorts array (mutates)
// Best use: ordering data
let nums = [3,1,2];

nums.sort(); 
// ⚠️ wrong for numbers sometimes → [1,2,3]

// correct numeric sort:
nums.sort((a,b) => a - b);

// reverse() → reverse array
// Best use: reverse order display
nums.reverse();

// =====================================
// 8. REDUCE (Advanced)
// =====================================

// reduce() → accumulate values
// Best use: totals, calculations, analytics

let sum = [1,2,3].reduce((acc, val) => acc + val, 0);
// 6

// Example: count items
let count = ["a","b","a"].reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
}, {});
// {a:2, b:1}

// =====================================
// 9. SOME / EVERY
// =====================================

// some() → at least one matches
// Best use: validation
[1,2,3].some(x => x > 2); // true

// every() → all must match
// Best use: strict checks
[1,2,3].every(x => x > 0); // true

// =====================================
// 10. FLAT / FLATMAP
// =====================================

// flat() → flatten nested arrays
// Best use: cleaning nested data
[1,[2,3]].flat(); // [1,2,3]

// flatMap() → map + flatten
// Best use: transform + flatten in one step
[1,2,3].flatMap(x => [x, x*2]);
// [1,2,2,4,3,6]

// =====================================
// 11. JOIN / STRING
// =====================================

// join() → convert array to string
// Best use: display data
["a","b","c"].join("-"); // "a-b-c"

// =====================================
// 12. DESTRUCTURING (Bonus)
// =====================================

// Best use: clean variable extraction
let [first, second] = [10,20,30];
// first = 10, second = 20

// =====================================
// END OF FILE
// =====================================