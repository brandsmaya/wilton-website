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

    const brevoApiKey = process.env.BREVO_API_KEY;
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true";
    const to = process.env.CONTACT_RECEIVER || "info@brandsmaya.com";
    const fromAddress = process.env.SMTP_FROM || "customersupport@wilton.in";

    console.log("Contact form submission details:");
    console.log(`- Name: ${name}`);
    console.log(`- Email: ${email}`);
    console.log(`- Message: ${message || "(empty)"}`);

    const emailSubject = "Enquiry from Wilton Website";
    const emailText =
      `You have received a new enquiry from the Wilton Website contact form.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Message:\n${message || "No message provided."}`;

    const emailHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #6C584C; border-bottom: 2px solid #6C584C; padding-bottom: 10px;">New Website Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #6C584C; white-space: pre-wrap;">${message || "No message provided."}</div>
        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;" />
        <p style="font-size: 0.8em; color: #888;">This email was sent automatically from the Wilton Website contact form.</p>
      </div>
    `;

    // 1. If Brevo API Key is configured, use Brevo HTTP API (recommended: avoids SMTP IP restrictions)
    if (brevoApiKey) {
      const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoApiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: name, email: fromAddress },
          to: [{ email: to, name: "Wilton Team" }],
          replyTo: { email: email, name: name },
          subject: emailSubject,
          htmlContent: emailHtml,
          textContent: emailText,
        }),
      });

      if (!brevoRes.ok) {
        const errorData = await brevoRes.json().catch(() => ({}));
        throw new Error(errorData.message || `Brevo API error: ${brevoRes.status}`);
      }

      return NextResponse.json(
        { success: true, message: "Email sent successfully!" },
        { status: 200 }
      );
    }

    // 2. If SMTP environment variables are not set, return mock success in dev
    if (!host || !user || !pass) {
      console.warn(
        "Neither BREVO_API_KEY nor SMTP environment variables are configured. Email not sent."
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

    // 3. Fallback: standard SMTP via Nodemailer
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
      from: `"${name}" <${fromAddress}>`,
      replyTo: email,
      to,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
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
