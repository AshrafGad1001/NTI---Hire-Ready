"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Student {
    id;
    name;
    grade;
    constructor(id, name, grade) {
        this.id = id;
        this.name = name;
        this.grade = grade;
    }
    Display() {
        console.log(`ID: ${this.id} | Name: ${this.name} | Grade: ${this.grade}`);
    }
}
const students = [
    new Student(1, "Ashraf", 95),
    new Student(2, "Ahmed", 88),
    new Student(3, "Ali", 77)
];
students.forEach((student) => {
    student.Display();
});
//# sourceMappingURL=index.js.map