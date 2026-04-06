import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for your frontend
app.use(cors());
// 50mb limit is required for the large base64 PDF attachments
app.use(express.json({ limit: '50mb' }));

// Use your provided Resend API Key
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_VXQRpvTP_QLEx5ySGU67PoJJnqwmDUAwR';

app.post('/api/submit', async (req, res) => {
  console.log('--- /api/submit hit (Resend API) ---');

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

    // Format attachments specifically for the Resend API
    const resendAttachments = attachments.map(att => ({
      filename: att.filename,
      content: att.content // Base64 string directly from your App.jsx
    }));

    console.log('Sending email via Resend API (HTTPS Port 443)...');

    // Make a standard HTTP request to Resend, bypassing Render's SMTP block entirely!
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Using your verified custom domain
        from: 'Ask Geo System <system@emails.liaisonit.com>', 
        to: [to], // This will go to complete.anant@gmail.com 
        subject: subject,
        html: html,
        attachments: resendAttachments.length > 0 ? resendAttachments : undefined
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Resend API Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('Mail sent successfully via Resend! ID:', data.id);

    return res.status(200).json({
      success: true,
      messageId: data.id
    });
  } catch (error) {
    console.error('Error inside /api/submit:', error);

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
