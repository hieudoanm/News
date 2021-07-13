import dotenv from "dotenv";
import nodemailer from "nodemailer";
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

  const [date] = new Date().toISOString().split("T");
  const subject: string = `Café Sáng ${date}`;
  const html = await generateBody();

  const mailOptions = {
    from: `Viet Nam <${GMAIL_FROM}>`,
    to: [GMAIL_TO],
    subject,
    html,
  };

  const response = await transporter.sendMail(mailOptions);

  console.log("response", response);

  process.exit(0);
};

main().catch((error) => console.error(error));
