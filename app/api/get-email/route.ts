import { authConfig } from "@/lib/auth";
import { IncomingMessage } from "http";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams;
  const emailId = url.get("emailId");
  const session = await getServerSession(authConfig);
  const userId = "me"; // Use 'me' to refer to the authenticated user

  try {
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

    console.log(response);

    if (!response.ok) {
      console.log(response);
      throw new Error(`Error fetching email: ${response.statusText}`);
    }

    const emailData = await response.json();
    return Response.json(emailData);
  } catch (error) {
    console.error("Failed to fetch email:", error);
  }
}
