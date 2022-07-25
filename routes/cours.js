const express = require("express");
const cours = require("../model/cours");
const app = express();
var path = require('path');
const multer = require("multer");
const cors = require('cors');
const controller = require("../controller/file.controller");
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
	next();
})
app.use(cors());
app.get('/afficher',function(req,res,next){
 
 cours.find(function(err, data){
     if (err) throw err;
    res.send(data);
   
 });
//res.json(data);
});

 
app.post('/add',cors() ,function(req, res){
	
	console.log(req.file);
	var p = new cours({
		nom : req.body.nom,
		classe : req.body.classe,
		matiere : req.body.matiere,
        nomprof : req.body.nomprof,
		piece : req.body.piece
		
	});
	p.save();
	res.send("add succes");
	
});


app.delete('/delete/:id' , (req, res, next)=>{
	var ident = req.params.id;
	cours.findOneAndRemove({_id : ident}, function(err){
		});
					
		res.send("delete sucess");
});
app.get('/details/:id', function(req, res,next){

	cours.findById({_id : req.params.id}, function(err, data){
		if(err) throw err;
		res.send(data);
		//res.json(data);
	});
});

app.post('/putform' , (req, res, next)=>{
	var ident = req.body._id;
	var doc=new cours();
	console.log(req.body.piece);
	cours.findById({_id : ident}, function(err, doc){
		doc.nom = req.body.nom,
		doc.classe = req.body.classe,
		doc.matiere = req.body.matiere,
		doc.nomprof = req.body.nomprof,
		doc.piece = req.body.piece
		
		doc.save();		
	});
	res.send("updated sucess");
});
app.post("/upload", controller.upload);
app.get("/files", controller.getListFiles);
app.get("/files/:name", controller.download);
module.exports = app;