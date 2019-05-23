const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Creating a transport service for email sending
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

// Router to send the reply
router.post('/', (req, res, next) => {
    const output = `
        <h3> Reply to your contact message <h3>
        <h5> Message : <h5>
        <p>${req.body.message}</p>
        <h5> Reply : <h5>
        <p>${req.body.reply}</p>
    `;

    const mailOptions = {
        from: process.env.GMAIL_USERNAME, // sender address
        to: req.body.email, // list of receivers
        subject: 'Travel Getaway Reply', // Subject line
        html: output// plain text body
    };

    // Sending the mail
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
        console.log(err)
        else
        console.log(info);
    });

    res.status(200).json({
        message: "Email sent successfully",
        body: req.body
    })
 });
 
 module.exports = router;