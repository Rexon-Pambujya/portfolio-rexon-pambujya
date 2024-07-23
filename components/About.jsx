"use client";
import DevImg from "./DevImg";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User2,
  MailIcon,
  HomeIcon,
  PhoneCall,
  GraduationCap,
  Calendar,
  Briefcase,
  icons,
} from "lucide-react";
import { AnimatedText } from "./ui/animatedText";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";

const infoData = [
  {
    icon: <User2 size={20} />,
    text: "Rexon Pambujya",
  },
  {
    icon: <MailIcon size={20} />,
    text: "rexonpambujya2001@gmail.com",
  },
  {
    icon: <PhoneCall size={20} />,
    text: "+919511810373",
  },
  {
    icon: <Calendar size={20} />,
    text: "28/10/2001",
  },
  {
    icon: <GraduationCap size={20} />,
    text: "Bachelors of Engineering in IT",
  },
];

export default function About() {
  return (
    <section className="h-auto pb-12 xl:py-18">
      <div className="px-1 lg:px-14 mx-auto">
        <h2 className="section-title mb-8 xl:mb-12 text-center mx-auto">
          About
        </h2>
        <AnimatedText text="Passion fuels Purpose!" />
        <div className="flex flex-col xl:flex-row">
          <div className="flex-1 flex-col items-center justify-center">
            <Tabs defaultValue="personal">
              <TabsList className="mt-8 w-full grid items-center justify-center xl:grid-cols-3 xl:max-w-[520px]: xl:border dark:border-primary">
                <TabsTrigger className="w-[162px] xl:w-auto" value="education">
                  Education
                </TabsTrigger>
                <TabsTrigger className="w-[162px] xl:w-auto" value="experience">
                  Experience
                </TabsTrigger>
                <TabsTrigger className="w-[162px] xl:w-auto" value="skills">
                  Skills
                </TabsTrigger>
              </TabsList>
              <div className="text-lg mt-12 xl:mt-8">
                <TabsContent value="education">
                  <Education />
                </TabsContent>
                <TabsContent value="experience">
                  <Experience />
                </TabsContent>
                <TabsContent value="skills">
                  <Skills />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
