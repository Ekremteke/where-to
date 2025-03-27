require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS middleware 
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname)));

// Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Email sending
app.post('/send-email', (req, res) => {
    // Form verilerini req.body'den alıyoruz
    const { name, email, subject, message } = req.body;

    // Mail options 
    const mailOptions = {
        from: email, // Form email
        to: process.env.EMAIL_USER, // to
        subject: `Contact Form: ${subject}`, 
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}` 
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString()); 
        }
        res.send('Email sent successfully!'); 
    });
});

// Sunucuyu başlat
app.listen(5000, () => console.log('Server running on port 5000'));
