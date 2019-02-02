var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    name: String,
    author: String,
    price: Number,
});

module.exports = mongoose.model('Book', BookSchema);