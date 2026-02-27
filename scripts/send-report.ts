import { sendReport } from '../utils/email';

(async () => {
  try {
    await sendReport({
      subject: 'Automated Playwright Report',
      to: process.env.EMAIL_TO || '',
      htmlPath: process.env.REPORT_DIR ? `${process.env.REPORT_DIR}/index.html` : 'playwright-report/index.html'
    });
    console.log('Report email sent (if SMTP config valid)');
  } catch (err) {
    console.error('Failed to send report:', err);
  }
})();