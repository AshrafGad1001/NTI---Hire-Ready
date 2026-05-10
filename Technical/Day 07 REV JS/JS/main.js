// function SayHello() {
//     console.log("Hello World!");
// }


// var result = SayHello();

// console.log(typeof(result)); // This will log 'undefined' because SayHello does not return anything.    


// IIFE (Immediately Invoked Function Expression)
//  is a JavaScript function that runs as soon as it is defined. 
// It is a design pattern which produces a lexical scope using JavaScript's function scoping. This helps to avoid polluting the global namespace and allows for data privacy.

// const counter = (function () {
//     let count = 0;

//     return {
//         increment: () => ++count,
//         decrement: () => --count,
//         getCount: () => count
//     };
// })();


// counter.increment();
// counter.increment();
// counter.increment();
// counter.decrement();
// console.log(counter.getCount());
// console.log(counter.count);      



// let SkillsHeading = document.querySelectorAll(".skills");
// console.log(SkillsHeading);


// for (let i = 0; i < SkillsHeading.length; i++) {
//     SkillsHeading[i].addEventListener("click", function () {
//         window.alert("You clicked on " + SkillsHeading[i].textContent);

//     });
// }



// let Selectyears = document.getElementById("select-years");

// for (let i = 1970; i <= 2026; i++) {
//     let option = document.createElement("option");
//     option.value = i;
//     option.textContent = i;
//     Selectyears.appendChild(option);
// }


// for (; ;) {
//     console.log("This is an infinite loop");
// }