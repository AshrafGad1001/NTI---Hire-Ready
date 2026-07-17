const User = require('../Models/userModel');
const factory = require('./handlersFactory');

exports.createUser = factory.createOne(User);
exports.getAllUsers = factory.getAll(User);
exports.getUserById = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);