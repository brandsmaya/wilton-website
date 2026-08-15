import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true";
    const to = process.env.CONTACT_RECEIVER || "info@brandsmaya.com";

    console.log("Contact form submission details:");
    console.log(`- Name: ${name}`);
    console.log(`- Email: ${email}`);
    console.log(`- Message: ${message || "(empty)"}`);

    // If SMTP environment variables are not set, log to console and return success mock
    if (!host || !user || !pass) {
      console.warn(
        "SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS) are not configured. Email not sent. Logging to console instead."
      );
      return NextResponse.json(
        {
          success: true,
          message: "Message received successfully (development log mode).",
          mocked: true,
        },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port || "587", 10),
      secure,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${user}>`, // Avoid spam filters by using the authenticated sender email
      replyTo: email,
      to,
      subject: "Enquiry from Wilton Website",
      text: `You have received a new enquiry from the Wilton Website contact form.\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Message:\n${message || "No message provided."}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #6C584C; border-bottom: 2px solid #6C584C; padding-bottom: 10px;">New Website Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #6C584C; white-space: pre-wrap;">${message || "No message provided."}</div>
          <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;" />
          <p style="font-size: 0.8em; color: #888;">This email was sent automatically from the Wilton Website contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
