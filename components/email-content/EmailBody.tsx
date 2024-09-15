"use client";
import {
  getEmailFormattedTime,
  getEmailRecipient,
  getEmailSender,
  getEmailSubject,
} from "@/utils/email/emailHelpers";
import { IncomingEmail } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import FormatBody from "./FormatBody";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import OpenAI from "openai";
import SummaryToSpeech from "./SummaryToSpeech";
const openAi = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
interface RawEmailBodyProps {
  email: IncomingEmail;
  emailBody: string;
}

export default function EmailBody({ email, emailBody }: RawEmailBodyProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const emailID = searchParams.get("emailId");
  const sender = getEmailSender(email);
  const subject = getEmailSubject(email);
  const recipient = getEmailRecipient(email);
  const formattedTime = getEmailFormattedTime(email);
  const [summaryResponse, setSummaryResponse] = useState("");

  const prompt = `This is the body of an email. This is a custom email client, 
      so there may be some formatting issues. Please summarize the following email, keeping it as brief but
      information as possible, with no effect on the main message or tone.
      This is the  sender ${sender} and the subject is ${subject}. This is the body
      of the email: ${emailBody}`;

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);

      try {
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
          messages: [{ role: "user", content: prompt }],
          model: "gpt-3.5-turbo",
        };
        const chatCompletion: OpenAI.Chat.ChatCompletion =
          await openAi.chat.completions.create(params);

        const chatGPTResponse = chatCompletion.choices[0].message?.content;
        if (chatGPTResponse) {
          setSummaryResponse(chatGPTResponse);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchSummary();
  }, [emailBody]);

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
        <SummaryToSpeech summery={summaryResponse} />

        <Button>Read Out</Button>
        <Button>Attachments</Button>
      </div>
      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
        {showSummary ? <>{summaryResponse} </> : <>{emailBody} </>}
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
