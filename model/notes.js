var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notes = new Schema({
	
	matiere : String,
    type : String,
	note: String,
    etudiant: String

	
});

module.exports = mongoose.model('notes', notes);