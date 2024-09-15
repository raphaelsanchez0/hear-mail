"use client";
import { getSubject } from "@/utils/email/emailHelpers";
import { GmailMessage } from "@/utils/types";
import { Card } from "../ui/card";

import { usePathname, useRouter } from "next/navigation";


interface ListEmailProps {
  email: GmailMessage;
}

export default function ListEmail({ email }: ListEmailProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const params = new URLSearchParams();
    params.set("emailId", email.id);

    router.push(`${pathname}?${params.toString()}`);
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
