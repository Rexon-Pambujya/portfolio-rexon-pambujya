import Form from "@/components/Form";
import { AnimatedText } from "@/components/ui/animatedText";
import { Linkedin, MailIcon, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Contacts() {
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid xl:grid-cols-2 pt-12 xl:h-[400px] mb-6 xl:mb-24">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-x-4 text-primary text-lg mb-4">
              <span className="w-[30px] h-[2px] bg-primary "></span>
              Say Hello👋
            </div>
            <AnimatedText
              className="h1 max-w-md mb-8"
              text="Let's Work Together"
            />
            <p className="subtitle max-w-[400px]">
              Please feel free to reach out if you have any questions or if you
              are looking to hire someone for a work gig. I would love to hear
              from you. Looking forward to hearing from you.
              <br />
              Thank you.
            </p>
          </div>
          <div
            className="hidden xl:flex w-full bg-illustration_light 
          dark:bg-illustration_dark bg-contain bg-top bg-no-repeat"
          ></div>
        </div>
        <div className="grid xl:grid-cols-1 mb-24 xl:mb-32">
          <div
            className="flex flex-col gap-y-4 xl:gap-y-14 mb-12 xl:mb-24 text-base
          xl:text-lg
          "
          >
            <Link href="mailto:rexonpambujya2001@gmail.com">
              <div className="flex items-center gap-x-8">
                <MailIcon size={18} className="text-primary" />
                <div>rexonpambujya2001@gmail.com</div>
              </div>
            </Link>
            <Link
              href="https://www.linkedin.com/in/rexon-pambujya/"
              target="_blank"
            >
              <div className="flex items-center gap-x-8">
                <Linkedin
                  size={18}
                  className="text-primary"
                  href="https://www.linkedin.com/in/rexon-pambujya/"
                />
                <div>Rexon-Pambujya</div>
              </div>
            </Link>
            <div className="flex items-center gap-x-8">
              <PhoneCall size={18} className="text-primary" />
              <div>+91 9511810373</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
