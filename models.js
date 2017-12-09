'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	name: String,
	department: String,
	level: Number,
	type: String,
	link: String,
	image: String
});

var Book = mongoose.model("Book", BookSchema);

module.exports.Book = Book;