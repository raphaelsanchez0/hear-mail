import React from "react";
import { Card } from "../ui/card";
import { GmailMessage } from "@/utils/types";
import { getSubject } from "@/utils/email/emailhelpers";

interface ListEmailProps {
  email: GmailMessage;
}

export default function ListEmail({ email }: ListEmailProps) {
  console.log(email);

  return (
    <Card className="p-4 hover:bg-muted cursor-pointer max-w-full">
      <h3 className="font-semibold text-md w-full">{email.senderName}</h3>
      <p className="text-md overflow-hidden whitespace-nowrap">
        {getSubject(email)}
      </p>
    </Card>
  );
}
