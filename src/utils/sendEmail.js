
import { transporter } from '../config/emailConfig.js';
export default async function sendEmail({ to, subject, text, html, attachments }) {
  const info = await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text, html, attachments });
  return info;
}
