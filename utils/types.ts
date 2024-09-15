export interface Mail {
  name: string;
  subject: string;
  recipientEmail: string;
  date: string;
  body: string;
}

/**
 * Represents a Gmail message object.
 */
export interface GmailMessage {
  /** The unique ID of the message. */
  id: string;

  /** The ID of the thread the message belongs to. */
  threadId: string;

  /** An array of labels associated with the message. */
  labelIds: string[];

  /** A short snippet of the message content. */
  snippet: string;

  /** The payload of the message, which contains the actual content and metadata. */
  payload: EmailPayload;

  /** The estimated size of the message in bytes. */
  sizeEstimate: number;

  /** The history ID of the message. Used to track changes to the message. */
  historyId: string;

  /** The internal date of the message, represented as a string timestamp. */
  internalDate: string;

  /** The name of the sender of the message. */
  senderName: string;
}

/**
 * Represents the payload of an email message, including its content and metadata.
 */
export interface EmailPayload {
  /** The part ID of the payload. */
  partId: string;

  /** The MIME type of the payload, such as 'text/plain' or 'text/html'. */
  mimeType: string;

  /** The filename of the payload, if applicable. */
  filename: string;

  /** An array of headers associated with the payload. */
  headers: EmailHeader[];

  /** The body of the payload, which contains its size and optional data. */
  body: {
    /** The size of the body in bytes. */
    size: number;
  };

  /** An array of parts, representing the different sections of the email (e.g., text, HTML, attachments). */
  parts: EmailPart[];
}

/**
 * Represents an email message data object.
 */
export interface EmailData {
  /** The unique ID of the email message. */
  id: string;

  /** The ID of the thread the message belongs to. */
  threadId: string;

  /** An array of labels associated with the email message. */
  labelIds: string[];

  /** A short snippet of the email message content. */
  snippet: string;

  /** The payload of the email message, which contains the actual content and metadata. */
  payload: EmailPayload;

  /** The estimated size of the email message in bytes. */
  sizeEstimate: number;

  /** The history ID of the email message. Used to track changes to the message. */
  historyId: string;

  /** The internal date of the email message, represented as a string timestamp. */
  internalDate: string;

  /** The name of the sender of the email message. */
  senderName: string;
}

/**
 * Represents a part of an email, such as the text, HTML, or an attachment.
 */
export interface EmailPart {
  /** The unique ID of the part within the email. */
  partId: string;

  /** The MIME type of the part, such as 'text/plain' or 'image/jpeg'. */
  mimeType: string;

  /** The filename of the part, if it represents an attachment. */
  filename: string;

  /** An array of headers associated with the part. */
  headers: EmailHeader[];

  /** The body of the part, which contains its size and optional data. */
  body: {
    /** The size of the part in bytes. */
    size: number;

    /** The data of the part, if available. */
    data?: string;
  };
}

export interface EmailHeader {
  /** The name of the header, such as 'From', 'To', or 'Subject'. */
  name: "From" | "To" | "Subject" | string;

  /** The value of the header. */
  value: string;
}

export interface GmailMessagesResponse {
  messages: GmailMessage[];
  nextPageToken?: string;
  resultSizeEstimate?: number;
  // Add more fields as needed
}


export interface IncomingEmail {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: {
    partId: string;
    mimeType: string;
    filename: string;
    headers: {
      name: string;
      value: string;
    }[];
    body: {
      size: number;
      data?: string;
    };
    parts?: {
      partId: string;
      mimeType: string;
      filename: string;
      headers: {
        name: string;
        value: string;
      }[];
      body: {
        size: number;
        data?: string;
      };
    }[];
  };
  sizeEstimate: number;
  historyId: string;
  internalDate: string;
}

