import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
dotenv.config();

// Load environment variables
// const CLIENT_ID = "407408718192.apps.googleusercontent.com";
// const REDIRECT_URI= "https://developers.google.com/oauthplayground";
// const ACCESS_TOKEN= "ya29.a0AcM612xDaz8qau7srkSNRzAXls6VUYobFl6V1D2dL5Izy4zRtiNMEQSUdT9_KV0vV_s8Uydv-37FBZnAr1cYiXcgHxO7-mSqfTxGfqaQa9-8AQPeDiI2nBN7pCCha_tM2aFmjxkX1yrzM0hdD4_THHgIMKB9a49bJMoXwOznaCgYKAXkSARESFQHGX2Mieo_6crTP1siayjncuCUfew0175";
// const REFRESH_TOKEN= "1//04Xj3ymL0eOl7CgYIARAAGAQSNwF-L9IrpVgDmXDQ_OWzYO56UGq6xDTFmiQXyyLdRNh9uAunDYbbmTGUoTZQjx13NBj-QOqGeYM";

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
    const rawMessage = `
      From: me
      To: "androidgamer124@gmail.com"
      Subject: ${subject}
      Content-Type: text/plain; charset=UTF-8

      ${body}
    `;

    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const emailLines = [
      "From: sender@example.com",
      "To: receiver@example.com",
      "Content-type: text/html;charset=iso-8859-1",
      "MIME-Version: 1.0",
      "Subject: Test Subject",
      "",
      "This is a test email",
    ];

    const email = emailLines.join("\r\n").trim();
    const base64Email = Buffer.from(email).toString("base64");
    // Send the email
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: base64Email,
      },
    });
    // const res = await gmail.users.messages.send({
    //   userId: "me",
    //   requestBody: {
    //     raw: encodedMessage,
    //   },
    // });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
