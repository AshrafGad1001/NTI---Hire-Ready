const axios = require('axios');

async function getProducts() {
    const response = await axios.get(`https://dummyjson.com/products`);
    return response.data;
}



function getSkills() {
    return ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'];
}

module.exports = {
    getProducts,
    getSkills
};
