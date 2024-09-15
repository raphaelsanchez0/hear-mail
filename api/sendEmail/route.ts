import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
dotenv.config();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);
  try {
    // Parse the request body
    const { recipientEmail, subject, body } = await req.json();
    console.log("\n\n\n\n\nGOT ITTTT\n\n\n\n\n");

    // Check if required fields are present
    if (!recipientEmail || !subject || !body) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // OAuth2 setup
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    // Set the credentials with an access token
    oAuth2Client.setCredentials({
      access_token: session?.accessToken,
      // refresh_token: process.env.REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Compose the email
    const emailLines = [
      `From: sender@example.com`, // Replace with your authenticated sender email address
      `To: ${recipientEmail}`,
      `Subject: ${subject}`,
      "Content-type: text/plain;charset=UTF-8",
      "MIME-Version: 1.0",
      "",
      `${body}`,
    ];

    const email = emailLines.join("\r\n").trim();
    const base64Email = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Send the email
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: base64Email,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to send email" }),
      { status: 500 }
    );
  }
}
