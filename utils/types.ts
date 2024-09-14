export interface Mail {
  name: string;
  subject: string;
  recipientEmail: string;
  date: string;
  body: string;
}

export interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  // Add more fields as needed based on the Gmail API response
}

export interface GmailMessagesResponse {
  messages: GmailMessage[];
  nextPageToken?: string;
  resultSizeEstimate?: number;
  // Add more fields as needed
}
