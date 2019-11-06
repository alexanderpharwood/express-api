const mongoose = require('mongoose');

const Book = new mongoose.Schema(
	{
		title: {
			type: String,
			index: true
		},
		author: {
			type: String
		},
		slug: {
			type: String,
			lowercase: true,
			trim: true
		}
	}
);

Book.methods.toJson = function() {
	var obj = this.toObject();
	return obj;
}

module.exports = mongoose.model('Book', Book);
