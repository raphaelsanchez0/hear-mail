import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import ListEmail from "./ListEmail";

export default function EmailList() {
  return (
    <div className="w-80 border-r">
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8 bg-background" />
          </div>
        </form>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)] w-full px-4">
        {[...Array(20)].map((_, i) => (
          <ListEmail
            key={i}
            sender="Sender Name"
            subject="Email Subject"
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        ))}
      </ScrollArea>
    </div>
  );
}
