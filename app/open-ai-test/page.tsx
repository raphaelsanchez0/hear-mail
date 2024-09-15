"use client"
import React, { useState } from "react";
import OpenAI from "openai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OpenAiProofOfConcept(){

    const [input, setInput] = useState('')
    const [response, setResponse] = useState('')

    const openAi = new OpenAI({
        apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser:true
    })


    

    const handleClick = async() =>{
        const params:OpenAI.Chat.ChatCompletionCreateParams =
        {
            messages: [{role: 'user', content: input }],
            model: 'gpt-3.5-turbo'
        };
        const chatCompletion: OpenAI.Chat.ChatCompletion = await openAi.chat.completions.create(params);
        
        const chatGPTResponse = chatCompletion.choices[0].message.content
        setResponse(chatGPTResponse!)
    }

   
    return(
        <>
        <div className="flex">
            <Input value={input} onChange={(e)=>{
                setInput(e.target.value)
            }} />
            <Button onClick={()=>handleClick()}/>
                
        </div>
        {response}
        </>
    )
}