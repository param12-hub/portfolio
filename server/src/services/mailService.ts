import nodemailer from 'nodemailer';
import { env } from '../config/env';

let transporter: nodemailer.Transporter | null = null;

if (env.SMTP_USER && env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
}

export const sendContactEmail = async (contact: { name: string; email: string; subject?: string; message: string }) => {
  if (!transporter) {
    console.log(`[Mail Service Mock] New Message from ${contact.name} (${contact.email}): ${contact.message}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"${contact.name}" <${env.FROM_EMAIL}>`,
      to: env.FROM_EMAIL,
      subject: `[Portfolio Contact] ${contact.subject || 'Inquiry'}`,
      text: `Name: ${contact.name}\nEmail: ${contact.email}\n\nMessage:\n${contact.message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 8px;">
          <h2 style="color: #6366f1;">New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Subject:</strong> ${contact.subject || 'N/A'}</p>
          <hr style="border-color: #334155;" />
          <p style="white-space: pre-wrap;">${contact.message}</p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('[Mail Service Error]:', error);
    return false;
  }
};
