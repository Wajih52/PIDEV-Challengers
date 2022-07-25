 // const nodemailer = require('nodemailer');
 // // ******************service mail *********************************************
 // let transporter = nodemailer.createTransport({
 //     service : 'Outlook365',
 //     host: "smtp.office365.com",
 //     port: 587,
 //     secure: false, // true for 465, false for other ports
 //     auth: {
 //         user: 'pidevgestionecole@outlook.com', // sender
 //         pass: 'Pidev12345', // password of account
 //     },
 //     tls:{
 //         ciphers: 'SSLv3',
 //         rejectUnauthorized: false
 //     }
 // });
 //
 // let options = {
 //     from: '"CHallengers 👻" <pidevgestionecole@outlook.com>', // sender address
 //     to: 'rejebwajih@gmail.com' , // list of receivers
 //     subject: "validation dinscription ✔", // Subject line
 //     text: "vous etes le bienvenue", // plain text body
 //     html: "<b>PIDEV</b>" +
 //         "<h1>vous êtes le bienvenu , notre evenement commencera le 29/10/2022</h1>", // html body
 // }
 // // send mail with defined transport object
 // transporter.sendMail(options,(error,info)=>{
 //     if (error){
 //         return console.log(error);
 //     }
 //     console.log("Message sent: %s", info.messageId);
 //
 //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 // });
















// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth : {
//         user: "pidevgestionecole@gmail.com",
//         pass: "Pidev12345"
//     }
// });
//
// const options = {
//     from : "pidevgestionecole@gmail.com",
//     to : "rejebwajih@gmail.com",
//     subject : "sending email with node js ",
//     text: "projet pidev test de l'api "
// };
//
// transporter.sendMail(options,function (err,info){
//     if (err) throw err ;
//     console.log("sent: "+ info.response);
// })
//


//-----------------------service mailing--------------------------------------
// const nodemailer = require ('nodemailer');
// const {google} = require('googleapis');
//
// const CLIENT_ID = '38355072881-qju8r1noks52ouug54h9jbhgsk2q7efj.apps.googleusercontent.com';
// const CLIENT_SECRET ='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';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN =
//     '1//04oz4M8lWHsOmCgYIARAAGAQSNwF-L9IrlwesBWADDdCbKIyLrTLevlfsRow6FOLVaPJnx5BuiZ5C5ZxaErQsbzSvt-sE_qIbM6s';
//
// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})
// async function sendMail(){
//
//   try {
//     const accesToken = await oAuth2Client.getAccessToken();
//     const transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: 'pidevgestionecole@gmail.com',
//         ClientId : CLIENT_ID ,
//         clientSecret : CLIENT_SECRET,
//         refreshToken : REFRESH_TOKEN,
//         accesToken : accesToken ,
//       }
//     })
//
//     const mailOptions = {
//       from : 'Challenger 📧🏫👨‍ <pidevgestionecole@gmail.com>',
//       to : 'rejebwajih@gmail.com',
//       subject: "Hello from gmail using API",
//       text : 'hello from gmail email using ASPI',
//       html : '<h1>hello world</h1>'
//     };
//
//     const result = await transport.sendMail(mailOptions);
//     return result
//   }catch (error){
//     return error
//   }
// }
//
//
//
//




    // // ******************create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     service:'gmail',
    //     host: "smtp.google.com",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: 'pidevgestionecole@gmail.com', // generated ethereal user
    //         pass: 'Pidev12345', // generated ethereal password
    //     },
    //     tls:{
    //         rejectUnauthorized: false
    //     }
    // });
    // // send mail with defined transport object
    // let options = {
    //     from: '"CHallengers 👻" <pidevgestionecole@gmail.com>', // sender address
    //     to: 'rejebwajih@gmail.com' , // list of receivers
    //     subject: "validation dinscription ✔", // Subject line
    //     text: "vous etes le bienvenue", // plain text body
    //     html: "<b>PIDEV</b>", // html body
    // }
    // transporter.sendMail(options,(error,info)=>{
    //   if (error){
    //     return console.log(error);
    //   }
    //   console.log("Message sent: %s", info.messageId);
    //
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // });






 // const transport = nodemailer.createTransport({
 //       service: 'gmail',
 //       auth: {
 //         user: 'pidevgestionecole@gmail.com',
 //         pass : 'pkjejagsssmjaluw'
 //       }
 //     })
 //
 //     const mailOptions = {
 //       from : 'Challenger 📧🏫👨‍ <pidevgestionecole@gmail.com>',
 //       to : 'rejebwajih@gmail.com',
 //       subject: "Hello from gmail using API",
 //       text : 'hello from gmail email using ASPI',
 //       html : '<h1>hello world</h1>'
 //     };
 //
 //     // transport.sendMail(mailOptions).
 //      transport.sendMail(mailOptions).then(result => console.log('success',result))
 //           .catch(error => console.log(error.message))

 // let transporter = nodemailer.createTransport({
 //     service : 'Outlook365',
 //     host: "smtp.office365.com",
 //     port: 587,
 //     secure: false, // true for 465, false for other ports
 //     auth: {
 //         user: 'pidevgestionecole@outlook.com', // sender
 //         pass: 'Pidev12345', // password of account
 //     },
 //     tls:{
 //         ciphers: 'SSLv3',
 //         rejectUnauthorized: false
 //     }
 // });
 //
 // let options = {
 //     from: '"Formulaire des évenements 📧🏫" <pidevgestionecole@outlook.com> ', // sender address
 //     to: 'pidevgestionecole@gmail.com' , // list of receivers
 //     subject: "Formulaire à traiter ✔", // Subject line
 //     text: "pidev", // plain text body
 //     html: formulaire, // html body
 // }
 // // send mail with defined transport object
 // transporter.sendMail(options,(error,info)=>{
 //     if (error){
 //         return console.log(error);
 //     }
 //     console.log("Message sent: %s", info.messageId);
 //
 //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 // });