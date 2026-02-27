import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import config from '../config/index';
import logger from './logger';

interface EmailOptions {
  subject: string;
  to: string;
  htmlPath?: string;
  text?: string;
}

export async function sendReport(options: EmailOptions) {
  const transporter = nodemailer.createTransport({
    // if no SMTP host is provided, fallback to Ethereal (fake) account
    ...(process.env.EMAIL_HOST
      ? {
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: process.env.EMAIL_SECURE === 'true',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        }
      : await nodemailer.createTestAccount().then(acc => ({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: acc.user,
            pass: acc.pass
          }
        })))
  });

  const mailOptions: any = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject
  };

  if (options.htmlPath && fs.existsSync(options.htmlPath)) {
    mailOptions.html = fs.readFileSync(options.htmlPath, 'utf8');
  } else if (options.text) {
    mailOptions.text = options.text;
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    // if using Ethereal, provide a preview URL
    if (nodemailer.getTestMessageUrl) {
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) {
        logger.info(`Preview URL: ${preview}`);
        console.log(`
Ethereal preview link (open in browser):
  ${preview}
`);
      }
    }
  } catch (err) {
    logger.error(`Failed to send email: ${err}`);
  }
}
