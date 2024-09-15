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
import OpenAI from "openai";
import SummaryToSpeech from "./SummaryToSpeech";
import ReadOutSpeech from "./ReadOutSpeech";
const openAi = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
interface RawEmailBodyProps {
  email: any;
  embailBody: any;
}

export default function EmailBody({ email, embailBody }: RawEmailBodyProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const searchParams = useSearchParams();
  const emailID = searchParams.get("emailId");
  const sender = email.from
  const subject = email.subject
  const recipient = email.to
  const formattedTime = email.date
  const [summaryResponse, setSummaryResponse] = useState("");
  const [readResponse, setReadResponse] = useState("");
  const [readLoading, setReadLoading] = useState(false)

  const prompt = `This is the body of an email. This is a custom email client, 
      so there may be some formatting issues. Please summarize the following email, keeping it as brief but
      information as possible, with no effect on the main message or tone.
      This is the  sender ${sender} and the subject is ${subject}. This is the body
      of the email: ${email.body}`;

  
  
  const fetchSummary = async () => {
    setSummaryLoading(true);

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
      setSummaryLoading(false); // Set loading state to false after fetching
    }
  };

  const fetchRead =  async () => {
    setReadLoading(true)
    try {
      const params: OpenAI.Chat.ChatCompletionCreateParams = {
        messages: [{ role: "user", content: `Read out this text as best you can. Imagine you are saying this to somebody who can't hear who needs to understand every part of this email. This is the email:${email.body}`}],
        model: "gpt-3.5-turbo",
      };
      const chatCompletion: OpenAI.Chat.ChatCompletion =
        await openAi.chat.completions.create(params);

      const chatGPTResponse = chatCompletion.choices[0].message?.content;
      if (chatGPTResponse) {
        setReadResponse(chatGPTResponse);
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setReadLoading(false); // Set loading state to false after fetching
    }
  };

  useEffect(() => {
    setShowSummary(false);
    setSummary("")

    setReadResponse("")
  }, [emailID]);

  console.log(email.body)

  return (
    <div className="flex flex-1 flex-col">
      
     
      <div className="gap-2 flex">
      <Button
          variant={showSummary ? "default" : "outline"}
          onClick={() => {
            if (!showSummary && !summaryResponse) {
              fetchSummary(); // Only fetch summary when clicked and not already fetched
            }
            setShowSummary(!showSummary);
          }}
        >
          {summaryLoading ? "Loading..." : "Summary"}
        </Button>
        <SummaryToSpeech
          summery={summaryResponse}
          onClick={() => {
            if (!summaryResponse) {
              fetchSummary(); // Ensure the summary is fetched before reading out
            }
          }}/>

          <ReadOutSpeech
          read={readResponse}
          onClick={() => {
            if (!readResponse) {
              fetchRead(); // Ensure the summary is fetched before reading out
            }
          }}/>
        <Button>Attachments</Button>
      </div>
      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
        {showSummary ? <>{summaryResponse} </> : <>{<div dangerouslySetInnerHTML={{ __html: embailBody }} />} </>}
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
