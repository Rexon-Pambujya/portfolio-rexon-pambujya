"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { User, MagnetIcon, ArrowRightIcon, MessagesSquare } from "lucide-react";

export default function Form() {
  return (
    <form className="flex flex-col gap-y-4">
      <div className="relative flex items-center">
        <Input type="name" id="name" placeholder="Full Name" />
        <User className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Input type="email" id="email" placeholder="Email Address" />
        <MagnetIcon className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Textarea type="message" id="message" placeholder="Type Your Message" />
        <MessagesSquare className="absolute top-4 right-6" size={20} />
      </div>
      <Button className="flex items-center gap-x-1 max-w-[166px]">
        Send
        <ArrowRightIcon size={20} />
      </Button>
    </form>
  );
}
