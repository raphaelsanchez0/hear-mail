"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

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
