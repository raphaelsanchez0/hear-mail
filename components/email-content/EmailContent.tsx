"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Forward, Reply, ReplyAll, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { IncomingEmail, Mail } from "@/utils/types";
import { format } from "date-fns/format";
import { Session } from "next-auth";
import { getEmail } from "@/api/gmail/gmail";
import { useSearchParams } from "next/navigation";
import ReactHtmlParser from "react-html-parser";
import {
  extractEmailBody,
  getEmailFormattedTime,
  getEmailRecipient,
  getEmailSender,
  getEmailSubject,
  isHTML,
} from "@/utils/email/emailHelpers";

interface EmailContentProps {
  session: Session | null;
}

export default function EmailContent({ session }: EmailContentProps) {
  const [email, setEmail] = useState<IncomingEmail | null>(null);
  const [emailBody, setEmailBody] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const emailID = searchParams.get("emailId");

  useEffect(() => {
    const fetchEmail = async (id: string | null) => {
      if (!id) return;
      const email = await fetch(`/api/get-email?emailId=${id}`);
      const parsedEmail = await email.json();
      console.log(parsedEmail);
      setEmail(parsedEmail.parsedRes as unknown as IncomingEmail);

      const bodyContent = extractEmailBody(parsedEmail.parsedRes);
      setEmailBody(bodyContent);
    };
    fetchEmail(emailID);
  }, [emailID]);
  const mail: Mail = {
    date: "2021-09-01T12:00:00Z",
    body: "Hello, World!",
    name: "John Doe",
    subject: "Hello, World!",
    recipientEmail: "test",
  };
  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between">
        <div>
          <Button variant="ghost" size="icon" disabled={!mail}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Move to trash</span>
          </Button>
        </div>
        <div className="">
          <Button variant="ghost" size="icon" disabled={!mail}>
            <Reply className="h-4 w-4" />
            <span className="sr-only">Reply all</span>
          </Button>
          <Button variant="ghost" size="icon" disabled={!mail}>
            <ReplyAll className="h-4 w-4" />
            <span className="sr-only">Reply all</span>
          </Button>
          <Button variant="ghost" size="icon" disabled={!mail}>
            <Forward className="h-4 w-4" />
            <span className="sr-only">Move to trash</span>
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      {email && emailBody ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={"Name"} />
                <AvatarFallback>
                  {mail.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{getEmailSender(email)}</div>
                <div className="line-clamp-1 text-xs">
                  {getEmailSubject(email)}
                </div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">To:</span>{" "}
                  {getEmailRecipient(email)}
                </div>
              </div>
            </div>
            {mail.date && (
              <div className="ml-auto text-xs text-muted-foreground">
                {getEmailFormattedTime(email)}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {isHTML(emailBody || "") ? (
              <div
                dangerouslySetInnerHTML={{ __html: emailBody || "" }}
                className="whitespace-pre-wrap"
              />
            ) : (
              <pre className="whitespace-pre-wrap">{emailBody}</pre>
            )}
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${mail.name}...`}
                />
                <div className="flex items-center">
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
