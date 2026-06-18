function calculator(a, b) {
    return {
        sum: a + b,
        multiply: a * b
    };
}

function getMessage() {
    return 'Hello Jest Testing';
}

function getUser() {
    return {
        id: 1,
        name: 'Ashraf',
        age: 23,
        email: 'ashraf@gmail.com',
        address: {
            city: 'Shebin El-Kom',
            country: 'Egypt'
        },
        skills: ['JavaScript', 'React', 'Node.js']
    };
}

module.exports = {
    calculator,
    getMessage,
    getUser
};