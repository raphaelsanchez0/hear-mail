import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig); // Ensure session handling
  try {
    const { emailId } = await req.json(); // Get emailId from the request body
    if (!emailId) {
      return NextResponse.json({ message: "Email ID is required" }, { status: 400 });
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      access_token: session?.accessToken, // Set access token
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Trash the email using Gmail API
    await gmail.users.messages.trash({
      userId: "me",
      id: emailId,
    });

    return new NextResponse(JSON.stringify({ message: "Email trashed successfully!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error trashing email:", error);
    return new NextResponse(JSON.stringify({ message: "Failed to trash email" }), {
      status: 500,
    });
  }
}
