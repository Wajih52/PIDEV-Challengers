const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
require('dotenv/config');
const nodemailer = require('nodemailer');
const { ResetPassword } = require('../models/resetPassword');
const { uuid } = require('uuid');
const bycrpt = require('bcrypt')
const authCheck = require('../middleware/check-auth')



router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})


router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) { 
        res.status(500).json({message: 'User with the given ID was not found.'})
    } 
    res.status(200).send(user);
})


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
  })
  
  transporter.verify((error, success)=>{
    if (error){
        console.log(error);
    }else {
        console.log("ready for msg !");
        console.log(success);
    }
  
  })
  
 

router.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        role: req.body.role,
        classe: req.body.classe,
        age: req.body.age,
        adress: req.body.adress,
        
    })
    user = await user.save();

    if(!user){
    return res.status(400).send('the user cannot be created!')
}else {
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to :  req.body.email,
        subject: "Application Accepted",
        html: ' <center><h1>WELCOME !</h><br>Hi <br> <h3>Good news</h3><br> We accept your application to join us .<br> Thanks for joining your account using this email and password <br>  Email '+ req.body.email +' <br> Password '+ req.body.password +'<br> Please, dont hesitate to contact our support team if any questions arise.<br> Have a great start!</center>',
      }
      transporter
      .sendMail(mailOptions)
      .then(()=>{
        
        res.json({user, status:"SUCCESS",message:"MSG SEND SUCCESSFULY!"})
      
      
      })
      .catch((error)=>{
        console.log(Object.assign({}, mailOptions));
    
        console.log(error);
        res.json({status:"FAILED",message:"An error occured!"})
      })


      
}
    
})






router.put('/:id',async (req, res)=> {

    const userExist = await User.findById(req.params.id);
let newPassword
if(req.body.password){
    newPassword = bcrypt.hashSync(req.body.password, 10)
}else{
    newPassword= userExist.passwordHash;
}
    const user = await User.findByIdAndUpdate(
        req.params.id,
       {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            role: req.body.role,
            classe: req.body.classe,
            age: req.body.age,
            adress: req.body.adresse, 
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})




router.post('/login', async(req, res)=>{
    const user = await User.findOne({email: req.body.email})
   
    const secret = process.env.secret;
    if(!user){
        return res.status(400).send('User not found !')
    } 

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)){
      const token = jwt.sign(
          {
              userId: user.id
          },
          secret,
          {expiresIn : '1d'}
      )
        res.status(200).send({user: user.role , token: token })
    }else{
        res.status(400).send('Wrong Password !');
    }
   
})







/////////////////////////////////// logout  ///////////////////


router.get('/logout', async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


/////////////////////////////////// Search Multi ////////////////////////////////



router.get(`/search/:key`, async (req, res) =>{
    const userList = await User.find(
         {
                "$or": [
                    {name:{$regex:req.params.key}},
                    {phone:{$regex:req.params.key}}
                ]

          });

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})



//////////////////////////////// filtre  ///////////////////////////////////////



router.get(`/`, async (req, res) =>{
    // /api/v1/users?role=admin,student
    
    const userstList = await User.find(role==admin)

    if(!userstList) {
        res.status(500).json({success: false})
    } 
    res.send(userstList);
})


/////////////////////////////////  reset password ////////////////////////////////////////////////


const sendResetEmail= ({id, email}, redirectUrl,res)=>{
    const resetString= uuid() + id;

const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to : "yassinetayachi71@gmail.com",
    subject: "Reset Password",
    html: ' <center><h1>Reset Password !</h1><br>Use this link to set new password :  <a href="'+redirectUrl+'"/"'+id+'"/"'+resetString+'">Reset Link</a> <br> Link expire in 60 minutes .<br> Thank You !</center>',
 
};
 const saltRounds = 10;
 bcrypt
 .hash(resetString, saltRounds)
 .then(hashResetString =>{
    const newResetPassword = new ResetPassword({
        userId : id,
        resetString: hashResetString,
        createAt : Date.now(),
        expiresAt: Date.now()+3600000,
    })


    newResetPassword
    .save()
    .then(()=>{
            

transporter
.sendMail(mailOptions)
.then(()=>{

res.json({status:"PANDING",message:"Reset Password SUCCESSFULY!"})


})
.catch((error)=>{
console.log(error);
res.json({status:"FAILED",message:"An error occured will saving!"})
})



 })
 .catch((error)=>{
    console.log(error);
    res.json({status:"FAILED",message:"An error occured will Hashing Link !"})
  })
  /* newResetPassword
  .save().then(hashResetString =>{
    const newResetPassword = new ResetPassword({
        userId : id,
        resetString: hashResetString,
        createAt : Date.now(),
        expireAt: Date.now()+3600000,
    })


   
    })
    .catch((error)=>{
        console.log(error);
        res.json({status:"FAILED",message:"An error occured v"})
      }) */

 })
 .catch((error)=>{
    console.log(error);
    res.json({status:"FAILED",message:"An error occured will Hashing Link !"})
  })
}

  
router.post('/resetpassword', async (req,res)=>{
    const {email, redirectUrl}= req.body;
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).send('email not found !')
    }else {
      sendResetEmail(email,redirectUrl ,res);
}



})


router.post("/resetPasswordnew",(req, res)=>{
    let (id, resetString,newPassword)=req.body;
    ResetPassword
    .find({id}).then(result =>{
        if(result.length > 0){



            const{expiresAt}=result[0];
            const hashednewpassword = result[0].resetString;
            if(expiresAt < Date.now()){
                ResetPassword
                .deleteOne({id})
                .then(() =>{
                    res.json({
                        status: "FAILED",
                        messga: "Password reset link has expired"
                    })
            
                })
                .catch((error)=>{
                    console.log(error);
                    res.json({status:"FAILED",message:"Cleaning password faild!"})
                  })
            }else {
                bcrypt.compare(resetString, hashResetString)
                .then((result)=>{
                    if(result){

                        const saltRounds= 10;
                        bcrypt.hash(newPassword,saltRounds)
                        .then(
                           hashednewpassword =>{
                            User.updateOne({id: id},{password: hashednewpassword})
                            .then(()=>{
                          ResetPassword
                          .deleteOne({id: id})
                          .then(()=>{

                            res.json({
                                status: "Success",
                                message: "Password chaged !"
                            })

                          })
                          .catch(
                            res.json({
                                status: "FAILED",
                                message: "final failed !"
                            })
                        )



                            })
                            .catch(
                            res.json({
                                status: "FAILED",
                                message: "Update failed !"
                            })
                        )


                           }
                        )
                        .catch(
                            res.json({
                                status: "FAILED",
                                message: "Err while hashing new password !!"
                            })
                        )
                    }else {
                        res.json({
                            status: "FAILED",
                        message: "Invalid password reset "
                        })
                    }
                })
                .catch(
                    res.json({
                        status: "FAILED",
                        message: "Comparing Password Faild"
                    })
                )
            }

        }else {
            res.json({
                status: "FAILED",
                message: "Password reset request not found"
            })
        }

    }).catch((error)=>{
        console.log(error);
        res.json({status:"FAILED",message:"An error occured!"})
      })
})


/* const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
  })
  
  transporter.verify((error, success)=>{
    if (error){
        console.log(error);
    }else {
        console.log("ready for msg !");
        console.log(success);
    }
  
  })
  
  router.post('/sendemail/:id', async(req, res)=>{
  const user = await User.findById(req.params.id).select('email passwordHaash');

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to :  user.email,
    subject: "Application Accepted",
    html: ' <center><h1>WELCOME !</h><br>Hi <br> <h3>Good news</h3><br> We accept your application to join us .<br> Thanks for joining your account using this email and password <br>  Email '+ user.email +' <br> Password {{}}<br> Please, dont hesitate to contact our support team if any questions arise.<br> Have a great start!</center>',
  }
  transporter
  .sendMail(mailOptions)
  .then(()=>{
    res.json({status:"SUCCESS",message:"MSG SEND SUCCESSFULY!"})
  
  
  })
  .catch((error)=>{
    console.log(Object.assign({}, mailOptions));

    console.log(error);
    res.json({status:"FAILED",message:"An error occured!"})
  })
  
  
  }) */


module.exports =router;