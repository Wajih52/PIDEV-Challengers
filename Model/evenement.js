var mongoose = require('mongoose')
const {Schema} = require("mongoose");
var schema = mongoose.Schema ;

var evenement = new schema({
    nom : String  ,
    responsable : String ,
    datedebut : String,
    heuredebut : String ,
    datefin : String ,
    heurefin : String ,
    details : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'detailsEvenement'
    }
})

module.exports = mongoose.model('evenement', evenement);