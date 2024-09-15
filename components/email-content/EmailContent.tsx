"use client"; // Add this at the very top

import { Forward, Reply, ReplyAll, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { IncomingEmail, Mail } from "@/utils/types";
import { format } from "date-fns/format";
import { Session } from "next-auth";
import { getEmail } from "@/api/gmail/gmail";
import {
  extractEmailBody,
  getEmailFormattedTime,
  getEmailRecipient,
  getEmailSender,
  getEmailSubject,
} from "@/utils/email/emailHelpers";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useRouter, useSearchParams } from "next/navigation";


import RawEmailBody from "./EmailBody";
import EmailBody from "./EmailBody";

function TrashConfirmationModal({ onConfirm, onCancel }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl mb-4">Move to Trash</h2>
        <p>Are you sure you want to move this email to the trash?</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onConfirm} className="mr-2">
            Yes, Trash it
          </Button>
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// Success modal to notify the user
function TrashSuccessModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl mb-4">Email Trashed</h2>
        <p>The email has been successfully moved to the trash.</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="mr-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

interface EmailContentProps {
  session: any;
}

export default function EmailContent({ session }: EmailContentProps) {
  const [email, setEmail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showTrashModal, setShowTrashModal] = useState(false); // Modal control state
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal control
  const searchParams = useSearchParams(); // To get the emailId from URL
  const emailId = searchParams.get("emailId"); // Extract emailId from URL
  const router = useRouter();

  useEffect(() => {
    const fetchEmail = async (id: string | null) => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/get-email?emailId=${id}`);
        const emailData = await res.json();
        setEmail(emailData);
      } catch (error) {
        console.error("Error fetching email:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmail(emailId);
  }, [emailId]);

  const handleTrashEmail = async () => {
    try {
      const res = await fetch(`/api/deleteEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId }), // Pass emailId to backend
      });

      const result = await res.json();
      if (result.message === "Email trashed successfully!") {
        setShowTrashModal(false); // Close confirmation modal
        setShowSuccessModal(true); // Show success modal
        router.refresh();
      } else {
        alert("Failed to trash the email.");
        setShowTrashModal(false);
      }
    } catch (error) {
      console.error("Error trashing email:", error);
      setShowTrashModal(false); // Close modal on error
    }
  };

  const handleTrashSucessModalClose = () => {
    router.refresh();
    setShowSuccessModal(false);
  };

  return (
    <div className="flex-1 p-4">
      {loading ? (
        <div>Loading email...</div>
      ) : (
        email && (
          <div>
            <div className="flex justify-between">
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTrashModal(true)} // Open trash confirmation modal on click
                  disabled={!emailId} // Disable button if emailId is not available
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Move to trash</span>
                </Button>
              </div>
              <div className="">
                <Button variant="ghost" size="icon" disabled={!email}>
                  <Reply className="h-4 w-4" />
                  <span className="sr-only">Reply</span>
                </Button>
                <Button variant="ghost" size="icon" disabled={!email}>
                  <ReplyAll className="h-4 w-4" />
                  <span className="sr-only">Reply all</span>
                </Button>
                <Button variant="ghost" size="icon" disabled={!email}>
                  <Forward className="h-4 w-4" />
                  <span className="sr-only">Forward email</span>
                </Button>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
              <div>
                <h1 className="text-xl font-bold">{email.subject}</h1>
                <p>From: {email.from}</p>
                <p>To: {email.to}</p>
                <p>Date: {email.date}</p>
              </div>
            </div>
            <Separator className="my-4" />
            

            {/* Trash confirmation modal */}
            {showTrashModal && (
              <TrashConfirmationModal
                onConfirm={handleTrashEmail} // Trashing email on confirmation
                onCancel={() => setShowTrashModal(false)} // Close modal on cancel
              />
            )}

            {/* Trash success modal */}
            {showSuccessModal && (
              <TrashSuccessModal onClose={handleTrashSucessModalClose} />
            )}

            
            <div className="whitespace-pre-wrap p-4 text-sm">
              {/* Render HTML email body if it's HTML */}
              <div dangerouslySetInnerHTML={{ __html: email.body }} />
            </div>
          </div>
        )
      )}
    </div>
  );
}
