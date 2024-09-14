import React from "react";
import { Card } from "../ui/card";

interface ListEmailProps {
  sender: string;
  subject: string;
  body: string;
}

export default function ListEmail({ sender, subject, body }: ListEmailProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "..."; // Add ellipsis to indicate truncation
  };

  return (
    <Card className="p-4 hover:bg-muted cursor-pointer max-w-full">
      <h3 className="font-semibold">{sender}</h3>
      <h3 className="font-semibold">{subject}</h3>
      <div className="text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-full">
        {truncateText(body, 35)}
      </div>
    </Card>
  );
}
