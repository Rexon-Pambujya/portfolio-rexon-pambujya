"use client";

import { motion, useScroll } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useRef } from "react";

const Details = ({ position, company, companyLink, time, address, work }) => {
  return (
    <li className="first:mt-0 mb-5 w-full mx-auto xl:flex-grow flex flex-col items-center xs:text-base text-justify justify-between">
      <div>
        <h2 className="capitalize font-bold xl:text-2xl ">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            className="text-primary capitalize"
          >
            @{company}
          </a>
        </h2>
        <span className="capitalize font-medium text-muted-foreground">
          {time} | {address}
        </span>
        <p className="font-light w-full">
          {work.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              {index !== work.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
};

export default function Experience() {
  const ref = useRef(null);
  // const completion = useScrollProgress(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  const scaleY = scrollYProgress;
  return (
    <div className="my-34">
      <div className="flex items-center justify-center mb-10 gap-x-4">
        <Briefcase size={28} />
        <h2 className="font-bold text-2xl ">Experience</h2>
      </div>
      <div ref={ref} className="w-[75%] mx-auto lg:w-[90%] relative">
        <motion.div
          className="hidden xl:flex absolute left-8  top-0 w-[4px] h-full bg-primary origin-top"
          style={{ scaleY }}
          transition={{ type: "inertia" }}
        />
        <ul className="w-full flex flex-col items-start justify-between xl:ml-20 xs:ml-0.5">
          <Details
            company="XEMI"
            address="Mumbai"
            position="Software Engineering Intern"
            time="Oct 2023–Jan 2024"
            companyLink="https://www.xemi.io/"
            work={` HSN Recommender System and EwayBill Module.
• Prepared training data for the Machine Learning model by annotating the essential attributes in the 250-plus documents. I engaged in fine-tuning of OpenAI model (GPT-3.5) utilizing the HSN dataset.
• I trained a machine learning model on HSN documents using the Langchain framework. This improved HSN code prediction accuracy and streamlined the code assignment process.
• Created an EwayBill module using HTML, CSS and angular to streamline and automate filling out the E-waybills (bill required for transporting shipments) form, reducing the manual workload.`}
          />
          <Details
            company="Cere Labs"
            address="Mumbai"
            position="Data Science Intern"
            time="Jul 2022 – Jul 2023"
            companyLink="https://www.cerelabs.com/"
            work={`Clustering of Indian Addresses to derive Business Insights.
            • Analyzed and processed Indian address data, transformed it into a structured format, assigned precise geo-coordinates, and clustered locations.
• Demonstrated the potential of machine learning algorithms to cluster geographic coordinates, leading to significant reductions in transportation costs and improved delivery times.`}
          />
          <Details
            company="Blitzar Tech Pvt Ltd."
            address="Mumbai"
            position="Associate Software Engineer"
            time="Feb 2024 – Present"
            companyLink=""
            work={`• Worked on a web application to modernize the salary processing system for BMC schools, replacing manual file-based processes with an online system.
• Built backend services using Python, integrating REST APIs for seamless data processing.
• I worked on developing several frontend modules using modern technologies React.js, Next.js, HTML, and CSS, to enhance navigation and user experience.
• Significantly improved efficiency and accuracy in salary disbursement for BMC schools.
`}
          />
        </ul>
      </div>
    </div>
  );
}
