import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Set up Nodemailer with the App Password formatted CORRECTLY (no spaces)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'complete.anant@gmail.com',
    pass: 'srbogcxpwhglghcu', // <-- Spaces removed here
  },
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, attachments = [] } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html',
      });
    }

    const info = await transporter.sendMail({
      from: '"Ask Geo System" <complete.anant@gmail.com>',
      to,
      subject,
      html,
      attachments,
    });

    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    // This will log the EXACT reason Gmail rejected the email to your Render console
    console.error('Error sending email:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown email error',
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Email backend running on port ${PORT}`);
});
