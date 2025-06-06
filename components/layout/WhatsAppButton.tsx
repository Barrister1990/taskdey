"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full shadow-lg bg-green-500 hover:bg-green-600"
      size="icon"
      onClick={() => window.open("https://wa.me/+233241940783", "_blank")}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="sr-only">Contact on WhatsApp</span>
    </Button>
  );
}