"use client";
import { Forward, Reply, ReplyAll, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import {
  extractEmailBody,
} from "@/utils/email/emailHelpers";
import { IncomingEmail } from "@/utils/types";
import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import RawEmailBody from "./EmailBody";

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
        <RawEmailBody email={email} emailBody={emailBody} />
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
