var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comptabilite = new Schema({

    montant :{ type: String, required: true },
    sens : { type: String, required: true },
    desc :{ type: String, required: true },
    balance : { type: String, required: true },
    date : { type: String, required: true }

});

module.exports = mongoose.model('comptabilites',Comptabilite);