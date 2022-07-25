var express = require('express');
var router = express.Router();
var Comptabilite =require('../model/compta')
var XLSX = require('xlsx');
var xlsximp = require('xlsx');
const compta = require('../model/compta');
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
    
   
       res.send("compta is working");
      
    });
 
    router.get('/compta/sum', async function(req,res,next){
    
        sum=0;
const findResult = await Comptabilite.find();
for (let i = 0; i < findResult.length; i++) {
    const result = findResult[i];
    sum += parseInt(result.montant);
}
res.json(sum);
    });

router.get('/compta',function(req,res,next){
    
    Comptabilite.find(function(err, data){
        if (err) throw err;
       res.send(data);
      
    });
   //res.json(data);
});

router.post('/addCompta',function(req,res){
    let x = GETSUM();
    
    var p = new Comptabilite({
        montant : req.body.montant,
        sens : req.body.sens,
        desc : req.body.desc,
        balance : req.body.balance,
        date : req.body.date
    });
    x.then(function(result) {
        p.balance=result;
       
        p.save();
     })

 res.send("sucess save compta");
});

router.delete('/deleteCompta/:id',(req,res,next)=>{
    var ident = req.params.id;
    Comptabilite.findOneAndRemove({_id : ident},function(err){

    });
    res.send("sucess delete compta");
});

router.post('/updateCompta', (req,res,next)=>{
    var ident = req.body._id;
    Comptabilite.findById({_id : ident},function(err,doc){
        doc.montant = req.body.montant,
        doc.sens = req.body.sens,
        doc.desc = req.body.desc,
        doc.balance = req.body.balance,
        doc.date = req.body.date
        doc.save();
    });
    res.send("sucess update compta");
    });
    router.get('/compta/:id', function(req, res,next){

        Comptabilite.findById({_id : req.params.id}, function(err, data){
            if(err) throw err;
            res.send(data);
            //res.json(data);
        });
    });
    router.post('/rechercherSene',(req, res, next) => {
        Comptabilite.find({sens:req.body.sens},(error, result) => {
            if (error)throw error
            console.log(req.body.sens)
            console.log(result)
            res.send(result);
        })
    })
    router.post('/rechercherDate',(req, res, next) => {
        Comptabilite.find({date:req.body.date},(error, result) => {
            if (error)throw error
            console.log(req.body.date)
            console.log(result)
            res.send(result);
        })
    })
    router.post('/exportdata',(req,res)=>{
        var wb = XLSX.utils.book_new(); //new workbook
        Comptabilite.find((err,data)=>{
            if(err){
                console.log(err)
            }else{
                var temp = JSON.stringify(data);
                temp = JSON.parse(temp);
                var ws = XLSX.utils.json_to_sheet(temp);
                var down = 'C:/Users/OMAR-PC/Downloads/exportdata.xlsx'
               XLSX.utils.book_append_sheet(wb,ws,"sheet1");
               XLSX.writeFile(wb,down);
               res.send("sucess export");
            }
        });
    });

    router.post('/importdata',(req,res)=>{
        const file=xlsximp.readFile("C:/Users/OMAR-PC/Desktop/projetWeb/importdata.xlsx");
        const sheets=file.SheetNames;

        const data=[];
        for (let i = 0  ;i <= sheets.length; i++) {
            const sheetname =sheets[i];

            const sheetData=xlsximp.utils.sheet_to_json(file.Sheets[sheetname]);

            sheetData.forEach((a)=>{
             data.push(a);
            })

        }
        for (let i = 0  ;i < data.length; i++) {
            const result =data[i];

             var p = new Comptabilite({
            montant : result.montant,
            sens : result.sens,
            desc : result.desc,
            balance : result.balance,
            date : result.date
        });
        p.save();
        }
    
    
     
        res.send("sucess export");
    })
    router.post('/inserlistetAchat' , (req, res, next)=>{
        console.log(req.body);
        var listenotes = req.body
                        compta.collection.insert(listenotes, function (err, docs) {
                            if (err){ 
                                return console.error(err);
                            } else {
                              console.log("Multiple documents inserted to Collection");
                            }
                          });
        res.send("updated sucess");
    });


module.exports = router;
