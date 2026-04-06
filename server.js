import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// Enable CORS for your frontend
app.use(cors());
// 50mb limit is required for the large base64 PDF attachments
app.use(express.json({ limit: '50mb' }));

// Set up Nodemailer with Environment Variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'complete.anant@gmail.com',
    pass: process.env.GMAIL_PASS || 'srbo gcxp whgl ghcu',
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Transporter verification failed:', error);
  } else {
    console.log('Transporter is ready to send emails');
  }
});



app.post('/api/send-email', async (req, res) => {
  console.log('--- /api/send-email hit ---');

  try {
    const { to, subject, html, attachments = [] } = req.body;

    console.log('Body received');
    console.log('to:', to);
    console.log('subject:', subject);
    console.log('attachments count:', Array.isArray(attachments) ? attachments.length : 0);

    if (!to || !subject || !html) {
      console.log('Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html'
      });
    }

    console.log('About to send mail...');

    const info = await transporter.sendMail({
      from: '"Ask Geo System" <complete.anant@gmail.com>',
      to,
      subject,
      html,
      attachments,
    });

    console.log('Mail sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error inside /api/send-email:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown email error'
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Email backend running on port ${PORT}`);
});
