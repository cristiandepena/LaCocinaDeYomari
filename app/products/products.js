const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: Number,
    description: String,
    cost: Number,
    price: Number,
    dept: [{ type: Schema.Types.ObjectId, ref: 'dept' }],
    measureUnit: Number,
    stock: Number,
    isActive: Boolean,
    createdBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    dateCreated: Date,
    modifiedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    dateModified: Date

});

const product = mongoose.model('product');