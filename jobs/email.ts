import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { generateBody } from "./html";

dotenv.config();

const main = async () => {
  const GMAIL_FROM: string = process.env.GMAIL_FROM || "";
  const GMAIL_PASSWORD: string = process.env.GMAIL_PASSWORD || "";
  const GMAIL_TO: string = process.env.GMAIL_TO || "";

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: GMAIL_FROM,
      pass: GMAIL_PASSWORD,
    },
  });

  console.log("transporter");

  const [date] = new Date().toISOString().split("T");
  const subject: string = `☕ Café Sáng ${date}`;
  const html = await generateBody(false);

  const from: string = `Café Sáng <${GMAIL_FROM}>`;
  const to: Array<string> = [GMAIL_TO];
  const mailOptions: Mail.Options = { from, to, subject, html };

  const response: SMTPTransport.SentMessageInfo = await transporter.sendMail(
    mailOptions
  );

  console.log("response", response);

  process.exit(0);
};

main().catch((error) => console.error(error));
