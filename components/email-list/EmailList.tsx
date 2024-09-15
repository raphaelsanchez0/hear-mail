import { getEmails } from "@/api/gmail/gmail";
import { authConfig } from "@/lib/auth";
import Search from "lucide-react";
import { getServerSession } from "next-auth";
import { Input } from "../ui/input";
import ListEmail from "./ListEmail";

export default async function EmailList() {
  const session = await getServerSession(authConfig);

  const emails = await getEmails(session!.accessToken as string, 20);

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
      <div className="h-[calc(100vh-5rem)] p-4 overflow-y-scroll">
        {emails.map((email) => (
          <ListEmail key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
}
