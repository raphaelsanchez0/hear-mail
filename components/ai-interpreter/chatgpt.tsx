"use client"
import React, { useState } from "react";
import OpenAI from "openai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const openAi = new OpenAI({
    apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser:true
})

export function OpenAiProofOfConcept(){

    const [input, setInput] = useState('')
    const [response, setResponse] = useState('')

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

export function Summarization(){

    const [inputText, setInput] = useState('')
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
            <Input value={inputText} onChange={(e)=>{
                setInput(e.target.value)
            }} />
            <Button onClick={()=>handleClick()}/>
                
        </div>
        {response}
        </>
    )
}
/*
function ImageAnalyzer() {
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...imageUrls]);
    };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
        const content = [{ type: "text", text: "Describe these images:" }];

        //Maybe another content.push here with text instead of images
        content.push(...images.map(img => ({
            type: "image_url",
            image_url: { url: img }
        })));

        const response = await openAi.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [{ role: "user", content: content }],
            max_tokens: 300,
        });

        setDescription(response.choices[0].message.content);
        } catch (error) {
            console.error("Error analyzing images:", error);
            setDescription("Error analyzing images. Please try again.");
        } finally {
            setIsLoading(false);
        }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
      <button onClick={handleAnalyze} disabled={isLoading || images.length === 0}>
        {isLoading ? 'Analyzing...' : 'Analyze Images'}
      </button>
      {images.map((img, index) => (
        <img key={index} src={img} alt={`Uploaded ${index}`} style={{ maxWidth: '200px', margin: '10px' }} />
      ))}
      {description && <p>{description}</p>}
    </div>
  );
}
*/
//   function ImageAnalyzerTest() {
//     const [images, setImages] = useState([]);
//     const [description, setDescription] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleImageUpload = (event) => {
//         const files = Array.from(event.target.files);
//         const imageUrls = files.map(file => URL.createObjectURL(file));
//         setImages(prevImages => [...prevImages, ...imageUrls]);
//     };

//   const handleAnalyze = async () => {
//     setIsLoading(true);
//     try {
//       const content = [{ type: "text", text: "Describe these images:" }];
//       content.push(...images.map(img => ({
//         type: "image_url",
//         image_url: { url: img }
//       })));

//       const response = await openAi.chat.completions.create({
//         model: "gpt-4-vision-preview",
//         messages: [{ role: "user", content: content }],
//         max_tokens: 300,
//       });

//       setDescription(response.choices[0].message.content);
//     } catch (error) {
//       console.error("Error analyzing images:", error);
//       setDescription("Error analyzing images. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
// return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         onChange={handleImageUpload}
//       />
//       <button onClick={handleAnalyze} disabled={isLoading || images.length === 0}>
//         {isLoading ? 'Analyzing...' : 'Analyze Images'}
//       </button>
//       {images.map((img, index) => (
//         <img key={index} src={img} alt={`Uploaded ${index}`} style={{ maxWidth: '200px', margin: '10px' }} />
//       ))}
//       {description && <p>{description}</p>}
//     </div>
//   };