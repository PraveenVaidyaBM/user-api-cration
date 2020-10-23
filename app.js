const mongoose = require('mongoose')
const config=require('./config/database.js')
const bodyParser = require('body-parser')
const express = require('express');
var nodemailer = require('nodemailer');
const User = require('./user.model');
const bcrypt = require('bcrypt')
const passwordGenerator = new PasswordGenerator();
let password = passwordGenerator.generatePassword()

const app = express();

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log(`connected to database ${config.database}`)
})

mongoose.connection.on('error',(err)=>{
    console.log('error connecting to database',err)
})

app.use(express.static(path.join(__filename, 'public')))

app.use(bodyParser.json());

app.post('/user',(req,res,next) =>{
    const userdata = new user({
        userId:req.body.userId,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        profileImage:req.body.profileImage,
        communicationAddress:req.body.communicationAddress,
        locality:req.body.locality,
        city:req.body.city,
        pin:req.body.pin,
        state:req.body.state,
        phoneNumber:req.body.phoneNumber,
});
userdata.save().then(userdata =>{

    if (userdata) {
        return res.status(404).json({
            msg: "Unable to store user details"
        });
    }

    else{
        const autotext = `
            <p>Wlcome to our new user ${req.body.name}</p>
            <h3>Contact Details</h3>
            <ul>  
              <li>Name: ${req.body.userId}</li>
              <li>Company: ${req.body.name}</li>
              <li>Company: ${req.body.email}</li>
              <li>Email: ${req.body.password}</li>
            </ul> `;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                secure: false,
                auth: {
                  name: 'mohit@gmail.com',
                  password: 'mohit.123'

                }
              });
              
              var mailOptions = {
                from: 'mohit@gmail.com',
                to: 'ajit@zoho.com',
                text: 'Welcome to new user',  
              };
            
              tls: {
                rejectUnauthorized: false
            }
              
              transporter.sendMail(mailOptions, function(){
                if(err) throw err;
                else {
                  console.log('Email sending successful');
                }
    })
}
})
})

app.listen(port, () => {
    console.log(`server started at ${port}`)
})

module.exports = app