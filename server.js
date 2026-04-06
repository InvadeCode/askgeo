// Make sure to install dependencies before running:
// npm install express cors nodemailer

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// Enable CORS so your React frontend can communicate with this API
app.use(cors());

// Increase JSON payload limit to handle base64 encoded PDF attachments securely
app.use(express.json({ limit: '50mb' }));

// Set up the Nodemailer Transporter using your provided Gmail App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "complete.anant@gmail.com",
    pass: "srbo gcxp whgl ghcu",
  },
});

// The POST route that your React app will hit
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, attachments = [] } = req.body;

    const info = await transporter.sendMail({
      from: '"Ask Geo System" <complete.anant@gmail.com>',
      to,
      subject,
      html,
      attachments,
    });

    console.log("Email sent successfully: %s", info.messageId);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Email backend running successfully on http://localhost:${PORT}`);
});
