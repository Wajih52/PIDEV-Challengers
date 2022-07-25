const express = require("express");
const notes = require("../model/notes");
const app = express.Router();
const cors = require('cors');
const bodyParser = require("body-parser");
const fastcsv = require("fast-csv");
const fs = require("fs");
const excelJS = require("exceljs");
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb+srv://gestionEcole:gestionEcole@cluster0.qvcwozh.mongodb.net/GestionEcole?retryWrites=true&w=majority';
// const dbName = 'GestionEcole';
// let db
 
// MongoClient.connect(url, function(err, client) {
//   console.log("Connected successfully to server");
//   db = client.db(dbName);
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next();
})
app.use(cors());
app.get('/afficher',function(req,res,next){
 
 notes.find(function(err, data){
     if (err) throw err;
    res.send(data);
   
 });
//res.json(data);
});

app.post('/add', function(req, res){
    /*res.json(req.body);*/
    var p = new notes({
        matiere : req.body.matiere,
        type : req.body.type,
        note : req.body.note,
        etudiant : req.body.etudiant
        
    });
    p.save();
    res.send("add succes");
});


app.delete('/delete/:id' , (req, res, next)=>{
    var ident = req.params.id;
    notes.findOneAndRemove({_id : ident}, function(err){
        });
                    
        res.send("delete sucess");
});
app.get('/details/:id', function(req, res,next){

    notes.findById({_id : req.params.id}, function(err, data){
        if(err) throw err;
        res.send(data);
        //res.json(data);
    });
});
app.post('/putform' , (req, res, next)=>{
    var ident = req.body._id;
    var doc=new notes();
    notes.findById({_id : ident}, function(err, doc){
        doc.matiere = req.body.matiere,
        doc.type = req.body.type,
        doc.note = req.body.note,
        doc.etudiant = req.body.etudiant
        doc.save();     
    });
    res.send("updated sucess");
});
app.post('/bulkinsertnotes' , (req, res, next)=>{
    console.log(req.body);
    var listenotes = req.body
                    notes.collection.insert(listenotes, function (err, docs) {
                        if (err){ 
                            return console.error(err);
                        } else {
                          console.log("Multiple documents inserted to Collection");
                        }
                      });
    res.send("updated sucess");
});

app.route("/find/:matiere/:etudiant").post(function(req, res) {
    var allnotes=[]
    var tab=[]
    var elem =new notes();
    var moy=0;
    var mat=req.params.matiere;
    var etu= req.params.etudiant;
    var liste=req.body
    console.log(mat,etu);
    console.log(liste);

    liste = liste.filter(function(elem) {
    if ((elem.matiere == mat && elem.etudiant == etu) == true){
        tab.push(elem)
    }
    });
    console.log(tab);
    tab.forEach(res=>{
        if(res.type=="DS"){
            moy=moy+res.note*0.4
        }else if(res.type=="Exam" && tab.length == 1){
            moy=res.note
        }else if(res.type=="Exam"){
            moy=moy+res.note*0.6
        }
    })
    console.log(moy);
    //return moy;
    
    res.send(JSON.stringify(moy));
    
  });


  app.route("/rechtype/:type").post(function(req, res) {
    var tab=[]
    var elem =new notes();
    var moy=0;
    var etu= req.params.type;
    var liste=req.body
    console.log(etu);
    console.log(liste);

    liste = liste.filter(function(elem) {
    if (( elem.type == etu) == true){
        tab.push(elem)
    }
    });
    
    res.send(JSON.stringify(tab));
    
  });
  
  app.route("/rechmatiere/:matiere").post(function(req, res) {
    var tab=[]
    var elem =new notes();
    var moy=0;
    var etu= req.params.matiere;
    var liste=req.body
    console.log(etu);
    console.log(liste);

    liste = liste.filter(function(elem) {
    if (( elem.matiere == etu) == true){
        tab.push(elem)
    }
    });
    
    res.send(JSON.stringify(tab));
    
  });
  
  app.route("/rechnote/:note").post(function(req, res) {
    var tab=[]
    var elem =new notes();
    var moy=0;
    var etu= req.params.note;
    var liste=req.body
    console.log(etu);
    console.log(liste);

    liste = liste.filter(function(elem) {
    if (( elem.note == etu) == true){
        tab.push(elem)
    }
    });
    
    res.send(JSON.stringify(tab));
    
  });
 
  app.post("/export",async(req, res ,next) => { 
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("export"); // New Worksheet
    const path = "./public";  // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 }, 
      { header: "matiere", key: "matiere", width: 10 },
      { header: "type", key: "type", width: 10 },
      { header: "note", key: "note", width: 10 },
      { header: "etudiant", key: "etudiant", width: 10 },
  ];
  // Looping through User data
  let counter = 1; 
  let table=req.body;
  console.log(table);
  table.forEach((note) => {
    note.s_no = counter;
    worksheet.addRow(note); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/exportnotes.xlsx`)
     .then(() => {
      
  app.get("/export",async(req, res ,next) => { 
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("export"); // New Worksheet
    const path = "./public";  // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 }, 
      { header: "matiere", key: "matiere", width: 10 },
      { header: "type", key: "type", width: 10 },
      { header: "note", key: "note", width: 10 },
      { header: "etudiant", key: "etudiant", width: 10 },
    ];
    // Looping through User data
    let counter = 1; 
    let table=req.body;
    console.log(table);
    table.forEach((note) => {
    note.s_no = counter;
    worksheet.addRow(note); // Add data in worksheet
    counter++;
    });
    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    });
    try {
    const data = await workbook.xlsx.writeFile(`${path}/exportnotes.xlsx`).then(() => {
      res.download('C:/Users/ThinkPad/Downloads/GESTIONECOLE (1)/GESTIONECOLEANGULAR/src/assets/1656545300459-Ch 1 - Mots et Langages.pdf');
       res.send({
       status: "success",
       message: "file successfully downloaded",
       path: `${path}/users.xlsx`,
      });
      
     });
    } catch (err) {
      res.send({
      status: "error",
      message: "Something went wrong",
    });
    }
    
    });
  
       res.send({
         status: "success",
         message: "file successfully downloaded",
         path: `${path}/users.xlsx`,
        });
     });
  } catch (err) {
      res.send({
      status: "error",
      message: "Something went wrong",
    });
    }
  });
module.exports = app;