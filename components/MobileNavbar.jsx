"use client";

import { useState } from "react";
import { Download, Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import Logo from "./Logo";
import Socials from "./Socials";
import { profile } from "@/content/profile";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full
                   text-foreground transition-colors hover:bg-muted"
      >
        <Menu size={22} />
      </SheetTrigger>

      <SheetContent className="w-[min(20rem,85vw)]">
        <div className="flex h-full flex-col justify-between pb-safe pt-4">
          <div>
            <Logo />
            <Navbar
              containerStyles="mt-12 flex flex-col gap-y-2 text-2xl"
              onNavigate={() => setOpen(false)}
            />
          </div>

          <div className="space-y-6">
            {/* the header's Résumé button is hidden below sm */}
            <Button asChild variant="outline" full>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener"
                download
                className="gap-2"
                onClick={() => setOpen(false)}
              >
                Résumé
                <Download size={16} />
              </a>
            </Button>

            <Socials
              containerStyles="flex items-center -ml-3"
              iconsStyles="text-xl text-muted-foreground hover:text-primary hover:bg-muted"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
