const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const { generateToken } = require('../authUtils');


async function getUserByEmailAndPassword(req, res){
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not Found"})
        }
        if(user.password !== password){
            return res.status(402).json({message: "Password is Incorrect"});
        }

        const token = generateToken(user._id);
        res.status(200).json({ username: user.userName, role: user.role, token, Id: user._id })
    } catch (error) {
        res.status(500).json(err.message);
    }
}

async function addUser(req, res) {
    try {
        const{userName,email,mobile,password,role}=req.body;
        if(!userName||!email||!mobile||!password||!role){
            return res.status(403).json({message:'Form fields are missing'});
        }
        const exist_user = await User.findOne({email});
        if(exist_user){
            return res.status(409).json({message: "User found"});
        }
        await User.create(req.body);
        res.status(200).json({ message: 'User Added successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error',error:err.message
        });
    }
}

async function sendMail(req, res) {
    
    const { to, subject, text } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com', 
        port: 587, // Replace with your SMTP port
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'anudey700@gmail.com', // Replace with your email
            pass: 'odkjysbbkggcstyp' // Replace with your email password
        }
    });

    // Set up email data
    let mailOptions = {
        from: '"Team GAmMA" anudey700@gmail.com', // Sender address
        to: to, // List of recipients from req.body
        subject: subject, // Subject line from req.body
        text: text, // Plain text body from req.body
        html: "<p>Hi Anurag</p>" // HTML body from req.body
    };

    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: %s', error);
        res.status(500).send('Error sending email');
    }
}

module.exports = { getUserByEmailAndPassword, addUser, sendMail };