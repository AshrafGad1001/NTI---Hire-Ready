import axios from 'axios';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Function بتحمّل صورة واحدة
function downloadImage(url, folder) {
    const fileName = path.basename(url);
    const filePath = `${folder}/${fileName}`;

    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`✅ Downloaded: ${fileName}`);
        });
    }).on('error', (err) => {
        console.log(`❌ Error: ${fileName} - ${err.message}`);
    });
}

// Function بتجيب كل المنتجات وتحمّل كل صورهم
async function getAllImages() {
    const { data } = await axios('https://ecommerce.routemisr.com/api/v1/products');
    const products = data.data;

    // عمل فولدر رئيسي
    if (!fs.existsSync('./images')) {
        fs.mkdirSync('./images');
    }

    products.forEach((product) => {

        // عمل فولدر لكل product باسمه
        const productFolder = `./images/${product._id}`;
        if (!fs.existsSync(productFolder)) {
            fs.mkdirSync(productFolder);
        }

        // تحميل الـ imageCover
        downloadImage(product.imageCover, productFolder);

        // تحميل كل الـ images
        product.images.forEach((imgUrl) => {
            downloadImage(imgUrl, productFolder);
        });
    });
}

getAllImages();