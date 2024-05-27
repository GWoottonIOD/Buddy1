const nodemailer = require('nodemailer');
const user = require('../models/user');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PW,
    },
  });

 

  const sendMail = async (user) =>{
    const mailOptions ={

        from: {name: "Alpine Adventure",
               address:process.env.USER,
       
       }, 
     // sender address
       to: user.email, // list of receivers
       bcc:"anupriya_dayaratne@outlook.com",
       subject: "Booking ✔", // Subject line
       text: `Hello ${user.firstName}, Your booking Recived and you will recieve confirmation soon `, // plain text body
       //html: "<b>Your Booking Recieved and Confirmation will recieve Soon</b>", // html body
     }
    try{
        await transporter.sendMail(mailOptions);
        console.log('Mail Sent')
        
    }catch(error){
        console.error(error);
    }
  }

   // only send email if user with that email exists - how to use it in controller.
//    sendPasswordMail(updatedUser).then(response => {
//     res.status(200).json({result: 'Reset email sent successfully, check your email'});

  const sendPasswordMail = async (user) =>{
    console.log(user)
    const mailOptions ={
        
        from: {name: "Alpine Adventure",
               address:process.env.USER,
       
       }, 
     // sender address
       to: user.email, // list of receivers
       bcc:"anupriya_dayaratne@outlook.com",
       subject: "Booking ✔", // Subject line
       text: `Hello ${user.firstName}, Your New Password is ${user.password} `, // plain text body
       //html: "<b>Your Booking Recieved and Confirmation will recieve Soon</b>", // html body
     }
    try{
        await transporter.sendMail(mailOptions);
        console.log('Mail Sent')
        
    }catch(error){
        console.error(error);
    }
  }


 module.exports = {sendMail,sendPasswordMail};