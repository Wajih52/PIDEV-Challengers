
var express = require("express");
const classe = require("../model/classe");
var router = express.Router();
var Classe = require("../model/classe");
/* GET users listing. */

router.get("/", function (req, res, next) {
  Classe.find(function (err, data) {
    if (err) throw err;
    //res.json(data);
res.send(data)  });
});

router.post('/addclasse', function (req, res) {
    //res.json(req.body);
  
    var c = new Classe({
      nom: req.body.nom,
      nbretudiant: req.body.nbretudiant,
      nbrprof: req.body.nbrprof,
      specialite: req.body.specialite,
      nbrmatiere: req.body.nbrmatiere

    });
  
    c.save();
    res.send("ajout complete");
  });

  router.delete("/delete/:id", (req, res, next) => {
    var ident = req.params.id;
    Classe.findOneAndRemove({ _id: ident }, function (err) {

    });
   res.send("sucess delete classe");
  });

 


  router.get('/update/:id',(req, res, next) => {
    var id=req.params._id
    Classe.findById({_id:id},(err,data)=>{
        if(err)throw err
        res.send('successs')
    })
})
router.post('/update',(req, res, next) => {
    var id=req.body._id
    Classe.findById({_id:id},(err,data)=>{
        if(err)throw err
        data.nom=req.body.nom,
        data.nbretudiant=req.body.nbretudiant,
        data.nbrprof=req.body.nbrprof,
        data.specialite=req.body.specialite,
        data.nbrmatiere=req.body.nbrmatiere,
        data.save()
   })
    res.send('validee');
})


router.get('/recherche/:nom', function(req, res,next){

  Classe.find({nom : req.params.nom}, function(err, data){
      if(err) throw err;
      res.send(data);
      //res.json(data);
  });
});


router.post('/recherchernbrprof',(req, res, next) => {
  Classe.find({nbrheure:req.body.nbrprof},(error, result) => {
      if (error)throw error
      console.log(req.body.nbrprof)
      console.log(result)
      res.send(result);
  })
})

module.exports = router;
