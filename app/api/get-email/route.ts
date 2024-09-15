import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams;
  const emailId = url.get("emailId");
  const session = await getServerSession(authConfig);
  const userId = "me"; // Use 'me' to refer to the authenticated user

  try {
    // Fetch the email from Gmail API
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${emailId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching email: ${response.statusText}`);
    }

    const parsedRes = await response.json();

    // Extract headers (subject, from, to, etc.)
    const headers = parsedRes.payload.headers.reduce((acc: any, header: any) => {
      acc[header.name.toLowerCase()] = header.value;
      return acc;
    }, {});

    // Find the body (email body is usually in the 'parts' array)
    let emailBody = "";
    if (parsedRes.payload.parts) {
      // Try to get the plain text or HTML content from the parts
      const part = parsedRes.payload.parts.find(
        (p: any) =>
          p.mimeType === "text/html" || p.mimeType === "text/plain"
      );
      if (part && part.body && part.body.data) {
        emailBody = Buffer.from(part.body.data, "base64").toString("utf-8");
      }
    } else if (parsedRes.payload.body && parsedRes.payload.body.data) {
      // If there are no parts, check the body directly
      emailBody = Buffer.from(parsedRes.payload.body.data, "base64").toString("utf-8");
    }

    // Response includes headers and decoded email body
    const result = {
      subject: headers.subject,
      from: headers.from,
      to: headers.to,
      date: headers.date,
      body: emailBody,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch email:", error);
    return NextResponse.json(
      { error: "Failed to fetch email" },
      { status: 500 }
    );
  }
}
