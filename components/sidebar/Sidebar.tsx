import React from "react";
import { Button } from "../ui/button";
import NavButton from "../nav-button/NavButton";
import { Inbox, Send, Settings, Trash2, File } from "lucide-react";
import { ComposeEmailDialog } from "../compose-email-dialog/ComposeEmailDialog";

export default function Sidebar() {
  return (
    <div className="w-44 bg-muted p-4 flex flex-col">
      {/* <Button className="w-full mb-4">Compose</Button> */}
      <ComposeEmailDialog />
      <nav className="space-y-2 flex flex-col h-full justify-between">
        <div>
          <NavButton name="Inbox" icon={<Inbox className="mr-2 h-4 w-4" />} />
          <NavButton name="Sent" icon={<Send className="mr-2 h-4 w-4" />} />
          <NavButton name="Drafts" icon={<File className="mr-2 h-4 w-4" />} />
          <NavButton name="Trash" icon={<Trash2 className="mr-2 h-4 w-4" />} />
        </div>
        <div>
          <NavButton
            name="Settings"
            icon={<Settings className="mr-2 h-4 w-4" />}
            href="/settings"
          />
        </div>
      </nav>
    </div>
  );
}
