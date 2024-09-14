import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ComposeEmailDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Compose</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Compose</DialogTitle>
        </DialogHeader>
        <Input type="email" placeholder="Recipient's Email" required />
        <Input type="text" placeholder="Subject" required />
        <textarea
          className="w-full h-40 border border-gray-300 rounded p-2 mt-2"
          placeholder="Message"
          required
        />
        <Button type="submit" className="mt-2">
          Send Email
        </Button>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
