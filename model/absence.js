var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Absence = new Schema({

	date : String,
	justificatif : String,
	etudiant : String,
    matiere : String,
    piece : 
	{type:mongoose.Schema.Types.ObjectId,
	ref:'piece',
	},
	
});

module.exports = mongoose.model('absence', Absence);