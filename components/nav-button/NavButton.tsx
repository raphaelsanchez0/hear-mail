"use client";
import React from "react";
import { Button } from "../ui/button";
import { Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface NavButtonProps {
  name: string;
  icon: React.ReactNode;
}

export default function NavButton({ name, icon }: NavButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={() => router.push(`/email?folder=${name.toLowerCase()}`)}
    >
      {icon}
      {name}
    </Button>
  );
}
