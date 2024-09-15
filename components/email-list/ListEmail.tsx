"use client";
import React from "react";
import { Card } from "../ui/card";
import { GmailMessage } from "@/utils/types";
import { getSubject } from "@/utils/email/emailHelpers";
import { useRouter } from "next/navigation";

interface ListEmailProps {
  email: GmailMessage;
}

export default function ListEmail({ email }: ListEmailProps) {
  const params = new URLSearchParams();
  const router = useRouter();
  params.set("emailId", email.id);

  const handleClick = () => {
    router.push(`#${params.toString()}`);
  };

  return (
    <Card
      className="p-4 hover:bg-muted cursor-pointer max-w-full"
      onClick={handleClick}
    >
      <h3 className="font-semibold text-md w-full">{email.senderName}</h3>
      <p className="text-md overflow-hidden whitespace-nowrap">
        {getSubject(email)}
      </p>
    </Card>
  );
}
