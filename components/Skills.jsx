import {
  SiAngular,
  SiGit,
  SiGithub,
  SiGooglesearchconsole,
  SiJavascript,
  SiMaterialdesign,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiPandas,
  SiRasa,
  SiScikitlearn,
  SiTailwindcss,
  SiWordpress,
} from "react-icons/si";
import { Button, Tooltip } from "@nextui-org/react";
import { FaCss3, FaHtml5, FaJava, FaPython, FaReact } from "react-icons/fa";
import { forwardRef } from "@nextui-org/react";
import { PencilRuler } from "lucide-react";
const IconWithTooltip = forwardRef(({ Icon, tooltipContent }, ref) => (
  <Tooltip
    content={tooltipContent}
    color="primary"
    className="rounded-full mb-2"
  >
    <div ref={ref} className="hover:shadow-primary shadow-xl">
      <Icon />
    </div>
  </Tooltip>
));

export default function Skills() {
  return (
    <div>
      <div className="flex items-center justify-center mb-10 gap-x-4">
        <PencilRuler size={28} />
        <h2 className="font-bold text-2xl ">Skills</h2>
      </div>
      <div className="w-full flex flex-col items-center justify-center ">
        <h3 className="font-bold ">Programming Languages</h3>
        <div className="mt-10 xl:mt-12 grid grid-cols-3 xl:grid-cols-6 justify-center items-center gap-y-8 gap-x-8 xl:gap-24 text-[40px]">
          <IconWithTooltip Icon={FaPython} tooltipContent="Python" />
          <IconWithTooltip Icon={FaJava} tooltipContent="Java" />
          <IconWithTooltip Icon={SiJavascript} tooltipContent="JavaScript" />
          <IconWithTooltip Icon={FaHtml5} tooltipContent="HTML5" />
          <IconWithTooltip Icon={FaCss3} tooltipContent="CSS" />
          <IconWithTooltip Icon={SiMysql} tooltipContent="CSS" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-8">
        <h3 className="font-bold ">Libraries and Framework</h3>
        <div className="mt-10 xl:mt-12 grid grid-cols-4 xl:grid-cols-8 justify-center items-center gap-y-10 gap-x-10 xl:gap-24 text-[40px]">
          <IconWithTooltip Icon={FaReact} tooltipContent="React" />
          <IconWithTooltip Icon={SiNextdotjs} tooltipContent="Next" />
          <IconWithTooltip Icon={SiAngular} tooltipContent="Angular" />
          <IconWithTooltip Icon={SiTailwindcss} tooltipContent="Tailwind CSS" />
          <IconWithTooltip Icon={SiNumpy} tooltipContent="Numpy" />
          <IconWithTooltip Icon={SiPandas} tooltipContent="Pandas" />
          <IconWithTooltip Icon={SiScikitlearn} tooltipContent="Scikit-learn" />
          <IconWithTooltip
            Icon={SiMaterialdesign}
            tooltipContent="MaterialUI"
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-8">
        <h3 className="font-bold ">Tools and Technologies</h3>
        <div className="mt-10 xl:mt-12 grid grid-cols-4 xl:grid-cols-5 justify-center items-center gap-y-10 gap-x-10 xl:gap-24 text-[40px]">
          <IconWithTooltip Icon={SiGithub} tooltipContent="Github" />
          <IconWithTooltip Icon={SiGit} tooltipContent="Git" />
          <IconWithTooltip Icon={SiRasa} tooltipContent="RASA NLU" />
          <IconWithTooltip
            Icon={SiGooglesearchconsole}
            tooltipContent="Google SEO"
          />
          <IconWithTooltip Icon={SiWordpress} tooltipContent="WordPress" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-8">
        <h2 className="font-bold ">Soft Skills</h2>
        <div className="mt-5 px-5 xl:mt-12 grid grid-cols-2 xl:grid-cols-3 justify-center items-center gap-y-10 gap-x-10 xl:gap-24 text-[20px]">
          <Button
            size="sm"
            className="bg-secondary h-[2.5rem] text-sm lg:text-lg rounded-sm text-white hover:shadow-primary shadow-lg"
          >
            Teamwork
          </Button>
          <Button
            size="sm"
            className="bg-secondary h-[2.5rem] text-sm lg:text-lg rounded-sm text-white hover:shadow-primary shadow-lg text-pretty"
          >
            Problem-Solving
          </Button>
          <Button
            size="sm"
            className="bg-secondary h-[2.5rem] text-sm lg:text-lg rounded-sm text-white hover:shadow-primary shadow-lg"
          >
            Empathy
          </Button>
          <Button
            size="sm"
            className="bg-secondary h-[2.5rem] text-sm lg:text-lg rounded-sm text-white hover:shadow-primary shadow-lg"
          >
            Leadership
          </Button>
          <Button
            size="sm"
            className="bg-secondary h-[2.5rem] text-sm lg:text-lg rounded-sm text-white hover:shadow-primary shadow-lg"
          >
            Project Management
          </Button>
          <Button
            size="sm"
            className="bg-secondary h-[2.5rem] text-sm lg:text-lg rounded-sm text-white hover:shadow-primary shadow-lg text-pretty"
          >
            Attention to Detail
          </Button>
        </div>
      </div>
    </div>
  );
}

//  <p className="flex items-center justify-center">
//    Programming: Experience in → Python; Knowledge about → Java, SQL, MySQL
//    <br />
//    Web Development: Experience in → HTML, CSS, React, Angular, JavaScript.
//    <br />
//    Technologies: Experience in → WordPress, Rasa NLU, Google SEO, Git, GitHub.
//    <br />
//    Soft Skills: Adept in Teamwork, Problem-Solving, , , Project
//    Management, Attention to detail.
//    <br />
//  </p>;
