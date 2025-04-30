import Link from "next/link";
import { Button } from "./ui/button";
import { Download, Send } from "lucide-react";
import {
  RiBriefcase4Fill,
  RiTeamFill,
  RiTodoFill,
  RiArrowDownSLine,
} from "react-icons/ri";

import { Badge } from "./Badge";
import Socials from "./Socials";
import DevImg from "./DevImg";
export default function Hero() {
  return (
    <section
      className="py-12 xl:py-19 h-auto xl:pt-20 bg-hero bg-no-repeat 
    bg-bottom bg-cover dark:bg-none mb-24"
    >
      <div className="p-8 xl:p-10 mx-auto">
        <div className="flex flex-col xl:flex-row justify-between gap-x-8">
          <div
            className="flex max-w-[600px] flex-col justify-center mx-auto
          xl:mx-0 text-center xl:text-left order-2 xl:order-1"
          >
            <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">
              Software Engineer
            </div>
            <h1 className="h1 mb-4">Hello, my name is Rexon Pambujya</h1>
            <p className="subtitle max-w-[490px] mx-auto xl:mx-0 text-justify">
              A passionate Software Engineer based in Mumbai with strong skills
              in 𝗣𝘆𝘁𝗵𝗼𝗻, 𝗗𝗮𝘁𝗮 𝗦𝗰𝗶𝗲𝗻𝗰𝗲, 𝗠𝗮𝗰𝗵𝗶𝗻𝗲 𝗟𝗲𝗮𝗿𝗻𝗶𝗻𝗴 𝗮𝗻𝗱 𝗪𝗲𝗯 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁.
              With hands-on experience at companies like 𝗕𝗹𝗶𝘁𝘇𝗮𝗿 𝗧𝗲𝗰𝗵, 𝗫𝗘𝗠𝗜, 𝗮𝗻𝗱
              𝗖𝗲𝗿𝗲 𝗟𝗮𝗯𝘀, I've delivered real-world impact — fine-tuning AI
              models to improve prediction accuracy, building intelligent
              chatbots that cut customer response time, and streamlining web
              applications for faster deployments. I love blending technology
              and innovation to solve business problems, whether it's creating
              machine learning models, automating processes, or enhancing user
              experiences.
            </p>
            <div
              className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto
             xl:mx-0 mb-12 "
            >
              <Link href="/contact">
                <Button className="gap-x-2 hover:shadow-primary shadow-2xl">
                  Connect
                  <Send size={18} />
                </Button>
              </Link>
              <Link
                target="_blank"
                href="RexonPambujya_Resume.pdf"
                download={true}
              >
                <Button
                  variant="secondary"
                  className="gap-x-2 hover:shadow-primary shadow-2xl"
                >
                  Resume <Download size={18} />
                </Button>
              </Link>
            </div>
            <Socials
              containerStyles="flex gap-x-6 mx-auto xl:mx-0"
              iconsStyles="text-foreground text-[25px] hover:text-primary transition-all"
            />
          </div>
          <div className="relative flex flex-col justify-center items-center order-1 xl:order-2 mb-8 xl:mb-0">
            <div className="relative w-full  max-w-[510px]">
              <div className="bg-hero_shape2_light dark:bg-hero_shape2_dark w-full h-full bg-no-repeat absolute bg-left-bottom lg:-top-12 -right-2 bg-contain"></div>
              <DevImg
                containerStyles="bg-hero_shape w-full xl:w-[510px] h-[462px] bg-no-repeat relative bg-bottom bg-contain overflow:hidden md:bg-cover"
                imgSrc="/hero/dev.png"
              />

              <Badge
                containerStyles="absolute top-[24%] -left-[1rem] lg:-left-[5rem]"
                icon={<RiBriefcase4Fill />}
                endCountNum={2}
                badgeText="Years Of Experience"
              />
              <Badge
                containerStyles="absolute top-[80%] -left-[1rem]"
                icon={<RiTodoFill />}
                endCountNum={12}
                endCountText="+"
                badgeText="Finished Projects"
              />
            </div>
          </div>
        </div>
        <div
          className="hidden md:flex absolute left-2/4 bottom-44 xl:bottom-12
        animate-bounce
        "
        >
          <RiArrowDownSLine className="text-4xl text-primary" />
        </div>
      </div>
    </section>
  );
}
