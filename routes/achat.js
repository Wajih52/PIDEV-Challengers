var express = require('express');
var router = express.Router();
var Achat =require('../model/achat')
var XLSX = require('xlsx');
var xlsximp = require('xlsx');
var Comptabilite =require('../model/compta');
const achat = require('../model/achat');
var sum= 0;

 


   async function GETSUM(){
    sum=0;
const findResult = await Comptabilite.find();
for (let i = 0; i < findResult.length; i++) {
    const result = findResult[i];
    sum += parseInt(result.montant);
}
return sum;


     
       //res.json(data);
    }


router.get('/',(req,res)=>{
    
   
       res.send("achat is working");
      
    });
 


router.get('/achats',function(req,res,next){
    let sum=0;
    Achat.find(function(err, data){
        if (err) throw err;
        GETSUM();
       res.send(data);
      
    });
  
   //res.json(data);
});
/////////////////////////////////////////////

router.post('/addAchats', async function(req,res){
    var p = new Achat({
        montant : req.body.montant,
        sens : req.body.sens,
        fournisseur : req.body.fournisseur,
        qte : req.body.qte,
        desc : req.body.desc,
        date : req.body.date
    });
    if (p.montant !='' && p.sens!=''&& p.qte!='' && p.fournisseur!='' && p.desc!='' && p.date!=''){

p.montant=p.montant*p.qte;
console.log(p.montant);
    await p.save();
    let x = GETSUM();
    

    var a = new Comptabilite({
        montant : req.body.montant,
        sens : req.body.sens,
        desc : req.body.desc,
        balance : sum,
        date : req.body.date
    });
a.montant=p.montant;
console.log(a.montant);
    x.then(function(result) {
        a.balance=result;
       
        a.save();
     })
 p.compta=a;
 await p.save();
 res.send("sucess save achat");}
 else {
    res.send("you have a empty field")
 }
});

//////////////////////////////////////////
router.post('/addAchat',function(req,res){
    var p = new Achat({
        montant : req.body.montant,
        sens : req.body.sens,
        fournisseur : req.body.fournisseur,
        qte : req.body.qte,
        desc : req.body.desc,
        date : req.body.date
    });
 p.save();
 res.send("sucess save achat");
});

router.delete('/deleteAchat/:id',(req,res,next)=>{
    var ident = req.params.id;
    Achat.findOneAndRemove({_id : ident},function(err){

    });
    res.send("sucess delete achat");
});

router.post('/updateAchat', (req,res,next)=>{
    var ident = req.body._id;
    Achat.findById({_id : ident},function(err,doc){
        doc.montant = req.body.montant,
        doc.sens = req.body.sens,
        doc.fournisseur = req.body.fournisseur,
        doc.qte = req.body.qte,
        doc.desc = req.body.desc,
        doc.date = req.body.date
        doc.save();
    });
    res.send("sucess update achat");
    });
    router.get('/achat/:id', function(req, res,next){

        Achat.findById({_id : req.params.id}, function(err, data){
            if(err) throw err;
            res.send(data);
            //res.json(data);
        });
    });

    router.post('/rechercherDate',(req, res, next) => {
        Achat.find({date:req.body.date},(error, result) => {
            if (error)throw error
            console.log(req.body.date)
            console.log(result)
            res.send(result);
        })
    })


    router.post('/exportdata',(req,res)=>{
        var wb = XLSX.utils.book_new(); //new workbook
        Achat.find((err,data)=>{
            if(err){
                console.log(err)
            }else{
                var temp = JSON.stringify(data);
                temp = JSON.parse(temp);
                var ws = XLSX.utils.json_to_sheet(temp);
                var down = 'C:/Users/OMAR-PC/Desktop/projetWeb/back/exportdata1.xlsx'
               XLSX.utils.book_append_sheet(wb,ws,"sheet1");
               XLSX.writeFile(wb,down);
               res.send("sucess update compta");
            }
        });
    });


    router.post('/importdata',(req,res)=>{
        const file=xlsximp.readFile("C:/Users/OMAR-PC/Desktop/projetWeb/back/test1.xlsx");
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

             var p = new Achat({
                montant : result.montant,
                sens : result.sens,
                fournisseur : result.fournisseur,
                qte : result.qte,
                desc : result.desc,
                date : result.date
        });
        p.save();
       
        }
       
        res.send("sucess upload");
     

    })


    router.post('/inserlistetAchat' , (req, res, next)=>{
        console.log(req.body);
        var listenotes = req.body
                        achat.collection.insert(listenotes, function (err, docs) {
                            if (err){ 
                                return console.error(err);
                            } else {
                              console.log("Multiple documents inserted to Collection");
                            }
                          });
        res.send("updated sucess");
    });


module.exports = router;
