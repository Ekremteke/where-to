require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const apiKey = process.env.API_KEY;

// Nodemailer
// app.post('/send-email', async (req, res) => {
//     const { name, email, subject, message } = req.body;

//     // Configure Nodemailer
//     const transporter = nodemailer.createTransport({
//         service: 'gmail', // or use SMTP settings for other providers
//         auth: {
//             user: process.env.EMAIL, // Your email
//             pass: process.env.EMAIL_PASSWORD, // Your email password or app password
//         },
//     });

//     const mailOptions = {
//         from: email,
//         to: process.env.RECEIVER_EMAIL, // Your email to receive messages
//         subject: subject,
//         text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         res.json({ success: true, message: 'Email sent successfully!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Failed to send email' });
//     }
// });

// OpenAI API Handler
app.post('/api/career-advice', async (req, res) => {
    const userInput = req.body;

    const prompt = `Given the following user profile:
    Age: ${userInput.age}
    Education Level: ${userInput.education}
    Strengths: ${userInput.strengths}
    Weaknesses: ${userInput.weaknesses}
    Interests: ${userInput.interests}
    Personality Traits: ${userInput.personality}
    Work-Life Priorities: ${userInput.work_life_priorities}
    Skills: ${userInput.skills}
    Career Goals: ${userInput.career_goals}
    Preferred Work Environment: ${userInput.work_environment}
    Willing to Relocate: ${userInput.relocate}
    Suggest the best career fields for them and explain why. Keep it relatively short and sweet. and do not add any other wording once finished E.G 'good luck`;

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4",
            messages: [{ role: "system", content: "You are a career advisor." }, { role: "user", content: prompt }],
            max_tokens: 300
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            }
        });

        res.json({ advice: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error generating career advice:", error);
        res.status(500).json({ error: "Failed to generate career advice." });
    }
});

// Serve static files from the 'client' directory (the folder with your HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../client')));

// Fallback route to serve the index.html for any other routes (important for SPAs)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Set the server to listen on the appropriate port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));