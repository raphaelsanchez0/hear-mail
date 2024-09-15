"use client"; // Add this at the top

import EmailContent from "@/components/email-content/EmailContent";
import EmailList from "@/components/email-list/EmailList";
import NavButton from "@/components/nav-button/NavButton";
import Sidebar from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "@/utils/types";
import { Inbox, Send, File, Trash2, Search, Settings } from "lucide-react";

export default function EmailClientPage() {
  const exampleMail: Mail = {
    name: "John Doe",
    subject: "Hello, World!",
    recipientEmail: "johnDoe@gmail.com",
    date: "2021-09-20T12:00:00Z",
    body: "Hello, World! This is a test",
  };


  const fetchGoogleTTS = async (text: string) => {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
  
    const data = await response.json();
    
    // Convert base64 back to binary and create a Blob
    const binaryData = Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0));
    const audioBlob = new Blob([binaryData], { type: 'audio/mp3' });
    const audioURL = URL.createObjectURL(audioBlob);
  
    // Play the audio
    const audioElement = new Audio(audioURL);
    audioElement.play();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
  
      {/* Email List */}
      <EmailList />
  
      {/* Email Content */}
      <div>
        <EmailContent mail={exampleMail} />
  
        {/* Manual play button */}
        <button 
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => fetchGoogleTTS(exampleMail.body)}>
          Generate TTS
        </button>
  

      </div>
    </div>
  );
  
}

