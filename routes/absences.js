var express = require('express');
var router = express.Router();
var Absence = require('../model/absence');
//const csvwriter = require('csv-writer');
var Piece = require('../model/piece');
//let createCsvWriter = csvwriter.createObjectCsvWriter;


var XLSX = require('xlsx');




router.post('/exportdata',(req,res)=>{
  var wb = XLSX.utils.book_new(); //new workbook
  Absence.find((err,data)=>{
      if(err){
          console.log(err)
      }else{
          var temp = JSON.stringify(data);
          temp = JSON.parse(temp);
          var ws = XLSX.utils.json_to_sheet(temp);
          var down = 'C:/GestionEcole-s/uploads/absence.xlsx'
         XLSX.utils.book_append_sheet(wb,ws,"sheet1");
         XLSX.writeFile(wb,down);
         res.send("sucess update absce");
      }
  });
});

/* GET home page. */



router.get('/',async function(req,res,next){
    
  await Absence.find({}).populate('piece').then(data=>{
    
    res.json(data);
}).catch(err=>{
    res.json(err);
});
});

router.get('/abse/:id', function(req, res,next){

  Absence.findById({_id : req.params.id}, function(err, data){
      if(err) throw err;
      res.send(data);
      //res.json(data);
  });
});


 //ajout
router.post('/addAbsence',async function(req,res){
  var a = new Absence({
    etudiant : req.body.etudiant,
    date : req.body.date,
    justificatif : req.body.justificatif,
    matiere : req.body.matiere,

      
  });
//await a.save();
console.log(req.body);
let data = JSON.parse(req.body);
var p = new Piece({
  description : data.piece.description,
  date : data.piece.date,
  validation : data.piece.validation,

 
    
});
p.save();

a.piece=p;
await a.save();
res.send("sucess save absence");
});

router.post('/putAbsence' , (req, res, next)=>{
	var ident = req.body._id;
	Absence.findById({_id : ident}, function(err, doc){
		doc.date = req.body.date,
		doc.justificatif = req.body.justificatif,
		doc.matiere = req.body.matiere,
    doc.etudiant = req.body.etudiant,
		doc.save();		
	});
	res.send("sucesseee");
});

router.get('/delete/:id' , (req, res, next)=>{
	var ident = req.params.id;
	Absence.findOneAndRemove({_id : ident}, function(err){
		});
		res.send("sucessjij");

});

/*router.get('/export',async (req, res) => {
    absence.find({}, {_id:0,putAbsence:0,addAbsence:0,__v:0},(err, data) =>{
        console.log("data:" ,data);
        try{
            const path = 'absences.XLS';
            const csvWriter = createCsvWriter({
                path: path,
                header: [{ id:'date',title:'date'},
                {id:'justificatif',title:'justificatif' },
                {id:'etudiant',title:'etudiant' },
                {id:'matiere',title:'matiere' },
                {id:'piece',title:'piece' }]})
                csvWriter.writeRecords(data)
                .then((da) => {res.download(path);});
        }catch (err){
            console.error(err);
        }
    });
});*/

router.post('/search' , async (req, res)=>{

    let data=await Absence.find({etudiant:  { $regex: '.*' + req.body.search + '.*' }});
    res.send(data);
});




module.exports = router;
