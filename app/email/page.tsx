"use client"; // This tells Next.js to treat this component as a Client Component

import { useState } from "react";
import EmailContent from "@/components/email-content/EmailContent";
import EmailList from "@/components/email-list/EmailList";
import Sidebar from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "@/utils/types";

export default function EmailClientPage() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const exampleMail: Mail = {
    name: "John Doe",
    subject: "Hello, World!",
    recipientEmail: "johnDoe@gmail.com",
    date: "2021-09-20T12:00:00Z",
    body: "Hello, World! This is a test",
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: recipientEmail,
          subject: subject,
          message: message,
        }),
      });

      const result = await res.json();
      setResponseMessage(result.message);
    } catch (error) {
      console.error("Error sending email:", error);
      setResponseMessage("Failed to send email");
    }
  };

  return (
    <div className="full-screen-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Email List */}
      <EmailList />

      {/* Email Content */}
      <EmailContent mail={exampleMail} />

      {/* Compose Email Form */}
      {/* <div className="w-1/3 p-4">
        <h2>Compose Email</h2>
        <form onSubmit={sendEmail}>
          <Input
            type="email"
            placeholder="Recipient's Email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            className="w-full h-40 border border-gray-300 rounded p-2 mt-2"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button type="submit" className="mt-2">
            Send Email
          </Button>
        </form> */}
      {/* {responseMessage && <p className="mt-2">{responseMessage}</p>} */}
      {/* </div> */}
    </div>
  );
}
