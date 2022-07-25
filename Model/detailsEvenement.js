var mongoose = require('mongoose')
var schema = mongoose.Schema ;

var detailsEvenement = new schema({
    capacite : Number  ,
    description : String,
    lieu : String,
    paiement : String ,
    typeevenement : String ,
    typelieu : String ,
    like : Number ,
    nbrparticipation : Number
})

module.exports = mongoose.model('detailsEvenement', detailsEvenement);

