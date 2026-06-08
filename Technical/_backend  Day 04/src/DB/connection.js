import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/backendDay04');
        console.log('Database Connected Successfully ');
    } catch (error) {
        console.error('Database Connection Failed ', error);
    }
};

export default connectDB;