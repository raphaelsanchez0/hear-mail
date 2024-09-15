import React, { useEffect, useState } from "react";
import OpenAI from "openai";

interface SummarizeBodyProps {
  rawEmailBody: string;
  subject: string;
  sender: string;
}

const openAi = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function SummarizeBody({
  rawEmailBody,
  subject,
  sender,
}: SummarizeBodyProps) {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const prompt = `This is the body of an email. This is a custom email client, 
    so there may be some formatting issues. Please summarize the following email, keeping it as brief
    but conversational as possible.
    This is the  sender &{sender} and the subject is &{subject}. This is the body
    of the email: ${rawEmailBody}`;

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
  }, [rawEmailBody]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="p-4 text-sm">{response}</div>
        </div>
      )}
    </div>
  );
}
