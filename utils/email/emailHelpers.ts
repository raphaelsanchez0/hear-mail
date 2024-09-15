import { IncomingMessage } from "http";
import { GmailMessage, IncomingEmail } from "../types";

export function getSubject(message: GmailMessage): string {
  const subjectHeader = message.payload.headers.find(
    (header) => header.name.toLowerCase() === "subject"
  );

  return subjectHeader ? subjectHeader.value : "";
}

export function getEmailSender(email: IncomingEmail): string | undefined {
  // Find the "From" header in the headers array
  const fromHeader = email.payload.headers.find(
    (header) => header.name.toLowerCase() === "from"
  );

  // Return the value of the "From" header if it exists
  return fromHeader ? fromHeader.value : undefined;
}
