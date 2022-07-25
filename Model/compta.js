var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comptabilite = new Schema({

    montant :{ type: String, required: true },
    sens : String,
    desc : String,
    balance : String,
    date : String

});

module.exports = mongoose.model('comptabilites',Comptabilite);