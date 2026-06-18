const express = require('express');

const app = express();

const courses = [
    { id: 1, title: "js course", price: 1000 },
    { id: 2, title: "react course", price: 800 },
    { id: 3, title: "next.js mastery", price: 1200 },
    { id: 4, title: "typescript fundamentals", price: 600 },
    { id: 5, title: "node.js backend bootcamp", price: 1100 },
    { id: 6, title: "html & css basics", price: 400 },
    { id: 7, title: "advanced python programming", price: 950 },
    { id: 8, title: "data science with r", price: 1300 },
    { id: 9, title: "machine learning a-z", price: 1500 },
    { id: 10, title: "deep learning specialized", price: 1800 },
    { id: 11, title: "vue.js complete guide", price: 750 },
    { id: 12, title: "angular enterprise apps", price: 1150 },
    { id: 13, title: "ui/ux design principles", price: 700 },
    { id: 14, title: "figma for beginners", price: 350 },
    { id: 15, title: "git & github workflow", price: 250 },
    { id: 16, title: "docker & kubernetes masterclass", price: 1400 },
    { id: 17, title: "aws cloud practitioner", price: 1000 },
    { id: 18, title: "google cloud fundamentals", price: 900 },
    { id: 19, title: "microsoft azure architect", price: 1250 },
    { id: 20, title: "cybersecurity essentials", price: 850 },
    { id: 21, title: "ethical hacking 101", price: 1100 },
    { id: 22, title: "sql & relational databases", price: 500 },
    { id: 23, title: "mongodb & nosql databases", price: 650 },
    { id: 24, title: "graphql API development", price: 800 },
    { id: 25, title: "restful api design", price: 450 },
    { id: 26, title: "c++ performance programming", price: 1050 },
    { id: 27, title: "java spring boot microservices", price: 1350 },
    { id: 28, title: "c# & .net core development", price: 1100 },
    { id: 29, title: "go token-based authentication", price: 900 },
    { id: 30, title: "rust system programming", price: 1200 },
    { id: 31, title: "swift iOS app development", price: 1400 },
    { id: 32, title: "kotlin android bootcamp", price: 1300 },
    { id: 33, title: "flutter cross-platform apps", price: 950 },
    { id: 34, title: "react native production guide", price: 1150 },
    { id: 35, title: "data structures & algorithms", price: 1500 },
    { id: 36, title: "cracking the coding interview", price: 750 },
    { id: 37, title: "web3 & solidity blockchain", price: 1600 },
    { id: 38, title: "devops CI/CD pipelines", price: 1250 },
    { id: 39, title: "linux command line pro", price: 300 },
    { id: 40, title: "shell scripting automation", price: 450 },
    { id: 41, title: "unity game development 3d", price: 1100 },
    { id: 42, title: "unreal engine c++ basics", price: 1300 },
    { id: 43, title: "wordpress custom themes", price: 550 },
    { id: 44, title: "shopify liquid development", price: 700 },
    { id: 45, title: "seo technical audit guide", price: 400 },
    { id: 46, title: "digital marketing automation", price: 600 },
    { id: 47, title: "excel advanced data analysis", price: 350 },
    { id: 48, title: "tableau visual analytics", price: 800 },
    { id: 49, title: "powerbi business intelligence", price: 850 },
    { id: 50, title: "agile & scrum project management", price: 900 }
];


// Get All courses
app.get('/api/courses', (req, res, next) => {
    res.json(courses);
    app.next();
});



app.get('/api/courses/:courseId', (req, res, next) => {

    const courseId = +req.params.courseId;

    const selectedCourse = courses.find((course) => {
        course.id === courseId;
    });


    if (!selectedCourse) {
        return res.status(404).json({ "msg": "Course Not Found...." });
    }

    res.json(selectedCourse);


    app.next();
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});