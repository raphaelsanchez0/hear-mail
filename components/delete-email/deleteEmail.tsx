import React from "react";
import { Button } from "../ui/button";

interface TrashConfirmationModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function TrashConfirmationModal({
  onConfirm,
  onClose,
}: TrashConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl mb-4">Move to Trash</h2>
        <p>Are you sure you want to move this email to the trash?</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onConfirm} className="mr-2">
            Yes, Trash it
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
