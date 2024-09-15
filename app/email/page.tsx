import { useState } from "react";
import EmailContent from "@/components/email-content/EmailContent";
import EmailList from "@/components/email-list/EmailList";
import Sidebar from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "@/utils/types";
import { getServerSession } from "next-auth";

export default async function EmailClientPage() {
  const session = await getServerSession();

  return (
    <div className="full-screen-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Email List */}
      <EmailList />

      {/* Email Content */}
      <EmailContent session={session} />

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
