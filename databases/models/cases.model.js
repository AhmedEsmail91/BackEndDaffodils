import mongoose, { Schema } from 'mongoose';
import AppError from '../../src/utils/AppError.js';

const contentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['before', 'after']
  }
});

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    content: {
        type: [contentSchema],
        required: true,
        validate: {
        validator: function(v) {
            return v.length === 2 && v.some(item => item.type === 'before') && v.some(item => item.type === 'after');
        },
        message: 'Content must contain exactly two entries: one "before" and one "after".'
        },
        default: [{filename: 'default.jpg', type: 'before'}, {filename: 'default.jpg', type: 'after'}]
    },
},{timestamps:true});
const caseModel = mongoose.model('Case', schema);
schema.post('findOneAndUpdate', async function (doc) {
    if (!doc) {
        throw new AppError('Case not found', 404);
    }
    if (doc.content.length !== 2 || !doc.content.some(item => item.type === 'before') || !doc.content.some(item => item.type === 'after')) {
        throw new AppError('Content must contain exactly two entries: one "before" and one "after".', 400);
    }
    if(doc.content.length<=0){
        doc.content = [{filename: 'default.jpg', type: 'before'}, {filename: 'default.jpg', type: 'after'}];
    }
})

export default caseModel;