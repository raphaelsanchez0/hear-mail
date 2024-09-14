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

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Email List */}
      <EmailList />

      {/* Email Content */}

      <EmailContent mail={exampleMail} />
    </div>
  );
}
