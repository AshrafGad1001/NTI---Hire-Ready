
type User = {
    code: string;
    userName: string;
    email: string;
    address: string;
    jobTitle: string;
};


// JSON DATA
const users: User[] = [

    {
        code: "001",
        userName: "Ashraf Alaa Gad",
        email: "ashrafgad542@gmail.com",
        address: "El-Monofia",
        jobTitle: "Web Developer"
    },

    {
        code: "002",
        userName: "Sara Mohamed",
        email: "sara@gmail.com",
        address: "Alexandria",
        jobTitle: "UI UX Designer"
    },

    {
        code: "003",
        userName: "Omar Hassan",
        email: "omar@gmail.com",
        address: "Giza",
        jobTitle: "Backend Developer"
    },

    {
        code: "004",
        userName: "Ali Mahmoud",
        email: "ali@gmail.com",
        address: "Cairo",
        jobTitle: "Frontend Developer"
    },

    {
        code: "005",
        userName: "Mona Adel",
        email: "mona@gmail.com",
        address: "Tanta",
        jobTitle: "Graphic Designer"
    },

    {
        code: "006",
        userName: "Youssef Ahmed",
        email: "youssef@gmail.com",
        address: "Mansoura",
        jobTitle: "Mobile Developer"
    },

    {
        code: "007",
        userName: "Nada Samir",
        email: "nada@gmail.com",
        address: "Aswan",
        jobTitle: "Project Manager"
    },

    {
        code: "008",
        userName: "Karim Salah",
        email: "karim@gmail.com",
        address: "Luxor",
        jobTitle: "Software Engineer"
    },

    {
        code: "009",
        userName: "Hassan Fathy",
        email: "hassan@gmail.com",
        address: "Port Said",
        jobTitle: "Data Analyst"
    },

    {
        code: "010",
        userName: "Nour Emad",
        email: "nour@gmail.com",
        address: "Damietta",
        jobTitle: "QA Tester"
    },

    {
        code: "011",
        userName: "Ahmed Samy",
        email: "ahmedsamy@gmail.com",
        address: "Ismailia",
        jobTitle: "DevOps Engineer"
    },

    {
        code: "012",
        userName: "Salma Hossam",
        email: "salma@gmail.com",
        address: "Suez",
        jobTitle: "HR Specialist"
    },

    {
        code: "013",
        userName: "Mohamed Adel",
        email: "mohamed@gmail.com",
        address: "Fayoum",
        jobTitle: "Cyber Security"
    },

    {
        code: "014",
        userName: "Reem Wael",
        email: "reem@gmail.com",
        address: "Minya",
        jobTitle: "Content Creator"
    },

    {
        code: "015",
        userName: "Mostafa Khaled",
        email: "mostafa@gmail.com",
        address: "Zagazig",
        jobTitle: "Full Stack Developer"
    },
    {
        code: "016",
        userName: "Mahmoud Tarek",
        email: "mahmoud@gmail.com",
        address: "Cairo",
        jobTitle: "System Administrator"
    },

    {
        code: "017",
        userName: "Aya Mostafa",
        email: "aya@gmail.com",
        address: "Alexandria",
        jobTitle: "Marketing Specialist"
    },

    {
        code: "018",
        userName: "Khaled Nasser",
        email: "khaled@gmail.com",
        address: "Gharbia",
        jobTitle: "Database Administrator"
    },

    {
        code: "019",
        userName: "Farah Ali",
        email: "farah@gmail.com",
        address: "Sohag",
        jobTitle: "UI Developer"
    },

    {
        code: "020",
        userName: "Amr Wael",
        email: "amr@gmail.com",
        address: "Qena",
        jobTitle: "Network Engineer"
    },

    {
        code: "021",
        userName: "Nadine Sherif",
        email: "nadine@gmail.com",
        address: "Hurghada",
        jobTitle: "Business Analyst"
    },

    {
        code: "022",
        userName: "Sherif Gamal",
        email: "sherif@gmail.com",
        address: "Benha",
        jobTitle: "Software Tester"
    },

    {
        code: "023",
        userName: "Esraa Adel",
        email: "esraa@gmail.com",
        address: "Kafr El Sheikh",
        jobTitle: "React Developer"
    },

    {
        code: "024",
        userName: "Tamer Ashraf",
        email: "tamer@gmail.com",
        address: "Beni Suef",
        jobTitle: "Laravel Developer"
    },

    {
        code: "025",
        userName: "Habiba Mohamed",
        email: "habiba@gmail.com",
        address: "Asyut",
        jobTitle: "SEO Specialist"
    },

    {
        code: "026",
        userName: "Walid Ibrahim",
        email: "walid@gmail.com",
        address: "Sharqia",
        jobTitle: "Cloud Engineer"
    },

    {
        code: "027",
        userName: "Doaa Hassan",
        email: "doaa@gmail.com",
        address: "Dakahlia",
        jobTitle: "Scrum Master"
    },

    {
        code: "028",
        userName: "Ibrahim Adel",
        email: "ibrahim@gmail.com",
        address: "Matrouh",
        jobTitle: "Python Developer"
    },

    {
        code: "029",
        userName: "Menna Khaled",
        email: "menna@gmail.com",
        address: "Red Sea",
        jobTitle: "Product Designer"
    },

    {
        code: "030",
        userName: "Ahmed Fawzy",
        email: "ahmedfawzy@gmail.com",
        address: "Monufia",
        jobTitle: "Angular Developer"
    },

];



function fillDempDataTable(data: User[]): void {

    const tableBody = document.getElementById("table-Body") as HTMLElement;


    tableBody.innerHTML = "";

    data.forEach((user: User) => {

        tableBody.innerHTML += `
        <tr>
        <td>${user.code}</td>
        <td>${user.userName}</td>
        <td>${user.email}</td>
        <td>${user.address}</td>
        <td>${user.jobTitle}</td>
        </tr>
    `;
    });
}


fillDempDataTable(users);












// let userName: string = "Ashraf";
// let email: string = "ashrafgad542@gmail.com";
// let Skills: string[] = [
//     "HTML",
//     "CSS",
//     "JavaScript",
//     "TypeScript",
//     "React",
//     "Node.js",
// ];

// console.log(`Hello, ${userName}! Welcome to TypeScript.`);
// console.log(`Your email is: ${email}`);
// console.log("Your skills are:");
// Skills.forEach((skill, i) => {
//     console.log(`       ${i + 1} - ${skill}`);
// });




//function overloading
/*
    1- define Function Signature
*/

// // define Function Signature
// function test(v1: number, v2: number): number;
// function test(v1: string): void;
// function test(v1: any, v2: string): string;



// // impelmantation one Time

// function test(v1: number | string | boolean | undefined, v2?: number | string): number | void | string {

//     if (v1 && v2 && typeof v1 == 'number' && typeof v2 == 'number') {
//         return v1 + v2;
//     }
//     else if (typeof v1 == 'string') {
//         console.log(v1);
//     }

// }

// //  Signatures
// function test(v1: number, v2: number): number;
// function test(v1: string): void;
// function test(v1: any, v2: string): string;

// // ② Implementation
// function test(v1: any, v2?: any): number | string | void {

//     if (typeof v1 === 'number' && typeof v2 === 'number') {
//         return v1 + v2;
//     }

//     if (typeof v1 === 'string' && v2 === undefined) {
//         console.log(`Hello, ${v1}!`);
//         return;
//     }

//     if (typeof v2 === 'string') {
//         return `${v1} ${v2}`;
//     }
// }


// console.log(test(10, 20));         // 30
// test("Ashraf");                    // Hello, Ashraf!
// console.log(test(100, "Gad"));     // 100 Gad
// console.log(test("Hello", "Gad")); // Hello Gad





// // Signatures
// function test2(v1: number, v2: number): number;
// function test2(v1: string): void;
// function test2(v1: any, v2: string): string;

// // Implementation
// function test2(v1: any, v2?: any): number | string | void {
//     if (typeof v2 === 'number') {
//         return v1 + v2;
//     }
//     if (typeof v2 === 'string') {
//         return `${v1} ${v2}`;
//     }
//     console.log(`Erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr, ${v1}!`);
//