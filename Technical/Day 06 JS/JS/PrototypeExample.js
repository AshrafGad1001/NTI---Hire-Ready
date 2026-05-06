
"use strict";

// var myObj = {
//     Id: "1000",
//     Name: "Ashraf Alaa Mohamed Gad",
//     Age: 24,
//     Address: "Shebin El-Kom Monfia",
//     Salary: 30000,
//     gender: "male",
// };




// console.log("Type Of myObj   :   " + typeof (myObj));

// console.log("------------------------------");

// console.log(myObj.hasOwnProperty("Id"));
// console.log(myObj.hasOwnProperty("Name"));
// console.log(myObj.hasOwnProperty("Age"));
// console.log(myObj.hasOwnProperty("Address"));
// console.log(myObj.hasOwnProperty("Salary"));
// console.log(myObj.hasOwnProperty("gender"));

// console.log("------------------------------");

// console.log(myObj.hasOwnProperty("JobTitle"));
// console.log(myObj.hasOwnProperty("IsMarried"));
// console.log(myObj.hasOwnProperty("City"));

// console.log("------------------------------");


// // console.log(Object.keys(myObj));



// console.log("------------------------------");
// console.log("Get Valus From My Object");
// console.log("------------------------------");



// console.log(myObj.Id);
// console.log(myObj.Name);
// console.log(myObj.Age);
// console.log(myObj.Address);
// console.log(myObj.Salary);
// console.log(myObj.gender);
// console.log("------------------------------");







// // console.log("------------------------------");
// // console.log("Set Valus For My Object");
// // console.log("------------------------------");



// // myObj.Id = "***** new Value *****";
// // myObj.Name = "***** new Value *****";
// // myObj.Age = "***** new Value *****";
// // myObj.Address = "***** new Value *****";
// // myObj.Salary = "***** new Value *****";
// // myObj.gender = "***** new Value *****";




// console.log("------------------------------");




// console.log("------------------------------");
// console.log("Get Valus After Set Values");
// console.log("------------------------------");



// console.log(myObj.Id);
// console.log(myObj.Name);
// console.log(myObj.Age);
// console.log(myObj.Address);
// console.log(myObj.Salary);
// console.log(myObj.gender);


// console.log("------------------------------");




// console.log("------------------------------");
// console.log("Add Properties For myObj");
// console.log("------------------------------");

// myObj.JobTitle = "dotNet Developer";





// console.log("------------------------------");
// console.log("Get Valus From My Object");
// console.log("------------------------------");



// console.log(myObj.Id);
// console.log(myObj.Name);
// console.log(myObj.Age);
// console.log(myObj.Address);
// console.log(myObj.Salary);
// console.log(myObj.gender);
// console.log(myObj.JobTitle)
// console.log("------------------------------");



// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");



// var myObj2 = {
//     Id: "1000",
//     Name: "Ahmed Alaa Mohamed Gad",
//     Age: 24,
//     Address: "Shebin El-Kom Monfia",
//     Salary: 30000,
//     gender: "male",
// };

// //by default
// // define property  writable, enumerable, configurable(deleteable) : delete Or ReConfigure



// //Can be Solve it Problem By Object.defineProperty within Object Function

// myObj2.testProp = "testProp";


// console.log(myObj2.Id);
// console.log(myObj2.Name);
// console.log(myObj2.Age);
// console.log(myObj2.Address);
// console.log(myObj2.Salary);
// console.log(myObj2.gender);
// console.log(myObj2.testProp)
// console.log("------------------------------");


// delete myObj2.testProp;
// //Can be Delete testProp Because It Is Configurable By Default
// console.log("After Delete  testProp from  myObj2:")  // undefined
// console.log(myObj2.testProp)  // undefined

// console.log("------------------------------");

// //Can be Access defineProperty By
// //   => Object.defineProperty(myObj2, "testProp", { value: "testProp", writable: false, enumerable: true, configurable: false });






// Object.defineProperty(myObj2, "IsMarried",
//     {
//         value: "Not married",
//         writable: false,// Can't  be Change Value Of IsMarried Property
//         enumerable: true,// Can be Show IsMarried Property When Use Object.keys(myObj2) Method
//         configurable: false// Can't be Delete IsMarried Property from Delete myObj2.IsMarried
//     });

// console.log(myObj2.IsMarried);

// // myObj2.IsMarried = "Married❤️";//✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️
// //cannot assign to read only property 'IsMarried' of object '#<Object>'
// console.log("------------------------------");
// console.log(Object.keys(myObj2)); // [ 'Id', 'Name', 'Age', 'Address', 'Salary', 'gender', 'IsMarried' ]
// console.log("------------------------------");


// Object.defineProperty(myObj2, "jobTitle",
//     {
//         value: "Customer Service",
//         writable: true,// Can be Change Value Of jobTitle Property
//         enumerable: true,// can be Show jobTitle Property When Use Object.keys(myObj2) Method
//         configurable: true//   Can be Delete jobTitle Property from Delete myObj2.jobTitle
//     });


// console.log("---------After Edit jobTitle Property Value---------");
// myObj2.jobTitle = "dotNet Developer"; //writable is true
// console.log(myObj2.jobTitle);//enumerable is true
// delete myObj2.jobTitle; //configurable is true
// console.log("------------------------------");
// console.log("---------After Delete jobTitle Property ---------");
// console.log(myObj2.jobTitle);//undefined


// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");





// console.log("------------------------------");


// var myObj3 = {};

// /* -----------------defineProperties----------------- */

// // Must Use defineProperties To Define More Than One Property For Object

// Object.defineProperties(myObj3, {
//     Id: {
//         value: "1000",
//         writable: true,
//         enumerable: true,
//         configurable: true
//     },
//     Name: {
//         value: "Ashraf Alaa Mohamed Gad",
//         writable: true,
//         enumerable: true,
//         configurable: true
//     },
//     Age: {
//         value: 24,
//         writable: true,
//         enumerable: true,
//         configurable: true
//     },
//     Address: {
//         value: "Shebin El-Kom Monfia",
//         writable: true,
//         enumerable: true,
//         configurable: true
//     },
//     Salary: {
//         value: 30000,
//         writable: true,
//         enumerable: true,
//         configurable: true
//     },
//     gender: {
//         value: "male",
//         writable: true,
//         enumerable: true,
//         configurable: true
//     },
// }
// );


// console.log(myObj3.Id);
// console.log(myObj3.Name);
// console.log(myObj3.Age);
// console.log(myObj3.Address);
// console.log(myObj3.Salary);
// console.log(myObj3.gender);




// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");








/*
Prototype -- 
portotype is a mechanism by which JavaScript objects inherit features from one another.
Every JavaScript object has a prototype property, 
which is a reference to another object. 
When you try to access a property or method on an object, 
JavaScript first looks for that property or method on the object itself. 
If it doesn't find it there, 
it looks up the prototype chain until it finds the property or method or reaches the end of the chain(null).

*/









/* 

- Object -> Is Constructor Function
with any Object Constrctor Function we have 2 properties
1- prototype-> Is Reference To The Prototype Object Of The Constructor Function That Create This Object

-----------------------------
within Object pototype we have 2 properties
1- constructor -> Is Reference To The Constructor Function That Create This Object
2- __proto__ -> Is Reference To The Prototype Object Of The Constructor Function That Create This Object//null If The Constructor Function Is Object Constructor Function

*/



// console.log(Object.prototype); // {}
// console.log(Object.prototype.constructor); // [Function: Object]
// console.log(Object.prototype.constructor.name); // Object




// console.log(Object.prototype.__proto__); // null.



// /*For Example    */

// var myObj4 = {
//     Id: "1000",
//     Name: "Ashraf Alaa Mohamed Gad",
//     Age: 24,
//     Address: "Shebin El-Kom Monfia",
//     Salary: 30000,
//     gender: "male",
//     toString: function () {
//         return `All Object Data As String:\n\n------------------\nId: ${this.Id}\nName: ${this.Name}\nAge: ${this.Age}\nAddress: ${this.Address}\nSalary: ${this.Salary}\nGender: ${this.gender}\n------------------`;
//     }
// };



// console.log(myObj4); 




// // console.log(myObj4.__proto__.__proto__); // null
// // console.log(myObj4.__proto__.constructor.name); // Object






// console.log(myObj4.toString()); //  [object Object] 
// console.log(typeof(myObj4.toString())); // string



// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");
// console.log("------------------------------");








var Employee={  

    
};