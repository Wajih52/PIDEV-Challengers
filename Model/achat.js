var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Achat = new Schema({

    montant :String,
    sens : String,
    fournisseur : String,
    qte : String,
    desc : String,
    date : String,
    compta : 
	{type:mongoose.Schema.Types.ObjectId,
	ref:'compta',
	}

});

module.exports = mongoose.model('achats',Achat);