var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cours = new Schema({
	
	nom : String,
	classe : String,
	matiere : String,
    nomprof : String,
	piece: Object
	
});

module.exports = mongoose.model('cours', cours);