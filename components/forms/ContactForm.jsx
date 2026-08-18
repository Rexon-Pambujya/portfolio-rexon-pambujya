"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema } from "@/lib/contactSchema";

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  const onSubmit = async (values) => {
    setStatus({ state: "idle", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          state: "error",
          message: data.error || "Something went wrong. Try email instead?",
        });
        return;
      }

      setStatus({ state: "sent", message: "Thanks — I'll get back to you." });
      reset();
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Try email instead?",
      });
    }
  };

  const field = "mt-1.5";
  const errorText = "mt-1.5 text-sm text-destructive";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-8"
    >
      {/* honeypot — real people never fill this, bots usually do */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={field}
            {...register("name")}
          />
          {errors.name ? <p className={errorText}>{errors.name.message}</p> : null}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={field}
            {...register("email")}
          />
          {errors.email ? <p className={errorText}>{errors.email.message}</p> : null}
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          aria-invalid={!!errors.subject}
          className={field}
          {...register("subject")}
        />
        {errors.subject ? <p className={errorText}>{errors.subject.message}</p> : null}
      </div>

      <div className="mt-5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          className={field}
          {...register("message")}
        />
        {errors.message ? <p className={errorText}>{errors.message.message}</p> : null}
      </div>

      <div className="mt-7 flex flex-col gap-4 xs:flex-row xs:items-center">
        <Button type="submit" disabled={isSubmitting || status.state === "sent"}>
          {isSubmitting ? (
            <>
              <Loader2 size={17} className="mr-2 animate-spin" />
              Sending
            </>
          ) : status.state === "sent" ? (
            <>
              <Check size={17} className="mr-2" />
              Sent
            </>
          ) : (
            <>
              Send message
              <Send size={17} className="ml-2" />
            </>
          )}
        </Button>

        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${
            status.state === "error" ? "text-destructive" : "text-primary"
          }`}
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}
