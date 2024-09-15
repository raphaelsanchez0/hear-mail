
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email, subject, message } = await req.json();

    // Set up the Nodemailer transport with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',  // Your Gmail address
        pass: 'your-app-password',     // Your Gmail App Password
      },
    });

    // Email options
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: subject,
      text: message,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!', info });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}
