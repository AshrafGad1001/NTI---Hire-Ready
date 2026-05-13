

interface IStudent {
    id: number;
    name: string;
    grade: number;
}

class Student implements IStudent {
    id: number;
    name: string;
    grade: number;

    constructor(id: number, name: string, grade: number) {
        this.id = id;
        this.name = name;
        this.grade = grade;
    }

    Display(): void {
        console.log(
            `ID: ${this.id} | Name: ${this.name} | Grade: ${this.grade}`
        );
    }
}
const students: Student[] = [
    new Student(1, "Ashraf", 95),
    new Student(2, "Ahmed", 88),
    new Student(3, "Ali", 77)
];

students.forEach((student) => {
    student.Display();
});