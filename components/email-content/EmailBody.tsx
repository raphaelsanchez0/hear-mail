"use client";
import {
  getEmailFormattedTime,
  getEmailRecipient,
  getEmailSender,
  getEmailSubject,
} from "@/utils/email/emailHelpers";
import { IncomingEmail } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import SummarizeBody from "./SummarizeBody";

interface RawEmailBodyProps {
  email: IncomingEmail;
  emailBody: string;
}

export default function EmailBody({ email, emailBody }: RawEmailBodyProps) {
  const [showSummary, setShowSummary] = useState(false);
  const searchParams = useSearchParams();
  const emailID = searchParams.get("emailId");
  const sender = getEmailSender(email);
  const subject = getEmailSubject(email);
  const recipient = getEmailRecipient(email);
  const formattedTime = getEmailFormattedTime(email);

  useEffect(() => {
    setShowSummary(false);
  }, [emailID]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start p-4">
        <div className="flex items-start gap-4 text-sm">
          <div className="grid gap-1">
            <div className="font-semibold">{sender}</div>
            <div className="line-clamp-1 text-xs">{subject}</div>
            <div className="line-clamp-1 text-xs">
              <span className="font-medium">To:</span> {recipient}
            </div>
          </div>
        </div>

        <div className="ml-auto text-xs text-muted-foreground">
          {formattedTime}
        </div>
      </div>
      <Separator />
      <div className="p-2 gap-2 flex">
        <Button
          variant={showSummary ? "default" : "outline"}
          onClick={() => {
            setShowSummary(!showSummary);
          }}
        >
          Summary
        </Button>
        <Button>Read Summary</Button>
        <Button>Read Out</Button>
        <Button>Attachments</Button>
      </div>
      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
        {showSummary ? (
          <SummarizeBody
            rawEmailBody={emailBody}
            subject={subject!}
            sender={sender!}
          />
        ) : (
          <>{emailBody}</>
        )}
      </div>
      <Separator className="mt-auto" />
      <div className="p-4">
        <form>
          <div className="grid gap-4">
            <Textarea className="p-4" placeholder={`Reply ${sender}...`} />
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
  );
}
