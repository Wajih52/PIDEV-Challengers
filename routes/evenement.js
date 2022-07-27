var express = require('express');
const path = require ('path');
var multer = require('multer');
var nodemailer = require('nodemailer');
var evenementObject =require('../Model/evenement');
var detailsObject=require('../Model/detailsEvenement');
var participantObject=require('../Model/participant');
var router = express.Router();

//*******************************************************************************************************
//********************************<<Afficher les evenements>> *******************************************
//*******************************************************************************************************
router.get('/', function(req, res, next) {
    evenementObject.find(function (err,data){
        if (err) throw err;
        res.send(data);

    })
})
//-----------------------afficher une seule evenement  ---------------------------------------
router.get('/event/:id', function(req, res, next) {

    evenementObject.findById({_id:req.params.id},function (err,doc){
        console.log('id de levenement ===> '+doc.id);
        res.send(doc) ;
    });

});
//-----------------------afficher details evenements ---------------------------------------
router.get('/details', function(req, res, next) {
    detailsObject.find(function (err,doc){
        if (err) throw err;
        res.send(doc) ;
    });
});
//-----------------------afficher tout details evenements ---------------------------------------
router.get('/details/:id', function(req, res, next) {
    detailsObject.findOne({_id:req.params.id},function (err,doc){
        if (err) throw err;
        console.log('id de details de levenement ===> '+doc.id);
        res.send(doc) ;
    });
});
//-----------------------ajouter une evenement------------------------------------

router.post('/ajoutEvenement',async function (req,res,next){
    console.log('requête==> '+req.body);
    var de = new detailsObject({
        capacite : req.body.capacite,
        description : req.body.description,
        lieu : req.body.lieu ,
        paiement : req.body.paiement,
        typeevenement : req.body.typeevenement,
        typelieu : req.body.typelieu,
        like : 0 ,
        nbrparticipation :0
    })
    de.save();
    console.log('Object Details Event enregistré (de.save)== > '+de);
    var e = new evenementObject({
        nom : req.body.nom,
        responsable : req.body.responsable,
        datedebut : req.body.datedebut,
        heuredebut : req.body.heuredebut,
        datefin : req.body.datefin,
        heurefin : req.body.heurefin
    })
    e.details=de._id.toString() ;
    await e.save();
    console.log('Object Event enregistré (e.save)== > '+e);
    res.send('ajouté avec succées')
})

//-----------------delete----------------------------
router.delete('/delete/:id',(req,res,next)=>{
    var idDetails ;
    console.log('Requete==> ');
    console.log(req.params.id);
    evenementObject.findById({_id :req.params.id},function (err,doc){
        if (err){
            console.log(err);
        }else {
            console.log('founded ==> '+doc);
            idDetails = doc.details ;
            console.log('id Details ==> '+idDetails);
        }
        evenementObject.findOneAndRemove({_id :req.params.id},function (err){
            if (err) throw err ;
            console.log('event deleted')
            detailsObject.findOneAndRemove({_id :idDetails},function (err){
                if (err) throw err ;
                console.log('details deleted')
            });
        });
    });
    res.send('Deleted successfully ');
});
//***************** update****************
router.post('/modifier/:id1/:id2' , (req, res, next)=>{
    // var ident1 = req.body.secretid1;
    // var ident2 = req.body.secretid2;
    var ident1 = req.params.id1;
    var ident2 = req.params.id2;
    console.log('ident1 == '+ident1);
    console.log('ident2 == '+ident2);
    evenementObject.findById({_id : ident1}, function(err, doc){
        doc.nom = req.body.nom,
            doc.responsable = req.body.responsable,
            doc.datedebut = req.body.datedebut,
            doc.heuredebut = req.body.heuredebut,
            doc.datefin = req.body.datefin,
            doc.heurefin = req.body.heurefin,
            doc.save();
        console.log('event ==> '+doc);
    });
    detailsObject.findById({_id : ident2}, function(err, doc){
        doc.capacite = req.body.capacite,
            doc.description = req.body.description,
            doc.lieu = req.body.lieu,
            doc.paiement = req.body.paiement,
            doc.typeevenement = req.body.typeevenement,
            doc.typelieu = req.body.typelieu,
            doc.nbrparticipation = req.body.nbrparticipation,
            doc.like = req.body.like
        doc.save();
        console.log('details ==> '+doc)
    });
    res.send('modifier successfully');
});
//********************************<<Afficher les participants>> *******************************************
//*******************************************************************************************************
router.get('/participant', function(req, res, next) {
    participantObject.find(function (err,data){
        if (err) throw err;
        res.send(data);

    })
})
//-----------------------afficher une seule participant  ---------------------------------------
router.get('/participant/:id', function(req, res, next) {

    participantObject.findById({_id:req.params.id},function (err,doc){
        console.log('id de participant ===> '+doc._id);
        res.send(doc) ;
    });

});
//***************************ajout participant***********************************
router.post('/ajoutParticipant',async function (req,res,next){
    console.log('requête==> '+req.body);
    var p = new participantObject({
        nom : req.body.nom,
        profession : req.body.profession,
        ecole : req.body.ecole ,
        niveau : req.body.niveau,
        email : req.body.email,
        telephone : req.body.telephone,
        commentaire : req.body.commentaire ,
        idevenement : req.body.idevenement,
        nomevenement : req.body.nomevenement,
        accepted : 0,
    })
    p.save();
    console.log("participant ajouté avec succées")
    res.send("participant ajouté avec succées")

});
//-----------------delete participant----------------------------
router.delete('/deleteparticipant/:id',(req,res,next)=> {
    console.log('Requete==> ');
    console.log(req.params.id);
    participantObject.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send('participant Deleted successfully ');
        }
    });



});
//***************** update nombre participant ****************
router.get('/modifierNbrParticipant/:id' , (req, res, next)=>{
    var ident = req.params.id;
    var idDetails ;
    var sature=0 ;
    console.log('ident1 == '+ident);
    evenementObject.findById({_id : ident}, function(err, doc){
        if (err){
            console.log(err);
        }else {
            console.log('founded ==> '+doc.nom);
            idDetails = doc.details ;
            console.log('id Details ==> '+idDetails);
        }
        detailsObject.findById({_id : idDetails}, function(err, doc){
            if(doc.nbrparticipation < doc.capacite   ){
                doc.nbrparticipation = doc.nbrparticipation+1 ;
                console.log('nbr participant==> '+doc.nbrparticipation);
                doc.save();
            }else{
                console.log("evenement saturée");
                sature =1;

            }
            res.json(sature);
        });
    });
});
//***************** update etat participant ****************
router.get('/modifierEtat/:id' , (req, res, next)=>{
    var ident = req.params.id;
    console.log('ident == '+ident);
    participantObject.findById({_id : ident}, function(err, doc){
        if (err){
            console.log(err);
        }else {
            doc.accepted = 1 ;
            console.log('nbr like==> '+doc.accepted);
            doc.save();
            res.send('etat modifié');
        }
    });
});

router.get('/modifierNbrLike/:id' , (req, res, next)=>{
    var ident = req.params.id;
    console.log('ident1 == '+ident);
    detailsObject.findById({_id : ident}, function(err, doc){
        if (err){
            console.log(err);
        }else{
            doc.like = doc.like+1 ;
            console.log('nbr like==> '+doc.like);
            doc.save();
            res.send('nombre de like modifié');
        }

        });
});
//*******************************************************************************************************
//**************************************<<Envoi d'email>> ***********************************************
//*******************************************************************************************************
router.get('/envoyer/:email',(req,res)=>{

    const formulaire = `
        <h3>Bonjour </h3>
         <p><strong>monsieur/madame</strong> </p>
         <p>suite au traitement de votre demande de participation à une de nos evenements scolaires </p>
         <p>on vous informe que vous êtes acceptées </p>
         <p>soyer au rendez-vous :-)</p>
       ` ;



    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pidevgestionecole@gmail.com',
            pass : 'pkjejagsssmjaluw'
        }
    })

    const mailOptions = {
        from : 'L\'administration des évenements 📧🏫‍ <pidevgestionecole@gmail.com>',
        to : `${req.params.email}`,
        subject: "Demande Accepté ✔",
        text : 'from gmail email using ASPI',
        html : formulaire
    };

    transport.sendMail(mailOptions).then(result => console.log('success',result))
        .catch(error => console.log(error.message))
    res.send('sended successfully ')

})
//*******************************************************************************************************
//**************************************upload photo ****************************************************
//*******************************************************************************************************
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now()+path.extname(file.originalname))
    }
});
//Filtre(image seulement)
const fileFilter=(req, file,cb)=>{
    // extension
    const filetypes = /jpeg|jpg|png|gif/;
    // vérifier extension
    const extname =filetypes.test(path.extname(file.originalname).toLowerCase());
    console.log('extname ==> '+extname);
    // vérifier mimetypes
    const mimetype = filetypes.test(file.mimetype);
    console.log('mimetype ==> '+mimetype);
    if (mimetype && extname){
        cb(null , true);
    }else{
        cb('Error: Images Only')
    }

};
//Upload image
var upload = multer({
    storage:storage,
    fileFilter:fileFilter
}).single('image');

router.post('/upload' ,function (req,res,next) {

    upload(req,res,(err)=>{
        if (err){
            console.log('there is error==> '+err);
            res.render('evenement.twig', {msg: err})
        }else {
            if (req.file == undefined){
                res.render('evenement.twig',{msg:'error: No file Selected'}) ;
            }else{
                console.log(req.file);
                res.render('evenement.twig', {
                    msg: 'File Uploaded',
                    file: `images/${req.file.filename}`
                });
            }
        }
    })

});
//----------------------------------------------------------------------------------------------------
module.exports = router;