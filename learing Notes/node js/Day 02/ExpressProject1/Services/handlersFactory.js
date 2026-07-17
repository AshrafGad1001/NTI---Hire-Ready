const asyncHandler = require('express-async-handler');

exports.createOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.create(req.body);
        res.status(201).json({ data: doc });
    });

exports.getAll = (Model) =>
    asyncHandler(async (req, res, next) => {
        const docs = await Model.find({});
        res.status(200).json({ results: docs.length, data: docs });
    });

exports.getOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.findById(req.params.id);
        if (!doc) {

            return next(new Error('No document found for this ID'));
        }
        res.status(200).json({ data: doc });
    });

exports.updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(new Error('No document found for this ID'));
        }
        res.status(200).json({ data: doc });
    });

exports.deleteOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new Error('No document found for this ID'));
        }
        res.status(204).send();
    });