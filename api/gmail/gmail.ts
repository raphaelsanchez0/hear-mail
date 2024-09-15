import { GmailMessage, GmailMessagesResponse } from "@/utils/types";
import { error } from "console";

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

// export const getEmail = async (accessToken: string, emailID: string) => {
//   const endpoint = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${emailID}`;
//   try {
//     const response = await fetch(endpoint, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       console.log(response);
//       throw new Error(
//         `Error fetching emails: ${response.status} ${response.statusText}`
//       );
//     }
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error("Error in getting emails:", error);
//     throw error;
//   }
// };
export const getEmail = async (accessToken: string, emailId: string) => {
  const userId = "me"; // Use 'me' to refer to the authenticated user

  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/${emailId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error(`Error fetching email: ${response.statusText}`);
    }

    const emailData = await response.json();
    console.log(emailData);
  } catch (error) {
    console.error("Failed to fetch email:", error);
  }
};
