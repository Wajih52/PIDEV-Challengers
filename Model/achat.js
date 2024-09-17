var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Achat = new Schema({

    montant : { type: String, required: true },
    sens : { type: String, required: true },
    fournisseur : { type: String, required: true },
    qte : { type: String, required: true },
    desc : { type: String, required: true },
    date : { type: String, required: true },
    compta : 
	{type:mongoose.Schema.Types.ObjectId,
	ref:'compta',
	}

});

module.exports = mongoose.model('achats',Achat);