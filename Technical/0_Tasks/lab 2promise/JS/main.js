/*
- Call back hell is a term used to describe 
a situation where there are multiple nested callbacksin asynchronous programming,
leading to code that is difficult to read and maintain.
It often occurs when dealing with asynchronous operations such as API calls,
file I/O, or timers.
*/





setTimeout(function () {
    document.getElementById("title1").style.visibility = "visible";
    setTimeout(function () {
        document.getElementById("title2").style.visibility = "visible";
        setTimeout(function () {
            document.getElementById("title3").style.visibility = "visible";
            setTimeout(function () {
                document.getElementById("title4").style.visibility = "visible";
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000);



/*
Solution to Call Back Hell:

1. Promises: Promises provide a cleaner way to handle asynchronous operations

by allowing you to chain .then() and .catch() methods, which can help to avoid deeply nested callbacks.

2. Async/Await: Async/await is a syntactic sugar built on top of promises that allows you to write asynchronous code in a more synchronous manner, making it easier to read and understand.
making the code more readable and easier to manage.
*/





let myPromise = new Promise(function (resolve, reject) {



    console.log("Starting Promise..........");

    let condition = false; // This can be any condition you want to check


    if (condition == true) {
        resolve("Promise resolved successfully!");
    }
    else {
        reject("Promise rejected!");
    }
});




// console.log(typeof (myPromise)); // Output: "object"
// console.log(myPromise); // Output: "object"

myPromise.then(function (successMessage) {
    console.log(successMessage); // Output: "Promise resolved successfully!"
}).catch(function (errorMessage) {
    console.log(errorMessage); // Output: "Promise rejected!"
});


console.log("After then and catch..........");
