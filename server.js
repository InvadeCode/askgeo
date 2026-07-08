import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const GEO_EMAIL = process.env.GEO_EMAIL || 'geoconsultant@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Ask Geo System <system@emails.liaisonit.com>';

const normalizeRecipients = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .flatMap((item) => normalizeRecipients(item))
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean);
  }

  return [];
};

const uniqueRecipients = (recipients) => {
  return [...new Set(recipients.filter(Boolean))];
};

const formatAttachmentsForResend = (attachments = []) => {
  if (!Array.isArray(attachments)) return [];

  return attachments
    .filter((att) => att && att.filename && (att.content || att.dataUri))
    .map((att) => {
      let content = att.content || att.dataUri || '';

      // If frontend sends a data URI, remove the prefix.
      // Example: data:application/pdf;base64,JVBERi0x...
      if (typeof content === 'string' && content.includes(',')) {
        content = content.split(',')[1];
      }

      return {
        filename: att.filename,
        content,
      };
    });
};

const sendEmailHandler = async (req, res) => {
  console.log('--- Email API hit ---');

  try {
    if (!RESEND_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Missing RESEND_API_KEY in environment variables.',
      });
    }

    const {
      to,
      cc,
      bcc,
      subject,
      html,
      attachments = [],
    } = req.body;

    if (!subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: subject, html',
      });
    }

    const requestedRecipients = normalizeRecipients(to);

    // Always send to Geo also.
    // If frontend already includes Geo, duplicates are removed.
    const finalTo = uniqueRecipients([...requestedRecipients, GEO_EMAIL]);

    const finalCc = uniqueRecipients(normalizeRecipients(cc));
    const finalBcc = uniqueRecipients(normalizeRecipients(bcc));

    if (!finalTo.length) {
      return res.status(400).json({
        success: false,
        error: 'No valid recipient found.',
      });
    }

    const resendAttachments = formatAttachmentsForResend(attachments);

    console.log('Sending email via Resend...');
    console.log('to:', finalTo);
    console.log('cc:', finalCc);
    console.log('bcc:', finalBcc);
    console.log('subject:', subject);
    console.log('attachments count:', resendAttachments.length);

    const payload = {
      from: FROM_EMAIL,
      to: finalTo,
      subject,
      html,
      attachments: resendAttachments.length ? resendAttachments : undefined,
    };

    if (finalCc.length) payload.cc = finalCc;
    if (finalBcc.length) payload.bcc = finalBcc;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Resend API Error: ${response.status} - ${responseText}`);
    }

    const data = JSON.parse(responseText);

    console.log('Mail sent successfully via Resend. ID:', data.id);

    return res.status(200).json({
      success: true,
      messageId: data.id,
      sentTo: finalTo,
      attachments: resendAttachments.length,
    });
  } catch (error) {
    console.error('Error inside email API:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown email error',
    });
  }
};

// Keep both endpoints because your frontend tries both.
app.post('/api/submit', sendEmailHandler);
app.post('/api/send-email', sendEmailHandler);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ask Geo email backend is running.',
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Email backend running on port ${PORT}`);
});
