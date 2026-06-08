import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('usersDB', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected Successfully ');

        
        await import('../Modules/user/user.model.js');
        await import('../Modules/post/post.model.js');

        await sequelize.sync({ force: false });
        console.log('Tables Synced Successfully ');

    } catch (error) {
        console.error('Database Connection Failed ', error);
    }
};

export { sequelize, connectDB };