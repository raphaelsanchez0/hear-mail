"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Forward, Reply, ReplyAll, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Mail } from "@/utils/types";
import { format } from "date-fns/format";
import OpenAiProofOfConcept from "@/components/ai-interpreter/chatgpt";

interface EmailContentProps {
  mail?: Mail | null;
}

export default function EmailContent({ mail }: EmailContentProps) {
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
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail.name}</div>
                <div className="line-clamp-1 text-xs">{mail.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span>{" "}
                  {mail.recipientEmail}
                </div>
              </div>
            </div>
            {mail.date && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(mail.date), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail.body}
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
      <OpenAiProofOfConcept/>
    </div>
  );
}
