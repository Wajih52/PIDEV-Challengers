var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Piece = new Schema({
	
	date : String,
	description : String,
	validation : String,


	
});

module.exports = mongoose.model('piece', Piece);