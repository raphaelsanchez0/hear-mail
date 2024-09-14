import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import ListEmail from "./ListEmail";
import { useSession } from "next-auth/react";
import { GmailMessage } from "@/utils/types";
import { getEmails } from "@/api/gmail/gmail";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default async function EmailList() {
  const session = await getServerSession(authConfig);

  const emails = await getEmails(session!.accessToken as string);

  // // Function to fetch emails
  // const fetchEmails = async (accessToken: string) => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const emailList = await getEmails(accessToken);
  //     setEmails(emailList);
  //   } catch (err) {
  //     setError(`Failed to fetch emails: ${(err as Error).message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // useEffect to handle the side-effect of fetching emails
  // useEffect(() => {
  //   if (status === "authenticated" && session?.accessToken) {
  //     fetchEmails(session.accessToken as string); // Type assertion
  //   }
  // }, [status, session]);

  return (
    <div className="w-80 border-r">
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8 bg-background" />
          </div>
        </form>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)] w-full px-4">
        {emails.map((email) => (
          <li key={email.id}>{email.snippet}</li>
        ))}
        {/* {[...Array(20)].map((_, i) => (
          <ListEmail
            key={i}
            sender="Sender Name"
            subject="Email Subject"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        ))}  */}
      </ScrollArea>
    </div>
  );
}
