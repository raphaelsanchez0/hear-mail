import EmailList from "@/components/email-list/EmailList";
import NavButton from "@/components/nav-button/NavButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail, Inbox, Send, File, Trash2, Search } from "lucide-react";

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
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Email Subject</h2>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-primary mr-2" />
          <div>
            <p className="font-semibold">Sender Name</p>
            <p className="text-sm text-muted-foreground">sender@example.com</p>
          </div>
        </div>
        <Separator className="my-4" />
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae
          tincidunt nisl nunc euismod nunc. Nullam euismod, nisi vel consectetur
          interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod
          nunc.
        </p>
      </div>
    </div>
  );
}
