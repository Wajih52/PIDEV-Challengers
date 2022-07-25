var mongoose =require ('mongoose');
var Schema = mongoose.Schema;
var Matiere = new Schema ({
nom: String,
nbrheure: Number,
specialite: String,
});
module.exports=mongoose.model('matiere',Matiere);