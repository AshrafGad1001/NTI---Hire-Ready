const express = require('express');

const app = express();
app.use(express.json());


let students = [
    { id: 1, name: "Ashraf Gad", age: 22, phone: "01012345678", address: "Menoufia, Egypt" },
    { id: 2, name: "Ahmed Ali", age: 24, phone: "01198765432", address: "Cairo, Egypt" },
    { id: 3, name: "Sara Mohamed", age: 20, phone: "01112223344", address: "Alexandria, Egypt" },
    { id: 4, name: "Mohamed Hassan", age: 23, phone: "01234567890", address: "Giza, Egypt" },
    { id: 5, name: "Nour Ibrahim", age: 21, phone: "01098765432", address: "Suez, Egypt" },
    { id: 6, name: "Youssef Khaled", age: 25, phone: "01156789012", address: "Luxor, Egypt" },
    { id: 7, name: "Mariam Mostafa", age: 19, phone: "01267890123", address: "Aswan, Egypt" },
    { id: 8, name: "Omar Tarek", age: 26, phone: "01378901234", address: "Mansoura, Egypt" },
    { id: 9, name: "Hana Adel", age: 22, phone: "01489012345", address: "Tanta, Egypt" },
    { id: 10, name: "Kareem Samy", age: 23, phone: "01590123456", address: "Zagazig, Egypt" },
    { id: 11, name: "Dina Nasser", age: 24, phone: "01601234567", address: "Ismailia, Egypt" },
    { id: 12, name: "Tarek Mahmoud", age: 27, phone: "01712345678", address: "Port Said, Egypt" },
    { id: 13, name: "Rana Essam", age: 20, phone: "01823456789", address: "Damietta, Egypt" },
    { id: 14, name: "Amr Wael", age: 22, phone: "01934567890", address: "Fayoum, Egypt" },
    { id: 15, name: "Salma Hossam", age: 21, phone: "01045678901", address: "Beni Suef, Egypt" },
    { id: 16, name: "Hassan Ramadan", age: 25, phone: "01156780123", address: "Minya, Egypt" },
    { id: 17, name: "Noha Gamal", age: 23, phone: "01267891234", address: "Asyut, Egypt" },
    { id: 18, name: "Mahmoud Fathy", age: 28, phone: "01378902345", address: "Sohag, Egypt" },
    { id: 19, name: "Layla Sherif", age: 20, phone: "01489013456", address: "Qena, Egypt" },
    { id: 20, name: "Bassem Fouad", age: 26, phone: "01590124567", address: "Hurghada, Egypt" },
    { id: 21, name: "Mona Samir", age: 22, phone: "01601235678", address: "Sharm El Sheikh" },
    { id: 22, name: "Walid Nabil", age: 24, phone: "01712346789", address: "Menoufia, Egypt" },
    { id: 23, name: "Reem Alaa", age: 21, phone: "01823457890", address: "Cairo, Egypt" },
    { id: 24, name: "Khaled Magdy", age: 23, phone: "01934568901", address: "Alexandria, Egypt" },
    { id: 25, name: "Asmaa Youssef", age: 25, phone: "01045679012", address: "Giza, Egypt" },
    { id: 26, name: "Tamer Anwar", age: 27, phone: "01156781234", address: "Suez, Egypt" },
    { id: 27, name: "Ghada Osama", age: 20, phone: "01267892345", address: "Luxor, Egypt" },
    { id: 28, name: "Sherif Lotfy", age: 22, phone: "01378903456", address: "Aswan, Egypt" },
    { id: 29, name: "Yasmin Hazem", age: 24, phone: "01489014567", address: "Mansoura, Egypt" },
    { id: 30, name: "Adel Kamal", age: 26, phone: "01590125678", address: "Tanta, Egypt" },
    { id: 31, name: "Heba Zaki", age: 21, phone: "01601236789", address: "Zagazig, Egypt" },
    { id: 32, name: "Wael Hamdy", age: 23, phone: "01712347890", address: "Ismailia, Egypt" },
    { id: 33, name: "Nadia Reda", age: 25, phone: "01823458901", address: "Port Said, Egypt" },
    { id: 34, name: "Sameh Sobhy", age: 28, phone: "01934569012", address: "Damietta, Egypt" },
    { id: 35, name: "Iman Farouk", age: 20, phone: "01045670123", address: "Fayoum, Egypt" },
    { id: 36, name: "Hossam Atef", age: 22, phone: "01156782345", address: "Beni Suef, Egypt" },
    { id: 37, name: "Doaa Emad", age: 24, phone: "01267893456", address: "Minya, Egypt" },
    { id: 38, name: "Ramadan Saad", age: 27, phone: "01378904567", address: "Asyut, Egypt" },
    { id: 39, name: "Shaimaa Nour", age: 21, phone: "01489015678", address: "Sohag, Egypt" },
    { id: 40, name: "Fady Micheal", age: 23, phone: "01590126789", address: "Qena, Egypt" },
    { id: 41, name: "Amira Magdy", age: 25, phone: "01601237890", address: "Hurghada, Egypt" },
    { id: 42, name: "Bishoy Nabil", age: 26, phone: "01712348901", address: "Cairo, Egypt" },
    { id: 43, name: "Rowan Tarek", age: 20, phone: "01823459012", address: "Alexandria, Egypt" },
    { id: 44, name: "Ziad Hany", age: 22, phone: "01934560123", address: "Giza, Egypt" },
    { id: 45, name: "Passant Walid", age: 24, phone: "01045671234", address: "Suez, Egypt" },
    { id: 46, name: "Nagy Gamil", age: 28, phone: "01156783456", address: "Luxor, Egypt" },
    { id: 47, name: "Aya Saber", age: 21, phone: "01267894567", address: "Aswan, Egypt" },
    { id: 48, name: "Mostafa Helmy", age: 23, phone: "01378905678", address: "Mansoura, Egypt" },
    { id: 49, name: "Rania Ashraf", age: 25, phone: "01489016789", address: "Tanta, Egypt" },
    { id: 50, name: "Islam Medhat", age: 27, phone: "01590127890", address: "Zagazig, Egypt" },
    { id: 51, name: "Soha Galal", age: 20, phone: "01601238901", address: "Ismailia, Egypt" },
    { id: 52, name: "Mazen Samir", age: 22, phone: "01712349012", address: "Port Said, Egypt" },
    { id: 53, name: "Nermeen Fawzy", age: 24, phone: "01823450123", address: "Damietta, Egypt" },
    { id: 54, name: "Essam Helal", age: 26, phone: "01934561234", address: "Fayoum, Egypt" },
    { id: 55, name: "Abeer Monir", age: 21, phone: "01045672345", address: "Beni Suef, Egypt" },
    { id: 56, name: "Karim Waheed", age: 23, phone: "01156784567", address: "Minya, Egypt" },
    { id: 57, name: "Lobna Hazem", age: 25, phone: "01267895678", address: "Asyut, Egypt" },
    { id: 58, name: "Alaa Shawky", age: 28, phone: "01378906789", address: "Sohag, Egypt" },
    { id: 59, name: "Radwa Mohsen", age: 20, phone: "01489017890", address: "Qena, Egypt" },
    { id: 60, name: "Sherihan Adly", age: 22, phone: "01590128901", address: "Hurghada, Egypt" },
    { id: 61, name: "Hazem Badr", age: 24, phone: "01601239012", address: "Sharm El Sheikh" },
    { id: 62, name: "Enas Mansour", age: 26, phone: "01712340123", address: "Menoufia, Egypt" },
    { id: 63, name: "Samy Abdelhady", age: 21, phone: "01823451234", address: "Cairo, Egypt" },
    { id: 64, name: "Hend Fathi", age: 23, phone: "01934562345", address: "Alexandria, Egypt" },
    { id: 65, name: "Maged Refaat", age: 25, phone: "01045673456", address: "Giza, Egypt" },
    { id: 66, name: "Dalia Saeed", age: 27, phone: "01156785678", address: "Suez, Egypt" },
    { id: 67, name: "Ihab Mansour", age: 20, phone: "01267896789", address: "Luxor, Egypt" },
    { id: 68, name: "Yasmine Emad", age: 22, phone: "01378907890", address: "Aswan, Egypt" },
    { id: 69, name: "Nader Hamza", age: 24, phone: "01489018901", address: "Mansoura, Egypt" },
    { id: 70, name: "Ola Shaker", age: 26, phone: "01590129012", address: "Tanta, Egypt" },
    { id: 71, name: "Tarek Naguib", age: 28, phone: "01601230123", address: "Zagazig, Egypt" },
    { id: 72, name: "Sahar Sabry", age: 21, phone: "01712341234", address: "Ismailia, Egypt" },
    { id: 73, name: "Ayman Tawfik", age: 23, phone: "01823452345", address: "Port Said, Egypt" },
    { id: 74, name: "Hala Fouad", age: 25, phone: "01934563456", address: "Damietta, Egypt" },
    { id: 75, name: "Wafaa Lotfy", age: 20, phone: "01045674567", address: "Fayoum, Egypt" },
    { id: 76, name: "Magdy Shalaby", age: 22, phone: "01156786789", address: "Beni Suef, Egypt" },
    { id: 77, name: "Azza Abdelnaser", age: 24, phone: "01267897890", address: "Minya, Egypt" },
    { id: 78, name: "Fares Helmy", age: 27, phone: "01378908901", address: "Asyut, Egypt" },
    { id: 79, name: "Rasha Sobhy", age: 21, phone: "01489019012", address: "Sohag, Egypt" },
    { id: 80, name: "Emad Zohdy", age: 23, phone: "01590120123", address: "Qena, Egypt" },
    { id: 81, name: "Yara Mohsen", age: 25, phone: "01601231234", address: "Hurghada, Egypt" },
    { id: 82, name: "Nabil Ramzy", age: 28, phone: "01712342345", address: "Cairo, Egypt" },
    { id: 83, name: "Suzy Adel", age: 20, phone: "01823453456", address: "Alexandria, Egypt" },
    { id: 84, name: "Galal Mansour", age: 22, phone: "01934564567", address: "Giza, Egypt" },
    { id: 85, name: "Mervat Samir", age: 24, phone: "01045675678", address: "Suez, Egypt" },
    { id: 86, name: "Osama Hafez", age: 26, phone: "01156787890", address: "Luxor, Egypt" },
    { id: 87, name: "Nawal Morsy", age: 21, phone: "01267898901", address: "Aswan, Egypt" },
    { id: 88, name: "Saeed Abdallah", age: 23, phone: "01378909012", address: "Mansoura, Egypt" },
    { id: 89, name: "Donia Fawzy", age: 25, phone: "01489010123", address: "Tanta, Egypt" },
    { id: 90, name: "Refaat Gouda", age: 27, phone: "01590121234", address: "Zagazig, Egypt" },
    { id: 91, name: "Abdelrahman Salah", age: 20, phone: "01601232345", address: "Ismailia, Egypt" },
    { id: 92, name: "Maha Tharwat", age: 22, phone: "01712343456", address: "Port Said, Egypt" },
    { id: 93, name: "Medhat Fouad", age: 24, phone: "01823454567", address: "Damietta, Egypt" },
    { id: 94, name: "Shady Labib", age: 26, phone: "01934565678", address: "Fayoum, Egypt" },
    { id: 95, name: "Eman Ragab", age: 21, phone: "01045676789", address: "Beni Suef, Egypt" },
    { id: 96, name: "Gamal Abdelhafiz", age: 23, phone: "01156788901", address: "Minya, Egypt" },
    { id: 97, name: "Fatma Zidan", age: 25, phone: "01267899012", address: "Asyut, Egypt" },
    { id: 98, name: "Reda Barakat", age: 28, phone: "01378900123", address: "Sohag, Egypt" },
    { id: 99, name: "Hoda Shehab", age: 20, phone: "01489011234", address: "Qena, Egypt" },
    { id: 100, name: "Yehia Abdelmaksoud", age: 22, phone: "01590122345", address: "Hurghada, Egypt" },
];


app.get('/students', (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});


app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
});



app.listen(3000, () => {
    console.log("Server is Running on http://localhost:3000");
});