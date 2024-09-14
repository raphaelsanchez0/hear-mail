import { GmailMessage } from "../types";

export function getSubject(message: GmailMessage): string {
  const subjectHeader = message.payload.headers.find(
    (header) => header.name.toLowerCase() === "subject"
  );

  return subjectHeader ? subjectHeader.value : "";
}
