import { Summarization } from "@/components/ai-interpreter/summarize";
import EmailContent from "@/components/email-content/EmailContent";
import EmailList from "@/components/email-list/EmailList";
import NavButton from "@/components/nav-button/NavButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "@/utils/types";
import { Inbox, Send, File, Trash2, Search } from "lucide-react";

export const exampleMail: Mail = {
  name: "John Doe",
  subject: "Hello, World!",
  recipientEmail: "johnDoe@gmail.com",
  date: "2021-09-20T12:00:00Z",
  body: "Hello, World! This is a test",
};

export default function EmailClientPage() {
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-44 bg-muted p-4 flex flex-col">
        <Button className="w-full mb-4">Compose</Button>
        <nav className="space-y-2">
          <NavButton name="Inbox" icon={<Inbox className="mr-2 h-4 w-4" />} />
          <NavButton name="Sent" icon={<Send className="mr-2 h-4 w-4" />} />
          <NavButton name="Drafts" icon={<File className="mr-2 h-4 w-4" />} />
          <NavButton name="Trash" icon={<Trash2 className="mr-2 h-4 w-4" />} />
        </nav>
      </div>

      {/* Email List */}
      <EmailList />

      {/* Email Content */}
      <EmailContent mail={exampleMail} />

    </div>
  );
}
