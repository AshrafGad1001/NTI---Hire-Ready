const fs = require('node:fs');

// console.log(fs.readFileSync('./hello.txt', 'utf-8'));



// fs.readFile('./hello.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.error(err);
//     }
//     else {
//         console.log(data);
//     }
// });

fs.writeFile("./hellotest.txt", "Tessssssssssssssst", "utf-8", (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("File written successfully");
    }
});

fs.unlink("./hellotest.txt", (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("File deleted successfully");
    }
});
