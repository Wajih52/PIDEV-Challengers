
var express = require("express");
const matiere = require("../model/matiere");
var router = express.Router();
var Matiere = require("../model/matiere");
/* GET users listing. */

router.get("/", function (req, res, next) {
  Matiere.find(function (err, data) {
    if (err) throw err;
    //res.json(data);
res.send(data)  });
});


router.post('/addmatiere', function (req, res) {
    //res.json(req.body);
  
    var m = new Matiere({
      nom: req.body.nom,
      nbrheure: req.body.nbrheure,
      specialite: req.body.specialite,
      

    });
  
    m.save();
    res.send("ajout complete");
  });

  router.delete("/delete/:id", (req, res, next) => {
    var ident = req.params.id;
    Matiere.findOneAndRemove({ _id: ident }, function (err) {

    });
   res.send("sucess delete matiere");
  });

 


  router.get('/update/:id',(req, res, next) => {
    var id=req.params._id
    Matiere.findById({_id:id},(err,data)=>{
        if(err)throw err
        res.send('successs')
    })
})
router.post('/update',(req, res, next) => {
    var id=req.body._id
    Matiere.findById({_id:id},(err,data)=>{
        if(err)throw err
        data.nom=req.body.nom,
        data.nbrheure=req.body.nbrheure,
        data.specialite=req.body.specialite,
        data.save()
   })
    res.send('validee');
})



router.get('/:id', function(req, res,next){

  Matiere.findById({_id : req.params.id}, function(err, data){
      if(err) throw err;
      res.send(data);
      //res.json(data);
  });
});

router.get('/recherche/:specialite', function(req, res,next){

  Matiere.find({specialite : req.params.specialite}, function(err, data){
      if(err) throw err;
      res.send(data);
      //res.json(data);
  });
});




router.post('/recherchernbrheure',(req, res, next) => {
        Matiere.find({nbrheure:req.body.nbrheure},(error, result) => {
            if (error)throw error
            console.log(req.body.nbrheure)
            console.log(result)
            res.send(result);
        })
    })


/*
router.post('/', (req, res) =>{
  console.log(req);
  const newRecord = new PostModel({
    nom: req.body.nom,
    nbrheure: req.body.nbrheure,
    specialite: req.body.specialite
  });

  newRecord.save((err, docs) =>{
    if (!err) res.send(docs);
    else console.log('Error creating new data : ' + err);
  })
})
*/






module.exports = router;
