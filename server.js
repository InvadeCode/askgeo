import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://askgeo.in',
  'https://www.askgeo.in',
  'https://ask-geo.onrender.com'
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.options('*', cors());

app.use(express.json({ limit: '50mb' }));

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, service: 'ask-geo-mailer' });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'complete.anant@gmail.com',
    pass: process.env.GMAIL_PASS || 'srbo gcxp whgl ghcu',
  },
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, attachments = [] } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html'
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
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);

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
