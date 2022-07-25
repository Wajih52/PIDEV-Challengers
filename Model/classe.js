var mongoose =require ('mongoose');
var Schema = mongoose.Schema;
var Classe = new Schema ({
nom: String,
nbretudiant: String,
nbrprof : String,
specialite: String,
nbrmatiere: String
});
module.exports=mongoose.model('classes',Classe);