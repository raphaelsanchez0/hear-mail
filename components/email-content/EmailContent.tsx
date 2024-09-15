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
import {
  extractEmailBody,
  getEmailFormattedTime,
  getEmailRecipient,
  getEmailSender,
  getEmailSubject,
} from "@/utils/email/emailHelpers";
import RawEmailBody from "./EmailBody";
import EmailBody from "./EmailBody";

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
  }, [emailID, searchParams]);
  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between">
        <div>
          <Button variant="ghost" size="icon" disabled={!email}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Move to trash</span>
          </Button>
        </div>
        <div className="">
          <Button variant="ghost" size="icon" disabled={!email}>
            <Reply className="h-4 w-4" />
            <span className="sr-only">Reply all</span>
          </Button>
          <Button variant="ghost" size="icon" disabled={!email}>
            <ReplyAll className="h-4 w-4" />
            <span className="sr-only">Reply all</span>
          </Button>
          <Button variant="ghost" size="icon" disabled={!email}>
            <Forward className="h-4 w-4" />
            <span className="sr-only">Move to trash</span>
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      {email && emailBody ? (
        <EmailBody email={email} emailBody={emailBody} />
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
