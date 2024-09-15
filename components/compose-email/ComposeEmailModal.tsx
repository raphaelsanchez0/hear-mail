import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ComposeEmailModalProps {
  onClose: () => void;
}

export default function ComposeEmailModal({ onClose }: ComposeEmailModalProps) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSendEmail = async (e: React.FormEvent) => {
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
      if (result.message === "Email sent successfully!") {
        onClose(); // Close the modal when email is sent successfully
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setResponseMessage("Failed to send email");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl mb-4">Compose Email</h2>
        <form onSubmit={handleSendEmail}>
          <Label>Email:</Label>
          <Input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
          <Label>Subject:</Label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <Label>Message:</Label>
          <textarea
            className="w-full h-32 border border-gray-300 rounded p-2 mt-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-end mt-4">
            <Button type="submit" className="mr-2">
              Send
            </Button>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
          </div>
        </form>
        {responseMessage && <p className="mt-4">{responseMessage}</p>}
      </div>
    </div>
  );
}
