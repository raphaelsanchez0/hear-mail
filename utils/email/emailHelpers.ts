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
