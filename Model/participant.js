var mongoose = require('mongoose')
var schema = mongoose.Schema ;

var participant = new schema({
    nom : String  ,
    profession : String,
    ecole : String,
    niveau : String ,
    email : String ,
    telephone : Number ,
    commentaire : String ,
    idevenement : String,
    nomevenement:String,
    accepted:Number,
})

module.exports = mongoose.model('participants', participant);
