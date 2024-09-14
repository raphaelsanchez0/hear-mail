"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { signOut } from "next-auth/react";
export default function Settings() {
  return (
    <div className="full-screen-page">
      <Sidebar />
      <div className="flex w-full">
        <Card className="w-full basis-1/3">
          <CardHeader>
            <CardTitle className="text-2xl">Account</CardTitle>
            <CardContent></CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => signOut()}>
                Logout
              </Button>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
