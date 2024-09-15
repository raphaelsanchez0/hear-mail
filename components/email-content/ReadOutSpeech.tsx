import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import OpenAI from "openai";

interface ReadOutSpeechProps {
  read: string;
  onClick:()=>void;
}
const openAi = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
export default function ReadOutSpeech({ read: summery, onClick }: ReadOutSpeechProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true); // Set loading state to true before fetching
      try {
        // Assuming there is a TTS endpoint in OpenAI API
        const response = await openAi.audio.speech.create({
          model: "tts-1", // Replace with actual model
          voice: "alloy", // Replace with actual voice if available
          input: summery,
        });

        const buffer = Buffer.from(await response.arrayBuffer());
        const blob = new Blob([buffer], { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    if (summery) {
      fetchSummary();
    }
  }, [summery]);

  const playAudio = () => {
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={onClick}>Read Entire Email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Summary</DialogHeader>
        <div className="flex w-full items-center justify-center">
          {audioSrc ? (
            <audio controls src={audioSrc} />
          ) : (
            <p>{isLoading ? "Generating audio..." : "No audio available"}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
