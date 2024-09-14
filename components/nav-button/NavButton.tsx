"use client";
import React from "react";
import { Button } from "../ui/button";
import { Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface NavButtonProps {
  name: string;
  icon: React.ReactNode;
  href?: string;
}

export default function NavButton({ name, icon, href }: NavButtonProps) {
  const router = useRouter();

  const onClickHref = href ? href : `/email?folder=${name.toLowerCase()}`;

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={() => router.push(onClickHref)}
    >
      {icon}
      {name}
    </Button>
  );
}
