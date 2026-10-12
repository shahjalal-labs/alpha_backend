import "dotenv/config";
import nodemailer from "nodemailer";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;

const getSmtpConfig = () => {
  if (!SMTP_USER || !SMTP_PASS || !SMTP_HOST || !SMTP_PORT) {
    throw new Error(
      "Missing SMTP configuration. Required: SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT.",
    );
  }

  const port = Number(SMTP_PORT);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a valid positive integer.");
  }

  if (
    SMTP_HOST === "localhost" ||
    SMTP_HOST === "127.0.0.1" ||
    SMTP_HOST === "::1"
  ) {
    throw new Error(
      "SMTP_HOST points to localhost. Use your real SMTP provider host in Vercel environment variables.",
    );
  }

  return {
    user: SMTP_USER,
    pass: SMTP_PASS,
    host: SMTP_HOST,
    port,
  };
};

const sendFormInfo = async (to: string, subject: string, html: string) => {
  const smtp = getSmtpConfig();

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  // Email options
  const mailOptions = {
    from: `Uenal Immobilien GmbH <${smtp.user}>`,
    to,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};

export default sendFormInfo;
