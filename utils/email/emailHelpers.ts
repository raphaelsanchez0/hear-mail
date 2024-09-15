import { IncomingMessage } from "http";
import { GmailMessage, IncomingEmail } from "../types";

export function getSubject(message: GmailMessage): string {
  const subjectHeader = message.payload.headers.find(
    (header) => header.name.toLowerCase() === "subject"
  );

  return subjectHeader ? subjectHeader.value : "";
}

function preprocessHeaders(
  headers: { name: string; value: string }[]
): Record<string, string> {
  return headers.reduce((acc, header) => {
    acc[header.name.toLowerCase()] = header.value;
    return acc;
  }, {} as Record<string, string>);
}
export function getEmailSender(email: IncomingEmail): string | undefined {
  const headersMap = preprocessHeaders(email.payload.headers);
  return headersMap["from"];
}

// Function to get the email subject
export function getEmailSubject(email: IncomingEmail): string | undefined {
  const headersMap = preprocessHeaders(email.payload.headers);
  return headersMap["subject"];
}

// Function to get the email recipient
export function getEmailRecipient(email: IncomingEmail): string | undefined {
  const headersMap = preprocessHeaders(email.payload.headers);
  return headersMap["to"];
}

// Function to get the formatted email date
export function getEmailFormattedTime(
  email: IncomingEmail
): string | undefined {
  const headersMap = preprocessHeaders(email.payload.headers);
  const dateHeader = headersMap["date"];
  if (dateHeader) {
    const date = new Date(dateHeader);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  }
  return undefined;
}

export const extractEmailBody = (parsedEmail: IncomingEmail): string => {
  const parts = parsedEmail?.payload?.parts;
  let body = "";

  if (parts && Array.isArray(parts)) {
    for (const part of parts) {
      if (part.mimeType === "text/plain" || part.mimeType === "text/html") {
        body = decodeBase64(part.body.data!);
        break; // Prioritize the first text or HTML part found
      }
    }
  }

  return body;
};

// Helper function to decode Base64 content
const decodeBase64 = (encodedData: string): string => {
  if (!encodedData) return "";
  try {
    return decodeURIComponent(
      atob(encodedData.replace(/-/g, "+").replace(/_/g, "/"))
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  } catch (e) {
    console.error("Failed to decode email body", e);
    return "Failed to load email content.";
  }
};
