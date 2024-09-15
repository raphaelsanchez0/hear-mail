"use client"
import { Button } from "@/components/ui/button";
import OpenAI from "openai";
import { useState } from "react";

const openAi = new OpenAI({
    apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser:true
})

export function Summarization({ inputText} :{inputText:string}) {
    const [response, setResponse] = useState('')

    const handleClick = async() =>{
        const params:OpenAI.Chat.ChatCompletionCreateParams =
        {
            messages: [{role: 'user', content: "Summarize the following: " + inputText }],
            model: 'gpt-3.5-turbo'
        };
        const chatCompletion: OpenAI.Chat.ChatCompletion = await openAi.chat.completions.create(params);
        
        const chatGPTResponse = chatCompletion.choices[0].message.content
        setResponse(chatGPTResponse!)
    }
   
    return(
        <>
        <div className="flex">
            
            <Button onClick={()=>handleClick()}/>
                
        </div>
        {response}
        </>
    )
}