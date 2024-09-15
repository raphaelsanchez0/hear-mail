import { IncomingEmail } from "@/utils/types";
import OpenAI from "openai";
import React, { useEffect, useState } from "react";
import SkeletonEmailStack from "../skeletons/SkeletonEmailStack";

interface FormatBodyProps {
  email: IncomingEmail;
  emailBody: string;
}

const openAi = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function FormatBody({ email, emailBody }: FormatBodyProps) {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const prompt = `This is the body of an email. This is a custom email client, 
    so there may be some formatting issues. Please format the following email, keeping as much detail as possible
    but making it look nice. Omit anything that somebody wouldn't need to see. Keep any names or important details.
    Do not include from, to, or subject lines. If you are going include a Dear, please include a name.
    This is the body of the email: ${emailBody}`;

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true); // Set loading state to true before fetching

      try {
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
          messages: [{ role: "user", content: prompt }],
          model: "gpt-3.5-turbo",
        };
        const chatCompletion: OpenAI.Chat.ChatCompletion =
          await openAi.chat.completions.create(params);

        const chatGPTResponse = chatCompletion.choices[0].message?.content;
        if (chatGPTResponse) {
          setResponse(chatGPTResponse);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchSummary();
  }, [email]);
  return <>{isLoading ? <SkeletonEmailStack /> : <>{response}</>}</>;
}
