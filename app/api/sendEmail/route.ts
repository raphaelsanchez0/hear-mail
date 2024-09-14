import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    // Extract data from the request body
    const { email, subject, message } = await req.json();

    // Set up the Nodemailer transporter with Gmail credentials (without environment variables)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail address
        pass: 'your-app-password',    // Replace with your Gmail App password (see below)
      },
    });

    // Configure the email options
    const mailOptions = {
      from: 'your-email@gmail.com',  // Sender's email address
      to: email,                     // Receiver's email address
      subject: subject,              // Subject of the email
      text: message,                 // Message body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Return a success response
    return NextResponse.json({ message: 'Email sent successfully!', info });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}
