var express = require('express');
var router = express();
var Piece = require('../model/piece');

var Absence = require('../model/absence');
const fileUpload = require('express-fileupload');
const path = require("path");
const util = require('util');

router.use(express.json());
router.use(express.urlencoded({ extended: true}));
router.use(fileUpload()); 

//const upload = require('express-fileupload');

 
/* GET home page. */

/*router.post("/uploadPiece",async (req, res)=>{
  
    //const file = req.files.file;
    //const filename = file.name;
    //const size = file.data.length;
    //const extension = path.extname(fileName);
  const allowedExtentions = /png|pdf|jpg|jpeg|gif/;
  
  //if(!allowedExtentions.test(extension)) throw "unSupported extenion!";
    //if(size > 50000000000)throw "File must be less than 5MB";

   // const md5 = file.md5;
    const URL ="/uploads/" ;
    await util.promisify(file.mv)("./public" + URL);

      res.send("piece is working");
  
  

})

*/

router.get('/piec/:id', function(req, res,next){

  Piece.findById({_id : req.params.id}, function(err, data){
      if(err) throw err;
      res.send(data);
      //res.json(data);
  });
});

router.get('/',function(req, res, next){
	
	Piece.find(function(err, data){
		if(err) throw err;
    res.json(data);	
	});
});

router.get('/pieces',function(req,res,next){
    
  Piece.find(function(err, data){
      if (err) throw err;
     res.send(data);
    
  });
 //res.json(data);
});

 //ajout
router.post('/addPiece',async function(req,res){
  var p = new Piece({
    description : req.body.description,
    date : req.body.date,
    validation : req.body.validation,
 
   
      
  });
p.save();
let absence = await Absence.findOne();
absence.piece=p;
await absence.save();
res.send("sucess save absence");
});

router.post('/putPiece' , (req, res, next)=>{
	var ident = req.body._id;
	Piece.findById({_id : ident}, function(err, doc){
		doc.date = req.body.date,
		doc.description = req.body.description,
		doc.validation = req.body.validation,
    
   
		doc.save();		
	});
	res.send("success");
});

router.get('/deletePiece/:id' , (req, res, next)=>{
	var ident = req.params.id;
	Piece.findOneAndRemove({_id : ident}, function(err){
		});
		res.send("success");

});

var xlsximp = require('xlsx');
const piece = require('../model/piece');
router.post('/importdata',(req,res)=>{

  const file=xlsximp.readFile("C:/GestionEcole-s/uploads/test.xlsx");
  const sheets=file.SheetNames;

  const data=[];
  for (let i = 0  ;i < sheets.length; i++) {
      const sheetname =sheets[i];

      const sheetData=xlsximp.utils.sheet_to_json(file.Sheets[sheetname]);

      sheetData.forEach((a)=>{
       data.push(a);
      })
  }
  for (let i = 0  ;i < data.length; i++) {
      const result =data[i];

       var p = new Piece({
      description : result.description,
      validation : result.validation,
      date : result.date,
  });
  p.save();
  res.send("sucess upload");
  }
})

/*router.use(upload())
router.get('/up', (req, res)=>{
  res.sendFile(__dirname + '/index.html')
})

router.post('/',(req,res)=>{
  if (req.files){
    console.log(req.files)
    var file = req.files.file
    var filename = file.name
    console.log(filename)

    file.mv('../uploads/'+filename, function (err){
    if (err) {
      res.send(err)
    }else {
      res.send("File upload")
    }
  })
  }
}


)*/
module.exports = router;
