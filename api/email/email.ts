import { Mail } from "@/utils/types";

const sendEmail = async (email: Mail) => {
  try {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.recipientEmail,
        subject: email.subject,
        message: email.body,
      }),
    });

    const result = await res.json();
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
