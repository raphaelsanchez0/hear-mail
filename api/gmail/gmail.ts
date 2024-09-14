import { GmailMessage, GmailMessagesResponse } from "@/utils/types";

export const getEmails = async (
  accessToken: string,
  maxResults = 10
): Promise<GmailMessage[]> => {
  const gmailAPIUrl = `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`;

  try {
    const response = await fetch(gmailAPIUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching emails: ${response.status} ${response.statusText}`
      );
    }

    const data: GmailMessagesResponse = await response.json();
    console.log(data);

    // Extract the message IDs from the response
    const messageIds = data.messages.map((message) => message.id);

    // Fetch full details of each email
    const emailDetailsPromises = messageIds.map((id) =>
      fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
    );

    const emailDetails = await Promise.all(emailDetailsPromises);

    const emailDetailsWithSenders = emailDetails.map((email) => {
      const headers = email.payload.headers;
      const fromHeader = headers.find((header: any) => header.name === "From");
      let senderName = "Unknown Sender";

      if (fromHeader && fromHeader.value) {
        // Extract name before the "<" character
        senderName = fromHeader.value.split("<")[0].trim();
      }

      return {
        ...email,
        senderName,
      };
    });
    return emailDetailsWithSenders as unknown as GmailMessage[];
  } catch (error) {
    console.error("Error in getEmails:", error);
    throw error;
  }
};
